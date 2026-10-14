export const validSha=value=>typeof value==='string'&&/^[a-f0-9]{40}$/.test(value);
export function normalizeRollout(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Ponteiro inválido.');
 if(Object.hasOwn(input,'estavel')){
  if(input.activeSha!==undefined&&input.activeSha!==input.estavel)throw Error('Ponteiro contraditório.');
  if(input.schema!==1||input.strategy!=='azul-verde'||input.percentual!==0)throw Error('Contrato azul-verde inválido.');
  for(const key of ['estavel','anterior','canario'])if(input[key]!==null&&!validSha(input[key]))throw Error(`Referência ${key} inválida.`);
  if(!Array.isArray(input.retiradas)||input.retiradas.some(s=>!validSha(s))||new Set(input.retiradas).size!==input.retiradas.length)throw Error('Retiradas inválidas.');
  const refs=[input.estavel,input.anterior,input.canario].filter(Boolean);
  if(new Set(refs).size!==refs.length||refs.some(s=>input.retiradas.includes(s)))throw Error('Referências repetidas ou retiradas.');
  if(!input.estavel&&input.anterior)throw Error('Anterior sem estável.');
  return {schema:1,strategy:'azul-verde',estavel:input.estavel,anterior:input.anterior,canario:input.canario,percentual:0,retiradas:[...input.retiradas]};
 }
 if(!validSha(input.activeSha)||(input.strategy!==undefined&&input.strategy!=='preview')||(input.previousSha!=null&&!validSha(input.previousSha)))throw Error('Preview inválido.');
 return normalizeRollout({schema:1,strategy:'azul-verde',estavel:input.activeSha,anterior:input.previousSha===input.activeSha?null:input.previousSha??null,canario:null,percentual:0,retiradas:[]});
}
