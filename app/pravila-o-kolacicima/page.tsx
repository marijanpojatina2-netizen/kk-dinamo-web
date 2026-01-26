
import React from 'react';
import HeaderV5 from '../../components/HeaderV5';
import FooterV5 from '../../components/FooterV5';
import { client } from '../lib/sanity';
import { globalConfigQuery } from '../lib/queries';

export const revalidate = 60;

export default async function CookiePolicyPage() {
  let logoUrl: string | undefined;
  try {
    const globalConfig = await client.fetch(globalConfigQuery).catch(() => null);
    if (globalConfig) logoUrl = globalConfig.logoUrl;
  } catch (error) { console.error(error); }

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />
      <section className="relative py-20 bg-[#001035] text-white">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <h1 className="font-condensed font-bold text-5xl md:text-7xl uppercase leading-none mb-6">Pravila o kolačićima</h1>
          </div>
      </section>
      <section className="max-w-[1000px] mx-auto px-4 lg:px-12 py-20 min-h-[50vh] prose prose-lg prose-blue text-gray-700">
          <h3>ŠTO SU KOLAČIĆI?</h3>
          <p>Kolačić je informacija spremljena na Vaše računalo od strane web stranice koju posjetite. Kolačići obično spremaju Vaše postavke, postavke za web stranicu, kao što su preferirani jezik ili adresa. Kasnije, kada opet otvorite istu web stranicu internet preglednik šalje natrag kolačiće koji pripadaju toj stranici. Ovo omogućava stranici da prikaže informacije prilagođene Vašim potrebama.</p>
          <p>Kolačići mogu spremati širok pojas informacija uključujući osobne informacije (kao što je Vaše ime ili e-mail adresa). Ipak, ova informacija može biti spremljena jedino ako Vi to omogućite – web stranice ne mogu dobiti pristup informacijama koji im Vi niste dali i ne mogu pristupiti drugim datotekama na Vašem računalu. Zadane aktivnosti spremanja i slanja kolačića Vama nisu vidljive. Ipak, možete promijeniti Vaše postavke internet preglednika da možete sami birati hoćete li zahtjeve za spremanje kolačića odobriti ili odbiti, pobrišete spremljene kolačiće automatski pri zatvaranju internet preglednika i slično.</p>
          
          <h3>KAKO ONEMOGUĆITI KOLAČIĆE?</h3>
          <p>Isključivanjem kolačića odlučujete da li hoćete dopustiti pohranjivanje kolačića na vašem računalu. Cookie postavke mogu se kontrolirati i konfigurirati u vašem web pregledniku. Za informacije o postavkama kolačića, odaberite web-preglednik koji koristite.</p>
          
          <h3>ŠTO SU PRIVREMENI KOLAČIĆI?</h3>
          <p>Privremeni kolačići ili kolačići sesije uklanjaju se s računala po zatvaranju internet preglednika. Pomoću njih web-mjesta pohranjuju privremene podatke, poput stavki u košarici za kupnju.</p>
          
          <h3>ŠTO SU STALNI KOLAČIĆI?</h3>
          <p>Stalni ili spremljeni kolačići ostaju na računalu nakon zatvaranja programa internet preglednika. Pomoću njih web-mjesta pohranjuju podatke, kao što su ime za prijavu i lozinka, tako da se ne morate prijavljivati prilikom svakog posjeta određenom mjestu. Stalni kolačići ostat će na računalu danima, mjesecima, čak i godinama.</p>
          
          <h3>ŠTO SU KOLAČIĆI OD PRVE STRANE?</h3>
          <p>Kolačići od prve strane dolaze s web-mjesta koje gledate, a mogu biti stalni ili privremeni. Pomoću tih kolačića web-mjesta mogu pohraniti podatke koje će ponovo koristiti prilikom sljedećeg posjeta tom web-mjestu.</p>
          
          <h3>ŠTO SU KOLAČIĆI TREĆE STRANE?</h3>
          <p>Kolačići treće strane dolaze s reklama drugih web-mjesta (kao što su skočne ili druge reklame) koje se nalaze na web-mjestu koje gledate. Pomoću tih kolačića web-mjesta mogu pratiti korištenje Interneta u marketinške svrhe.</p>
          
          <h3>DA LI KKDINAMO.HR KORISTI KOLAČIĆE?</h3>
          <p>Da, s primarnim ciljem kako bi naše web stranice vam omogućile bolje korisničko iskustvo.</p>
          
          <h3>KAKVE KOLAČIĆE KORISTI KKDINAMO.HR I ZAŠTO?</h3>
          <ul>
            <li>Privremeni kolačići (Session cookies) – to su privremeni kolačići koji ističu (i automatski se brišu) kada zatvorite internet preglednik. Mi koristimo session cookies da omogućimo pristup sadržaju i omogućimo komentiranje (stvari koje morate učiniti kada se prijavite sa svojim podacima na web stranicu).</li>
            <li>Trajni kolačići (Persistent cookies) – ti obično imaju datum isteka daleko u budućnost te će ostati u vašem pregledniku, dok ne isteknu, ili dok ih ručno ne izbrišete. Mi koristimo trajne kolačiće za funkcionalnosti kao što su "Ostanite prijavljeni", što korisnicima olakšava pristup stranici kao registriranom korisniku. Također koristimo trajne kolačiće kako bi bolje razumjeli navike korisnika, tako da možemo poboljšati web stranicu prema vašim navikama. Ova informacija je anonimna – ne vidimo individualne podatke korisnika.</li>
          </ul>
      </section>
      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
