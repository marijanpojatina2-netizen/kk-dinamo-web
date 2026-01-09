import { client } from "./lib/sanity";
import { 
  homepageQuery, 
  newsQuery, 
  matchesQuery, 
  playersQuery, 
  shopQuery, 
  standingsQuery 
} from "./lib/queries";
import HomePageContent from "../components/HomePageContent";
import { 
  heroContent, 
  mainTicker as staticTicker, 
  newsItems,    
  matchCenter, 
  resultsTicker, 
  shopItems, 
  roster, 
  standings 
} from "./data/siteData";

export const revalidate = 60; // Osvježi podatke svakih 60 sekundi

// Helper za parsiranje datuma iz formata DD.MM.YYYY u ISO string
const parseDate = (str: string) => {
  if (!str) return new Date().toISOString();
  // Ako je već ISO (ima crtice i T), vrati ga
  if (str.includes('-') && str.includes('T')) return str;
  
  const parts = str.split('.');
  if (parts.length >= 3) {
    // DD.MM.YYYY -> YYYY-MM-DD
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
  }
  return new Date().toISOString();
};

export default async function Home() {
  let homepageData, newsData, matchesData, playersData, shopData, standingsData;

  try {
    // Pokušaj dohvatiti podatke iz Sanityja
    const data = await Promise.all([
      client.fetch(homepageQuery).catch(() => null),
      client.fetch(newsQuery).catch(() => null),
      client.fetch(matchesQuery).catch(() => null),
      client.fetch(playersQuery).catch(() => null),
      client.fetch(shopQuery).catch(() => null),
      client.fetch(standingsQuery).catch(() => null)
    ]);

    [homepageData, newsData, matchesData, playersData, shopData, standingsData] = data;
    
  } catch (error) {
    console.error("Greška pri dohvatu iz Sanityja (koristim statičke podatke):", error);
  }

  // --- MAPIRANJE PODATAKA (FALLBACK NA SITEDATA) ---

  // 1. Hero
  const hero = homepageData?.hero || {
    title: heroContent.titleLine1 ? `${heroContent.titleLine1}\n${heroContent.titleLine2}` : "KK DINAMO\nZAGREB",
    subtitle: heroContent.subtitle,
    imageUrl: heroContent.image,
    buttonText: heroContent.buttonText,
    buttonLink: heroContent.buttonLink
  };

  // 2. Ticker
  // Sanity vraća string, siteData vraća array stringova
  const mainTicker = homepageData?.mainTicker || (Array.isArray(staticTicker) ? staticTicker.join(" /// ") : staticTicker);

  // 3. News
  const newsSource = (newsData && newsData.length > 0) ? newsData : newsItems;
  const news = newsSource.map((item: any) => ({
     title: item.title,
     slug: item.slug || 'news-item',
     // Ako dolazi iz Sanityja ima publishedAt, ako iz siteData ima date (string)
     publishedAt: item.publishedAt || parseDate(item.date),
     category: item.category || 'Vijesti',
     // Sanity ima imageUrl, siteData ima img
     imageUrl: item.imageUrl || item.img,
     excerpt: item.excerpt || ''
  }));

  // 4. Matches
  let matches = [];
  let featuredMatch = null;

  if (matchesData && matchesData.length > 0) {
      matches = matchesData;
      featuredMatch = matchesData.find((m: any) => m.isBigAnnouncement) 
        || matchesData.find((m: any) => !m.isFinished) 
        || null;
  } else {
      // Fallback iz resultsTicker
      matches = resultsTicker.map((r: any) => ({
          homeTeam: r.h === "DIN" ? "Dinamo" : r.h,
          awayTeam: r.a === "DIN" ? "Dinamo" : r.a,
          homeScore: r.score.includes(":") ? parseInt(r.score.split(":")[0]) : undefined,
          awayScore: r.score.includes(":") ? parseInt(r.score.split(":")[1]) : undefined,
          date: parseDate(r.date + "2024"), // Dodajemo godinu jer je u siteData nema
          league: "Premijer Liga",
          round: "Kolo X",
          isFinished: r.score.includes(":"),
      }));

      // Fallback featured match iz matchCenter
      featuredMatch = {
          homeTeam: matchCenter.homeTeam,
          awayTeam: matchCenter.awayTeam,
          // Postavi datum 2 dana u budućnost
          date: new Date(Date.now() + 172800000).toISOString(), 
          league: matchCenter.league,
          round: matchCenter.round,
          isFinished: false,
          ticketLink: matchCenter.ticketLink,
          isBigAnnouncement: true
      };
  }

  // 5. Roster
  const rosterSource = (playersData && playersData.length > 0) ? playersData : roster;
  const teamRoster = rosterSource.map((p: any) => ({
      name: p.name,
      lastname: p.lastname || p.last,
      number: p.number || p.num,
      position: p.position || p.pos,
      imageUrl: p.imageUrl || p.img
  }));

  // 6. Shop
  const shopSource = (shopData && shopData.length > 0) ? shopData : shopItems;
  const shop = shopSource.map((s: any) => ({
      name: s.name,
      price: s.price,
      imageUrl: s.imageUrl || s.img,
      link: s.link || '#'
  }));

  // 7. Standings
  const standingsSource = (standingsData && standingsData.length > 0) ? standingsData : standings;
  const table = standingsSource.map((t: any) => ({
      position: t.position || t.pos,
      teamName: t.teamName || t.name,
      played: t.played || t.p,
      won: t.won || t.w,
      lost: t.lost || t.l,
      points: t.points || t.pts,
      diff: t.diff,
      isDinamo: t.isDinamo || t.active
  }));

  return (
    <HomePageContent 
      hero={hero}
      mainTicker={mainTicker}
      news={news}
      matches={matches}
      featuredMatch={featuredMatch}
      roster={teamRoster}
      shopItems={shop}
      standings={table}
    />
  );
}