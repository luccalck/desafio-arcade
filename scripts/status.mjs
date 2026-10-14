import {writeFile,mkdir} from 'node:fs/promises';
import {dirname} from 'node:path';
import {loadStatus} from '../pages/status/status.mjs';
const [repository,siteUrl,output='reports/painel-status.json']=process.argv.slice(2);
if(!repository||!siteUrl)throw Error('Use REPOSITORY SITE_URL [OUTPUT].');
const u=new URL(siteUrl);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)throw Error('SITE_URL HTTPS exigida.');
const data=await loadStatus({repository,rolloutUrl:new URL('rollout.json',u.href.replace(/\/?$/,'/')).href});await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify({collectedAt:new Date().toISOString(),...data},null,2)+'\n');console.log(JSON.stringify(data));
