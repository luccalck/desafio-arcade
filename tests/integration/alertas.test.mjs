import {it,expect} from 'vitest';
import {alertStates,reconcileAlerts} from '../../scripts/alertas.mjs';
const sample={alvo:'hml',url:'https://example.test/hml/',data:'2026-10-13T22:00:00Z',codigo:200,tempo:2,versao:'0.6.0',sha:'a'.repeat(40),erro:null};
const report=(samples=[sample])=>({schema:1,run:'123',runAttempt:'1',formalHml:true,formalPrd:true,samples});
it('limiar estrito2s e indisponibilidade500/timeout; parsing não recupera',()=>{
 expect(alertStates(sample)).toEqual({JogoForaDoAr:'close',LatenciaAlta:'close'});
 expect(alertStates({...sample,tempo:2.01})).toEqual({JogoForaDoAr:'close',LatenciaAlta:'open'});
 expect(alertStates({...sample,codigo:500,erro:'http'}).JogoForaDoAr).toBe('open');
 expect(alertStates({...sample,codigo:null,tempo:null,erro:'timeout'})).toEqual({JogoForaDoAr:'open',LatenciaAlta:'hold'});
 for(const erro of ['versao-invalida','ponteiro-invalido','rede'])expect(alertStates({...sample,erro})).toEqual({JogoForaDoAr:'hold',LatenciaAlta:'hold'});
});
function mock(){
 const state={issues:[],events:[]};return {state,api:{
  ensureLabel:async()=>state.events.push('label'),listOpen:async()=>state.issues.filter(i=>!i.closed),
  create:async issue=>{const i={...issue,number:state.issues.length+1,html_url:'https://example.test/issues/1'};state.issues.push(i);state.events.push('open');return i;},
  close:async issue=>{issue.closed=true;state.events.push('close');},
 }};
}
it('abre sem duplicar, fecha normalizado e novo incidente tem novaIssue',async()=>{
 const m=mock(),bad=report([{...sample,codigo:500,erro:'http'}]);
 await reconcileAlerts(bad,m.api);await reconcileAlerts(bad,m.api);expect(m.state.issues).toHaveLength(1);
 await reconcileAlerts(report([{...sample,erro:'versao-invalida'}]),m.api);expect(m.state.issues[0].closed).toBeUndefined();
 await reconcileAlerts(report(),m.api);expect(m.state.issues[0].closed).toBe(true);
 await reconcileAlerts(bad,m.api);expect(m.state.issues).toHaveLength(2);
});
it('mantém dois alvos e alertas independentes, fecha latência somente por recuperação válida',async()=>{
 const m=mock();await reconcileAlerts(report([{...sample,tempo:2.01},{...sample,alvo:'producao',codigo:500,erro:'http'}]),m.api);
 expect(m.state.issues).toHaveLength(2);
 await reconcileAlerts(report([{...sample,codigo:500,erro:'http'},{...sample,alvo:'producao',codigo:200}]),m.api);
 expect(m.state.issues[0].closed).toBeUndefined();expect(m.state.issues[1].closed).toBe(true);
 await reconcileAlerts(report(),m.api);expect(m.state.issues[0].closed).toBe(true);
});
it('não cria/fecha alertas depreview e preservaIssues humanas sem marcador',async()=>{
 const m=mock();m.state.issues.push({number:99,body:'Incidente humano: não gerenciado',closed:false});
 await reconcileAlerts({...report([{...sample,codigo:500,erro:'http'}]),formalHml:false},m.api);expect(m.state.events).not.toContain('open');
 await reconcileAlerts(report(),m.api);expect(m.state.issues[0].closed).toBe(false);
});
it('recusa relatório inválido antes de tocar naAPI',async()=>{
 const m=mock();for(const bad of [{},report([{...sample,tempo:-1}]),report([{...sample,data:'inventada'}]),report([sample,sample])])await expect(reconcileAlerts(bad,m.api)).rejects.toThrow();
 expect(m.state.events).toEqual([]);
});
