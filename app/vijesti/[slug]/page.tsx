
import { client } from "../../lib/sanity";
import { singleNewsQuery, newsQuery, globalConfigQuery } from "../../lib/queries";
import NewsSingleContent from "../../../components/NewsSingleContent";
import { newsItems } from "../../data/siteData";
import { Metadata } from 'next';

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const article = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0]{ title, excerpt, "imageUrl": image.asset->url }`,
    { slug }
  ).catch(() => null);

  if (!article) {
    return {
      title: 'Vijest nije pronađena | KK Dinamo Zagreb',
    };
  }

  return {
    title: `${article.title} | KK Dinamo Zagreb`,
    description: article.excerpt || `Pročitajte najnovije vijesti o KK Dinamo Zagreb: ${article.title}`,
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Službena stranica KK Dinamo Zagreb',
      url: `https://www.kkdinamo.hr/vijesti/${slug}`,
      siteName: 'KK Dinamo Zagreb',
      images: [
        {
          url: article.imageUrl || 'https://shop.kkdinamo.hr/wp-content/uploads/2022/09/grb-dinamo.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'hr_HR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl || ''],
    },
  };
}

export default async function NewsSinglePage({ params }: Props) {
  const { slug } = await params;
  
  let article = null;
  let relatedNews = [];
  let logoUrl: string | undefined;

  try {
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

  // JSON-LD za Vijest (NewsArticle)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [{
      '@type': 'Organization',
      name: 'KK Dinamo Press',
      url: 'https://www.kkdinamo.hr'
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsSingleContent article={article} relatedNews={relatedNews} logoUrl={logoUrl} />
    </>
  );
}
