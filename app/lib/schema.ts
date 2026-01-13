
// Definicije Sanity schema tipova premještene ovdje radi boljeg buildanja

// Helper za URL validaciju - Olabavljena validacija
const urlValidation = (Rule: any) => Rule.uri({
  scheme: ['http', 'https', 'mailto', 'tel'],
  allowRelative: true // Dozvoljava relativne linkove
});

// 1. IGRAC (Player)
const player = {
  name: 'player',
  title: 'Igrači',
  type: 'document',
  fields: [
    { name: 'name', title: 'Ime', type: 'string' },
    { name: 'lastname', title: 'Prezime', type: 'string' },
    { name: 'number', title: 'Broj dresa', type: 'number' },
    { 
      name: 'position', 
      title: 'Pozicija', 
      type: 'string',
      options: { list: ['Play', 'Bek', 'Krilo', 'Centar'] }
    },
    { name: 'height', title: 'Visina (cm)', type: 'string' },
    { name: 'weight', title: 'Težina (kg)', type: 'string' },
    { name: 'dob', title: 'Datum rođenja', type: 'string' },
    { name: 'city', title: 'Mjesto rođenja', type: 'string' },
    { name: 'image', title: 'Slika igrača', type: 'image', options: { hotspot: true } },
  ]
}

// 2. OSOBLJE (Staff - Treneri i voditelji)
const staff = {
  name: 'staff',
  title: 'Stručni Stožer & Škola',
  type: 'document',
  fields: [
    { name: 'name', title: 'Ime', type: 'string' },
    { name: 'lastname', title: 'Prezime', type: 'string' },
    { name: 'role', title: 'Uloga', type: 'string' }, 
    { 
      name: 'category', 
      title: 'Kategorija', 
      type: 'string', 
      options: { list: ['Seniori', 'Škola Košarke'] }
    },
    { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } },
  ]
}

// 3. VIJESTI (News)
const news = {
  name: 'news',
  title: 'Vijesti',
  type: 'document',
  fields: [
    { name: 'title', title: 'Naslov', type: 'string' },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Datum objave', type: 'datetime' },
    { name: 'category', title: 'Kategorija', type: 'string', options: { list: ['Utakmice', 'Klub', 'Intervju', 'Škola', 'Ulaznice'] } },
    { name: 'image', title: 'Glavna slika', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', title: 'Kratki uvod (za naslovnicu)', type: 'text', rows: 3 },
    // UPDATE: Added image support to body
    { 
      name: 'body', 
      title: 'Tekst članka', 
      type: 'array', 
      of: [
        {type: 'block'},
        {type: 'image', options: { hotspot: true }, fields: [{name: 'caption', type: 'string', title: 'Opis slike'}]}
      ] 
    },
    { name: 'isFeatured', title: 'Izdvojeno na naslovnici (Velika slika)', type: 'boolean' },
  ]
}

// 4. UTAKMICE (Matches - Raspored i Rezultati)
const match = {
  name: 'match',
  title: 'Utakmice',
  type: 'document',
  fields: [
    { name: 'homeTeam', title: 'Domaćin', type: 'string' },
    { name: 'homeTeamLogo', title: 'Grb Domaćina', type: 'image' }, 
    { name: 'awayTeam', title: 'Gost', type: 'string' },
    { name: 'awayTeamLogo', title: 'Grb Gosta', type: 'image' },
    { name: 'homeScore', title: 'Poeni Domaćin', type: 'number' },
    { name: 'awayScore', title: 'Poeni Gost', type: 'number' },
    { name: 'date', title: 'Datum i vrijeme', type: 'datetime' },
    // UPDATE: Added location field
    { name: 'location', title: 'Lokacija (Dvorana)', type: 'string', initialValue: 'KC Dražen Petrović' },
    { name: 'league', title: 'Liga', type: 'string', initialValue: 'Premijer Liga' },
    { name: 'leagueLogo', title: 'Logo Lige/Natjecanja', type: 'image' },
    { name: 'round', title: 'Kolo', type: 'string' },
    { name: 'isFinished', title: 'Završena utakmica', type: 'boolean' },
    { name: 'ticketLink', title: 'Link na ulaznice (ako je buduća)', type: 'url', validation: urlValidation },
    { name: 'isBigAnnouncement', title: 'Prikaži kao Glavnu Najavu', type: 'boolean' }, 
  ]
}

// 5. SHOP ARTIKLI
const shopItem = {
  name: 'shopItem',
  title: 'Webshop Artikli',
  type: 'document',
  fields: [
    { name: 'name', title: 'Naziv artikla', type: 'string' },
    { name: 'price', title: 'Cijena', type: 'string' },
    { name: 'image', title: 'Slika artikla', type: 'image' },
    { name: 'link', title: 'Link na Webshop', type: 'url', validation: urlValidation },
  ]
}

// 6. SPONZORI
const sponsor = {
  name: 'sponsor',
  title: 'Sponzori',
  type: 'document',
  fields: [
    { name: 'name', title: 'Naziv firme', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image' },
    // UPDATE: Added website URL
    { name: 'websiteUrl', title: 'Web Stranica', type: 'url', validation: urlValidation },
    { 
      name: 'tier', 
      title: 'Razina sponzorstva', 
      type: 'string',
      options: { list: ['Generalni', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Media'] }
    },
  ]
}

// 7. LJESTVICA (Standings)
const standing = {
  name: 'standing',
  title: 'Ljestvica (Ručni Unos)',
  type: 'document',
  fields: [
    { name: 'position', title: 'Pozicija', type: 'number' },
    { name: 'teamName', title: 'Ime kluba', type: 'string' },
    { name: 'played', title: 'Odigrano', type: 'number' },
    { name: 'won', title: 'Pobjede', type: 'number' },
    { name: 'lost', title: 'Porazi', type: 'number' },
    { name: 'points', title: 'Bodovi', type: 'number' },
    { name: 'diff', title: 'Koš razlika', type: 'string' },
    { name: 'isDinamo', title: 'Je li ovo Dinamo?', type: 'boolean' },
  ]
}

// 8. HOMEPAGE CONFIG
const homepage = {
  name: 'homepage',
  title: 'Postavke Naslovnice',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo Kluba',
      type: 'image',
      description: 'Uploadajte PNG logotip prozirne pozadine (cca 500x500px). Prikazivat će se u navigaciji i footeru.'
    },
    { 
      name: 'hero', 
      title: 'Hero Sekcija (Glavna slika/video)', 
      type: 'object',
      fields: [
        { name: 'title', title: 'Glavni Naslov', type: 'string' },
        { name: 'subtitle', title: 'Podnaslov', type: 'string' },
        { 
          name: 'type', 
          title: 'Tip Pozadine', 
          type: 'string',
          options: {
            list: [
              {title: 'Slika', value: 'image'},
              {title: 'Video', value: 'video'}
            ],
            layout: 'radio'
          },
          initialValue: 'image'
        },
        { 
          name: 'image', 
          title: 'Desktop Slika (Landscape)', 
          type: 'image', 
          description: 'Preporučeno: 1920x1080px',
          hidden: ({parent}: any) => parent?.type === 'video'
        },
        { 
          name: 'mobileImage', 
          title: 'Mobilna Slika (Portrait)', 
          type: 'image', 
          description: 'Preporučeno: 1080x1920px (Story format).',
          hidden: ({parent}: any) => parent?.type === 'video'
        },
        {
          name: 'videoDesktop',
          title: 'Desktop Video (Landscape)',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'MP4 format, max 10MB preporučeno.',
          hidden: ({parent}: any) => parent?.type !== 'video'
        },
        {
          name: 'videoMobile',
          title: 'Mobilni Video (Portrait)',
          type: 'file',
          options: { accept: 'video/*' },
          description: 'MP4 format, vertikalni video.',
          hidden: ({parent}: any) => parent?.type !== 'video'
        },
        { name: 'buttonText', title: 'Tekst na gumbu', type: 'string' },
        { name: 'buttonLink', title: 'Link gumba', type: 'url', validation: urlValidation },
      ]
    },
    { 
      name: 'mainTicker', 
      title: 'Tekst na velikom Tickeru (ispod slike)', 
      type: 'string' 
    },
    {
      name: 'standingsConfig',
      title: 'Postavke Ljestvice',
      type: 'object',
      description: 'Odaberite želite li prikazivati ručno unesenu ljestvicu ili automatsku (Sofascore).',
      fields: [
        {
          name: 'source',
          title: 'Izvor Podataka',
          type: 'string',
          options: {
            list: [
              { title: 'Ručni Unos (CMS)', value: 'manual' },
              { title: 'Sofascore Widget (Automatski)', value: 'sofascore' }
            ],
            layout: 'radio'
          },
          initialValue: 'manual'
        },
        {
          name: 'sofascoreEmbedUrl',
          title: 'Sofascore Embed URL',
          type: 'url',
          description: 'Otiđite na Sofascore, nađite Premijer Ligu, kliknite na "Tablica", pa "Dodaj tablicu na web". Kopirajte onaj link unutar src="..." dijela. Primjer: https://www.sofascore.com/tournament/basketball/croatia/a1-liga/182/standings/tables/embed',
          hidden: ({ parent }: any) => parent?.source !== 'sofascore'
        }
      ]
    },
    {
      name: 'shopConfig',
      title: 'Webshop Sekcija (Banner)',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov bannera (npr. Proud to be Dinamo)', type: 'string' },
        { name: 'buttonText', title: 'Tekst gumba', type: 'string' },
        { name: 'buttonLink', title: 'Link na shop', type: 'url', validation: urlValidation },
        { name: 'image', title: 'Pozadinska slika bannera', type: 'image', description: 'Preporučeno vertikalna ili kvadratna slika visoke kvalitete.' }
      ]
    }
  ]
}

// 9. O KLUBU
const clubInfo = {
  name: 'clubInfo',
  title: 'O Klubu (Tekstovi)',
  type: 'document',
  fields: [
    { name: 'history', title: 'Povijest kluba', type: 'array', of: [{type: 'block'}] },
    { name: 'historyImage', title: 'Slika za povijest', type: 'image' },
  ]
}

// 10. LOKACIJE TRENINGA (Škola košarke)
const trainingLocation = {
  name: 'trainingLocation',
  title: 'Lokacije Treninga',
  type: 'document',
  fields: [
    { name: 'name', title: 'Naziv Škole/Dvorane', type: 'string' },
    { name: 'address', title: 'Adresa', type: 'string' },
    { name: 'image', title: 'Slika škole', type: 'image' },
    { name: 'mapLink', title: 'Google Maps Link', type: 'url', validation: urlValidation }
  ]
}

// 11. OMLADINSKE EKIPE (Selekcije)
const youthTeam = {
  name: 'youthTeam',
  title: 'Omladinske Selekcije',
  type: 'document',
  fields: [
    { name: 'title', title: 'Naziv Selekcije (npr. Juniori)', type: 'string' },
    { name: 'coach', title: 'Glavni Trener', type: 'string' },
    { name: 'image', title: 'Timska Slika', type: 'image', options: { hotspot: true } },
    { 
      name: 'schedule', 
      title: 'Nadolazeće Utakmice', 
      type: 'array', 
      of: [{ 
        type: 'object',
        fields: [
          { name: 'opponent', title: 'Protivnik', type: 'string' },
          { name: 'date', title: 'Datum i Vrijeme', type: 'datetime' },
          { name: 'location', title: 'Mjesto', type: 'string' }
        ]
      }]
    }
  ]
}

export const schemaTypes = [
  homepage,
  news,
  match,
  player,
  staff,
  shopItem,
  sponsor,
  standing,
  clubInfo,
  trainingLocation,
  youthTeam
]
