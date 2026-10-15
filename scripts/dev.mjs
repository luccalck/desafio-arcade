import { createServer } from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const directory=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml'};
createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let target=resolve(directory,`.${pathname}`);
    if(target!==directory&&!target.startsWith(directory+sep)){res.writeHead(403).end();return;}
    if((await stat(target)).isDirectory())target=resolve(target,'index.html');
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(await readFile(target));
  } catch {res.writeHead(404).end('Arquivo não encontrado.');}
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Rota do Código: http://127.0.0.1:4173'));
