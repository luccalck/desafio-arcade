from playwright.sync_api import sync_playwright
from pathlib import Path
import json
out=Path('.contexto/avaliacoes-ia-2026-10-16/acessibilidade')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True);page=b.new_page();page.goto('https://luccalck.github.io/desafio-arcade/');page.wait_for_load_state('networkidle');page.get_by_role('button',name='Começar oficina').click();before=page.locator('textarea').input_value();page.locator('textarea').fill(before+'\n# teste de persistencia');page.locator('textarea').blur();page.reload();page.wait_for_load_state('networkidle');disabled=page.get_by_role('button',name='Continuar').is_disabled();page.get_by_role('button',name='Começar oficina').click();after=page.locator('textarea').input_value();r={'continue_disabled_after_reload':disabled,'draft_before_reload':before+'\n# teste de persistencia','draft_after_reload':after,'persisted':after==before+'\n# teste de persistencia'};page.screenshot(path=str(out/'persistencia-reproducao.png'),full_page=True);b.close()
(out/'persistencia-reproducao.json').write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(r,ensure_ascii=False))
