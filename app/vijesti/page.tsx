import { client } from "../lib/sanity";
import { allNewsQuery } from "../lib/queries";
import NewsPageContent from "../../components/NewsPageContent";
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
  let news = [];

  try {
    const newsData = await client.fetch(allNewsQuery);
    if (newsData && newsData.length > 0) {
      news = newsData;
    }
  } catch (error) {
    console.error("Greška pri dohvatu vijesti iz Sanityja:", error);
  }

  // Fallback ako nema podataka u Sanityju
  if (news.length === 0) {
     news = newsItems.map((item: any) => ({
        title: item.title,
        slug: item.slug || 'news-item',
        publishedAt: item.publishedAt || parseDate(item.date),
        category: item.category || 'Vijesti',
        imageUrl: item.imageUrl || item.img,
        excerpt: item.excerpt || ''
     }));
  }

  return (
    <NewsPageContent news={news} />
  );
}   