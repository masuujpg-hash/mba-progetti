import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: 'ws52ogy0',
  dataset: 'production',
  token: 'skyDqFNAzFFEOPCXLceK4RNTH2FIh8YHXe3b336tpu2tHXwGVr1hsvOQlzuR5RvZnSYgyJvSN3k73G7rCzdv9e6eIR6lEogf2kKOnlsuGOQqd7lHdWrq8T12dXG8coE9EGYluomWXl02DZSSSGDznZLpbMoSjgOqULCRL2CgiaD6SnfConQT',
  useCdn: false,
  apiVersion: '2024-03-12',
});

// Read and parse projects.ts content
const tsPath = path.join(__dirname, 'src', 'data', 'projects.ts');
const tsRaw = fs.readFileSync(tsPath, 'utf-8');
const jsonMatch = tsRaw.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/);

if (!jsonMatch) {
  console.error('Impossible leggere i progetti da projects.ts');
  process.exit(1);
}

const projects = JSON.parse(jsonMatch[1]);

async function uploadImage(imagePath) {
  if (!imagePath) return null;
  const fullPath = path.join(__dirname, 'public', imagePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File non trovato: ${fullPath}`);
    return null;
  }
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
      filename: path.basename(fullPath)
    });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.error(`❌ Errore caricamento immagine ${imagePath}:`, err.message);
    return null;
  }
}

async function syncSanity() {
  console.log('🚀 Avvio sincronizzazione Sanity Studio...');

  try {
    await client.delete({ query: '*[_type == "project"]' });
    console.log('🗑️ Vecchi documenti rimossi da Sanity.');
  } catch (e) {
    console.warn('Avviso pulizia Sanity:', e.message);
  }

  for (const p of projects) {
    console.log(`\n📦 Caricamento su Sanity: ${p.title}`);
    
    try {
      const mainImage = await uploadImage(p.image);
      const gallery = [];
      if (p.images) {
        for (const img of p.images) {
          const uploaded = await uploadImage(img);
          if (uploaded) gallery.push(uploaded);
        }
      }

      const doc = {
        _type: 'project',
        id: p.id,
        title: p.title,
        slug: { _type: 'slug', current: p.id },
        description: p.description,
        location: p.location,
        category: p.category,
        client: p.client,
        amount: p.amount,
        services: p.services,
        credits: p.credits,
        rank: p.rank || '',
        mainImage,
        images: gallery,
      };

      await client.create(doc);
      console.log(`✅ Progetto salvato su Sanity: ${p.title}`);
    } catch (err) {
      console.error(`❌ Errore caricamento per ${p.title}:`, err.message);
    }
  }
  console.log('\n✨ Sincronizzazione Sanity Studio completata!');
}

syncSanity();
