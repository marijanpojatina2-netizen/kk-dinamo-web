
import { client } from "../../lib/sanity";
import { playersQuery, staffQuery, globalConfigQuery } from "../../lib/queries";
// Pokušajmo s relativnom putanjom koja je sigurno točna s obzirom na strukturu
import TeamPageContent from "../../../components/TeamPageContent";
import { roster, staff as staticStaff } from "../../data/siteData";

// Forsiramo dinamičko renderiranje kako bismo izbjegli 404 na buildu ako podaci fale
export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function TeamPage() {
  let playersData: any[] = [];
  let staffData: any[] = [];
  let logoUrl: string | undefined;

  try {
    // Odvojeni pozivi da jedan ne sruši sve
    const p = await client.fetch(playersQuery).catch((e) => { console.error("Players error:", e); return []; });
    const s = await client.fetch(staffQuery).catch((e) => { console.error("Staff error:", e); return []; });
    const g = await client.fetch(globalConfigQuery).catch((e) => { console.error("Global config error:", e); return null; });

    playersData = p || [];
    staffData = s || [];
    if (g) logoUrl = g.logoUrl;
  } catch (error) {
    console.error("Critical error fetching team data:", error);
  }

  // Fallback na statičke podatke ako CMS vrati prazno
  if (playersData.length === 0) {
      playersData = roster.map((p: any) => ({
          name: p.name,
          lastname: p.last,
          number: p.num,
          position: p.pos,
          height: p.height,
          weight: p.weight,
          dob: p.dob,
          city: p.city,
          nat: p.nat,
          imageUrl: p.img
      }));
  }

  if (staffData.length === 0) {
      staffData = staticStaff.map((s: any) => ({
          name: s.name,
          lastname: s.last,
          role: s.role,
          category: "Seniori",
          dob: s.dob,
          city: s.city,
          nat: s.nat,
          imageUrl: s.img
      }));
  }

  return (
    <TeamPageContent players={playersData} staff={staffData} logoUrl={logoUrl} />
  );
}
