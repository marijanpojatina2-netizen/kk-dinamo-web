
import { MetadataRoute } from 'next';
import { client } from './lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kkdinamo.hr'; // Zamijenite s pravom domenom kad je kupite

  // 1. Dohvati sve slugove vijesti iz CMS-a
  const newsSlugs = await client.fetch(`*[_type == "news"]{ "slug": slug.current, publishedAt }`);

  // 2. Kreiraj URL-ove za vijesti
  const newsUrls = newsSlugs.map((item: any) => ({
    url: `${baseUrl}/vijesti/${item.slug}`,
    lastModified: new Date(item.publishedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Definiraj statične rute
  const staticRoutes = [
    '',
    '/vijesti',
    '/momcad',
    '/skola',
    '/klub',
    '/sponzori',
    '/press',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes, ...newsUrls] as MetadataRoute.Sitemap;
}
