import { client } from "../lib/sanity";
import { sponsorsQuery } from "../lib/queries";
import SponsorsPageContent from "../../components/SponsorsPageContent";
import { sponsors as staticSponsors } from "../data/siteData";

export const revalidate = 60;

export default async function SponsorsPage() {
  let sponsors = [];

  try {
    sponsors = await client.fetch(sponsorsQuery);
  } catch (error) {
    console.error("Greška pri dohvatu sponzora:", error);
  }

  // Fallback ako nema CMS podataka
  if (sponsors.length === 0) {
      sponsors = staticSponsors.map((s: any) => ({
          name: s.name,
          tier: s.tier,
          textClass: s.img, // Mapping 'img' class from siteData to textClass
          // No logoUrl in static data
      }));
  }

  return (
    <SponsorsPageContent sponsors={sponsors} />
  );
}