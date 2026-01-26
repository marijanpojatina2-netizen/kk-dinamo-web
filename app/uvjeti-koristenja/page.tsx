
import React from 'react';
import HeaderV5 from '../../components/HeaderV5';
import FooterV5 from '../../components/FooterV5';
import { client } from '../lib/sanity';
import { globalConfigQuery } from '../lib/queries';

export const revalidate = 60;

export default async function TermsPage() {
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
              <h1 className="font-condensed font-bold text-5xl md:text-7xl uppercase leading-none mb-6">Uvjeti korištenja</h1>
          </div>
      </section>
      <section className="max-w-[1000px] mx-auto px-4 lg:px-12 py-20 min-h-[50vh] prose prose-lg prose-blue text-gray-700">
          <h3>OPĆE ODREDBE</h3>
          <p>Korištenjem internetske stranice www.kkdinamo.hr smatra se da ste u svakom trenutku upoznati s ovim uvjetima korištenja te da ih u potpunosti razumijete i prihvaćate. Web stranicu koristite isključivo na vlastitu odgovornost. KK Dinamo Zagreb zadržava pravo izmjene uvjeta korištenja u bilo kojem trenutku bez obaveze prethodne najave.</p>
          
          <h3>AUTORSKA PRAVA</h3>
          <p>Sadržaj na web stranici zaštićen je autorskim pravima. Dokumenti, podaci i informacije objavljeni na web stranici ne smiju se reproducirati, distribuirati ili na bilo koji način koristiti u komercijalne svrhe bez izričitog pristanka KK Dinamo Zagreb, ili na bilo koji način koji može uzrokovati štetu KK Dinamo Zagreb ili bilo kojoj trećoj strani. Dokumenti, podaci i informacije objavljeni na ovoj web stranici mogu se koristiti samo za individualne potrebe korisnika uz poštivanje svih autorskih i vlasničkih prava te prava trećih osoba.</p>
          
          <h3>ODRICANJE OD ODGOVORNOSTI</h3>
          <p>KK Dinamo Zagreb se odriče svake odgovornosti koja na bilo koji način može nastati iz, ili je na bilo koji način vezana za korištenje ove web stranice, za bilo koje radnje korisnika uporabom ili zlouporabom sadržaja ove web stranice, te za bilo kakvu štetu koja može nastati korisniku ili bilo kojoj trećoj strani u vezi s uporabom ili zlouporabom korištenja sadržaja ove web stranice.</p>
          
          <h3>VANJSKE POVEZNICE</h3>
          <p>Web stranica može sadržavati poveznice na web stranice trećih osoba. KK Dinamo Zagreb nema kontrolu nad sadržajem tih stranica niti snosi odgovornost za točnost informacija ili bilo kakvu štetu nastalu korištenjem tih sadržaja.</p>
          
          <h3>ZAŠTITA OSOBNIH PODATAKA</h3>
          <p>KK Dinamo Zagreb štiti privatnost korisnika u skladu s važećim propisima. Više informacija možete pronaći u našoj Politici privatnosti i Zaštiti osobnih podataka.</p>
      </section>
      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
