import { client } from "../lib/sanity";
import { clubInfoQuery } from "../lib/queries";
import ClubPageContent from "../../components/ClubPageContent";
import { clubContent } from "../data/siteData";

export const revalidate = 60;

export default async function ClubPage() {
  let clubInfo = null;

  try {
    clubInfo = await client.fetch(clubInfoQuery);
  } catch (error) {
    console.error("Greška pri dohvatu info kluba:", error);
  }

  // Fallback ako nema podataka
  if (!clubInfo) {
      // Create a simple block structure from the static string array
      const historyBlocks = clubContent.mainText.map(text => ({
          _type: 'block',
          children: [{ _type: 'span', text: text }]
      }));

      clubInfo = {
          history: historyBlocks,
          historyImageUrl: clubContent.historyImage
      };
  }

  return (
    <ClubPageContent clubInfo={clubInfo} />
  );
}