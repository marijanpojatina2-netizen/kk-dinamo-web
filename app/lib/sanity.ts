import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Postavljamo vaš Project ID direktno kao defaultnu vrijednost
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p474xc12';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-03-19';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // False za development da vidimo promjene odmah
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  try {
    return builder.image(source);
  } catch (error) {
    return null;
  }
}