import {readFile,mkdir,writeFile} from 'node:fs/promises';
const {missions}=JSON.parse(await readFile('src/content/missions.json','utf8'));
await mkdir('docs/images',{recursive:true});
const wrap=(body,w=800,h=470)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#080f1a"/><g font-family="Arial,sans-serif" fill="#edf6ff">${body}</g></svg>`;
const text=(x,y,value,size=16)=>`<text x="${x}" y="${y}" font-size="${size}">${String(value).replaceAll('&','&amp;').replaceAll('<','&lt;')}</text>`;
const box=(x,y,w,h,label,detail='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#122a3a" stroke="#64e8e4"/>${text(x+13,y+27,label,15)}${detail?text(x+13,y+52,detail,12):''}`;
const arrow=(x,y)=>text(x,y,'→',23);
const names={source:'ENTRADA',sink:'ENVIO',relay:'PONTE',add:'SOMA',multiply:'MULTIPLICA',filter:'SENSOR',buffer:'BUFFER'};
for(const [i,m] of missions.entries()){
 const layout=m.solutions[0];
 let b=text(24,32,`${i===5?'FINAL':`0${i+1}`} - ${m.title}`,24)+text(24,59,'Mapa de projeto / montagem editorial válida; não é captura de execução.',13);
 const xy=n=>[90+n.x*103,112+n.y*57];
 for(let y=0;y<5;y++)for(let x=0;x<7;x++){
  const blocked=m.blocked.some(p=>p.x===x&&p.y===y);
  b+=`<rect x="${54+x*103}" y="${91+y*57}" width="72" height="42" rx="6" fill="${blocked?'#573535':'#102332'}" stroke="#24485b"/>`;
  if(blocked)b+=text(76+x*103,118+y*57,'×',22);
 }
 for(const e of layout.edges){
  const a=layout.nodes.find(n=>n.id===e.from),z=layout.nodes.find(n=>n.id===e.to);
  const [x,y]=xy(a),[u,v]=xy(z);
  const choices=[[[a.x,a.y],[z.x,a.y],[z.x,z.y]],[[a.x,a.y],[a.x,z.y],[z.x,z.y]]];
  const route=choices.find(p=>!m.blocked.some(o=>p.slice(1).some((q,j)=>{const r=p[j];return r[0]===q[0]?o.x===r[0]&&o.y>=Math.min(r[1],q[1])&&o.y<=Math.max(r[1],q[1]):o.y===r[1]&&o.x>=Math.min(r[0],q[0])&&o.x<=Math.max(r[0],q[0]);})))||choices[0];
  b+=`<polyline points="${route.map(([cx,cy])=>`${90+cx*103},${112+cy*57}`).join(' ')}" fill="none" stroke="${e.port==='no'?'#ed947b':'#64e8e4'}" stroke-width="3"/>`;
  b+=text((x+u)/2+3,(y+v)/2-6,e.port==='yes'?'SIM':e.port==='no'?'NÃO':'→',11);
 }
 for(const n of layout.nodes){
  const [x,y]=xy(n);const label=n.id==='reject'?'REVISÃO':names[n.kind];
  b+=`<rect x="${x-36}" y="${y-21}" width="72" height="42" rx="6" fill="${n.kind==='source'?'#514617':'#163344'}" stroke="#f9d65c"/>`+text(x-31,y-3,label,10);
  b+=text(x-30,y+13,n.kind==='add'?`+${n.config.value}`:n.kind==='multiply'?`×${n.config.value}`:n.kind==='filter'?'sim / não':n.kind==='buffer'?'guarda lote':n.kind==='relay'?'retransmite':n.id,10);
 }
 b+=text(24,383,m.goal,15)+text(24,411,`${m.cases.length} lote(s) público(s) | orçamento ${m.budget} peças | alcance ${m.maxSpan} casas | ${m.reward} XP`,13);
 b+=text(24,442,'Posições: grade 7 × 5; cruzamento de cabos não cria junção. Configurações no JSON.',12);
 await writeFile(`docs/images/mapa-${i+1}.svg`,wrap(b));
}
await writeFile('docs/images/wireframes.svg',wrap(text(22,32,'Wireframes de projeto - não são capturas de execução',20)+box(20,66,240,270,'MENU / CAMPANHA')+text(33,139,'Novo / Continuar / Missões',14)+text(33,186,'Opções / versão / XP',14)+text(33,233,'Cinco setores e núcleo final',14)+box(280,66,240,270,'BANCADA / HUD')+text(293,139,'Uma frase de objetivo',14)+text(293,186,'Dados / encaixes / cabos',14)+text(293,233,'Bandeja ou seleção contextual',14)+text(293,286,'Ligar / pausa / ajuda / log',14)+box(540,66,240,270,'RESULTADO')+text(553,139,'Lotes resolvidos / medalha',14)+text(553,186,'Eficiência opcional / XP',14)+text(553,233,'Repetir / próximo / missões',14)+text(22,399,'Celular: bancada e controles empilhados; configuração, ajuda e registros sob demanda.',12)));
await writeFile('docs/images/fluxo.svg',wrap(text(24,33,'Estados e navegação - tentativa livre',23)+box(25,70,170,70,'Menu / campanha')+arrow(203,115)+box(240,70,245,70,'Montar / configurar')+arrow(495,115)+box(530,70,245,70,'Ligar / dados em movimento')+box(25,205,170,80,'Final / 700 XP','Após os seis setores')+text(205,253,'←',23)+box(240,205,245,80,'Vitória / próximo','Todos os lotes corretos')+text(496,253,'←',23)+box(530,205,245,80,'Observar / corrigir','Falha preserva montagem')+text(643,177,'↓',23)+text(24,355,'Erro → editar → ligar novamente. Ajuda, configuração e log são opcionais.',15)+text(24,405,'Pausa conserva execução; sair interrompe; reset confirmado altera só a nova campanha.',13)));
await writeFile('docs/images/esteira.svg',wrap(text(24,32,'Esteira - CI implementada; implantação e medições pendentes',20)+box(25,65,230,65,'Branch → PR / outra pessoa')+arrow(259,108)+box(300,65,210,65,'CI / segurança / testes')+arrow(514,108)+box(555,65,220,65,'Build / PDF / ZIP / hash')+box(25,180,230,65,'Smoke / promoção PRD')+text(263,222,'←',23)+box(300,180,210,65,'Aprovação producao')+text(516,222,'←',23)+box(555,180,220,65,'HML / regressão E2E')+text(650,160,'↓',23)+box(25,295,230,65,'Rollback / sondas / Issues')+arrow(259,338)+box(300,295,210,65,'Painel / DORA / melhoria')+arrow(514,338)+box(555,295,220,65,'Triagem / pacote / AVA')+text(130,274,'↓',23)+text(24,404,'Planejado: mesmo artefato de HML a PRD; azul-verde em pasta imutável; recuperação medida.',12)));
await writeFile('docs/images/concept.svg',wrap(text(24,34,'Arte original - bancada visual e mascote RDC',23)+`<circle cx="220" cy="220" r="130" fill="#102332" stroke="#64e8e4"/><rect x="143" y="150" width="155" height="140" rx="32" fill="#f9d65c" stroke="#edf6ff" stroke-width="5"/><path d="M220 150v-28" stroke="#edf6ff" stroke-width="7"/><circle cx="220" cy="112" r="10" fill="#ec6a40"/><rect x="163" y="174" width="115" height="56" rx="18" fill="#080f1a"/><circle cx="194" cy="198" r="10" fill="#edf6ff"/><circle cx="250" cy="198" r="10" fill="#edf6ff"/><path d="M196 258h47" stroke="#edf6ff" stroke-width="8" stroke-linecap="round"/>`+text(400,143,'Azul escuro: bancada',18)+text(400,187,'Ciano: dados / conexões',18)+text(400,231,'Amarelo: ação / conquista',18)+text(400,275,'Robô: operador / guia',18)+text(24,402,'SVG/CSS originais assistidos por Codex; fontes locais do sistema; ausência de áudio.',13)));
console.log('Seis mapas da bancada, fluxo, wireframes, esteira e concept gerados.');
