import {it,expect} from 'vitest';
import {makeHmlReceipt,verifyApproval,planProduction,ensurePipeline,verifyRecoveredRelease,verifyFinalSmoke} from '../../scripts/promover.mjs';
import {bundle,options,oldSha,newSha,site,tree,pointer,releases,version} from '../fixtures/pacote.mjs';
const environment={id:7,name:'producao',can_admins_bypass:false,protection_rules:[{type:'required_reviewers',reviewers:[{type:'User',reviewer:{login:'revisor-fixture'}}]}]};
const approvals=[{state:'approved',user:{login:'revisor-fixture',type:'User'},environments:[{id:7,name:'producao'}]}];
const fetcher=async url=>({ok:true,arrayBuffer:async()=>site(newSha)[new URL(url).pathname.split('/').at(-1)]});
const receipt=()=>makeHmlReceipt(bundle(),{...options,fetcher});
const approved=async()=>({...options,bundle:bundle(),receipt:await receipt(),environment,approvals,existing:tree()});
const smoke={passed:true,errors:[],mode:'release',url:options.siteUrl+`releases/${newSha}/`,expectedSha:newSha,version:version(newSha),run:'123',runAttempt:'1'};
it('HML confere os sete arquivos servidos contra o ZIP aceito, sem recompilar',async()=>{
 const r=await receipt();expect(Object.keys(r.files)).toHaveLength(7);expect(r.sha).toBe(newSha);
 await expect(makeHmlReceipt(bundle(),{...options,fetcher:async()=>({ok:true,arrayBuffer:async()=>new Uint8Array([1])})})).rejects.toThrow(/HML/);
});
it('aprovação de PR, próprio ator, bypass ou environment errado não autorizam produção',()=>{
 expect(verifyApproval(environment,approvals,options.actor).reviewer).toBe('revisor-fixture');
 for(const [e,h] of [[environment,[]],[{...environment,can_admins_bypass:true},approvals],[environment,[{...approvals[0],user:{login:options.actor,type:'User'}}]],[environment,[{...approvals[0],environments:[{id:8,name:'outro'}]}]]])expect(()=>verifyApproval(e,h,options.actor)).toThrow(/aprovação|proteção/);
});
it('prepara candidata com a mesma HML e conserva estável/arquivos existentes',async()=>{
 const p=await approved(),result=planProduction('abrir',p);expect(result.plan.rollout.estavel).toBe(oldSha);expect(result.plan.rollout.canario).toBe(newSha);expect(result.transaction.zipSha256).toBe(p.receipt.zipSha256);expect(result.plan.files['hml/preservar.txt']).toEqual(p.existing['hml/preservar.txt']);
 for(const change of [{sha:oldSha},{run:'999'},{runAttempt:'2'},{zipSha256:'0'.repeat(64)},{siteUrl:'https://outro.test/'}])expect(()=>planProduction('abrir',{...p,receipt:{...p.receipt,...change}})).toThrow(/HML/);
});
it('promoção exige smoke da candidata e predecessor vigente; não aceita evidência antiga',async()=>{
 const opened=planProduction('abrir',await approved()),params={...options,transaction:opened.transaction,existing:opened.plan.files,smoke};
 expect(planProduction('promover',params).plan.rollout.estavel).toBe(newSha);
 expect(()=>planProduction('promover',{...params,smoke:{...smoke,passed:false}})).toThrow(/smoke/);
 const changed={...params.existing,...releases('c'.repeat(40)),'rollout.json':new TextEncoder().encode(JSON.stringify(pointer('c'.repeat(40),null,newSha)))};expect(()=>planProduction('promover',{...params,existing:changed})).toThrow(/predecessor/);
});
it('smoke de candidata falhando retira candidata sem rebaixar a estável',async()=>{
 const opened=planProduction('abrir',await approved()),r=planProduction('recuperar',{...options,transaction:opened.transaction,existing:opened.plan.files});expect(r.action).toBe('abortar');expect(r.plan.rollout.estavel).toBe(oldSha);expect(r.plan.rollout.retiradas).toContain(newSha);
});
it('falha após virada restaura anterior e retira defeituosa; não mexe em implantação alheia',async()=>{
 const opened=planProduction('abrir',await approved()),promoted=planProduction('promover',{...options,transaction:opened.transaction,existing:opened.plan.files,smoke});
 const r=planProduction('recuperar',{...options,transaction:opened.transaction,existing:promoted.plan.files});expect(r.action).toBe('rollback');expect(r.sha).toBe(oldSha);expect(r.plan.rollout.estavel).toBe(oldSha);expect(r.plan.rollout.retiradas).toContain(newSha);
 expect(()=>planProduction('recuperar',{...options,transaction:opened.transaction,existing:tree(pointer('c'.repeat(40)))})).toThrow(/predecessor/);
});
it('recuperação recusa baseline alterada mesmo quando o ponteiro parece correto',async()=>{
 const opened=planProduction('abrir',await approved()),corrupted={...opened.plan.files};
 corrupted[`releases/${oldSha}/game.js`]=new TextEncoder().encode('bytes alterados');
 expect(()=>planProduction('recuperar',{...options,transaction:opened.transaction,existing:corrupted})).toThrow(/baseline.*game\.js/i);
});
it('confirma os sete bytes da versão recuperada por HTTP, incluindo falha parcial',async()=>{
 const opened=planProduction('abrir',await approved()),tx=opened.transaction;
 const good=async url=>({ok:true,arrayBuffer:async()=>site(oldSha)[new URL(url).pathname.split('/').at(-1)]});
 const verified=await verifyRecoveredRelease(tx,{fetcher:good});
 expect(Object.keys(verified)).toHaveLength(7);
 expect(verified['game.js']).toBe(tx.baselineFilesSha256['game.js']);
 await expect(verifyRecoveredRelease(tx,{fetcher:async url=>({ok:true,arrayBuffer:async()=>new URL(url).pathname.endsWith('/game.js')?new Uint8Array([1]):site(oldSha)[new URL(url).pathname.split('/').at(-1)]})})).rejects.toThrow(/game\.js/);
});
it('smoke de recuperação falho ou de outra versão não gera aceite',async()=>{
 const tx=planProduction('abrir',await approved()).transaction;
 const root={date:new Date().toISOString(),passed:true,mode:'root',expectedSha:oldSha,version:version(oldSha),url:options.siteUrl,run:options.run,runAttempt:options.runAttempt,errors:[]};
 expect(()=>verifyFinalSmoke(tx,options,root,{recovered:true})).not.toThrow();
 for(const bad of [{...root,passed:false},{...root,errors:['HTTP 503']},{...root,expectedSha:newSha},{...root,version:{...root.version,version:'0.0.0'}}])expect(()=>verifyFinalSmoke(tx,options,bad,{recovered:true})).toThrow(/Smoke final/);
});
it('reexecução da recuperação não rebaixa de novo e preserva a retirada',async()=>{
 const opened=planProduction('abrir',await approved()),promoted=planProduction('promover',{...options,transaction:opened.transaction,existing:opened.plan.files,smoke});
 const recovered=planProduction('recuperar',{...options,transaction:opened.transaction,existing:promoted.plan.files});
 const retry=planProduction('recuperar',{...options,transaction:opened.transaction,existing:recovered.plan.files});
 expect(retry.action).toBeNull();
 expect(JSON.parse(new TextDecoder().decode(retry.plan.files['rollout.json'])).retiradas).toContain(newSha);
});
it('contexto local, flags inativas, SHA/run divergentes ou ref não formal bloqueiam antes de mutação',()=>{
 const env={GITHUB_ACTIONS:'true',GITHUB_ACTOR:options.actor,GITHUB_SHA:newSha,GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'1',GITHUB_REF:'refs/heads/main',GITHUB_REPOSITORY:'fixture/arcade',FORMAL_HML_ENABLED:'true',FORMAL_PRD_ENABLED:'true',MONITOR_ENABLED:'true',ALERTS_ENABLED:'true'};
 expect(()=>ensurePipeline(options,env)).not.toThrow();for(const e of [{...env,GITHUB_ACTIONS:'false'},{...env,ALERTS_ENABLED:''},{...env,GITHUB_REF:'refs/heads/feature/teste'},{...env,GITHUB_SHA:oldSha}])expect(()=>ensurePipeline(options,e)).toThrow();
});
it('checkpoint preserva SemVer anterior para smoke de recuperação entre versões distintas',async()=>{
 const params=await approved();params.existing[`releases/${oldSha}/version.json`]=new TextEncoder().encode(JSON.stringify({...version(oldSha),version:'0.5.0'}));
 const opened=planProduction('abrir',params);expect(opened.transaction.baselineVersion).toBe('0.5.0');
 const workflow=(await import('node:fs')).readFileSync('.github/workflows/esteira.yml','utf8');expect(workflow).toContain('EXPECTED_VERSION: ${{ steps.recuperar.outputs.version }}');
});
it('reexecução registra quem a disparou, sem atribuir o ato ao autor do push original',()=>{
 const env={GITHUB_ACTIONS:'true',GITHUB_ACTOR:options.actor,GITHUB_TRIGGERING_ACTOR:'reexec-fixture',GITHUB_SHA:newSha,GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'2',GITHUB_REF:'refs/heads/main',GITHUB_REPOSITORY:'fixture/arcade',FORMAL_HML_ENABLED:'true',FORMAL_PRD_ENABLED:'true',MONITOR_ENABLED:'true',ALERTS_ENABLED:'true'};
 expect(()=>ensurePipeline({...options,runAttempt:'2',actor:'reexec-fixture'},env)).not.toThrow();expect(()=>ensurePipeline({...options,runAttempt:'2'},env)).toThrow(/Contexto/);
});
