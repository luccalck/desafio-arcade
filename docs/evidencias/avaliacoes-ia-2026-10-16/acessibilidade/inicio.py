from playwright.sync_api import sync_playwright
import json
from pathlib import Path
out=Path('.contexto/avaliacoes-ia-2026-10-16/acessibilidade')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 page=b.new_page(viewport={'width':1280,'height':900})
 page.goto('https://luccalck.github.io/desafio-arcade/')
 page.wait_for_load_state('networkidle')
 page.get_by_role('button',name='Começar oficina').click(); page.screenshot(path=str(out/'inicio.png'),full_page=True)
 print(page.locator('body').inner_text())
 print('BUTTONS',page.locator('button').all_text_contents())
 print('LINKS',page.locator('a').all_text_contents())
 b.close()

