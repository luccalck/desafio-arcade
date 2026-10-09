import {mountPlayer} from './arcade-player';
import type {Rules} from '../core/arcade-engine';
declare global {interface Window {__PROJECT_RULES__:Rules}}
const host=document.getElementById('arcade')!;
const player=mountPlayer(host,window.__PROJECT_RULES__);
document.getElementById('play')!.addEventListener('click',()=>{player.reset();player.play();});
