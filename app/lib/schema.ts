
// Definicije Sanity schema tipova

const urlValidation = (Rule: any) => Rule.uri({
  scheme: ['http', 'https', 'mailto', 'tel'],
  allowRelative: true
});

// 1. PRAVNE STRANICE (Impresum, Politika Privatnosti)
const legalPage = {
  name: 'legalPage',
  title: 'Pravna Stranica',
  type: 'document',
  fields: [
    { name: 'title', title: 'Naslov Stranice', type: 'string' },
    { 
      name: 'content', 
      title: 'Sadržaj', 
      type: 'array', 
      of: [{type: 'block'}] 
    }
  ]
}

// 2. IGRAC (Player)
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
    { 
      name: 'image', 
      title: 'Slika igrača', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Preporučeno: 600x800px (Portret format).'
    },
  ]
}

// 3. OSOBLJE (Staff)
const staff = {
  name: 'staff',
  title: 'Osoblje (Treneri)', 
  type: 'document',
  fields: [
    { name: 'name', title: 'Ime', type: 'string' },
    { name: 'lastname', title: 'Prezime', type: 'string' },
    { name: 'role', title: 'Uloga', type: 'string' }, 
    { 
      name: 'category', 
      title: 'Kategorija', 
      type: 'string', 
      options: { list: ['Seniori', 'Škola Košarke'] },
      initialValue: 'Seniori'
    },
    { 
      name: 'image', 
      title: 'Slika', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Preporučeno: 600x800px (Portret format).'
    },
  ]
}

// 4. VIJESTI (News) - PROŠIRENI MODERNI EDITOR
const news = {
  name: 'news',
  title: 'Vijesti',
  type: 'document',
  fields: [
    { name: 'title', title: 'Naslov', type: 'string' },
    { name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Datum objave', type: 'datetime' },
    { name: 'category', title: 'Kategorija', type: 'string', options: { list: ['Utakmice', 'Klub', 'Intervju', 'Škola', 'Ulaznice'] } },
    { 
      name: 'image', 
      title: 'Glavna slika', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Preporučeno: 1920x1080px (16:9 Landscape format).'
    },
    { name: 'excerpt', title: 'Kratki uvod (za naslovnicu)', type: 'text', rows: 3 },
    { 
      name: 'body', 
      title: 'Tekst članka', 
      type: 'array', 
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Naslov 1', value: 'h1'},
            {title: 'Naslov 2', value: 'h2'},
            {title: 'Naslov 3', value: 'h3'},
            {title: 'Naslov 4', value: 'h4'},
            {title: 'Naslov 5', value: 'h5'},
            {title: 'Naslov 6', value: 'h6'},
            {title: 'Citat', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: urlValidation
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Otvori u novom tabu',
                    initialValue: true
                  }
                ]
              },
              {
                name: 'align',
                type: 'object',
                title: 'Poravnanje Teksta',
                fields: [
                  {
                    name: 'alignment',
                    type: 'string',
                    options: {
                      list: [
                        {title: 'Lijevo', value: 'left'},
                        {title: 'Centar', value: 'center'},
                        {title: 'Desno', value: 'right'}
                      ],
                      layout: 'radio'
                    }
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image', 
          options: { hotspot: true }, 
          fields: [{name: 'caption', type: 'string', title: 'Opis slike'}],
          title: 'Dodatna Slika'
        },
        {
          type: 'object',
          name: 'divider',
          title: 'Horizontalna Linija',
          fields: [
            {
              name: 'style',
              type: 'string',
              title: 'Stil',
              options: {
                list: [{title: 'Puna', value: 'solid'}, {title: 'Isprekidana', value: 'dashed'}],
              },
              initialValue: 'solid'
            }
          ]
        },
        {
          type: 'object',
          name: 'youtube',
          title: 'YouTube Video',
          fields: [
            { name: 'url', type: 'url', title: 'YouTube URL' }
          ]
        }
      ] 
    },
    { name: 'isFeatured', title: 'Izdvojeno na naslovnici (Velika slika)', type: 'boolean' },
  ]
}

// 5. UTAKMICE
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
    { name: 'location', title: 'Lokacija (Dvorana)', type: 'string', initialValue: 'KC Dražen Petrović' },
    { name: 'league', title: 'Liga', type: 'string', initialValue: 'Premijer Liga' },
    { name: 'leagueLogo', title: 'Logo Lige', type: 'image' },
    { name: 'round', title: 'Kolo', type: 'string' },
    { name: 'isFinished', title: 'Završena utakmica', type: 'boolean' },
    { name: 'ticketLink', title: 'Link na ulaznice', type: 'url', validation: urlValidation },
    { name: 'isBigAnnouncement', title: 'Prikaži kao Glavnu Najavu', type: 'boolean' }, 
  ]
}

// 6. SHOP ARTIKLI
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

// 7. LJESTVICA
const standing = {
  name: 'standing',
  title: 'Ljestvica',
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
    { name: 'logo', title: 'Logo Kluba', type: 'image' },
    { 
      name: 'hero', 
      title: 'Hero Sekcija', 
      type: 'object',
      fields: [
        { name: 'title', title: 'Glavni Naslov', type: 'string' },
        { name: 'subtitle', title: 'Podnaslov', type: 'string' },
        { name: 'type', title: 'Tip', type: 'string', options: {list: ['image', 'video']} },
        { name: 'image', title: 'Desktop Slika', type: 'image' },
        { name: 'mobileImage', title: 'Mobilna Slika', type: 'image' },
        { name: 'videoDesktop', title: 'Desktop Video', type: 'file' },
        { name: 'videoMobile', title: 'Mobilni Video', type: 'file' },
        { name: 'buttonText', title: 'Tekst na gumbu', type: 'string' },
        { name: 'buttonLink', title: 'Link gumba', type: 'url' },
      ]
    },
    { name: 'mainTicker', title: 'Ticker Tekst', type: 'string' },
    {
      name: 'standingsConfig',
      title: 'Postavke Ljestvice',
      type: 'object',
      fields: [
        { name: 'source', title: 'Izvor', type: 'string', options: {list: ['manual', 'sofascore']} },
        { name: 'sofascoreEmbedUrl', title: 'Sofascore URL', type: 'url' }
      ]
    },
    {
      name: 'shopConfig',
      title: 'Webshop Banner',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov', type: 'string' },
        { name: 'buttonText', title: 'Tekst gumba', type: 'string' },
        { name: 'buttonLink', title: 'Link', type: 'url' },
        { name: 'image', title: 'Pozadina', type: 'image' }
      ]
    }
  ]
}

// 9. O KLUBU
const clubInfo = {
  name: 'clubInfo',
  title: 'O Klubu',
  type: 'document',
  fields: [
    { name: 'history', title: 'Povijest', type: 'array', of: [{type: 'block'}] },
    { name: 'historyImage', title: 'Slika', type: 'image' },
  ]
}

// 10. ŠKOLA
const schoolPage = {
  name: 'schoolPage',
  title: 'Postavke Škole',
  type: 'document',
  fields: [
    { name: 'introTitle', title: 'Naslov', type: 'string' },
    { name: 'introText', title: 'Tekst', type: 'text' },
    {
      name: 'headOfAcademy',
      title: 'Voditelj',
      type: 'object',
      fields: [
        {name: 'name', type: 'string'},
        {name: 'role', type: 'string'},
        {name: 'quote', type: 'text'},
        {name: 'image', type: 'image'}
      ]
    },
    {
      name: 'selections',
      title: 'Selekcije',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string'},
          {name: 'coach', type: 'string'},
          {name: 'image', type: 'image'},
          {name: 'schedule', title: 'Raspored', type: 'array', of: [{ type: 'object', fields: [{name: 'opponent', type: 'string'}, {name: 'date', type: 'datetime'}, {name: 'location', type: 'string'}]}]}
        ]
      }]
    },
    {
      name: 'locations',
      title: 'Lokacije',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'address', type: 'string' },
          { name: 'image', type: 'image' },
          { name: 'mapLink', type: 'url' }
        ]
      }]
    }
  ]
}

// 11. SPONZORI
const sponsorsPage = {
  name: 'sponsorsPage',
  title: 'Postavke Sponzora',
  type: 'document',
  fields: [
    {
      name: 'sponsorsList',
      title: 'Lista Sponzora',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Naziv', type: 'string' },
          { name: 'logo', title: 'Logo', type: 'image' },
          { name: 'websiteUrl', title: 'Web', type: 'url' },
          { name: 'tier', title: 'Razina', type: 'string', options: { list: ['Generalni', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Media'] } },
        ]
      }]
    }
  ]
}

export const schemaTypes = [
  homepage,
  schoolPage, 
  sponsorsPage, 
  clubInfo,
  news,
  match,
  player,
  staff,
  shopItem,
  standing,
  legalPage // Added new schema
]
