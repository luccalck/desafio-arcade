import {it,expect,vi} from 'vitest';
// Respostas Git/API sintéticas: não criam tags nem aprovação no repositório real.
vi.mock('node:child_process',()=>({
 execFileSync:(_cmd,args)=>args[0]==='cat-file'?'tag':args[1]==='refs/tags/v0.6.0'?'c'.repeat(40):'a'.repeat(40),
 spawnSync:()=>({status:0}),
}));
import {proveTag} from '../../scripts/release.mjs';
it('exige revisão efetiva de outro autor no HEAD integrado; voto posterior invalida aprovação',async()=>{
 const approved={user:{login:'revisor'},state:'APPROVED',commit_id:'b'.repeat(40),html_url:'https://example.test/review/1'};
 let reviews=[approved];
 const api={
  get:async path=>path.startsWith('/git/ref/')?{object:{sha:'c'.repeat(40)}}:{protected:true},
  all:async path=>path.endsWith('/pulls')?[{number:42,base:{ref:'main'},merged_at:'2026-10-13T00:00:00Z',head:{sha:'b'.repeat(40)},user:{login:'autor'}}]:reviews,
 };
 expect((await proveTag({tag:'v0.6.0',sha:'a'.repeat(40),version:'0.6.0',api})).approved).toBe(true);
 for(const invalid of [[{...approved,user:{login:'autor'}}],[{...approved,commit_id:'d'.repeat(40)}],[approved,{...approved,state:'CHANGES_REQUESTED'}],[{...approved,state:'DISMISSED'}]]){
  reviews=invalid;await expect(proveTag({tag:'v0.6.0',sha:'a'.repeat(40),version:'0.6.0',api})).rejects.toThrow(/approved/);
 }
});
