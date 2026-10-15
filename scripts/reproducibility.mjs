import {execFileSync} from 'node:child_process';
import {readFile,readdir,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function snapshot(normalizeBuildDate=true){
 const result={};
 for(const name of (await readdir('dist')).sort()){
  let bytes=await readFile(`dist/${name}`);
  if(normalizeBuildDate&&name==='version.json'){const value=JSON.parse(bytes);delete value.build;bytes=Buffer.from(JSON.stringify(value));}
  result[name]=createHash('sha256').update(bytes).digest('hex');
 }
 return result;
}
for(const file of ['src/content/missions.json','src/content/schema.json'])JSON.parse(await readFile(file,'utf8'));
execFileSync(process.execPath,['node_modules/tsx/dist/cli.mjs','scripts/check-content.ts'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,BUILD_DATE:'2026-01-01T00:00:00Z'}});
const first=await snapshot();
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,BUILD_DATE:'2026-01-02T00:00:00Z'}});
const second=await snapshot();
if(JSON.stringify(first)!==JSON.stringify(second))throw new Error('Builds diferem além da data em version.json.');
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
const immutableFirst=await snapshot(false);
execFileSync(process.execPath,['scripts/package.mjs'],{stdio:'inherit'});
const firstZip=createHash('sha256').update(await readFile('artifacts/build.zip')).digest('hex');
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
const immutableSecond=await snapshot(false);
execFileSync(process.execPath,['scripts/package.mjs'],{stdio:'inherit'});
const secondZip=createHash('sha256').update(await readFile('artifacts/build.zip')).digest('hex');
if(JSON.stringify(immutableFirst)!==JSON.stringify(immutableSecond)||firstZip!==secondZip)throw new Error('Build normal do mesmo commit não preserva bytes imutáveis, incluindo version.json/ZIP.');
await mkdir('reports',{recursive:true});
await writeFile('reports/reproducibility.json',JSON.stringify({method:'datas alternativas normalizadas; duas builds normais com data de origem do commit e ZIP idênticos',first,second,immutableFirst,immutableSecond,firstZip,secondZip,passed:true},null,2)+'\n');
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
console.log('Reprodutibilidade conferida: datas alternativas normalizadas e builds normais/ZIP idênticos por commit.');
