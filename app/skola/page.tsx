
import { client } from "../lib/sanity";
import { staffQuery, allNewsQuery, globalConfigQuery } from "../lib/queries";
import SchoolPageContent from "../../components/SchoolPageContent";
import { schoolNews } from "../data/siteData";

export const revalidate = 60;

export default async function SchoolPage() {
  let staff = [];
  let news = [];
  let logoUrl: string | undefined;

  try {
    const [s, n, g] = await Promise.all([
      client.fetch(staffQuery).catch(() => []),
      client.fetch(allNewsQuery).catch(() => []),
      client.fetch(globalConfigQuery).catch(() => null)
    ]);
    // Filter staff for school (if you have specific roles or categories in CMS)
    staff = s.filter((person: any) => person.category === 'Škola Košarke' || !person.category);
    
    // Filter news for school
    news = n.filter((item: any) => item.category === 'Škola' || item.category === 'Mladi' || item.category === 'Upisi').slice(0, 3);
    
    if (g) logoUrl = g.logoUrl;
  } catch (error) {
    console.error("Greška pri dohvatu škole:", error);
  }

  // Fallback
  if (news.length === 0) {
      news = schoolNews.map((item: any) => ({
          title: item.title,
          slug: 'news-item',
          publishedAt: new Date().toISOString(),
          category: item.category,
          imageUrl: item.img
      }));
  }

  return (
    <SchoolPageContent news={news} staff={staff} logoUrl={logoUrl} />
  );
}
