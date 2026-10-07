import { readFileSync } from 'node:fs';
import { validateContent } from '../src/content/validate';
const path=process.argv[2] ?? 'src/content/levels.json';
try {
  const levels=validateContent(JSON.parse(readFileSync(path,'utf8')));
  console.log(`Conteúdo válido: ${levels.length} fases, todas com solução executável.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode=1;
}
