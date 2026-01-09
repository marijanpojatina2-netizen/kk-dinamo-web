import { client } from "../lib/sanity";
import { allNewsQuery } from "../lib/queries";
import NewsPageContent, { NewsItem } from "../../components/NewsPageContent";
import { newsItems } from "../data/siteData";

export const revalidate = 60;

const parseDate = (str: string) => {
  if (!str) return new Date().toISOString();
  if (str.includes('-') && str.includes('T')) return str;
  const parts = str.split('.');
  if (parts.length >= 3) {
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
  }
  return new Date().toISOString();
};

export default async function NewsPage() {
  let newsData: any[] = [];

  try {
    const fetchedData = await client.fetch(allNewsQuery);
    if (fetchedData && fetchedData.length > 0) {
      newsData = fetchedData;
    }
  } catch (error) {
    console.error("Greška pri dohvatu vijesti iz Sanityja:", error);
  }

  // Mapiranje podataka kako bi odgovarali NewsItem sučelju
  // Ako nema podataka iz CMS-a, koristimo dummy podatke
  const sourceData = newsData.length > 0 ? newsData : newsItems;

  const news: NewsItem[] = sourceData.map((item: any) => ({
    title: item.title,
    slug: item.slug || 'news-item',
    // CMS vraća publishedAt, siteData vraća date.
    publishedAt: item.publishedAt || parseDate(item.date),
    category: item.category || 'Vijesti',
    // CMS vraća imageUrl, siteData vraća img.
    imageUrl: item.imageUrl || item.img,
    excerpt: item.excerpt || ''
  }));

  return (
    <NewsPageContent news={news} />
  );
}