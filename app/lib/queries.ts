
import { groq } from "next-sanity";

// Query za Naslovnicu (Hero sekcija i Ticker)
// ISPRAVAK: Unutar 'hero' bloka ne koristimo prefix 'hero.', samo ime polja ('image', 'mobileImage')
export const homepageQuery = groq`*[_type == "homepage"][0] {
  "logoUrl": logo.asset->url,
  hero {
    title,
    subtitle,
    "imageUrl": image.asset->url,
    "mobileImageUrl": mobileImage.asset->url,
    buttonText,
    buttonLink
  },
  mainTicker,
  standingsConfig {
    source,
    sofascoreEmbedUrl
  },
  shopConfig {
    title,
    buttonText,
    buttonLink,
    "imageUrl": image.asset->url
  }
}`;

// NOVO: Query za globalne postavke (Logo) koje se koriste na podstranicama
export const globalConfigQuery = groq`*[_type == "homepage"][0] {
  "logoUrl": logo.asset->url
}`;

// Query za Vijesti (zadnjih 6) - koristi se na naslovnici
export const newsQuery = groq`*[_type == "news"] | order(publishedAt desc)[0...6] {
  title,
  "slug": slug.current,
  publishedAt,
  category,
  "imageUrl": image.asset->url,
  excerpt,
  isFeatured
}`;

// Query za stranicu Vijesti (sve)
export const allNewsQuery = groq`*[_type == "news"] | order(publishedAt desc)[0...20] {
  title,
  "slug": slug.current,
  publishedAt,
  category,
  "imageUrl": image.asset->url,
  excerpt,
  isFeatured
}`;

// NOVO: Query za pojedinačnu vijest
export const singleNewsQuery = groq`*[_type == "news" && slug.current == $slug][0] {
  title,
  publishedAt,
  category,
  "imageUrl": image.asset->url,
  excerpt,
  body
}`;

// Query za Igrače (Roster)
export const playersQuery = groq`*[_type == "player"] | order(number asc) {
  name,
  lastname,
  number,
  position,
  height,
  weight,
  dob,
  city,
  nat,
  "imageUrl": image.asset->url
}`;

// Query za Stručni stožer
export const staffQuery = groq`*[_type == "staff"] {
  _id,
  name,
  lastname,
  role,
  category,
  dob,
  city,
  nat,
  "imageUrl": image.asset->url
}`;

// Query za Utakmice (Raspored i Rezultati)
export const matchesQuery = groq`*[_type == "match"] | order(date asc) {
  homeTeam,
  "homeTeamLogo": homeTeamLogo.asset->url,
  awayTeam,
  "awayTeamLogo": awayTeamLogo.asset->url,
  homeScore,
  awayScore,
  date,
  league,
  "leagueLogo": leagueLogo.asset->url,
  round,
  isFinished,
  ticketLink,
  isBigAnnouncement
}`;

// Query za Ljestvicu
export const standingsQuery = groq`*[_type == "standing"] | order(position asc) {
  position,
  teamName,
  played,
  won,
  lost,
  points,
  diff,
  isDinamo
}`;

// Query za Shop
export const shopQuery = groq`*[_type == "shopItem"] {
  name,
  price,
  "imageUrl": image.asset->url,
  link
}`;

// Query za Sponzore
export const sponsorsQuery = groq`*[_type == "sponsor"] {
  name,
  "logoUrl": logo.asset->url,
  tier
}`;

// Query za Info o klubu
export const clubInfoQuery = groq`*[_type == "clubInfo"][0] {
  history,
  "historyImageUrl": historyImage.asset->url
}`;
