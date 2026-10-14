import {it,expect} from 'vitest';
import {calculateDora,collectPages} from '../../scripts/dora.mjs';
const repo='luccalck/desafio-arcade',from='2026-10-01T00:00:00Z',to='2026-10-15T00:00:00Z';
const sha='a'.repeat(40),run={id:10,head_sha:sha,event:'push',head_branch:'main',html_url:`https://github.com/${repo}/actions/runs/10`};
const job={id:20,name:'deploy-prd',conclusion:'success',completed_at:'2026-10-10T12:00:00Z',html_url:`https://github.com/${repo}/actions/runs/10/job/20`};
it('percorre paginação sem perder a segunda página',async()=>{
 const seen=[];const items=await collectPages(async page=>{seen.push(page);return page===1?Array.from({length:100},(_,id)=>({id})): [{id:100}];});
 expect(items).toHaveLength(101);expect(seen).toEqual([1,2]);
});
it('exclui CI/preview, vincula SHA e respeita janela e unidades',()=>{
 const result=calculateDora({repo,from,to,runs:[run,{...run,id:11,head_branch:'feature/teste'}],jobs:new Map([[10,[job]],[11,[job]]]),commits:new Map([[sha,'2026-10-09T12:00:00Z']]),issues:[],rollbacks:[]});
 expect(result.metrics.deploymentFrequency.value).toBeCloseTo(1/14);
 expect(result.metrics.leadTime.value).toBe(24);
 expect(result.metrics.changeFailureRate.value).toBe(0);
 expect(result.metrics.mttr.value).toBeNull();
});
it('não transforma ausência de produção ou incidente em zero',()=>{
 const result=calculateDora({repo,from,to,runs:[run],jobs:new Map([[10,[{...job,name:'ci'}]]]),commits:new Map(),issues:[],rollbacks:[]});
 for(const metric of Object.values(result.metrics))expect(metric.value).toBeNull();
});
it('correlaciona rollback ao SHA implantado e não conta Issue fora da janela',()=>{
 const result=calculateDora({repo,from,to,runs:[run],jobs:new Map([[10,[job]]]),commits:new Map([[sha,'2026-10-09T12:00:00Z']]),rollbacks:[{sha,at:'2026-10-11T00:00:00Z'}],issues:[{number:5,created_at:'2026-10-10T00:00:00Z',closed_at:'2026-10-10T00:30:00Z',pull_request:null,html_url:`https://github.com/${repo}/issues/5`},{number:6,created_at:'2026-09-30T00:00:00Z',closed_at:'2026-10-01T00:30:00Z'}]});
 expect(result.metrics.changeFailureRate.value).toBe(100);
 expect(result.metrics.mttr.value).toBe(30);
});
it('inclui promoção que ocorreu antes de falha no job de produção',()=>{
 const result=calculateDora({repo,from,to,runs:[run],jobs:new Map([[10,[{...job,conclusion:'failure'}]]]),commits:new Map([[sha,'2026-10-09T12:00:00Z']]),issues:[],promotions:[{sha,run:10,at:'2026-10-10T11:00:00Z',url:`https://github.com/${repo}/commit/abc`}],rollbacks:[{sha,at:'2026-10-10T12:00:00Z'}]});
 expect(result.metrics.deploymentFrequency.samples).toBe(1);
 expect(result.metrics.changeFailureRate.value).toBe(100);
});
