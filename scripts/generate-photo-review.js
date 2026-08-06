/**
 * Gera assets/photo-review.html: página autocontida (fotos embutidas em base64)
 * para classificar cada foto/video de assets/raw/ antes de usar na landing page.
 *
 * Uso: node scripts/generate-photo-review.js
 * Rode de novo sempre que adicionar fotos novas em assets/raw/ — classificações
 * já feitas são preservadas (ligadas ao nome do arquivo, não à ordem).
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'assets', 'raw');
const OUT_FILE = path.join(ROOT, 'assets', 'photo-review.html');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO_EXT = new Set(['.mp4', '.mov']);

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext)) {
        results.push(full);
      }
    }
  }
  return results;
}

function mimeFor(ext) {
  if (ext === '.mp4') return 'video/mp4';
  if (ext === '.mov') return 'video/quicktime';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  return 'image/jpeg';
}

if (!fs.existsSync(RAW_DIR)) {
  console.error(`Pasta não encontrada: ${RAW_DIR}`);
  console.error('Coloque as fotos/vídeos em assets/raw/ (extraia zips antes, se houver) e rode de novo.');
  process.exit(1);
}

const files = walk(RAW_DIR).sort();

if (files.length === 0) {
  console.error(`Nenhuma foto/vídeo encontrado em ${RAW_DIR}`);
  console.error('Extensões aceitas: ' + [...IMAGE_EXT, ...VIDEO_EXT].join(', '));
  process.exit(1);
}

const items = files.map((full) => {
  const ext = path.extname(full).toLowerCase();
  const buf = fs.readFileSync(full);
  const relName = path.relative(RAW_DIR, full);
  // ID estável: derivado do nome do arquivo (não do índice), então classificações
  // sobrevivem a reordenação/novos arquivos entre execuções.
  const id = 'ph_' + crypto.createHash('md5').update(relName).digest('hex').slice(0, 10);
  return {
    id,
    filename: relName,
    kind: VIDEO_EXT.has(ext) ? 'video' : 'image',
    src: `data:${mimeFor(ext)};base64,${buf.toString('base64')}`,
    sizeKB: Math.round(buf.length / 1024),
    suggestion: '',
    note: '',
  };
});

const totalMB = (items.reduce((s, i) => s + i.sizeKB, 0) / 1024).toFixed(1);
console.log(`Encontrados ${items.length} arquivo(s), ~${totalMB}MB total.`);

const template = fs.readFileSync(path.join(__dirname, 'photo-review-template.html'), 'utf8');
const output = template.replace('__GALLERY_DATA__', JSON.stringify(items));

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, output);

console.log(`Gerado: ${OUT_FILE}`);
console.log('Abra esse arquivo direto no navegador (duplo-clique).');
