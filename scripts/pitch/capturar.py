"""Capture uma demonstração real; não altera DOM, storage, regras ou relógio do jogo."""
import argparse
import datetime as dt
import hashlib
import json
from pathlib import Path
import time
import urllib.request
import zipfile

from playwright.sync_api import sync_playwright, expect


def digest(data):
    return hashlib.sha256(data).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True)
    parser.add_argument('--sha', required=True)
    parser.add_argument('--zip', required=True, dest='original_zip')
    parser.add_argument('--site', default='https://luccalck.github.io/desafio-arcade/')
    parser.add_argument('--menu-seconds', type=float, default=6.5)
    parser.add_argument('--correction-hold', type=float, default=4.5)
    parser.add_argument('--mission-five-extra', type=float, default=0)
    args = parser.parse_args()
    if not (0 <= args.menu_seconds <= 30 and 0 <= args.correction_hold <= 30 and 0 <= args.mission_five_extra <= 20):
        raise ValueError('Durações de captura fora do limite.')
    if len(args.sha) != 40 or any(c not in '0123456789abcdef' for c in args.sha):
        raise ValueError('SHA completo obrigatório.')
    out = Path(args.output).resolve()
    out.mkdir(parents=True, exist_ok=True)
    base = args.site.rstrip('/') + '/'
    source = f'{base}releases/{args.sha}/'
    started = dt.datetime.now(dt.timezone.utc).isoformat()
    meta = {'schema': 1, 'startedAt': started, 'productionSha': args.sha,
            'siteUrl': base, 'captureUrl': source, 'executor': 'IA/Playwright',
            'requester': 'Lucca Castilho Costa', 'humanPlaytest': False,
            'viewport': {'width': 1600, 'height': 900}, 'actions': [], 'clips': {},
            'errors': [], 'publishedFiles': {}, 'completed': False}
    original = Path(args.original_zip).read_bytes()
    meta['zipSha256'] = digest(original)
    with zipfile.ZipFile(args.original_zip) as archive:
        for name in archive.namelist():
            if name.endswith('/'):
                continue
            expected = archive.read(name)
            with urllib.request.urlopen(source + name, timeout=30) as response:
                actual = response.read()
                assert response.status == 200, name
            assert digest(actual) == digest(expected), name
            if name == 'version.json':
                (out/'versao-producao.json').write_bytes(actual)
            meta['publishedFiles'][name] = {'bytes': len(actual), 'sha256': digest(actual)}
    missions = json.loads(Path('src/content/missions.json').read_text(encoding='utf-8'))['missions']

    def save():
        (out / 'captura.json').write_bytes(json.dumps(meta, ensure_ascii=False, indent=2).encode())

    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport=meta['viewport'], device_scale_factor=1,
                                      record_video_dir=str(out / 'raw'), record_video_size=meta['viewport'],
                                      accept_downloads=True)
        page = context.new_page()
        origin = time.monotonic()
        page.on('pageerror', lambda error: meta['errors'].append(str(error)))

        def now():
            return round(time.monotonic() - origin, 3)

        def action(name, **details):
            record = {'offset': now(), 'action': name, **details}
            meta['actions'].append(record)
            print(json.dumps(record, ensure_ascii=True), flush=True)

        def start(name):
            meta['clips'][name] = {'start': now()}
            action('start-clip', clip=name)

        def end(name):
            meta['clips'][name]['end'] = now()
            save()

        def shot(name):
            page.screenshot(path=str(out / f'{name}.png'))

        try:
            page.goto(source, wait_until='networkidle')
            expect(page.locator('.top-meta')).to_contain_text(args.sha[:7])
            start('menu')
            shot('menu')
            page.wait_for_timeout(round(args.menu_seconds*1000))
            end('menu')
            page.locator('#new-game').click()
            start('falha')
            page.wait_for_timeout(1000)
            page.locator('#play-game').click()
            before = float(page.locator('#ship').get_attribute('data-x'))
            page.keyboard.down('ArrowRight')
            page.wait_for_timeout(650)
            page.keyboard.up('ArrowRight')
            after = float(page.locator('#ship').get_attribute('data-x'))
            assert after < before, 'O controle inicial deve estar invertido.'
            action('controle-invertido', before=before, after=after)
            page.locator('#test-rules').click()
            expect(page.locator('#test-summary')).not_to_contain_text('Tudo certo')
            page.wait_for_timeout(1500)
            page.locator('#show-tests').click()
            expect(page.locator('dialog')).to_contain_text('Esperado')
            shot('casos-falha')
            page.wait_for_timeout(6500)
            end('falha')
            page.get_by_role('button', name='Fechar', exact=True).click()
            start('correcao')
            editor = page.locator('#code-editor')
            editor.click()
            editor.press('Control+Home')
            for _ in range(3):
                editor.press('ArrowDown')
            editor.press('End')
            editor.press('Backspace')
            editor.press_sequentially('-1', delay=350)
            page.wait_for_timeout(900)
            editor.press('ArrowDown')
            editor.press('ArrowDown')
            editor.press('Home')
            editor.press('Shift+End')
            page.keyboard.insert_text('        direcao = 1')
            assert editor.input_value() == missions[0]['reference']
            action('corrigir-controles-pelo-editor')
            page.wait_for_timeout(1700)
            page.locator('#test-rules').click()
            expect(page.locator('#test-summary')).to_contain_text('Tudo certo')
            action('testar-missao', mission=1, summary=page.locator('#test-summary').inner_text())
            page.wait_for_timeout(2000)
            page.locator('#play-game').click()
            before = float(page.locator('#ship').get_attribute('data-x'))
            page.keyboard.down('ArrowRight')
            page.wait_for_timeout(650)
            page.keyboard.up('ArrowRight')
            after = float(page.locator('#ship').get_attribute('data-x'))
            assert after > before
            page.locator('#pause-game').click()
            action('controle-corrigido', before=before, after=after)
            shot('regra-corrigida')
            page.wait_for_timeout(round(args.correction_hold*1000))
            end('correcao')
            for i in range(1, 5):
                page.locator('#next-mission').click()
                start(f'missao-{i+1}')
                page.locator('#code-editor').fill(missions[i]['reference'])
                page.wait_for_timeout(1200)
                page.locator('#test-rules').click()
                expect(page.locator('#test-summary')).to_contain_text('Tudo certo')
                action('testar-missao', mission=i+1, summary=page.locator('#test-summary').inner_text())
                page.wait_for_timeout(2400+round(args.mission_five_extra*1000) if i == 4 else 2400)
                end(f'missao-{i+1}')
            page.locator('#next-mission').click()
            page.locator('#test-rules').click()
            expect(page.locator('#test-summary')).to_contain_text('23/23')
            start('final')
            shot('projeto-validado')
            page.wait_for_timeout(1000)
            page.locator('#play-game').click()
            held = ''

            def steer(side):
                nonlocal held
                if side == held:
                    return
                if held:
                    page.keyboard.up(held)
                held = side
                if side:
                    page.keyboard.down(side)

            for _ in range(600):
                status = page.locator('#game-stage').get_attribute('data-status')
                if status != 'playing':
                    steer('')
                    assert status == 'won', status
                    break
                targets = page.locator('[data-item]').evaluate_all('''els=>els.map(e=>({type:e.dataset.type,x:Number(e.dataset.x),y:Number(e.dataset.y)})).filter(i=>i.type!=='pedra'&&i.y<292)''')
                targets.sort(key=lambda item: (1000 if item['type'] == 'estrela' else 0) + item['y'], reverse=True)
                ship = float(page.locator('#ship').get_attribute('data-x'))
                target = targets[0] if targets else None
                steer('' if not target or abs(target['x']-ship) < 8 else 'ArrowLeft' if target['x'] < ship else 'ArrowRight')
                page.wait_for_timeout(80)
            else:
                raise RuntimeError('Partida não terminou no limite.')
            end('final')
            expect(page.locator('#xp-count')).to_have_text('700 XP')
            expect(page.locator('#download-game')).to_be_visible()
            action('vitoria-real', xp=page.locator('#xp-count').inner_text(), score=page.locator('#game-score').inner_text())
            start('exportacao')
            shot('vitoria')
            page.wait_for_timeout(3500)
            for button, filename in [('#download-python', 'meu-jogo.py'), ('#download-game', 'meu-jogo.html')]:
                with page.expect_download() as event:
                    page.locator(button).click()
                event.value.save_as(out / filename)
                data = (out / filename).read_bytes()
                action('download-real', filename=filename, bytes=len(data), sha256=digest(data))
                page.wait_for_timeout(2000)
            page.wait_for_timeout(2000)
            end('exportacao')
            meta['mainVideo'] = str(page.video.path())
            context.close()
            offline = browser.new_context(viewport=meta['viewport'], record_video_dir=str(out / 'raw-offline'),
                                          record_video_size=meta['viewport'], offline=True)
            op = offline.new_page()
            offline_origin = time.monotonic()
            requests = []
            op.on('request', lambda request: requests.append(request.url) if request.url.startswith(('http:', 'https:')) else None)
            op.goto((out / 'meu-jogo.html').as_uri(), wait_until='load')
            meta['clips']['offline'] = {'start': round(time.monotonic()-offline_origin,3)}
            op.wait_for_timeout(1500)
            op.locator('#play').click()
            ship = float(op.locator('#ship').get_attribute('data-x'))
            op.keyboard.down('ArrowRight')
            op.wait_for_timeout(500)
            op.keyboard.up('ArrowRight')
            assert float(op.locator('#ship').get_attribute('data-x')) > ship
            op.wait_for_timeout(5000)
            op.screenshot(path=str(out / 'offline-real.png'))
            meta['clips']['offline']['end'] = round(time.monotonic()-offline_origin,3)
            meta['offline'] = {'url': op.url, 'offline': True, 'externalRequests': requests}
            assert not requests
            meta['offlineVideo'] = str(op.video.path())
            offline.close()
            assert not meta['errors'], meta['errors']
            meta['completed'] = True
            meta['completedAt'] = dt.datetime.now(dt.timezone.utc).isoformat()
            save()
            print('CAPTURA CONCLUÍDA', flush=True)
        except Exception as error:
            meta['failure'] = str(error)
            save()
            raise
        finally:
            browser.close()


if __name__ == '__main__':
    main()
