import {it,expect} from 'vitest';
import {parseCsv,summarize,readDora,loadStatus} from '../../pages/status/status.mjs';
const now=Date.parse('2026-10-14T04:00:00Z'),sha='a'.repeat(40),header='data,alvo,codigo,tempo,versao\n';
const csv=header+'2026-10-14T03:50:00Z,producao,200,0.2,0.6.0\n2026-10-14T03:55:00Z,producao,500,0.8,desconhecida\n';
const pointer={schema:1,strategy:'azul-verde',estavel:sha,anterior:null,canario:null,percentual:0,retiradas:[]};
const latest={schema:1,formalPrd:true,samples:[{data:'2026-10-14T03:55:00Z',alvo:'producao',codigo:500,tempo:0.8,versao:'desconhecida',sha:null,erro:'http'}]};
it('CSV vazio/malformado não vira uptime100/latência0; normaliza valores desconhecidos',()=>{
 expect(summarize({csv:header,now}).availability).toBeNull();
 for(const bad of ['', 'outro\n',header+'inválido,producao,200,1,0.6.0',header+'2026-10-14T03:50:00Z,producao,999,-1,0.6.0'])expect(()=>parseCsv(bad,now)).toThrow();
 const r=summarize({csv:header+'2026-10-14T03:50:00Z,producao,desconhecido,desconhecido,desconhecida\n',now});expect(r.unknown).toBe(1);expect(r.availability).toBeNull();expect(r.latency).toBeNull();
});
it('disponibilidade/latência usam amostras reais da janela e evidenciam falhas/atraso',()=>{
 const r=summarize({csv,latest,rollout:pointer,now});expect(r.availability).toBe(50);expect(r.latency).toBe(0.5);expect(r.count).toBe(2);expect(r.version).toBeNull();expect(r.stale).toBe(false);
 expect(summarize({csv,now:now+3600000}).stale).toBe(true);expect(summarize({csv,now:now+86400000}).availability).toBeNull();
});
it('versão/rollout só aparecem como produção com coleta formal fresca e SHA correspondente',()=>{
 const source=header+'2026-10-14T03:55:00Z,producao,200,0.2,0.6.0\n',ok={...latest,samples:[{...latest.samples[0],codigo:200,tempo:0.2,versao:'0.6.0',sha,erro:null}]};
 expect(summarize({csv:source,latest:ok,rollout:pointer,now}).version).toBe('0.6.0');
 for(const changed of [{...ok,formalPrd:false},{...ok,samples:[{...ok.samples[0],sha:'b'.repeat(40)}]}])expect(summarize({csv:source,latest:changed,rollout:pointer,now}).version).toBeNull();
 expect(summarize({csv:source,latest:ok,rollout:{activeSha:sha},now}).strategy).toContain('Prévia');
});
it('DORA ausente ou sem amostras/origem é indisponível; zero exige evidência',()=>{
 expect(readDora(null,now).every(m=>m.value===null)).toBe(true);
 const d={schema:1,generatedAt:'2026-10-14T03:55:00Z',period:{from:'2026-10-13T04:00:00Z',to:'2026-10-14T04:00:00Z'},metrics:{deploymentFrequency:{value:0,unit:'deploys/dia',samples:1,source:'https://github.com/fixture/arcade/actions'}}};
 expect(readDora(d,now)[0].value).toBe(0);expect(readDora({...d,metrics:{deploymentFrequency:{...d.metrics.deploymentFrequency,samples:0}}},now)[0].value).toBeNull();expect(readDora(d,now+86400000)[0].value).toBeNull();
});
it('leitura fixa dados no commit da branch, sem token, e falhas HTTP não viram métricas',async()=>{
 const urls=[],fetcher=async url=>{urls.push(String(url));if(String(url).includes('/git/ref/'))return {ok:true,json:async()=>({object:{sha}})};return {ok:false,status:404};};
 const r=await loadStatus({repository:'fixture/arcade',fetcher,now,rolloutUrl:'https://example.test/rollout.json'});expect(r.availability).toBeNull();expect(r.errors.length).toBeGreaterThan(0);expect(urls.some(u=>u.includes(`/fixture/arcade/${sha}/status/sondas.csv`))).toBe(true);
});
