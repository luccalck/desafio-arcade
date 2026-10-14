import {it,expect} from 'vitest';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
const a='a'.repeat(40),b='b'.repeat(40),cli=resolve('scripts/rollout.mjs');
it('CLI aplica rollback em checkout sintético gh-pages, com ator/motivo e sem alterar outros arquivos',()=>{
 const tmp=mkdtempSync(join(tmpdir(),'arcade-rollout-')),root=join(tmp,'tree'),output=join(tmp,'output');
 const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
 try{
  mkdirSync(root);git('init','-b','gh-pages');
  for(const sha of [a,b])for(const name of ['index.html','game.js','style.css','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt']){
   const path=join(root,'releases',sha,name);mkdirSync(join(root,'releases',sha),{recursive:true});writeFileSync(path,name==='version.json'?JSON.stringify({sha,version:'0.6.0'}):'fixture');
  }
  writeFileSync(join(root,'rollout.json'),JSON.stringify({schema:1,strategy:'azul-verde',estavel:b,anterior:a,canario:null,percentual:0,retiradas:[]}));writeFileSync(join(root,'outro.txt'),'preservar');
  git('add','.');git('-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-m','fixture sintética');
  const args=[cli,'--action','rollback','--existing',root,'--output',output,'--sha',a,'--actor','DaviSouza78','--reason','ensaio sintético de recuperação','--commit','true'];
  const blocked=spawnSync(process.execPath,args,{env:{...process.env,GITHUB_ACTIONS:'false'},encoding:'utf8'});expect(blocked.status).not.toBe(0);expect(git('log','-1','--format=%s')).toBe('fixture sintética');
  const run=spawnSync(process.execPath,args,{env:{...process.env,GITHUB_ACTIONS:'true',GITHUB_ACTOR:'DaviSouza78',GITHUB_TRIGGERING_ACTOR:'DaviSouza78'},encoding:'utf8'});expect(run.status,run.stderr).toBe(0);
  expect(git('log','-1','--format=%s')).toContain('ator=DaviSouza78; motivo=ensaio sintético de recuperação');
  expect(git('status','--porcelain')).toBe('');expect(readFileSync(join(root,'outro.txt'),'utf8')).toBe('preservar');expect(JSON.parse(readFileSync(join(root,'rollout.json'))).retiradas).toEqual([b]);
 }finally{rmSync(tmp,{recursive:true,force:true});}
},30000);
