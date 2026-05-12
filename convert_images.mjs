import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const sourceDir = 'C:/Users/Andrea Masucci/.gemini/antigravity/brain/1926b0a8-fa73-4583-9d65-574138b8d530';
const targetDir = 'c:/Users/Andrea Masucci/Desktop/mba studio/sito nuovo/frontend/public/media/portfolio';

const mappings = [
  { src: 'p01_variant_1778154728765.png', dest: 'p01_v.webp' },
  { src: 'p02_variant_1778154772959.png', dest: 'p02_v.webp' },
  { src: 'p03_variant_1778154788998.png', dest: 'p03_v.webp' },
  { src: 'p04_variant_1778154826448.png', dest: 'p04_v.webp' },
  { src: 'p05_variant_1778154841323.png', dest: 'p05_v.webp' },
  { src: 'p06_variant_1778154863243.png', dest: 'p06_v.webp' },
  { src: 'p07_variant_1778154876237.png', dest: 'p07_v.webp' },
  { src: 'p09_variant_1778154893397.png', dest: 'p09_v.webp' },
  { src: 'p10_variant_1778154921950.png', dest: 'p10_v.webp' },
  { src: 'p11_variant_1778154936333.png', dest: 'p11_v.webp' },
  { src: 'p12_variant_1778154954575.png', dest: 'p12_v.webp' },
  { src: 'p13_variant_1778155070337.png', dest: 'p13_v.webp' },
  { src: 'p15_variant_1778155089826.png', dest: 'p15_v.webp' },
  { src: 'p16_variant_1778155106531.png', dest: 'p16_v.webp' }
];

mappings.forEach(({ src, dest }) => {
  const srcPath = path.join(sourceDir, src);
  const destPath = path.join(targetDir, dest);
  
  if (fs.existsSync(srcPath)) {
    console.log(`Converting ${src} to ${dest}...`);
    try {
      execSync(`npx -y sharp-cli -i "${srcPath}" -o "${destPath}" -f webp -q 85`);
      console.log(`Success: ${dest}`);
    } catch (err) {
      console.error(`Error converting ${src}:`, err.message);
    }
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});
