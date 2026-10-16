from playwright.sync_api import sync_playwright
from pathlib import Path
import json,time,datetime
out=Path('.contexto/avaliacoes-ia-2026-10-16/acessibilidade')
def now():return datetime.datetime.now(datetime.timezone.utc).isoformat()
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 page=b.new_page(viewport={'width':1280,'height':900});page.set_default_timeout(2000)
 log={'agent':'avaliacao_ia_acessibilidade','type':'avaliação técnica por IA, não playtest humano','prior_knowledge':'Conhecimento avançado de Python, navegadores e acessibilidade; sem consulta a soluções/core/helpers antes ou durante sessão.','screen_reader_used':False,'start':now(),'actions':[],'errors':[]}
 page.on('pageerror',lambda err:log['errors'].append(str(err)))
 page.goto('https://luccalck.github.io/desafio-arcade/');page.wait_for_load_state('networkidle')
 log['url']=page.url
 log['initial_text']=page.locator('body').inner_text()
 start=time.monotonic()
 def act(name,fn):
  t=time.monotonic()
  try:r=fn();log['actions'].append({'at':now(),'elapsed_s':round(t-start,2),'action':name,'result':r})
  except Exception as e:log['actions'].append({'at':now(),'elapsed_s':round(t-start,2),'action':name,'error':str(e)[:500]})
 def shot(name):page.screenshot(path=str(out/('complementar-'+name+'.png')),full_page=True)
 def focus():return page.evaluate("({tag:document.activeElement.tagName,text:document.activeElement.innerText,outline:getComputedStyle(document.activeElement).outline,rect:document.activeElement.getBoundingClientRect().toJSON()})")
 act('Tab inicial → link de salto',lambda:(page.keyboard.press('Tab'),focus())[1])
 act('Enter link de salto',lambda:(page.keyboard.press('Enter'),focus())[1])
 act('Abrir Opções',lambda:page.get_by_role('button',name='Opções').click())
 act('Inspecionar opções',lambda:page.locator('body').inner_text())
 shot('01-opcoes')
 act('Escape opções',lambda:(page.keyboard.press('Escape'),page.locator('body').inner_text())[1])
 act('Voltar ao menu pela marca',lambda:page.get_by_role('button',name='Menu principal').click())
 act('Abrir missões',lambda:page.get_by_role('button',name='Missões',exact=False).click())
 act('Inspecionar missões',lambda:page.locator('body').inner_text());shot('02-missoes')
 act('Voltar ao menu pela marca',lambda:page.get_by_role('button',name='Menu principal').click())
 act('Iniciar oficina',lambda:page.get_by_role('button',name='Começar oficina').click())
 act('Inspecionar editor',lambda:page.locator('textarea').evaluate_all('(els)=>els.map(e=>({value:e.value,label:e.getAttribute("aria-label"),id:e.id}))'))
 act('Abrir ajuda',lambda:page.get_by_role('button',name='?',exact=True).click())
 act('Inspecionar ajuda',lambda:page.locator('body').inner_text());shot('03-ajuda')
 act('Escape ajuda',lambda:(page.keyboard.press('Escape'),page.locator('body').inner_text())[1])
 act('Testar regra inicial',lambda:page.get_by_role('button',name='Testar regra').click())
 act('Inspecionar erro de lógica',lambda:page.locator('body').inner_text());shot('04-feedback')
 initial=page.locator('textarea').input_value() if page.locator('textarea').count() else ''
 act('Inserir Python inválido',lambda:page.locator('textarea').fill('if :\n    mover_direita()'))
 act('Testar Python inválido',lambda:page.get_by_role('button',name='Testar regra').click())
 act('Inspecionar erro sintático e live region',lambda:{'text':page.locator('body').inner_text(),'live':page.locator('[aria-live]').evaluate_all('(els)=>els.map(e=>({live:e.getAttribute("aria-live"),text:e.innerText}))')});shot('05-erro-sintaxe')
 act('Restaurar rascunho inicial',lambda:page.locator('textarea').fill(initial))
 act('Editar comentário no código',lambda:page.locator('textarea').fill(initial+'\n# teste de persistencia'))
 act('Recarregar',lambda:(page.reload(),page.wait_for_load_state('networkidle')))
 act('Estado após recarregar',lambda:page.locator('body').inner_text())
 act('Continuar',lambda:page.get_by_role('button',name='Continuar').click())
 act('Checar rascunho persistido',lambda:page.locator('textarea').input_value())
 act('Aplicar zoom 200% CSS em viewport desktop (não zoom nativo)',lambda:page.evaluate("document.documentElement.style.zoom='2'"))
 act('Medir overflow zoom',lambda:page.evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,height:innerHeight})'));shot('06-zoom-200')
 act('Restaurar zoom',lambda:page.evaluate("document.documentElement.style.zoom='1'"))
 act('Reiniciar código',lambda:page.get_by_role('button',name='↶',exact=True).click())
 act('Estado reinício',lambda:{'body':page.locator('body').inner_text(),'dialogs':page.get_by_role('dialog').count()})
 # Varreduras interativas: focos reais com Tab/Shift+Tab, acionamento ajuda,
 # execução e pausa, deslocamento com teclas e inspeção de rolagem/foco.
 cycle=0
 while time.monotonic()-start<182:
  cycle+=1
  act(f'Ciclo {cycle}: retorno à oficina caso necessário',lambda: page.get_by_role('button',name='Continuar').click(timeout=500) if page.get_by_role('button',name='Continuar').is_visible() else None)
  for k in ['Tab','Tab','Shift+Tab','Tab','Tab','Tab','Tab','Tab']:
   act(f'Ciclo {cycle}: foco {k}',lambda k=k:(page.keyboard.press(k),focus())[1])
   page.wait_for_timeout(180)
  if cycle%3==0:
   act(f'Ciclo {cycle}: abrir ajuda',lambda:page.get_by_role('button',name='?',exact=True).click(timeout=1000))
   act(f'Ciclo {cycle}: fechar ajuda Escape',lambda:page.keyboard.press('Escape'))
  if cycle%3==1:
   act(f'Ciclo {cycle}: iniciar simulação',lambda:page.get_by_role('button',name='▶ Jogar',exact=True).click(timeout=1000))
   for key in ['ArrowLeft','ArrowRight','ArrowRight','ArrowLeft']:
    act(f'Ciclo {cycle}: controle {key}',lambda key=key:page.keyboard.press(key));page.wait_for_timeout(100)
   act(f'Ciclo {cycle}: pausar',lambda:page.get_by_role('button',name='Ⅱ',exact=True).click(timeout=1000))
  if cycle%3==2:
   act(f'Ciclo {cycle}: ver testes',lambda:page.get_by_role('button',name='Ver testes',exact=False).click(timeout=1000))
   act(f'Ciclo {cycle}: conteúdo/testes',lambda:page.locator('body').inner_text())
  if cycle%6==0:shot('ciclo-'+str(cycle))
 log['end']=now();log['duration_s']=round(time.monotonic()-start,3)
 log['final_text']=page.locator('body').inner_text();log['cycles']=cycle
 shot('07-final')
 (out/'sessao-complementar.json').write_text(json.dumps(log,ensure_ascii=False,indent=2),encoding='utf-8')
 b.close()
 print(json.dumps({'duration_s':log['duration_s'],'actions':len(log['actions']),'cycles':cycle,'errors':log['errors']},ensure_ascii=False))

