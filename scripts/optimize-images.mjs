/* Préoptimisation des images au build (CLAUDE.md §2 : ne pas dépendre
   de l'optimisation d'images Vercel).

   Usage : node scripts/optimize-images.mjs
   Lit les artworks de _assets-source/, les convertit en WebP (max 800px
   de large, qualité 80) vers public/images/characters/, avec un nom
   kebab-case (ex. IchigoBankai.webp → ichigo-bankai.webp). */

import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "_assets-source";
const TARGET_DIR = "public/images/characters";
const MAX_WIDTH = 800;
const QUALITY = 80;

function kebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

const files = (await readdir(SOURCE_DIR)).filter((f) =>
  /\.(webp|png|jpe?g|avif)$/i.test(f)
);
await mkdir(TARGET_DIR, { recursive: true });

for (const file of files) {
  const base = kebabCase(path.parse(file).name);
  const target = path.join(TARGET_DIR, `${base}.webp`);
  const info = await sharp(path.join(SOURCE_DIR, file))
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target);
  console.log(`${file} → ${target} (${Math.round(info.size / 1024)} ko)`);
}

console.log(`${files.length} image(s) optimisée(s).`);
