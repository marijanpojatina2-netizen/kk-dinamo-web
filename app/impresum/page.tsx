
import React from 'react';
import HeaderV5 from '../../components/HeaderV5';
import FooterV5 from '../../components/FooterV5';
import { client } from '../lib/sanity';
import { globalConfigQuery, legalPageQuery } from '../lib/queries';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export default async function ImpresumPage() {
  let logoUrl: string | undefined;
  let pageContent: any = null;

  try {
    const [globalConfig, content] = await Promise.all([
      client.fetch(globalConfigQuery).catch(() => null),
      client.fetch(legalPageQuery, { id: 'impresum' }).catch(() => null)
    ]);
    if (globalConfig) logoUrl = globalConfig.logoUrl;
    pageContent = content;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      <section className="relative py-20 bg-[#001035] text-white">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <h1 className="font-condensed font-bold text-6xl md:text-8xl uppercase leading-none mb-6">
                  Impresum
              </h1>
          </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4 lg:px-12 py-20 min-h-[50vh]">
          {pageContent ? (
             <div className="prose prose-lg prose-blue max-w-none text-gray-700">
                 <h2 className="font-condensed font-bold text-4xl mb-8 uppercase text-[#001035]">{pageContent.title}</h2>
                 <PortableText value={pageContent.content} />
             </div>
          ) : (
             <div className="text-gray-500">
                 <p>Sadržaj impresuma se uređuje putem CMS-a.</p>
                 <p className="mt-8"><strong>KK DINAMO ZAGREB</strong><br/>Savska cesta 30<br/>10000 Zagreb<br/>Hrvatska</p>
                 <p className="mt-4"><strong>Kontakt:</strong> info@kkdinamo.hr</p>
             </div>
          )}
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
