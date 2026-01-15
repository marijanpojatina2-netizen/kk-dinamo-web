
import React from 'react';
import HeaderV5 from '../../components/HeaderV5';
import FooterV5 from '../../components/FooterV5';
import { Mail } from 'lucide-react';
import { client } from '../lib/sanity';
import { globalConfigQuery } from '../lib/queries';

export const revalidate = 60;

export default async function PressPage() {
  let logoUrl: string | undefined;

  try {
    const globalConfig = await client.fetch(globalConfigQuery).catch(() => null);
    if (globalConfig) logoUrl = globalConfig.logoUrl;
  } catch (error) {
    console.error("Error fetching logo:", error);
  }

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      <section className="relative py-24 bg-[#001035] text-white">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <span className="text-[#00C2FF] font-condensed font-bold text-xl uppercase tracking-[0.3em] mb-4 block">Media Centar</span>
              <h1 className="font-condensed font-bold text-6xl md:text-8xl uppercase leading-none mb-6">
                  Press & <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Akreditacije</span>
              </h1>
          </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4 lg:px-12 py-20">
          <div className="bg-gray-50 p-8 lg:p-12 border border-gray-200">
              <h2 className="font-condensed font-bold text-3xl uppercase text-[#001035] mb-6">Kontakt za Medije</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Za sve upite vezane uz press akreditacije, intervjue s igračima i članovima stručnog stožera, te ostale medijske aktivnosti, molimo obratite se našem odjelu za odnose s javnošću.
              </p>
              
              <div className="flex items-center gap-4 bg-white p-6 border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-[#002060] text-white flex items-center justify-center rounded-full">
                      <Mail size={24} />
                  </div>
                  <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">Email za upite</span>
                      <a href="mailto:marketing@kkdinamo.hr" className="text-2xl font-bold text-[#001035] hover:text-[#00C2FF] transition-colors">
                          marketing@kkdinamo.hr
                      </a>
                  </div>
              </div>
          </div>

          <div className="mt-12">
              <h3 className="font-condensed font-bold text-2xl uppercase text-[#001035] mb-4">Napomene za akreditacije</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Zahtjevi za akreditacije za pojedinačne utakmice moraju se poslati najkasnije 48 sati prije početka utakmice.</li>
                  <li>Godišnje akreditacije vrijede za sve domaće utakmice u organizaciji KK Dinamo.</li>
                  <li>Molimo navedite ime, prezime, funkciju i medijsku kuću za koju izvještavate.</li>
              </ul>
          </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
