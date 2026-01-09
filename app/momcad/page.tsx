import { client } from "../lib/sanity";
import { playersQuery, staffQuery } from "../lib/queries";
import TeamPageContent from "../../components/TeamPageContent";
import { roster, staff } from "../data/siteData";

export const revalidate = 60;

export default async function TeamPage() {
  let playersData = [];
  let staffData = [];

  try {
    const [p, s] = await Promise.all([
      client.fetch(playersQuery).catch(() => []),
      client.fetch(staffQuery).catch(() => [])
    ]);
    playersData = p;
    staffData = s;
  } catch (error) {
    console.error("Greška pri dohvatu momčadi:", error);
  }

  // Fallback na statičke podatke ako je CMS prazan
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
      staffData = staff.map((s: any) => ({
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
    <TeamPageContent players={playersData} staff={staffData} />
  );
}