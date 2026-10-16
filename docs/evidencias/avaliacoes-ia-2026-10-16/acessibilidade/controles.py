from playwright.sync_api import sync_playwright
from pathlib import Path
import json,datetime
out=Path('.contexto/avaliacoes-ia-2026-10-16/acessibilidade')
r={'at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True);page=b.new_page(viewport={'width':1280,'height':900});page.goto('https://luccalck.github.io/desafio-arcade/');page.wait_for_load_state('networkidle');page.get_by_role('button',name='Começar oficina').click()
 page.get_by_role('button',name='Entender esta missão').click();r['help']=page.locator('body').inner_text();r['help_focus']=page.evaluate('document.activeElement.outerHTML');page.screenshot(path=str(out/'ajuda-real.png'),full_page=True);page.keyboard.press('Escape');r['focus_after_escape']=page.evaluate('document.activeElement.outerHTML')
 page.get_by_role('button',name='Ver situações de teste').click();r['tests']=page.locator('body').inner_text();page.screenshot(path=str(out/'testes-reais.png'),full_page=True);page.keyboard.press('Escape')
 page.get_by_role('button',name='Restaurar código inicial').click();r['reset']=page.locator('body').inner_text();r['buttons_after_reset']=page.locator('button').all_text_contents();page.screenshot(path=str(out/'reinicio-real.png'),full_page=True)
 r['outline']=page.evaluate('({tag:document.activeElement.tagName,outline:getComputedStyle(document.activeElement).outline})');b.close()
(out/'controles-semanticos.json').write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(r,ensure_ascii=False))
