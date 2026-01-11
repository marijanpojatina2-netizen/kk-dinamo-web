
// --- HOMEPAGE CONFIG ---

export const heroContent = {
    titleLine1: "09.01.",
    titleLine2: "VS Zadar",
    subtitle: "Sljedeća Domaća:",
    buttonText: "OSIGURAJ ULAZNICE!",
    buttonLink: "https://ulaznice.hr/kkdinamo", // Link na koji vodi gumb
    image: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=1600"
};

export const mainTicker = [
    "SLJEDEĆA DOMAĆA UTAKMICA",
    "///",
    "PETAK - 09.01.2025",
    "///",
    "KC DRAŽEN PETROVIĆ",
    "///",
    "BUDI NAŠ ŠESTI IGRAČ"
];

export const matchCenter = {
    league: "Premijer Liga",
    round: "15. Kolo",
    homeTeam: "Dinamo Zagreb",
    homeLogo: "https://shop.kkdinamo.hr/wp-content/uploads/2022/09/grb-dinamo.png",
    awayTeam: "KK Zadar",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/75/KK_Zadar_logo.svg/1200px-KK_Zadar_logo.svg.png",
    date: "09. JAN",
    time: "Petak, 20:00 h",
    ticketText: "Kupi Ulaznice",
    ticketLink: "https://ulaznice.hr"
};

export const resultsTicker = [
    // Ovdje upisujete i prošle rezultate i buduće utakmice
    { h: "SPL", a: "DIN", score: "72 : 78", date: "28.12." }, // Odigrano
    { h: "DIN", a: "CIB", score: "88 : 75", date: "22.12." }, // Odigrano
    { h: "DUB", a: "DIN", score: "VS", date: "17.01." },      // Buduća
    { h: "DIN", a: "ŠIB", score: "VS", date: "24.01." },      // Buduća
    { h: "ZAB", a: "DIN", score: "VS", date: "31.01." }       // Buduća
];

export const shopItems = [
    { 
        id: 1, 
        name: "Dres Domaći 24/25", 
        price: "75€", 
        img: "https://shop.kkdinamo.hr/wp-content/uploads/2023/09/dres-plavi-23-24-prednja.png", 
        link: "https://shop.kkdinamo.hr/proizvod/dres",
        fit: "contain" 
    },
    { 
        id: 2, 
        name: "Fan Hudica Plava", 
        price: "45€", 
        img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600", 
        link: "https://shop.kkdinamo.hr/proizvod/hudica",
        fit: "cover" 
    },
    { 
        id: 3, 
        name: "Šal Dinamo", 
        price: "15€", 
        img: "https://images.unsplash.com/photo-1520975661595-dc228151216a?q=80&w=600", 
        link: "https://shop.kkdinamo.hr/proizvod/sal",
        fit: "cover" 
    }
];

export const standings = [
    // active: true označava Dinamo (boja se red)
    { pos: 1, name: "Zadar", p: 14, w: 14, l: 0, pts: 28, diff: "+150" },
    { pos: 2, name: "Split", p: 14, w: 12, l: 2, pts: 26, diff: "+120" },
    { pos: 3, name: "Cibona", p: 14, w: 10, l: 4, pts: 24, diff: "+85" },
    { pos: 4, name: "Dinamo", p: 14, w: 9, l: 5, pts: 23, diff: "+60", active: true },
    { pos: 5, name: "Cedevita", p: 14, w: 8, l: 6, pts: 22, diff: "+40" },
    { pos: 6, name: "Dubrava", p: 14, w: 7, l: 7, pts: 21, diff: "-10" },
];

// --- KLUB PAGE CONFIG ---

export const clubContent = {
    historyTitle: "Povijest",
    historySubtitle: "Ponos i Čast",
    foundedYear: "1972",
    mainText: [
        "Košarkaški klub Dinamo Zagreb osnovan je s ciljem vraćanja zagrebačke košarke na staze stare slave. Klub je nastao na temeljima KK Rudeš, kluba poznatog po izvrsnom radu s mlađim kategorijama, a promjenom imena 2020. godine započela je nova era.",
        "Naša misija je jasna: stvoriti stabilan, ambiciozan i transparentan sportski kolektiv koji će biti ponos svih Zagrepčana. Uz podršku naših vjernih navijača, Bad Blue Boysa, Dinamo je u kratkom roku postao sinonim za borbenost i strast na parketu.",
        "Dinamo je više od košarke – to je pokret, identitet i pripadnost."
    ],
    historyImage: "https://images.unsplash.com/photo-1574602305366-eb9a0a4305b6?q=80&w=1000"
};

// --- DATA LISTS ---

export const newsItems = [
    { 
        id: 1,
        title: "I u petak trebamo plavi pakao!", 
        date: "08.01.2025", 
        category: "Utakmice", 
        img: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1200", 
        excerpt: "Dinamo dočekuje Zadar u ključnoj utakmici sezone. Očekuje se puna dvorana i fantastična atmosfera.",
        slug: "plavi-pakao"
    },
    { id: 2, title: "Previše ofenzivnih skokova koštalo nas pobjede", date: "07.01.2025", category: "Izvještaj", img: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=600", slug: "skokovi-poraz" },
    { id: 3, title: "2025. počinje s putovanjem u Sinj", date: "04.01.2025", category: "Najava", img: "https://images.unsplash.com/photo-1628779238951-bd5c95813bd3?q=80&w=600", slug: "put-u-sinj" },
    { id: 4, title: "Sretna Nova 2025. Godina!", date: "01.01.2025", category: "Klub", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600", slug: "nova-godina" },
    { id: 5, title: "Dinamo se oprostio od 2024. pobjedom", date: "30.12.2024", category: "Izvještaj", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600", slug: "pobjeda-kraj-godine" },
    { id: 6, title: "Novačić produžio ugovor", date: "28.12.2024", category: "Momčad", img: "https://images.unsplash.com/photo-1574602305366-eb9a0a4305b6?q=80&w=600", slug: "novacic-ugovor" },
    { id: 7, title: "Škola košarke upisuje nove članove", date: "20.12.2024", category: "Škola", img: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?q=80&w=600", slug: "upisi-skola" },
    { id: 8, title: "Božićni domjenak kluba", date: "18.12.2024", category: "Klub", img: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=600", slug: "bozicni-domjenak" },
    { id: 9, title: "Intervju s trenerom Sesarom", date: "15.12.2024", category: "Intervju", img: "https://images.unsplash.com/photo-1628779238951-bd5c95813bd3?q=80&w=600", slug: "intervju-sesar" }
];

export const roster = [
    { num: 1, name: "Savion", last: "Flagg", pos: "Krilo", height: "201", weight: "98", dob: "26.05.1999.", city: "Alvin, TX", nat: "USA", img: "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=600&auto=format&fit=crop" },
    { num: 4, name: "Antonio", last: "Sikirić", pos: "Bek", height: "196", weight: "88", dob: "22.10.2003.", city: "Zadar", nat: "CRO", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
    { num: 5, name: "Karlo", last: "Mikšić", pos: "Play", height: "193", weight: "85", dob: "15.02.1998.", city: "Zagreb", nat: "CRO", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
    { num: 7, name: "Filip", last: "Kraljević", pos: "Centar", height: "213", weight: "110", dob: "13.12.1989.", city: "Široki Brijeg", nat: "CRO", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=600&auto=format&fit=crop" },
    { num: 9, name: "Ivan", last: "Nakić-Vojnović", pos: "Centar", height: "206", weight: "105", dob: "27.08.1999.", city: "Zagreb", nat: "CRO", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop" },
    { num: 10, name: "Hrvoje", last: "Garafolić", pos: "Krilo", height: "196", weight: "92", dob: "18.01.1990.", city: "Zagreb", nat: "CRO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
    { num: 11, name: "Ivan", last: "Vučić", pos: "Krilo", height: "197", weight: "94", dob: "21.05.1996.", city: "Zagreb", nat: "CRO", img: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=600&auto=format&fit=crop" },
    { num: 13, name: "Lovro", last: "Mandalinić", pos: "Bek", height: "195", weight: "90", dob: "04.09.1998.", city: "Zagreb", nat: "CRO", img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=600&auto=format&fit=crop" },
    { num: 33, name: "Ivan", last: "Novačić", pos: "Krilo", height: "201", weight: "96", dob: "15.09.1985.", city: "Zadar", nat: "CRO", img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop" },
];

export const staff = [
    { role: "Glavni Trener", name: "Josip", last: "Sesar", dob: "17.01.1978.", city: "Mostar", nat: "CRO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" },
    { role: "Pomoćni Trener", name: "Stipe", last: "Čubrić", dob: "05.05.1985.", city: "Šibenik", nat: "CRO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
    { role: "Kondicijski", name: "Domagoj", last: "Šumatić", dob: "12.03.1990.", city: "Zagreb", nat: "CRO", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" },
    { role: "Fizioterapeut", name: "Ivan", last: "Lazić", dob: "22.11.1992.", city: "Osijek", nat: "CRO", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" }
];

// Ovdje dodajete sponzore. "footerSize" određuje koliko su veliki u footeru (text-6xl je najveće, text-3xl manje)
export const sponsors = [
    { name: "PSK", tier: "Generalni", img: "text-6xl", footerSize: "text-6xl" },
    { name: "OŽUJSKO", tier: "Platinum", img: "text-5xl", footerSize: "text-5xl" },
    { name: "ADIDAS", tier: "Platinum", img: "text-5xl", footerSize: "text-5xl" },
    { name: "ERSTE", tier: "Gold", img: "text-4xl", footerSize: "text-5xl" },
    { name: "HRT", tier: "Gold", img: "text-4xl", footerSize: "text-5xl" },
    { name: "KONZUM", tier: "Silver", img: "text-3xl", footerSize: "text-5xl" },
    { name: "LANA GRUPA", tier: "Silver", img: "text-3xl", footerSize: "text-4xl" },
    { name: "POLIKLINIKA", tier: "Bronze", img: "text-2xl", footerSize: "text-4xl" },
    { name: "PIPI", tier: "Bronze", img: "text-2xl", footerSize: "text-4xl" },
    { name: "JUTARNJI", tier: "Media", img: "text-2xl", footerSize: "text-4xl" }
];

export const schoolNews = [
    { title: "Upisi u školu košarke za sezonu 2024/25", date: "05.01.2025", category: "Upisi", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800" },
    { title: "Juniori osvojili božićni turnir u Dubravi", date: "28.12.2024", category: "Uspjeh", img: "https://images.unsplash.com/photo-1574602305366-eb9a0a4305b6?q=80&w=800" },
    { title: "Raspored treninga za mlađe kadete", date: "20.12.2024", category: "Raspored", img: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?q=80&w=800" },
];

export const trainingLocations = [
    { name: "OŠ Rudeš", address: "Jablanska ul. 51", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600" },
    { name: "OŠ Vrbani", address: "Lipanjska ul. 28", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600" },
    { name: "OŠ Prečko", address: "Dekanići ul. 6", img: "https://images.unsplash.com/photo-1577416412292-767992299d9d?q=80&w=600" },
    { name: "OŠ Tituša Brezovačkog", address: "Špansko ul. 1", img: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=600" },
    { name: "OŠ Malešnica", address: "Ul. Ante Topića Mimare 36", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600" },
    { name: "OŠ Voltino", address: "Vinkovačka ul. 2", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600" },
    { name: "OŠ Ljubljanica", address: "Ljubljanica 27", img: "https://images.unsplash.com/photo-1574602305366-eb9a0a4305b6?q=80&w=600" }
];

export const youthSelectionsStatic = [
    { 
        title: "JUNIORI", 
        coach: "Matija Brstilo", 
        img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200",
        schedule: [{ opponent: "Cibona", date: "12.01. @ 14:00", location: "Dom Sportova" }, { opponent: "Cedevita", date: "19.01. @ 12:00", location: "Rudeš" }]
    },
    { 
        title: "KADETI", 
        coach: "Tihomir Begić", 
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200",
        schedule: [{ opponent: "Dubrava", date: "11.01. @ 10:00", location: "Dubrava" }] 
    },
    { 
        title: "PRETKADETI", 
        coach: "Zvonimir Galovac", 
        img: "https://images.unsplash.com/photo-1574602305366-eb9a0a4305b6?q=80&w=1200",
        schedule: [{ opponent: "Mladost", date: "13.01. @ 18:00", location: "Rudeš" }]
    },
    { 
        title: "U13 SELEKCIJA", 
        coach: "Robert Galić", 
        img: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1200",
        schedule: [{ opponent: "Vučići", date: "11.01. @ 09:00", location: "Velesajam" }]
    },
    { 
        title: "SENIORI B", 
        coach: "Ivan Perić", 
        img: "https://images.unsplash.com/photo-1628779238951-bd5c95813bd3?q=80&w=1200",
        schedule: [{ opponent: "Zapruđe", date: "14.01. @ 20:30", location: "Zapruđe" }]
    }
];
