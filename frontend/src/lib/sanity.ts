import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ws52ogy0', // Lo trovi su sanity.io/manage
  dataset: 'production',
  useCdn: true, // `false` se vuoi dati sempre freschi, `true` per performance migliori
  apiVersion: '2024-03-12', // Usa la data odierna o quella della tua configurazione
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Interfaccia per i progetti da Sanity (simile alla tua Project locale)
export interface SanityProject {
  _id: string;
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
