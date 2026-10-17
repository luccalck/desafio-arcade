"""Edite somente gravações reais, com cortes explícitos e cartelas editoriais."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFont

BG = '#07111e'
INK = '#edf6ff'
MUTED = '#9bb2c7'
CYAN = '#5ce2e2'
YELLOW = '#ffdc59'
REGULAR = 'C:/Windows/Fonts/segoeui.ttf'
BOLD = 'C:/Windows/Fonts/segoeuib.ttf'


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REGULAR, size)


def text(draw, xy, value, size, fill=INK, bold=False, anchor=None):
    draw.text(xy, value, font=font(size, bold), fill=fill, anchor=anchor,
              spacing=12, stroke_width=0)


def timestamp(value):
    ms = round(value * 1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'


def run(args):
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def card(path, outro=False):
    im = Image.new('RGB', (1920, 1080), BG)
    d = ImageDraw.Draw(im)
    for radius in (260, 380, 510):
        d.ellipse((1500-radius, 520-radius, 1500+radius, 520+radius), outline='#173146', width=2)
    d.rounded_rectangle((120, 100, 690, 158), radius=20, fill='#112c3c')
    text(d, (145, 111), 'DESAFIO ARCADE  /  AURA 67', 27, CYAN, True)
    if outro:
        text(d, (120, 225), 'DO PRIMEIRO if', 97, INK, True)
        text(d, (120, 345), 'AO SEU MINIJOGO.', 97, YELLOW, True)
        text(d, (125, 508), 'Experimente. Teste. Construa.', 43)
        text(d, (125, 590), 'Python iniciante · 5 missões + projeto final', 31, MUTED)
        text(d, (125, 675), 'Lucca Castilho · Davi Paes', 30, INK, True)
        text(d, (125, 720), 'Miguel Oliveira · Lucas Souza', 30, INK, True)
        text(d, (125, 820), 'luccalck.github.io/desafio-arcade', 34, CYAN)
    else:
        text(d, (120, 230), 'ROTA', 148, INK, True)
        text(d, (120, 390), 'DO CÓDIGO', 148, YELLOW, True)
        text(d, (125, 615), 'Aprenda Python criando seu minijogo.', 45)
        text(d, (125, 706), 'WEB  /  PRÁTICA  /  EXPORTAÇÃO OFFLINE', 29, CYAN, True)
    d.rectangle((120, 960, 1800, 962), fill='#244054')
    text(d, (125, 985), 'Produção v0.7.0 · e9dd28c  |  Captura automatizada real · edição com cortes', 24, MUTED)
    im.save(path)


def frame(path, title, caption, offline=False):
    im = Image.new('RGBA', (1920, 1080), BG)
    d = ImageDraw.Draw(im)
    d.rectangle((160, 70, 1759, 969), fill=(0, 0, 0, 0))
    d.rectangle((160, 69, 1760, 70), fill=CYAN)
    d.rectangle((160, 970, 1760, 971), fill='#244054')
    text(d, (160, 19), title.upper(), 28, CYAN, True)
    text(d, (1760, 23), 'ROTA DO CÓDIGO / AURA 67', 23, MUTED, anchor='ra')
    lines = caption.split('\n')
    for i, line in enumerate(lines):
        text(d, (960, 979+i*34), line, 30, INK, anchor='ma')
    label = 'HTML EXPORTADO · REDE DESATIVADA' if offline else 'PRODUÇÃO v0.7.0 · e9dd28c'
    text(d, (160, 1057), label, 17, MUTED)
    text(d, (1760, 1057), 'CAPTURA AUTOMATIZADA · EDIÇÃO COM CORTES', 17, MUTED, anchor='ra')
    im.save(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--capture', required=True)
    parser.add_argument('--output', default='docs/pitch')
    args = parser.parse_args()
    capture = Path(args.capture).resolve()
    meta = json.loads((capture/'captura.json').read_text(encoding='utf-8'))
    assert meta['completed'] and not meta['errors']
    out = Path(args.output).resolve()
    out.mkdir(parents=True, exist_ok=True)
    temp = capture/'edicao'
    temp.mkdir(exist_ok=True)
    sections = [
        ('intro', 5, 'Sua primeira oficina de jogos.', None),
        ('menu', 6, 'Cinco missões e um desafio final,\npara quem está começando a programar.', '01 / Aprender construindo'),
        ('falha', 9.2, 'Teste sua hipótese e observe o resultado.\nAqui, os controles estão invertidos.', '02 / O problema aparece no jogo'),
        ('correcao', 10.4, 'Edite decisões com if e return.\nA nova regra muda o movimento da nave.', '03 / Seu código tem efeito real'),
        ('missao-2', 3.4, 'Calcule o movimento da nave.', '04 / Movimento e operações'),
        ('missao-3', 3.4, 'Compare distâncias para detectar colisões.', '05 / Comparações e lógica'),
        ('missao-4', 3.4, 'Crie a regra de pontuação.', '06 / Condições e estado'),
        ('missao-5', 3.4, 'Use repetições para montar uma onda.', '07 / Laços e listas'),
        ('final', 11.8, 'Combine as cinco funções no projeto final.\nO código é usado na partida de verdade.', '08 / Testar, integrar e jogar'),
        ('exportacao', 8, 'Conclua o desafio e exporte suas funções .py\njunto com um HTML jogável.', '09 / Leve o que você construiu'),
        ('offline', 6.6, 'Abra o HTML exportado sem conexão.\nSeu minijogo continua funcionando.', '10 / Prática que continua offline'),
        ('outro', 9.4, 'Experimente. Teste. Construa.\nRota do Código — squad Aura 67.', None),
    ]
    timeline = []
    elapsed = 0.0
    parts = []
    for index, (name, requested, caption, title) in enumerate(sections):
        target = temp/f'{index:02}-{name}.mp4'
        overlay = temp/f'{index:02}-{name}.png'
        static = name in ('intro', 'outro')
        duration = requested
        source_start = None
        if static:
            card(overlay, name == 'outro')
            inputs = ['-loop', '1', '-framerate', '25', '-i', str(overlay)]
            filt = ['-vf', 'format=yuv420p']
        else:
            clip = meta['clips'][name]
            available = clip['end']-clip['start']
            duration = min(requested, available-0.12)
            duration = int(duration*25)/25
            assert duration > 1
            # O final usa os últimos segundos reais da partida; não acelera o motor.
            source_start = clip['end']-duration-0.06 if name == 'final' else clip['start']+0.04
            source = meta['offlineVideo'] if name == 'offline' else meta['mainVideo']
            frame(overlay, title, caption, name == 'offline')
            inputs = ['-ss', str(source_start), '-i', source, '-loop', '1', '-framerate', '25', '-i', str(overlay)]
            filt = ['-filter_complex', '[0:v]setpts=PTS-STARTPTS,fps=25,pad=1920:1080:160:70:color=0x07111e[game];[game][1:v]overlay=0:0:format=auto,format=yuv420p[v]', '-map', '[v]']
        command = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', *inputs, *filt,
                   '-t', str(duration), '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '20',
                   '-threads', '4', '-r', '25', '-pix_fmt', 'yuv420p', '-video_track_timescale', '12800',
                   '-movflags', '+faststart', str(target)]
        print(f'Editando {name}: {duration:.2f}s', flush=True)
        run(command)
        timeline.append({'section':name, 'start':round(elapsed,3), 'end':round(elapsed+duration,3),
                         'sourceStart':source_start, 'duration':duration, 'caption':caption,
                         'source':'cartela editorial' if static else 'arquivo offline capturado' if name == 'offline' else 'produção capturada'})
        elapsed += duration
        parts.append(target)
    assert elapsed <= 90
    listing = temp/'concat.txt'
    listing.write_bytes(''.join(f"file '{p.as_posix()}'\n" for p in parts).encode())
    video = out/'pitch.mp4'
    run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-f', 'concat', '-safe', '0',
         '-i', str(listing), '-c', 'copy', '-an', '-movflags', '+faststart',
         '-metadata', 'title=Rota do Código — Desafio Arcade',
         '-metadata', 'comment=Gameplay real de produção v0.7.0/e9dd28c; captura automatizada e cortes editoriais; sem narração ou música.', str(video)])
    srt = '\n\n'.join(f"{i+1}\n{timestamp(item['start'])} --> {timestamp(item['end'])}\n{item['caption']}" for i,item in enumerate(timeline))+'\n'
    (out/'pitch-legendas.srt').write_bytes(srt.encode())
    report = {'schema':1, 'productionSha':meta['productionSha'], 'siteUrl':meta['siteUrl'],
              'captureUrl':meta['captureUrl'], 'captureStartedAt':meta['startedAt'],
              'zipSha256':meta['zipSha256'], 'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),
              'bytes':video.stat().st_size, 'durationPlanned':round(elapsed,3), 'timeline':timeline,
              'narration':False, 'music':False, 'humanFacesOrVoices':False,
              'humanPlaytest':False, 'captions':'incorporadas nas faixas editoriais; SRT adicional',
              'captureExecutor':'IA/Playwright', 'requester':'Lucca Castilho Costa',
              'scope':'Pitch da produção v0.7.0 filmada; validação acadêmica final pela entrada-video ainda não executada.'}
    (out/'pitch-producao.json').write_bytes(json.dumps(report,ensure_ascii=False,indent=2).encode())
    print(json.dumps({'duration':round(elapsed,3),'bytes':report['bytes'],'sha256':report['sha256']},ensure_ascii=True),flush=True)


if __name__ == '__main__':
    main()
