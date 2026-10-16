import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {github,proveTag,planRelease,publishRelease} from './release.mjs';
import {readBundleTree} from './ci-bundle.mjs';
import {sondar} from './sondar.mjs';
const REQUIRED=['qualidade','seguranca','build','e2e','pacote-ci','ci','deploy-hml','deploy-prd','monitor-pos-producao'];
function validateIdentity({repo,run,attempt,tag,sha}){
 if(!/^[A-Za-z0-9][A-Za-z0-9-]*\/[A-Za-z0-9_.-]+$/.test(repo??'')||!/^\d{1,20}$/.test(String(run))||!/^\d{1,4}$/.test(String(attempt))||BigInt(run)<1n||Number(attempt)<1||!/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(tag??'')||!/^[a-f0-9]{40}$/.test(sha??''))throw Error('Identidade de retomada inválida.');
}
export function validateResumeSource({repo,run,attempt,tag,sha,source,jobs}){
 validateIdentity({repo,run,attempt,tag,sha});
 if(String(source?.id)!==String(run)||String(source.run_attempt)!==String(attempt)||source.head_sha!==sha||source.head_branch!==tag||source.event!=='push'||source.path!=='.github/workflows/esteira.yml'||source.status!=='completed'||!['failure','success'].includes(source.conclusion)||source.head_repository?.full_name!==repo)throw Error('Origem da execução divergente.');
 for(const name of REQUIRED){const matches=jobs.filter(j=>j.name===name);if(matches.length!==1||matches[0].status!=='completed'||matches[0].conclusion!=='success'||String(matches[0].run_id)!==String(run)||String(matches[0].run_attempt)!==String(attempt)||matches[0].head_sha!==sha)throw Error(`Gate de origem não confirmado: ${name}`);}
 return true;
}
async function main(){
 const e=process.env,mode=process.argv[2];
 if(!['validar','publicar'].includes(mode)||e.GITHUB_ACTIONS!=='true'||e.GITHUB_EVENT_NAME!=='workflow_dispatch'||e.GITHUB_REF!=='refs/heads/main')throw Error('Retomada exige workflow_dispatch na main.');
 const context={repo:e.GITHUB_REPOSITORY,run:e.SOURCE_RUN,attempt:e.SOURCE_ATTEMPT,tag:e.SOURCE_TAG,sha:e.SOURCE_SHA};
 // Validar entradas antes de incorporá-las a endpoints ou caminhos.
 validateIdentity(context);
 const api=github(context.repo,e.GH_TOKEN),source=await api.get(`/actions/runs/${context.run}/attempts/${context.attempt}`),jobs=[];
 for(let page=1;page<=20;page++){
  const result=await api.get(`/actions/runs/${context.run}/attempts/${context.attempt}/jobs?per_page=100&page=${page}`);
  jobs.push(...result.jobs);if(result.jobs.length<100)break;if(page===20)throw Error('Paginação de jobs excedida.');
 }
 validateResumeSource({...context,source,jobs});
 if(mode==='validar'){console.log('Gates e proveniência da execução original confirmados.');return;}
 const version=JSON.parse(await readFile('package.json','utf8')).version;
 const proof=await proveTag({tag:context.tag,sha:context.sha,version,api});
 const plan=planRelease({bundle:await readBundleTree(resolve(process.argv[3])),sha:context.sha,run:context.run,attempt:context.attempt,tag:context.tag,version,proof,notes:await readFile('docs/notas-versao.md','utf8'),notesHash:e.RELEASE_NOTES_SHA256});
 const live=await sondar({alvo:'producao',url:e.SITE_URL,loader:true});
 if(live.codigo!==200||live.erro!==null||live.sha!==context.sha||live.versao!==version)throw Error('Produção atual não confirmou a release original.');
 const result=await publishRelease(plan,api),report={schema:1,mode:'retomada-sem-rebuild',at:new Date().toISOString(),source:context,implementationSha:e.GITHUB_SHA,resumeRun:e.GITHUB_RUN_ID,resumeAttempt:e.GITHUB_RUN_ATTEMPT,live,result};
 const reports=resolve(e.GITHUB_WORKSPACE,'reports');await mkdir(reports,{recursive:true});await writeFile(resolve(reports,'retomada-release.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(result));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
