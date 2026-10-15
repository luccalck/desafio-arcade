import {beforeEach,afterEach,it,expect,vi} from 'vitest';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {collectHmlTiming} from '../../scripts/ci-bundle.mjs';

vi.mock('node:fs/promises',()=>({readFile:vi.fn(),readdir:vi.fn(),mkdir:vi.fn(),writeFile:vi.fn()}));
const sha='a'.repeat(40),repository='equipe/jogo',ref='refs/heads/main';
const env={GITHUB_REPOSITORY:repository,GITHUB_SHA:sha,GITHUB_REF:ref,GITHUB_RUN_ID:'123',GITHUB_RUN_ATTEMPT:'1',GH_TOKEN:'segredo-sintetico',GITHUB_EVENT_NAME:'push',GITHUB_EVENT_PATH:'/fixture/push.json'};
const payload=()=>({ref,after:sha,deleted:false,repository:{full_name:repository,pushed_at:Date.parse('2026-10-15T03:05:00Z')/1000}});
const mergedPr=()=>({number:32,merged_at:'2026-10-15T03:03:48Z',base:{ref:'main',repo:{full_name:repository}},merge_commit_sha:sha,html_url:'https://github.com/equipe/jogo/pull/32'});
const pushEvent=()=>({id:'10',type:'PushEvent',created_at:'2026-10-15T03:04:00Z',payload:{ref,head:sha}});
const response=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json'}});
const savedReport=()=>JSON.parse(writeFile.mock.calls[0][1]);
async function rejectsAfterPolling(promise,pattern){
 const check=expect(promise).rejects.toThrow(pattern);
 await vi.runAllTimersAsync();await check;
 expect(writeFile).not.toHaveBeenCalled();
}
let fetchMock;
beforeEach(()=>{
 vi.resetAllMocks();
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-15T03:10:00Z'));
 fetchMock=vi.fn().mockRejectedValue(new Error('Requisição não prevista no teste'));
 vi.stubGlobal('fetch',fetchMock);
 readFile.mockResolvedValue(JSON.stringify(payload()));mkdir.mockResolvedValue();writeFile.mockResolvedValue();
});
afterEach(()=>{vi.useRealTimers();vi.unstubAllGlobals();});

it('HTTP 503 na fonte de PRs permite medir pelo payload válido sem consultar o feed',async()=>{
 fetchMock.mockResolvedValueOnce(response({message:'indisponível'},503));
 const report=await collectHmlTiming(env);
 expect(report).toMatchObject({eventType:'ActionsPushPayload',pushToHmlSeconds:300,withinLimit:true,sha,ref});
 expect(fetchMock).toHaveBeenCalledTimes(1);
 expect(fetchMock.mock.calls[0][0]).toBe(`https://api.github.com/repos/${repository}/commits/${sha}/pulls?per_page=100`);
 expect(writeFile).toHaveBeenCalledWith('reports/hml-run.json',expect.any(String));
 expect(savedReport().sourceWarnings).toEqual(['Fonte de PRs indisponível: API GitHub: HTTP 503.']);
});

it.each(['rede','timeout','json','lista'])('indisponibilidade de PRs (%s) não expõe detalhes e permite payload',async failure=>{
 if(failure==='rede')fetchMock.mockRejectedValueOnce(new Error(`Authorization: Bearer ${env.GH_TOKEN}`));
 if(failure==='timeout')fetchMock.mockRejectedValueOnce(new DOMException(`Timeout ${env.GH_TOKEN}`,'TimeoutError'));
 if(failure==='json')fetchMock.mockResolvedValueOnce(new Response(`inválido ${env.GH_TOKEN}`));
 if(failure==='lista')fetchMock.mockResolvedValueOnce(response({message:env.GH_TOKEN}));
 const report=await collectHmlTiming(env);
 expect(report).toMatchObject({eventType:'ActionsPushPayload',pushToHmlSeconds:300});
 expect(report.sourceWarnings[0]).toContain('Fonte de PRs indisponível');
 expect(JSON.stringify(savedReport())).not.toContain(env.GH_TOKEN);
 expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('consulta o feed após HTTP 503 e payload divergente, com polling de relógio simulado',async()=>{
 readFile.mockResolvedValueOnce(JSON.stringify({...payload(),after:'b'.repeat(40)}));
 fetchMock.mockResolvedValueOnce(response({},503)).mockResolvedValueOnce(response([])).mockResolvedValueOnce(response([pushEvent()]));
 const pending=collectHmlTiming(env);
 await vi.runAllTimersAsync();const report=await pending;
 expect(report).toMatchObject({eventType:'PushEvent',pushToHmlSeconds:360,pushReceivedAt:'2026-10-15T03:04:00Z',e2eFinishedAt:'2026-10-15T03:10:00.000Z'});
 expect(fetchMock.mock.calls.map(([url])=>url)).toEqual([
  `https://api.github.com/repos/${repository}/commits/${sha}/pulls?per_page=100`,
  `https://api.github.com/repos/${repository}/events?per_page=100&page=1`,
  `https://api.github.com/repos/${repository}/events?per_page=100&page=1`,
 ]);
 expect(Date.now()).toBe(Date.parse('2026-10-15T03:11:00Z'));
});

it('prefere merge comprovado ao payload mais recente e não consulta o feed',async()=>{
 fetchMock.mockResolvedValueOnce(response([mergedPr()]));
 const report=await collectHmlTiming(env);
 expect(report).toMatchObject({eventType:'PullRequestMerge',pushToHmlSeconds:372,withinLimit:true});
 expect(report.sourceWarnings).toBeUndefined();expect(fetchMock).toHaveBeenCalledTimes(1);
});

it.each([
 ['repositório',{base:{ref:'main',repo:{full_name:'outra/equipe'}}}],
 ['ref',{base:{ref:'outra',repo:{full_name:repository}}}],
 ['SHA',{merge_commit_sha:'b'.repeat(40)}],
 ['não integrado',{merged_at:null}],
])('rejeita PR com %s divergente antes de aceitar o payload válido',async(_name,change)=>{
 fetchMock.mockResolvedValueOnce(response([{...mergedPr(),...change}]));
 expect((await collectHmlTiming(env)).eventType).toBe('ActionsPushPayload');
});

it('aceita exatamente 900 segundos usando o merge comprovado',async()=>{
 fetchMock.mockResolvedValueOnce(response([{...mergedPr(),merged_at:'2026-10-15T02:55:00Z'}]));
 expect(await collectHmlTiming(env)).toMatchObject({eventType:'PullRequestMerge',pushToHmlSeconds:900,withinLimit:true});
});

it('merge antigo bloqueia em 901 segundos apesar de payload recente e arquiva reprovação',async()=>{
 fetchMock.mockResolvedValueOnce(response([{...mergedPr(),merged_at:'2026-10-15T02:54:59Z'}]));
 await expect(collectHmlTiming(env)).rejects.toThrow('Push→HML 901s excede 900s.');
 expect(savedReport()).toMatchObject({eventType:'PullRequestMerge',pushToHmlSeconds:901,withinLimit:false});
 expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('merge com cronologia inválida não é substituído por payload recente',async()=>{
 fetchMock.mockResolvedValueOnce(response([{...mergedPr(),merged_at:'2026-10-15T03:11:00Z'}])).mockImplementation(async()=>response([pushEvent()]));
 await rejectsAfterPolling(collectHmlTiming(env),/Cronologia push\/HML inválida/);
});

it('sem nenhuma evidência válida falha com origem indisponível e sem credenciais',async()=>{
 fetchMock.mockResolvedValueOnce(response({message:env.GH_TOKEN},503)).mockImplementation(async()=>response([]));
 const pending=collectHmlTiming({...env,GITHUB_EVENT_PATH:undefined});
 const check=expect(pending).rejects.toThrow(/mesmo SHA\/ref ausente.*Fonte de PRs indisponível: API GitHub: HTTP 503/);
 await vi.runAllTimersAsync();await check;
 await expect(pending).rejects.not.toThrow(env.GH_TOKEN);
 expect(writeFile).not.toHaveBeenCalled();expect(fetchMock).toHaveBeenCalledTimes(3);
});

it.each([
 ['repositório',{repository:{full_name:'outra/equipe',pushed_at:1792033500}}],
 ['SHA',{after:'b'.repeat(40)}],
 ['ref',{ref:'refs/heads/outra'}],
 ['exclusão',{deleted:true}],
 ['timestamp',{repository:{full_name:repository,pushed_at:null}}],
])('HTTP 503 não relaxa validação do payload: %s',async(_name,change)=>{
 readFile.mockResolvedValueOnce(JSON.stringify({...payload(),...change}));
 const wrongSha={...pushEvent(),payload:{ref,head:'b'.repeat(40)}};
 const wrongRef={...pushEvent(),payload:{ref:'refs/heads/outra',head:sha}};
 fetchMock.mockResolvedValueOnce(response({},503)).mockImplementation(async()=>response([wrongSha,wrongRef]));
 await rejectsAfterPolling(collectHmlTiming(env),/mesmo SHA\/ref ausente.*HTTP 503/);
});

it('payload com horário futuro permanece bloqueado depois da indisponibilidade de PRs',async()=>{
 readFile.mockResolvedValueOnce(JSON.stringify({...payload(),repository:{full_name:repository,pushed_at:Date.parse('2026-10-15T03:11:00Z')/1000}}));
 fetchMock.mockResolvedValueOnce(response({},503)).mockImplementation(async()=>response([pushEvent()]));
 await rejectsAfterPolling(collectHmlTiming(env),/Cronologia push\/HML inválida/);
});

it('payload antigo também reprova o limite de 900 segundos',async()=>{
 readFile.mockResolvedValueOnce(JSON.stringify({...payload(),repository:{full_name:repository,pushed_at:Date.parse('2026-10-15T02:54:59Z')/1000}}));
 fetchMock.mockResolvedValueOnce(response({},503));
 await expect(collectHmlTiming(env)).rejects.toThrow('Push→HML 901s excede 900s.');
 expect(savedReport()).toMatchObject({eventType:'ActionsPushPayload',withinLimit:false});
});

it('falha útil e sem detalhes de transporte se PRs e feed estão indisponíveis',async()=>{
 fetchMock.mockRejectedValue(new Error(`Authorization: Bearer ${env.GH_TOKEN}`));
 const pending=collectHmlTiming({...env,GITHUB_EVENT_PATH:undefined});
 await expect(pending).rejects.toThrow(/Fonte de eventos indisponível: API GitHub: falha de transporte.*Fonte de PRs indisponível/);
 await expect(pending).rejects.not.toThrow(env.GH_TOKEN);
 expect(writeFile).not.toHaveBeenCalled();
});

it('tag anotada exige resolução remota ao SHA do deploy antes de aceitar o payload',async()=>{
 const tag='refs/tags/v0.7.0',objectSha='c'.repeat(40);
 readFile.mockResolvedValueOnce(JSON.stringify({...payload(),ref:tag,after:objectSha}));
 fetchMock.mockResolvedValueOnce(response({object:{type:'tag',sha:objectSha}})).mockResolvedValueOnce(response({object:{type:'commit',sha}}));
 expect(await collectHmlTiming({...env,GITHUB_REF:tag})).toMatchObject({eventType:'ActionsPushPayload',pushToHmlSeconds:300,ref:tag});
 expect(fetchMock.mock.calls.map(([url])=>url)).toEqual([
  `https://api.github.com/repos/${repository}/git/ref/tags/v0.7.0`,
  `https://api.github.com/repos/${repository}/git/tags/${objectSha}`,
 ]);
});

it.each(['divergente','indisponível'])('tag remota %s impede usar payload sem comprovação',async failure=>{
 const tag='refs/tags/v0.7.0';
 readFile.mockResolvedValueOnce(JSON.stringify({...payload(),ref:tag}));
 fetchMock.mockResolvedValueOnce(failure==='divergente'?response({object:{type:'commit',sha:'b'.repeat(40)}}):response({},503));
 await expect(collectHmlTiming({...env,GITHUB_REF:tag})).rejects.toThrow(failure==='divergente'?/Tag remota não aponta/:/HTTP 503/);
 expect(readFile).not.toHaveBeenCalled();expect(writeFile).not.toHaveBeenCalled();
});
