import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ws52ogy0',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-12',
});

// Client con permessi di scrittura per il pannello Admin
export const writeClient = createClient({
  projectId: 'ws52ogy0',
  dataset: 'production',
  token: 'skyDqFNAzFFEOPCXLceK4RNTH2FIh8YHXe3b336tpu2tHXwGVr1hsvOQlzuR5RvZnSYgyJvSN3k73G7rCzdv9e6eIR6lEogf2kKOnlsuGOQqd7lHdWrq8T12dXG8coE9EGYluomWXl02DZSSSGDznZLpbMoSjgOqULCRL2CgiaD6SnfConQT',
  useCdn: false,
  apiVersion: '2024-03-12',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Interfaccia per i progetti da Sanity
export interface SanityProject {
  _id: string;
  id: string;
  title: string;
  description: string;
  mainImage: any;
  location: string;
  category: string;
  client: string;
  amount: string;
  services: string;
  credits: string;
  images: any[];
  rank?: string;
  slug: {
    current: string;
  };
}

// Convert DataURL to Blob for Sanity Asset Upload
export function dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/webp';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// Helper per caricare immagini WebP su Sanity Assets
export async function uploadWebPToSanity(dataUrlOrUrl: string, fileName: string = 'image.webp') {
  if (!dataUrlOrUrl) return null;
  try {
    let blob: Blob;
    if (dataUrlOrUrl.startsWith('data:')) {
      blob = dataURLtoBlob(dataUrlOrUrl);
    } else {
      const res = await fetch(dataUrlOrUrl);
      blob = await res.blob();
    }
    const asset = await writeClient.assets.upload('image', blob, { filename: fileName });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.error('Errore durante il caricamento asset su Sanity:', err);
    return null;
  }
}
