import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import MarkdownIt from 'markdown-it';
import {chromium} from 'playwright';
const pkg=JSON.parse(await readFile('package.json','utf8'));
const source=await readFile('docs/gdd.md','utf8');
const high=source.split('## 2. High concept\n\n')[1]?.split('\n\n')[0];
if(!high||high.length>1000)throw new Error('High concept ausente ou acima de 1000 caracteres.');
for(let i=1;i<=12;i++)if(!source.includes(`## ${i}. `))throw new Error(`Seção GDD ${i} ausente.`);
let html=new MarkdownIt({html:false}).render(source.replaceAll('{{VERSION}}',pkg.version));
for(const match of [...html.matchAll(/src="(images\/[^"]+)"/g)]){
 const image=await readFile(resolve('docs',match[1]));
 const mime=match[1].endsWith('.png')?'image/png':'image/svg+xml';
 html=html.replace(match[0],`src="data:${mime};base64,${image.toString('base64')}"`);
}
const css=`@page{size:A4;margin:18mm 16mm 20mm}body{font:10.2pt/1.5 Arial,sans-serif;color:#192b2b}h1{font-size:25pt;line-height:1.15;border-bottom:3px solid #bb3c1a;padding-bottom:14px}h2{font-size:15pt;margin:24px 0 12px;break-after:avoid}h3{font-size:12pt;break-after:avoid}p,li{orphans:3;widows:3}p{break-inside:avoid}table{width:100%;border-collapse:collapse;font-size:9pt;margin:12px 0}th,td{border:1px solid #c8c6bb;padding:7px;vertical-align:top}th{background:#ebe7dd}tr,figure,img{break-inside:avoid}img{display:block;max-width:100%;max-height:110mm;margin:16px auto}a{color:#993619;overflow-wrap:anywhere}code{font-family:monospace;font-size:9pt;background:#ece9df}pre{white-space:pre-wrap;overflow-wrap:anywhere}blockquote{border-left:3px solid #bb3c1a;padding-left:12px;color:#42514a}`;
await mkdir('artifacts',{recursive:true});
const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||'chrome',headless:true});
try{
 const page=await browser.newPage();
 await page.setContent(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Rota do Código — GDD v${pkg.version}</title><style>${css}</style></head><body>${html}</body></html>`,{waitUntil:'networkidle'});
 await page.pdf({path:'artifacts/GDD.pdf',format:'A4',printBackground:true,displayHeaderFooter:true,headerTemplate:'<div></div>',footerTemplate:`<div style="font:8px Arial;width:100%;text-align:center">Rota do Código · v${pkg.version} · documento de projeto · <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,margin:{top:'18mm',bottom:'20mm',left:'16mm',right:'16mm'}});
 await writeFile('artifacts/GDD.html',`<html><meta charset="utf-8"><style>${css}</style>${html}</html>`);
 console.log(`GDD.pdf gerado; high concept: ${high.length} caracteres. Validar com pdfinfo e inspeção visual.`);
}finally{await browser.close();}
