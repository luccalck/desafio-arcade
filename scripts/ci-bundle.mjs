import {createHash} from 'node:crypto';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {preparePages} from './prepare-pages.mjs';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const json=bytes=>JSON.parse(Buffer.from(bytes).toString('utf8'));
const bytes=value=>Buffer.from(JSON.stringify(value,null,2)+'\n');
const required={
 'build/artifacts/build.zip':'build.zip','build/artifacts/build.zip.sha256':'build.zip.sha256',
 'build/artifacts/GDD.pdf':'GDD.pdf','build/dist/version.json':'version.json',
 'seguranca/sbom.cdx.json':'sbom.cdx.json','seguranca/gitleaks.json':'reports/seguranca/gitleaks.json',
 'seguranca/npm-audit.json':'reports/seguranca/npm-audit.json',
 'qualidade/junit.xml':'reports/qualidade/junit.xml','qualidade/coverage/coverage-summary.json':'reports/qualidade/coverage/coverage-summary.json',
 'e2e/reports/e2e-junit.xml':'reports/e2e/reports/e2e-junit.xml',
 'construcao/pdfinfo.txt':'reports/construcao/pdfinfo.txt','construcao/reproducibility.json':'reports/construcao/reproducibility.json',
};
function safe(name){if(!name||name.includes('\\')||name.startsWith('/')||name.split('/').some(p=>!p||p==='.'||p==='..'||p.includes(':')))throw Error(`caminho inválido: ${name}`);}
function identity(sha,run){if(!/^[a-f0-9]{40}$/.test(sha))throw Error('SHA inválido.');if(!/^\d+$/.test(String(run)))throw Error('run inválido.');}
function content(files,sha){
 for(const name of ['build.zip','build.zip.sha256','GDD.pdf','version.json','sbom.cdx.json'])if(!files[name])throw Error(`Ausente: ${name}`);
 const checksum=Buffer.from(files['build.zip.sha256']).toString().trim().split(/\s+/)[0];
 preparePages({zip:files['build.zip'],checksum,sha});
 const version=json(files['version.json']);
 // O JSON externo tem de ser exatamente o empacotado, além do SHA esperado.
 const expanded=preparePages({zip:files['build.zip'],checksum,sha});
 if(hash(expanded['hml/version.json'])!==hash(files['version.json']))throw Error('version.json diverge do ZIP.');
 if(!Buffer.from(files['GDD.pdf']).subarray(0,5).equals(Buffer.from('%PDF-')))throw Error('PDF inválido.');
 if(json(files['sbom.cdx.json']).bomFormat!=='CycloneDX')throw Error('SBOM inválido.');
 return version;
}
export function createBundle(inputs,{sha,run,runAttempt=process.env.GITHUB_RUN_ATTEMPT??'1'}){
 if(!/^[1-9]\d*$/.test(String(runAttempt)))throw Error('Tentativa inválida.');
 identity(sha,run);for(const name of Object.keys(inputs))safe(name);
 const files={};
 for(const [source,target] of Object.entries(required)){if(!inputs[source])throw Error(`Ausente: ${source}`);files[target]=inputs[source];}
 for(const [name,value] of Object.entries(inputs)){
  if(/^(qualidade|seguranca|e2e|construcao)\//.test(name))files[`reports/${name}`]=value;
 }
 const version=content(files,sha),inventory={};
 for(const name of Object.keys(files).sort())inventory[name]={sha256:hash(files[name]),bytes:files[name].length};
 files['ci-manifest.json']=bytes({schema:1,sha,run:String(run),runAttempt:String(runAttempt),version:version.version,build:version.build,files:inventory});
 verifyBundle(files,{sha,run});return files;
}
export function verifyBundle(files,{sha,run}){
 identity(sha,run);for(const name of Object.keys(files))safe(name);
 const manifest=json(files['ci-manifest.json']);
 if(manifest.schema!==1||manifest.sha!==sha||manifest.run!==String(run))throw Error('SHA/run/schema de origem divergente.');
 const actual=Object.keys(files).filter(n=>n!=='ci-manifest.json').sort(),expected=Object.keys(manifest.files).sort();
 if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('inventário divergente.');
 for(const name of expected){safe(name);if(hash(files[name])!==manifest.files[name].sha256||files[name].length!==manifest.files[name].bytes)throw Error(`integridade divergente: ${name}`);}
 for(const target of Object.values(required))if(!files[target])throw Error(`Ausente: ${target}`);
 const version=content(files,sha);if(manifest.version!==version.version||manifest.build!==version.build)throw Error('Metadados de versão divergentes.');
 return manifest;
}
async function tree(root,prefix=''){
 const files={};for(const entry of await readdir(join(root,prefix),{withFileTypes:true})){
  const name=prefix?`${prefix}/${entry.name}`:entry.name;safe(name);
  if(entry.isSymbolicLink())throw Error(`Link não permitido: ${name}`);
  if(entry.isDirectory())Object.assign(files,await tree(root,name));else if(entry.isFile())files[name]=await readFile(join(root,name));
 }return files;
}
async function main(){
 const [mode,input,output,sha,run]=process.argv.slice(2);
 if(!['create','verify'].includes(mode)||!input||!output||!sha||!run)throw Error('Use create|verify INPUT OUTPUT SHA RUN_ID (OUTPUT=- em verify).');
 const source=await tree(resolve(input));
 if(mode==='verify'){const manifest=verifyBundle(source,{sha,run});console.log(`Contrato validado: SHA ${manifest.sha}; run ${manifest.run}; ${Object.keys(manifest.files).length} arquivos.`);return;}
 const files=createBundle(source,{sha,run}),destination=resolve(output);
 await mkdir(destination,{recursive:true});if((await readdir(destination)).length)throw Error('Destino deve estar vazio; não sobrescrever pacote anterior.');
 for(const [name,value] of Object.entries(files)){const target=join(destination,name);await mkdir(dirname(target),{recursive:true});await writeFile(target,value);}
 console.log(`Pacote CI criado sem recompilação: SHA ${sha}; run ${run}; ${Object.keys(files).length} arquivos.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
