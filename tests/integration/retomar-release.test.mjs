import {it,expect} from 'vitest';
import {validateResumeSource} from '../../scripts/retomar-release.mjs';
const sha='a'.repeat(40),repo='squad/jogo',run='123',attempt='2',tag='v0.7.0';
const source={id:123,run_attempt:2,head_sha:sha,head_branch:tag,event:'push',path:'.github/workflows/esteira.yml',status:'completed',conclusion:'failure',head_repository:{full_name:repo}};
const jobs=['qualidade','seguranca','build','e2e','pacote-ci','ci','deploy-hml','deploy-prd','monitor-pos-producao'].map(name=>({name,status:'completed',conclusion:'success',run_id:123,run_attempt:2,head_sha:sha}));
const context=()=>({sha,repo,run,attempt,tag,source:structuredClone(source),jobs:structuredClone(jobs)});
it('aceita origem exata com gates verdes embora publicador original tenha falhado',()=>{expect(validateResumeSource(context())).toBe(true);});
it('recusa identidade inválida antes de usar API ou Git',()=>{
 for(const bad of [{run:'../123'},{attempt:'0'},{attempt:'2;comando'},{sha:'outro'},{tag:'v0.7.0;comando'},{repo:'../jogo'}])expect(()=>validateResumeSource({...context(),...bad})).toThrow(/inválida/);
});
it('recusa outra tentativa, SHA, repositório, evento, workflow, tag ou execução incompleta',()=>{
 for(const bad of [{id:124},{run_attempt:1},{head_sha:'b'.repeat(40)},{head_branch:'main'},{event:'pull_request'},{path:'.github/workflows/outro.yml'},{status:'in_progress'},{conclusion:'cancelled'},{head_repository:{full_name:'outro/jogo'}}])expect(()=>validateResumeSource({...context(),source:{...source,...bad}})).toThrow(/Origem/);
});
it('recusa cada gate ausente, skipped, falho, duplicado ou de outra tentativa/SHA',()=>{
 for(let i=0;i<jobs.length;i++){
  const absent=context();absent.jobs.splice(i,1);expect(()=>validateResumeSource(absent)).toThrow(/Gate/);
  const repeated=context();repeated.jobs.push({...jobs[i]});expect(()=>validateResumeSource(repeated)).toThrow(/Gate/);
  for(const bad of [{conclusion:'failure'},{conclusion:'skipped'},{status:'queued'},{run_id:124},{run_attempt:1},{head_sha:'b'.repeat(40)}]){const c=context();Object.assign(c.jobs[i],bad);expect(()=>validateResumeSource(c)).toThrow(/Gate/);}
 }
});
