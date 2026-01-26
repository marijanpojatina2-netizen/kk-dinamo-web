
import React from 'react';
import HeaderV5 from '../../components/HeaderV5';
import FooterV5 from '../../components/FooterV5';
import { client } from '../lib/sanity';
import { globalConfigQuery } from '../lib/queries';

export const revalidate = 60;

export default async function DataProtectionPage() {
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
              <h1 className="font-condensed font-bold text-5xl md:text-7xl uppercase leading-none mb-6">Zaštita osobnih podataka</h1>
          </div>
      </section>
      <section className="max-w-[1000px] mx-auto px-4 lg:px-12 py-20 min-h-[50vh] prose prose-lg prose-blue text-gray-700">
          <p>KK Dinamo Zagreb posvećuje veliku važnost zaštiti osobnih podataka naših korisnika. Politika zaštite privatnosti uređuje način postupanja s informacijama koje KK Dinamo Zagreb obrađuje odnosno prikuplja prilikom posjeta našoj internet stranici.</p>
          
          <h3>PRIKUPLJANJE I OBRADA OSOBNIH PODATAKA</h3>
          <p>Osobnim podacima smatraju se oni podaci koji vas identificiraju (poput imena, adrese, e-maila ili poštanske adrese i dr.). KK Dinamo Zagreb ne prikuplja vaše osobne podatke osim u slučaju kada ste nam ih vi izričito učinili dostupnima (npr. prilikom naručivanja proizvoda ili pretplate ili nekog drugog razloga), čime pristajete odnosno dajete privolu na njihovo korištenje u niže navedene svrhe.</p>
          
          <h3>KORIŠTENJE I OTKRIVANJE ODNOSNO PRIJENOS OSOBNIH PODATAKA</h3>
          <p>KK Dinamo Zagreb koristit će vaše osobne podatke za potrebe tehničkog upravljanja internetskim stranicama, analize preferencija te dostave općih i individualiziranih ponuda, s ciljem da vam se omogući pristup posebnim informacijama te za potrebe komunikacije s vama. Obavještavamo vas da vaše osobne podatke KK Dinamo Zagreb neće činiti dostupnima trećim osobama bez vašeg izričitog pristanka.</p>
          
          <h3>POLITIKA VEZANA UZ KORIŠTENJE I POHRANJIVANJE KOLAČIĆA (HTTP COOKIES)</h3>
          <p>Naše internetske stranice koje posjećujete koriste kolačiće. Kolačićima se smatraju datoteke male veličine koje se privremeno pohranjuju na vašemu tvrdom disku, što našoj internetskoj stranici omogućava prepoznavanje vašega računala prilikom sljedećeg posjeta stranici KK Dinamo Zagreb.</p>
          <p>Ovisno o postavkama na vašem internetskom pretraživaču, kolačići se mogu automatski prihvaćati. Ako niste suglasni njihovom upotrebom, kolačiće možete u bilo kojem trenutku lako izbrisati i/ili trajno isključiti na vašem računalu ili mobilnom uređaju pomoću postavki preglednika kojim se koristite.</p>
          
          <h3>SIGURNOST</h3>
          <p>KK Dinamo Zagreb ulaže velike napore kako bi se osigurala sigurnost osobnih podataka te usklađenost s važećim propisima o zaštiti podataka (poput Opće uredbe o zaštiti podataka, Zakona o provedbi opće uredbe o zaštiti podataka i dr.). Napominjemo kako su vaši podaci savjesno zaštićeni od gubitka, uništenja, manipulacije, neovlaštenoga pristupa i neovlaštenog izdavanja.</p>
          
          <h3>MALOLJETNICI</h3>
          <p>Osobe mlađe od 16 godina ne bi smjele davati nikakve osobne podatke na stranicama bez dopuštenja roditelja ili skrbnika. KK Dinamo Zagreb nikada neće svjesno prikupljati osobne podatke od maloljetnih osoba, ili ih na bilo koji način koristiti ili otkriti trećoj strani bez dozvole.</p>
      </section>
      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
