import {it,expect} from 'vitest';
import {waitMonitor} from '../../scripts/observar-producao.mjs';
it('espera run novo e identificado, sem aceitar sucesso antigo ou dispatch como conclusão',async()=>{
 let dispatched=false,reads=0;const old={id:1,display_title:'teste',status:'completed',conclusion:'success'};
 const r=await waitMonitor({title:'teste',dispatch:async()=>{dispatched=true;},sleep:async()=>{},readRuns:async()=>{reads++;return !dispatched?[old]:[old,{id:2,display_title:'teste',status:reads<3?'in_progress':'completed',conclusion:reads<3?null:'success',html_url:'https://github.com/fixture/actions/runs/2'}];}});expect(r.id).toBe(2);expect(reads).toBeGreaterThan(2);
});
it('falha ou ambiguidade no monitor bloqueia aceite de produção',async()=>{
 for(const values of [[{id:2,display_title:'teste',status:'completed',conclusion:'failure'}],[{id:2,display_title:'teste'},{id:3,display_title:'teste'}]]){
  let sent=false;await expect(waitMonitor({title:'teste',dispatch:async()=>{sent=true;},readRuns:async()=>sent?values:[],sleep:async()=>{}})).rejects.toThrow();
 }
});
