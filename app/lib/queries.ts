
import { groq } from "next-sanity";

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

export const globalConfigQuery = groq`*[_type == "homepage"][0] {
  "logoUrl": logo.asset->url
}`;

export const newsQuery = groq`*[_type == "news"] | order(publishedAt desc)[0...6] {
  title,
  "slug": slug.current,
  publishedAt,
  category,
  "imageUrl": image.asset->url,
  excerpt,
  isFeatured
}`;

export const allNewsQuery = groq`*[_type == "news"] | order(publishedAt desc)[0...20] {
  title,
  "slug": slug.current,
  publishedAt,
  category,
  "imageUrl": image.asset->url,
  excerpt,
  isFeatured
}`;

export const singleNewsQuery = groq`*[_type == "news" && slug.current == $slug][0] {
  title,
  publishedAt,
  category,
  "imageUrl": image.asset->url,
  excerpt,
  body
}`;

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

export const shopQuery = groq`*[_type == "shopItem"] {
  name,
  price,
  "imageUrl": image.asset->url,
  link
}`;

export const sponsorsQuery = groq`*[_type == "sponsorsPage"][0].sponsorsList[] {
  name,
  "logoUrl": logo.asset->url,
  websiteUrl,
  tier
}`;

export const clubInfoQuery = groq`*[_type == "clubInfo"][0] {
  history,
  "historyImageUrl": historyImage.asset->url
}`;

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

// NOVO: Query za Impresum i Privatnost
export const legalPageQuery = groq`*[_type == "legalPage" && _id == $id][0] {
  title,
  content
}`;
