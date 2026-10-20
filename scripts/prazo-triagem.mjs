const fail=message=>{throw new Error(message);};

export function parseDeadline(value){
 if(!value||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value))fail('PRAZO deve ser uma data ISO 8601 completa com fuso horário.');
 const day=new Date(`${value.slice(0,10)}T00:00:00Z`);if(!Number.isFinite(day.valueOf())||day.toISOString().slice(0,10)!==value.slice(0,10))fail('PRAZO contém uma data de calendário inválida.');
 const date=new Date(value);if(!Number.isFinite(date.valueOf()))fail('PRAZO não é uma data válida.');return date;
}
export function validateDeadline(value,now=new Date()){
 const deadline=parseDeadline(value);if(now>deadline)fail('Prazo de submissão encerrado.');return true;
}

export function evaluateDeliveryDeadline(env,now=new Date()){
 const deadline=parseDeadline(env.PRAZO);
 if(!Number.isFinite(now.valueOf()))fail('Data atual inválida para a triagem.');
 const result={deadline:env.PRAZO,checkedAt:now.toISOString(),withinDeadline:now<=deadline,exceptionApplied:false,status:'within-deadline'};
 if(result.withinDeadline)return result;
 if(!env.TRIAGEM_EXCECAO_TEMPORAL)validateDeadline(env.PRAZO,now);
 let policy;
 try{policy=JSON.parse(env.TRIAGEM_EXCECAO_TEMPORAL);}catch{fail('Política de exceção temporal inválida.');}
 const repository=env.GITHUB_REPOSITORY??'',owner=repository.split('/')[0];
 const valid=/^[\w.-]+\/[\w.-]+$/.test(repository)
  &&/^v\d+\.\d+\.\d+$/.test(env.SUBMISSION_TAG??'')
  &&/^[a-f0-9]{40}$/.test(env.EXPECTED_SHA??'')
  &&/^sha256:[a-f0-9]{64}$/.test(env.SUBMISSION_ARTIFACT_DIGEST??'')
  &&policy?.schema===1&&policy.authorized===true
  &&env.GITHUB_ACTOR===owner&&policy.authorizedBy===owner
  &&policy.repository===repository&&policy.deadline===env.PRAZO
  &&policy.tag===env.SUBMISSION_TAG&&policy.sha===env.EXPECTED_SHA
  &&policy.artifactDigest===env.SUBMISSION_ARTIFACT_DIGEST;
 if(!valid)fail('Exceção temporal não autorizada para este ator/tag/SHA/prazo/artefato.');
 return {...result,exceptionApplied:true,status:'accepted-by-scoped-exception',authorizedBy:owner,repository,tag:policy.tag,sha:policy.sha,artifactDigest:policy.artifactDigest};
}
