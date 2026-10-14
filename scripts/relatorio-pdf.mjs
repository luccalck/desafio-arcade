import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import MarkdownIt from 'markdown-it';
import { chromium } from 'playwright';

const execFileAsync = promisify(execFile);

const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const source = await readFile('docs/relatorio.md', 'utf8');

if (!source.includes('# Relatório Técnico') && !source.includes('# Relatório técnico')) {
  throw new Error('Título do relatório técnico ausente em docs/relatorio.md');
}

// Render markdown to HTML
const md = new MarkdownIt({ html: true, linkify: true });
let html = md.render(source.replaceAll('{{VERSION}}', pkg.version));

// Inline local images as base64
for (const match of [...html.matchAll(/src="([^"]+\.(?:png|jpg|jpeg|svg|webp))"/g)]) {
  const imgPath = match[1];
  try {
    const fullPath = resolve(imgPath.startsWith('docs/') ? imgPath : resolve('docs', imgPath));
    const image = await readFile(fullPath);
    let mime = 'image/png';
    if (imgPath.endsWith('.svg')) mime = 'image/svg+xml';
    else if (imgPath.endsWith('.jpg') || imgPath.endsWith('.jpeg')) mime = 'image/jpeg';
    else if (imgPath.endsWith('.webp')) mime = 'image/webp';
    html = html.replace(match[0], `src="data:${mime};base64,${image.toString('base64')}"`);
  } catch (err) {
    console.warn(`Aviso: imagem não encontrada para inline: ${imgPath} (${err.message})`);
  }
}

const css = `
@page {
  size: A4;
  margin: 14mm 14mm 18mm 14mm;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 8.8pt;
  line-height: 1.38;
  color: #1a202c;
  background: #ffffff;
}
h1 {
  font-size: 20pt;
  line-height: 1.2;
  color: #1a365d;
  border-bottom: 2.5px solid #2b6cb0;
  padding-bottom: 8px;
  margin-top: 0;
  margin-bottom: 12px;
}
h2 {
  font-size: 13pt;
  line-height: 1.25;
  color: #2b6cb0;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 4px;
  margin-top: 14px;
  margin-bottom: 8px;
  break-after: avoid;
}
h3 {
  font-size: 10.5pt;
  color: #2d3748;
  margin-top: 10px;
  margin-bottom: 4px;
  break-after: avoid;
}
p, li {
  orphans: 3;
  widows: 3;
  margin-bottom: 6px;
}
ul, ol {
  margin-top: 2px;
  margin-bottom: 6px;
  padding-left: 20px;
}
li {
  margin-bottom: 3px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 7.8pt;
  margin: 8px 0;
  break-inside: avoid;
}
th, td {
  border: 1px solid #cbd5e0;
  padding: 4px 6px;
  text-align: left;
  vertical-align: top;
}
th {
  background: #edf2f7;
  color: #2d3748;
  font-weight: 600;
}
tr {
  break-inside: avoid;
}
figure, img {
  break-inside: avoid;
}
img {
  display: block;
  max-width: 95%;
  max-height: 75mm;
  margin: 8px auto;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}
a {
  color: #2b6cb0;
  text-decoration: underline;
  overflow-wrap: anywhere;
}
code {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 7.8pt;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 3px;
  padding: 1px 3px;
}
pre {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 7.8pt;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  break-inside: avoid;
}
blockquote {
  border-left: 3px solid #3182ce;
  margin: 6px 0;
  padding: 4px 10px;
  background: #ebf8ff;
  color: #2c5282;
  font-size: 8.2pt;
}
hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 12px 0;
}
.badge {
  display: inline-block;
  padding: 2px 6px;
  font-size: 7pt;
  font-weight: bold;
  border-radius: 3px;
  background: #e2e8f0;
  color: #4a5568;
}
`;

await mkdir('artifacts', { recursive: true });

const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
  headless: true
});

try {
  const page = await browser.newPage();
  const fullHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Rota do Código — Relatório Técnico v${pkg.version}</title>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;

  await page.setContent(fullHtml, { waitUntil: 'networkidle' });

  const pdfPath = 'artifacts/RelatorioTecnico.pdf';
  const htmlPath = 'artifacts/RelatorioTecnico.html';

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="font-family: sans-serif; font-size: 7.5pt; color: #718096; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between;">
      <span>Rota do Código · Squad Aura 67 · Relatório Técnico v${pkg.version}</span>
      <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
    </div>`,
    margin: {
      top: '14mm',
      bottom: '18mm',
      left: '14mm',
      right: '14mm'
    }
  });

  await writeFile(htmlPath, fullHtml);

  // Validate PDF integrity and page count
  const pdfBytes = await readFile(pdfPath);
  const pdfHeader = pdfBytes.subarray(0, 5).toString('latin1');
  if (!pdfHeader.startsWith('%PDF-')) {
    throw new Error(`Cabeçalho inválido no arquivo PDF gerado: ${pdfHeader}`);
  }

  // Count pages from PDF structure or pdfinfo
  let pageCount = null;
  try {
    const { stdout } = await execFileAsync('pdfinfo', [pdfPath]);
    const m = stdout.match(/Pages:\s+(\d+)/);
    if (m) pageCount = parseInt(m[1], 10);
  } catch {
    // pdfinfo not installed, parse PDF catalog
    const text = pdfBytes.toString('latin1');
    const m = text.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/);
    if (m) pageCount = parseInt(m[1], 10);
  }

  console.log(`Relatório Técnico PDF gerado com sucesso: ${pdfPath} (${pdfBytes.length} bytes)`);
  if (pageCount !== null) {
    console.log(`Total de páginas: ${pageCount}`);
    if (pageCount > 12) {
      throw new Error(`Relatório técnico excedeu o limite máximo de 12 páginas: ${pageCount} páginas.`);
    }
  } else {
    console.log('Aviso: Não foi possível determinar a contagem exata de páginas via parser/pdfinfo.');
  }
} finally {
  await browser.close();
}
