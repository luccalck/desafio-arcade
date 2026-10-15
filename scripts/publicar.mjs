import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {verifyBundle} from './ci-bundle.mjs';
import {preparePages} from './prepare-pages.mjs';

export function prepareHml(bundle,{sha,run,existing={}}){
 verifyBundle(bundle,{sha,run});
 const expanded=preparePages({zip:bundle['build.zip'],checksum:Buffer.from(bundle['build.zip.sha256']).toString().trim().split(/\s+/)[0],sha});
 // Não promover release ou ponteiro: o mesmo artefato é apenas homologado.
 const files=Object.fromEntries(Object.entries(existing).filter(([name])=>!name.startsWith('hml/')));
 for(const [name,bytes] of Object.entries(expanded))if(name.startsWith('hml/'))files[name]=bytes;
 files['.nojekyll']=new Uint8Array();return files;
}
async function tree(root,prefix=''){
 const files={};for(const entry of await readdir(join(root,prefix),{withFileTypes:true})){
  if(entry.name==='.git')continue;
  if(entry.isSymbolicLink())throw Error('Links não permitidos na árvore publicada.');
  const name=prefix?`${prefix}/${entry.name}`:entry.name;
  if(entry.isDirectory())Object.assign(files,await tree(root,name));else if(entry.isFile())files[name]=await readFile(join(root,name));
 }return files;
}
async function main(){
 const argv=process.argv.slice(2),args={};
 const allowed=['bundle','sha','run','site-url','existing','output'];
 for(let i=0;i<argv.length;i+=2){const key=argv[i]?.slice(2);if(!argv[i]?.startsWith('--')||!allowed.includes(key)||!argv[i+1]||args[key])throw Error('Argumento inválido/duplicado.');args[key]=argv[i+1];}
 for(const key of allowed)if(!args[key])throw Error(`Falta --${key}`);
 const url=new URL(args['site-url']);if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash)throw Error('SITE_URL deve ser HTTPS, sem credenciais/query/fragmento.');
 const output=resolve(args.output),input=resolve(args.existing),bundleRoot=resolve(args.bundle);
 if(output===input||output.startsWith(input+'/')||output.startsWith(input+'\\')||output===bundleRoot)throw Error('Saída deve ser separada das entradas.');
 await mkdir(output,{recursive:true});if((await readdir(output)).length)throw Error('Saída deve estar vazia.');
 const files=prepareHml(await tree(bundleRoot),{sha:args.sha,run:args.run,existing:await tree(input)});
 for(const [name,bytes] of Object.entries(files)){const target=join(output,name);await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);}
 console.log(`HML preparada sem recompilação: ${args.sha}; run ${args.run}; ${new URL('hml/',url.href.replace(/\/?$/,'/')).href}.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
