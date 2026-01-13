
import { client } from "../lib/sanity";
import { allNewsQuery, globalConfigQuery, schoolPageQuery } from "../lib/queries";
import SchoolPageContent from "../../components/SchoolPageContent";
import { schoolNews, trainingLocations, youthSelectionsStatic } from "../data/siteData";

export const revalidate = 60;

export default async function SchoolPage() {
  let schoolData: any = null;
  let news = [];
  let logoUrl: string | undefined;

  try {
    const [sData, n, g] = await Promise.all([
      client.fetch(schoolPageQuery).catch(() => null),
      client.fetch(allNewsQuery).catch(() => []),
      client.fetch(globalConfigQuery).catch(() => null)
    ]);
    
    schoolData = sData;
    
    // Filter news for school
    news = n.filter((item: any) => item.category === 'Škola' || item.category === 'Mladi' || item.category === 'Upisi').slice(0, 3);
    
    if (g) logoUrl = g.logoUrl;

  } catch (error) {
    console.error("Greška pri dohvatu škole:", error);
  }

  // Fallback Data Logic
  if (news.length === 0) {
      news = schoolNews.map((item: any) => ({
          title: item.title,
          slug: 'news-item',
          publishedAt: new Date().toISOString(),
          category: item.category,
          imageUrl: item.img
      }));
  }

  // Prepare Props from Singleton or Fallback
  const staff = []; // Not used directly in new content structure if integrated into selections/head
  
  // Ako nemamo podatke iz CMS-a (schoolData), koristimo statičke
  const locations = schoolData?.locations || trainingLocations;
  const youthTeams = schoolData?.selections || youthSelectionsStatic.map((team: any) => ({
          title: team.title,
          coach: team.coach,
          imageUrl: team.img,
          schedule: team.schedule
  }));

  // Pass headOfAcademy if available inside the component props structure or adjust component
  // For now, SchoolPageContent expects standard arrays, but let's pass schoolData extras if we modify the component later.
  // Currently, the Component expects: news, staff, locations, youthTeams. 
  // We can stick to that contract.

  return (
    <SchoolPageContent 
        news={news} 
        staff={staff} // Staff is now handled mostly via Head of Academy or Selections in CMS
        locations={locations} 
        youthTeams={youthTeams} 
        logoUrl={logoUrl} 
        // We might want to pass headOfAcademy down if SchoolPageContent supports it, 
        // but for now, we ensure the basic arrays work from the new Singleton.
    />
  );
}
