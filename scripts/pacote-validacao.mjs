import {createHash} from 'node:crypto';
import {unzipSync} from 'fflate';

export const requiredAssets=['GDD.pdf','LINK_DO_JOGO.txt','build.zip','pitch.mp4'];
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=message=>{throw new Error(message);};

export function checkDuration(seconds){
 const n=Number(seconds);if(!Number.isFinite(n)||n<=0)fail('ffprobe retornou duração inválida.');if(n>90)fail(`Vídeo excede 90 segundos (${n}).`);return true;
}
export function checkZip(bytes){
 let files;try{files=unzipSync(bytes);}catch{fail('build.zip corrompido ou ilegível.');}
 const names=Object.keys(files).map(name=>name.replaceAll('\\','/'));
 if(!names.some(name=>/(^|\/)index\.html$/i.test(name)))fail('build.zip não contém index.html.');
 if(!names.some(name=>/(^|\/)LEIA-ME\.txt$/i.test(name)))fail('build.zip não contém LEIA-ME.txt.');return true;
}
export function verifyManifest(fileBytes,manifestText){
 const entries=new Map();for(const line of manifestText.split(/\r?\n/).filter(Boolean)){const match=/^([a-f0-9]{64})\x20{2}([A-Za-z0-9_.-]+)$/.exec(line);if(!match||entries.has(match[2]))fail('MANIFESTO.sha256 tem linha inválida ou duplicada.');entries.set(match[2],match[1]);}
 const keys=[...entries.keys()].sort(),expected=[...requiredAssets].sort();
 if(keys.length!==expected.length||keys.some((key,index)=>key!==expected[index]))fail('Manifesto deve conter exatamente os quatro arquivos exigidos.');
 for(const name of requiredAssets){const entry=entries.get(name),bytes=fileBytes[name];if(!bytes)fail(`Arquivo ausente: ${name}.`);if(!entry||entry!==digest(bytes))fail(`SHA-256 divergente: ${name}.`);}
 return true;
}
export function makeManifest(fileBytes){
 return requiredAssets.map(name=>{if(!fileBytes[name])fail(`Arquivo ausente: ${name}.`);return `${digest(fileBytes[name])}  ${name}`;}).join('\n')+'\n';
}
