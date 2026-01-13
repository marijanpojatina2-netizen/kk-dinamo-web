
import { groq } from "next-sanity";

// Query za Naslovnicu (Hero sekcija i Ticker)
export const homepageQuery = groq`*[_type == "homepage"][0] {
  "logoUrl": logo.asset->url,
  hero {
    title,
    subtitle,
    type,
    "imageUrl": image.asset->url,
    "mobileImageUrl": mobileImage.asset->url,
    "videoDesktopUrl": videoDesktop.asset->url,
    "videoMobileUrl": videoMobile.asset->url,
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

// Query za globalne postavke (Logo)
export const globalConfigQuery = groq`*[_type == "homepage"][0] {
  "logoUrl": logo.asset->url
}`;

// Query za Vijesti (zadnjih 6)
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

// Query za pojedinačnu vijest
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

// Query za Stručni stožer (Samo kategorija Seniori ili ako nije definirano)
export const staffQuery = groq`*[_type == "staff" && (category == "Seniori" || !defined(category))] {
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

// Query za Utakmice
export const matchesQuery = groq`*[_type == "match"] | order(date asc) {
  homeTeam,
  "homeTeamLogo": homeTeamLogo.asset->url,
  awayTeam,
  "awayTeamLogo": awayTeamLogo.asset->url,
  homeScore,
  awayScore,
  date,
  location, 
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

// NOVO: Query za Sponzore (Iz Singletona)
export const sponsorsQuery = groq`*[_type == "sponsorsPage"][0].sponsorsList[] {
  name,
  "logoUrl": logo.asset->url,
  websiteUrl,
  tier
}`;

// Query za Info o klubu
export const clubInfoQuery = groq`*[_type == "clubInfo"][0] {
  history,
  "historyImageUrl": historyImage.asset->url
}`;

// NOVO: Query za ŠKOLU (Sve iz singletona)
export const schoolPageQuery = groq`*[_type == "schoolPage"][0] {
  introTitle,
  introText,
  headOfAcademy {
    name,
    role,
    quote,
    "imageUrl": image.asset->url
  },
  selections[] {
    title,
    coach,
    "imageUrl": image.asset->url,
    schedule
  },
  locations[] {
    name,
    address,
    "imageUrl": image.asset->url,
    mapLink
  }
}`;

// Zadržavamo stare exporte ali prazne ili preusmjerene ako treba, 
// ali stranica škole sada koristi schoolPageQuery
export const locationsQuery = groq`*[_type == "schoolPage"][0].locations[] {
  name,
  address,
  "imageUrl": image.asset->url,
  mapLink
}`;

export const youthTeamsQuery = groq`*[_type == "schoolPage"][0].selections[] {
  title,
  coach,
  "imageUrl": image.asset->url,
  schedule
}`;
