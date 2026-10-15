import source from '../src/content/missions.json';
import {validateContent} from '../src/content/validate';
const missions=validateContent(source);
console.log(`Conteúdo válido: ${missions.length} missões; cinco referências passam e starters têm falhas observáveis.`);
