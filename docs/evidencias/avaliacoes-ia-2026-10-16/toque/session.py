import json,time,pathlib,traceback,datetime
from playwright.sync_api import sync_playwright
root=pathlib.Path('.contexto/avaliacoes-ia-2026-10-16/toque'); log=[]
def stamp(): return datetime.datetime.now(datetime.timezone.utc).isoformat()
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True); c=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True); page=c.new_page(); errors=[]; page.on('pageerror',lambda e:errors.append(str(e)))
 start=time.monotonic(); started=stamp(); page.goto('https://luccalck.github.io/desafio-arcade/'); page.wait_for_load_state('networkidle')
 log.append({'at':stamp(),'action':'navigate','url':page.url})
 def state(name):
  page.screenshot(path=str(root/(name+'.png')),full_page=True)
  (root/'state.json').write_text(json.dumps({'url':page.url,'text':page.locator('body').inner_text(),'buttons':page.get_by_role('button').all_text_contents(),'textareas':page.locator('textarea').count(),'overflow':page.evaluate('document.documentElement.scrollWidth>innerWidth'),'elapsed':time.monotonic()-start},ensure_ascii=False,indent=2),encoding='utf8')
 state('01-menu'); print('READY',flush=True)
 while True:
  req=root/'request.json'
  if not req.exists(): time.sleep(.25); continue
  task=json.loads(req.read_text(encoding='utf8')); req.unlink(); action=task['action']; result={'at':stamp(),'action':task}
  try:
   if action=='tap': page.locator('button').filter(has_text=task['name']).first.tap(timeout=3000)
   elif action=='text': page.locator('textarea').fill(task['value'])
   elif action=='inspect': pass
   elif action=='check': page.get_by_label(task['name'],exact=True).check()
   elif action=='scroll': page.evaluate('window.scrollBy(0, '+str(task['y'])+')')
   elif action=='finish':
    result['elapsed']=time.monotonic()-start; log.append(result); break
   page.wait_for_timeout(350); state(task['shot']); result['ok']=True
  except Exception as e: result['error']=str(e)
  log.append(result); (root/'response.json').write_text(json.dumps(result,ensure_ascii=False),encoding='utf8'); print('DONE',flush=True)
 (root/'session.json').write_text(json.dumps({'agent':'IA com conhecimento prévio de programação; não humano ou estudante','started':started,'ended':stamp(),'durationSeconds':time.monotonic()-start,'viewport':{'width':390,'height':844},'hasTouch':True,'actions':log,'pageErrors':errors},ensure_ascii=False,indent=2),encoding='utf8'); b.close()
