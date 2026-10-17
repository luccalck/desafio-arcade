import {it,expect,vi} from 'vitest';
import {github} from '../../scripts/alertas.mjs';

const response=(status,body={})=>({ok:status>=200&&status<300,status,json:async()=>body});

it('seis fases do ensaio verificam cada label apenas uma vez por adaptador',async()=>{
 const fetcher=vi.fn(async()=>response(200));vi.stubGlobal('fetch',fetcher);
 try{const api=github('luccalck/desafio-arcade','credencial-sintetica');for(let phase=0;phase<6;phase++){await api.ensureLabel('alerta');await api.ensureLabel('ensaio');}expect(fetcher).toHaveBeenCalledTimes(2);expect(api.diagnostics().labelMetadataRequests).toBe(2);}
 finally{vi.unstubAllGlobals();}
});

it('erro de consulta não confirma a label; próxima tentativa consulta novamente',async()=>{
 const fetcher=vi.fn().mockResolvedValueOnce(response(503)).mockResolvedValue(response(200));vi.stubGlobal('fetch',fetcher);
 try{const api=github('luccalck/desafio-arcade','credencial-sintetica');await expect(api.ensureLabel('alerta')).rejects.toThrow('HTTP503');await api.ensureLabel('alerta');await api.ensureLabel('alerta');expect(fetcher).toHaveBeenCalledTimes(2);}
 finally{vi.unstubAllGlobals();}
});

it('label criada com sucesso é confirmada sem novo GET ou POST',async()=>{
 const fetcher=vi.fn().mockResolvedValueOnce(response(404)).mockResolvedValue(response(201));vi.stubGlobal('fetch',fetcher);
 try{const api=github('luccalck/desafio-arcade','credencial-sintetica');await api.ensureLabel('ensaio');await api.ensureLabel('ensaio');expect(fetcher).toHaveBeenCalledTimes(2);expect(fetcher.mock.calls[1][1].method).toBe('POST');}
 finally{vi.unstubAllGlobals();}
});

it('criação recusada não entra no cache e outra instância não reutiliza confirmação',async()=>{
 const fetcher=vi.fn().mockResolvedValueOnce(response(404)).mockResolvedValueOnce(response(403)).mockResolvedValue(response(200));vi.stubGlobal('fetch',fetcher);
 try{const api=github('luccalck/desafio-arcade','credencial-sintetica');await expect(api.ensureLabel('alerta')).rejects.toThrow('HTTP403');await api.ensureLabel('alerta');await api.ensureLabel('alerta');await github('luccalck/desafio-arcade','credencial-sintetica').ensureLabel('alerta');await expect(api.ensureLabel('invalida')).rejects.toThrow('Label inválida');expect(fetcher).toHaveBeenCalledTimes(4);}
 finally{vi.unstubAllGlobals();}
});
