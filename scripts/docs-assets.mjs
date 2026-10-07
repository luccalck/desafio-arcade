import {readFile,mkdir,writeFile} from 'node:fs/promises';
const {levels}=JSON.parse(await readFile('src/content/levels.json','utf8'));
await mkdir('docs/images',{recursive:true});
const wrap=(body,width=760,height=460)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f4f0e6"/><g font-family="sans-serif" fill="#192b2b">${body}</g></svg>`;
const text=(x,y,value,size=16)=>`<text x="${x}" y="${y}" font-size="${size}">${value}</text>`;
for(const [i,l] of levels.entries()){
 let body=text(24,32,`0${i+1} — ${l.title}`,24)+text(24,60,`Conceito: ${l.concept} | orientação inicial: leste`,14);
 l.grid.forEach((row,y)=>[...row].forEach((cell,x)=>{
  const start=x===l.start.x&&y===l.start.y, goal=x===l.goal.x&&y===l.goal.y;
  const px=80+x*60,py=95+y*60;
  body+=`<rect x="${px}" y="${py}" width="54" height="54" rx="4" fill="${goal?'#f5c342':cell==='#'?'#192b2b':'#e1e7d6'}" stroke="#829283"/>`;
  if(start||goal)body+=text(px+15,py+33,start?'R→':'M',16);
  if(x===0)body+=text(53,py+32,String(y+1),13);
  if(y===0)body+=text(px+23,85,String(x+1),13);
 }));
 body+=text(425,120,'R → Robô / início',16)+text(425,155,'M  Módulo / destino',16)+text(425,190,'Escuro: parede',16)+text(425,225,'Claro: caminho livre',16)+text(425,275,`Limite: ${l.maxBlocks} blocos`,16)+text(425,310,`Limite: ${l.maxSteps} passos`,16)+text(24,430,'Coordenadas visuais começam em 1. O JSON usa índices a partir de 0.',12);
 await writeFile(`docs/images/mapa-${i+1}.svg`,wrap(body));
}
const box=(x,y,w,h,label)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fffdf7" stroke="#192b2b"/>${text(x+15,y+28,label,15)}`;
await writeFile('docs/images/wireframes.svg',wrap(text(20,30,'Wireframes de projeto — não são capturas de execução',19)+box(20,60,220,320,'MENU')+text(35,135,'Objetivo + instruções',13)+text(35,180,'Robô / conceito original',13)+text(35,230,'[Começar a jornada]',13)+text(35,285,'Três desafios',13)+text(35,345,'Versão / SHA',13)+box(260,60,230,320,'PARTIDA / HUD')+box(275,110,95,135,'Mapa')+box(380,110,95,135,'Editor')+text(275,280,'Feedback + direção + passos',12)+text(275,320,'[Executar] [Um passo]',12)+text(275,355,'Dica / reinício',12)+box(510,60,230,320,'FIM DA TENTATIVA')+text(525,135,'Mapa / posição final',13)+text(525,190,'Resultado + conceito',13)+text(525,240,'Registro da execução',13)+text(525,295,'[Editar] [Próxima fase]',13)+text(525,350,'[Menu] / [Reiniciar]',13)+text(20,430,'No celular, mapa e editor são empilhados. Todas as ações têm controles HTML.',12)));
const states=['Menu','Edição','Execução / passo','Fim da tentativa','Fase / campanha'];
let flow=text(20,30,'Fluxo do jogo',22);
states.forEach((s,i)=>{flow+=box(20+i*148,80,138,80,s);if(i<4)flow+=text(160+i*148,130,'→',18);});
flow+=text(20,225,'Falha → editar e tentar novamente. Sucesso → próximo desafio.',17)+text(20,265,'Reiniciar → estado inicial da fase. Menu → interromper execução.',17)+text(20,305,'Terceiro sucesso → fim da campanha → recomeçar ou menu.',17);
await writeFile('docs/images/fluxo.svg',wrap(flow,800,340));
await writeFile('docs/images/esteira.svg',wrap(text(20,30,'Esteira — arquitetura planejada e aceites de promoção',22)+box(20,60,220,70,'Branch → PR / revisão')+box(270,60,220,70,'CI: testes / segurança')+box(520,60,220,70,'Build único / GDD / hash')+text(244,105,'→',18)+text(494,105,'→',18)+box(20,180,220,70,'HML → regressão E2E')+box(270,180,220,70,'Aprovação em produção')+box(520,180,220,70,'Release → smoke / ponteiro')+text(244,225,'→',18)+text(494,225,'→',18)+box(20,300,220,70,'Rollback / sondas / Issues')+box(270,300,220,70,'Painel / DORA / melhoria')+box(520,300,220,70,'Triagem → pacote → AVA')+text(244,345,'→',18)+text(494,345,'→',18)+text(20,430,'Azul-verde: testar a pasta imutável, trocar estavel e reverter se o smoke falhar.',14)));
await writeFile('docs/images/concept.svg',wrap(text(25,35,'Arte original — oficina e robô de entrega',24)+`<rect x="110" y="90" width="250" height="220" rx="50" fill="#f5c342" stroke="#192b2b" stroke-width="8"/><path d="M235 90V62" stroke="#192b2b" stroke-width="8"/><circle cx="235" cy="55" r="12" fill="#bb3c1a"/><rect x="145" y="130" width="180" height="85" rx="25" fill="#192b2b"/><circle cx="190" cy="171" r="16" fill="#f4f0e6"/><circle cx="280" cy="171" r="16" fill="#f4f0e6"/><path d="M196 265h78" stroke="#192b2b" stroke-width="12" stroke-linecap="round"/>`+text(420,130,'Papel claro / bancada',18)+text(420,170,'Tinta escura / estrutura',18)+text(420,210,'Laranja / ação principal',18)+text(420,250,'Amarelo / robô e destino',18)+text(25,410,'Concepção vetorial assistida pelo Codex; não reutiliza personagens ou marcas.',13)));
console.log('Mapas, wireframes, fluxo, esteira e concept art SVG gerados.');
