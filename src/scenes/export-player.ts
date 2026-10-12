import {mountPlayer} from './arcade-player';
import type {Rules} from '../core/arcade-engine';
import type {Program,Input,Value} from '../core/code-types';
import {executeCode} from '../core/code-runtime';
declare global {interface Window {__PROJECT_RULES__:Rules;__RUN_PYTHON__:(program:Program,input:Input)=>Value}}
window.__RUN_PYTHON__=executeCode;
const player=mountPlayer(document.getElementById('arcade')!,window.__PROJECT_RULES__);
document.getElementById('play')!.addEventListener('click',()=>{player.reset();player.play();});
