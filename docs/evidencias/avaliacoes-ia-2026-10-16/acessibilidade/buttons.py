from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(headless=True);page=b.new_page();page.goto('https://luccalck.github.io/desafio-arcade/');page.wait_for_load_state('networkidle');page.get_by_role('button',name='Começar oficina').click();print(page.locator('button').evaluate_all('(els)=>els.map(e=>({text:e.innerText,aria:e.getAttribute("aria-label")}))'));page.keyboard.press('Escape');print('DIALOGS',page.locator('[role="dialog"],dialog').evaluate_all('(els)=>els.map(e=>({tag:e.tagName,text:e.innerText,open:e.open}))'));b.close()

