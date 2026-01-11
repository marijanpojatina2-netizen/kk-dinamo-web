
import { client } from "../../lib/sanity";
import { singleNewsQuery, newsQuery, globalConfigQuery } from "../../lib/queries";
import NewsSingleContent from "../../../components/NewsSingleContent";
import { newsItems } from "../../data/siteData";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
}

export default async function NewsSinglePage({ params }: Props) {
  const { slug } = await params;
  
  let article = null;
  let relatedNews = [];
  let logoUrl: string | undefined;

  try {
    // 1. Fetch main article, related news and global config (logo) in parallel
    const [fetchedArticle, allNews, globalConfig] = await Promise.all([
      client.fetch(singleNewsQuery, { slug }),
      client.fetch(newsQuery),
      client.fetch(globalConfigQuery).catch(() => null)
    ]);
    
    article = fetchedArticle;
    relatedNews = allNews.filter((n: any) => n.slug !== slug).slice(0, 3);
    if (globalConfig) logoUrl = globalConfig.logoUrl;

  } catch (error) {
    console.error("Greška pri dohvatu članka:", error);
  }

  // Fallback na dummy podatke ako CMS ne vrati ništa
  if (!article) {
      const staticItem = newsItems.find(n => n.slug === slug) || newsItems[0];
      
      article = {
          title: staticItem.title,
          publishedAt: new Date().toISOString(),
          category: staticItem.category,
          imageUrl: staticItem.img,
          excerpt: staticItem.excerpt || "Nema opisa.",
          body: [] 
      };
      
      relatedNews = newsItems.slice(1, 4).map(n => ({
          title: n.title,
          slug: n.slug || 'slug',
          publishedAt: new Date().toISOString(),
          imageUrl: n.img
      }));
  }

  return (
    <NewsSingleContent article={article} relatedNews={relatedNews} logoUrl={logoUrl} />
  );
}
