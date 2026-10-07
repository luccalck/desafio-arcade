import type {Level} from '../core/types';
export const tutorial:Level={
 id:'treino',title:'Treino de comandos',concept:'Primeiros comandos',objective:'Aprenda a avançar, coletar e virar.',
 briefing:'Faça uma ação por vez. Na missão você montará o programa antes de executar.',hint:'Siga o comando destacado.',hints:['Siga o comando destacado.','Observe o efeito de cada ação.'],
 lesson:'Avançar move; coletar altera dados; virar muda a direção.',grid:['###','#.#','..#'],start:{x:0,y:2,direction:'east'},goal:{x:1,y:1},
 maxBlocks:4,maxSteps:8,allowRepeat:false,allowedActions:['advance','collect','left'],requiredPackets:1,requiresCircuit:false,
 objects:[{kind:'terminal',id:'treino-dados',x:1,y:2}],initialProgram:[],solution:[{kind:'advance'},{kind:'collect'},{kind:'left'},{kind:'advance'}]
};
export const tutorialSteps=[
 {kind:'advance' as const,title:'01 / Avance até o terminal',text:'O robô aponta para a direita. Avançar move uma casa nessa direção.'},
 {kind:'collect' as const,title:'02 / Recupere o pacote',text:'Você está sobre o terminal azul. Coletar muda a variável pacotes de 0 para 1.'},
 {kind:'left' as const,title:'03 / Mude a direção',text:'Virar à esquerda faz o robô olhar para cima. Ele continua na mesma casa.'},
 {kind:'advance' as const,title:'04 / Chegue ao servidor',text:'Agora Avançar move para cima. O pacote já foi coletado: o servidor pode receber a entrega.'}
];
