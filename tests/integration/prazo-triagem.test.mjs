import {it,expect} from 'vitest';
import {evaluateDeliveryDeadline} from '../../scripts/prazo-triagem.mjs';
const deadline='2026-10-16T22:35:43-03:00',now=new Date('2026-10-20T01:00:00Z');
const policy={schema:1,authorized:true,authorizedBy:'owner',repository:'owner/game',deadline,tag:'v1.0.0',sha:'a'.repeat(40),artifactDigest:'sha256:'+'b'.repeat(64)};
const env={PRAZO:deadline,GITHUB_REPOSITORY:policy.repository,GITHUB_ACTOR:'owner',SUBMISSION_TAG:policy.tag,EXPECTED_SHA:policy.sha,SUBMISSION_ARTIFACT_DIGEST:policy.artifactDigest,TRIAGEM_EXCECAO_TEMPORAL:JSON.stringify(policy)};
it('continua bloqueante por padrão e não altera o prazo quando aceita exceção escopada',()=>{
 expect(()=>evaluateDeliveryDeadline({...env,TRIAGEM_EXCECAO_TEMPORAL:''},now)).toThrow(/encerrado/);
 const result=evaluateDeliveryDeadline(env,now);
 expect(result).toMatchObject({deadline,checkedAt:now.toISOString(),withinDeadline:false,exceptionApplied:true,status:'accepted-by-scoped-exception',authorizedBy:'owner'});
 expect(env.PRAZO).toBe(deadline);
});
it.each([
 ['ator',{GITHUB_ACTOR:'outro'}],['repositório',{GITHUB_REPOSITORY:'other/game'}],
 ['tag',{SUBMISSION_TAG:'v1.0.1'}],['SHA',{EXPECTED_SHA:'c'.repeat(40)}],
 ['digest',{SUBMISSION_ARTIFACT_DIGEST:'sha256:'+'d'.repeat(64)}],
 ['prazo',{PRAZO:'2026-10-17T22:35:43-03:00'}],
 ['autorização',{TRIAGEM_EXCECAO_TEMPORAL:JSON.stringify({...policy,authorized:false})}],
 ['responsável',{TRIAGEM_EXCECAO_TEMPORAL:JSON.stringify({...policy,authorizedBy:'outro'})}],
 ['JSON',{TRIAGEM_EXCECAO_TEMPORAL:'{invalid'}]
])('não aceita exceção com %s divergente ou inválido',(_,changes)=>{
 expect(()=>evaluateDeliveryDeadline({...env,...changes},now)).toThrow(/exceção|política/i);
});
it('prazo válido usa a regra normal; exceção não é requisito para entrega pontual',()=>{
 const result=evaluateDeliveryDeadline({PRAZO:deadline},new Date('2026-10-16T20:00:00-03:00'));
 expect(result).toMatchObject({withinDeadline:true,exceptionApplied:false,status:'within-deadline'});
});
