
import { client } from "../lib/sanity";
import { staffQuery, allNewsQuery, globalConfigQuery, locationsQuery, youthTeamsQuery } from "../lib/queries";
import SchoolPageContent from "../../components/SchoolPageContent";
import { schoolNews, trainingLocations, youthSelectionsStatic } from "../data/siteData";

export const revalidate = 60;

export default async function SchoolPage() {
  let staff = [];
  let news = [];
  let locations = [];
  let youthTeams = [];
  let logoUrl: string | undefined;

  try {
    const [s, n, l, yt, g] = await Promise.all([
      client.fetch(staffQuery).catch(() => []),
      client.fetch(allNewsQuery).catch(() => []),
      client.fetch(locationsQuery).catch(() => []),
      client.fetch(youthTeamsQuery).catch(() => []),
      client.fetch(globalConfigQuery).catch(() => null)
    ]);
    
    // Filter staff for school if category present
    staff = s.filter((person: any) => person.category === 'Škola Košarke' || !person.category);
    
    // Filter news for school
    news = n.filter((item: any) => item.category === 'Škola' || item.category === 'Mladi' || item.category === 'Upisi').slice(0, 3);
    
    locations = l;
    youthTeams = yt;
    if (g) logoUrl = g.logoUrl;

  } catch (error) {
    console.error("Greška pri dohvatu škole:", error);
  }

  // Fallback Data
  if (news.length === 0) {
      news = schoolNews.map((item: any) => ({
          title: item.title,
          slug: 'news-item',
          publishedAt: new Date().toISOString(),
          category: item.category,
          imageUrl: item.img
      }));
  }

  if (locations.length === 0) {
      locations = trainingLocations;
  }

  if (youthTeams.length === 0) {
      youthTeams = youthSelectionsStatic.map((team: any) => ({
          title: team.title,
          coach: team.coach,
          imageUrl: team.img,
          schedule: team.schedule
      }));
  }

  return (
    <SchoolPageContent 
        news={news} 
        staff={staff} 
        locations={locations} 
        youthTeams={youthTeams} 
        logoUrl={logoUrl} 
    />
  );
}
