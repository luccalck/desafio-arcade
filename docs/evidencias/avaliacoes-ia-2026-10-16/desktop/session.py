import json,sys,time,datetime,pathlib,traceback
from playwright.sync_api import sync_playwright
out=pathlib.Path('.contexto/avaliacoes-ia-2026-10-16/desktop')
p=sync_playwright().start(); browser=p.chromium.launch(channel='chrome',headless=True); page=browser.new_page(viewport={'width':1440,'height':1000})
started=datetime.datetime.now(datetime.timezone.utc); t0=time.monotonic(); events=[]; errors=[]
page.on('pageerror', lambda e: errors.append(str(e)))
r=page.goto('https://luccalck.github.io/desafio-arcade/'); page.wait_for_load_state('networkidle')
def log(action):
 events.append({'utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'elapsed_seconds':round(time.monotonic()-t0,2),'action':action,'url':page.url})
def show(): print(page.locator('body').inner_text(), flush=True)
log('Abrir produção em contexto novo, desktop 1440x1000'); page.screenshot(path=str(out/'01-menu.png'),full_page=True); show()
for line in sys.stdin:
 try:
  exec(line.strip())
  print('READY',flush=True)
 except Exception as e: print(type(e).__name__+': '+str(e),flush=True)
