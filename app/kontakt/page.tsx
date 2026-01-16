
import React from 'react';
import HeaderV5 from '../../components/HeaderV5';
import FooterV5 from '../../components/FooterV5';
import { Mail, MapPin, Phone } from 'lucide-react';
import { client } from '../lib/sanity';
import { globalConfigQuery } from '../lib/queries';

export const revalidate = 60;

export default async function ContactPage() {
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
              <span className="text-[#00C2FF] font-condensed font-bold text-xl uppercase tracking-[0.3em] mb-4 block">KK Dinamo Zagreb</span>
              <h1 className="font-condensed font-bold text-6xl md:text-8xl uppercase leading-none mb-6">
                  Kontakt
              </h1>
          </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              
              {/* Adresa */}
              <div className="bg-gray-50 p-8 border border-gray-200 text-center flex flex-col items-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#002060] text-white rounded-full flex items-center justify-center mb-6">
                      <MapPin size={32} />
                  </div>
                  <h3 className="font-condensed font-bold text-2xl uppercase text-[#001035] mb-4">Adresa Kluba</h3>
                  <p className="text-gray-600 font-body text-lg">
                      Rudeška cesta 71<br/>
                      10000 Zagreb<br/>
                      Hrvatska
                  </p>
              </div>

              {/* Generalni Info */}
              <div className="bg-gray-50 p-8 border border-gray-200 text-center flex flex-col items-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#002060] text-white rounded-full flex items-center justify-center mb-6">
                      <Mail size={32} />
                  </div>
                  <h3 className="font-condensed font-bold text-2xl uppercase text-[#001035] mb-4">Opći Upiti</h3>
                  <p className="text-gray-600 font-body mb-4">Za sve informacije o klubu, školi košarke i članstvu.</p>
                  <a href="mailto:info@kkdinamo.hr" className="text-xl font-bold text-[#00C2FF] hover:underline">info@kkdinamo.hr</a>
              </div>

              {/* Marketing & Press */}
              <div className="bg-gray-50 p-8 border border-gray-200 text-center flex flex-col items-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#002060] text-white rounded-full flex items-center justify-center mb-6">
                      <Phone size={32} />
                  </div>
                  <h3 className="font-condensed font-bold text-2xl uppercase text-[#001035] mb-4">Marketing & Press</h3>
                  <p className="text-gray-600 font-body mb-4">Za medijske upite, akreditacije i sponzorstva.</p>
                  <a href="mailto:marketing@kkdinamo.hr" className="text-xl font-bold text-[#00C2FF] hover:underline">marketing@kkdinamo.hr</a>
              </div>

          </div>

          {/* Map Embed */}
          <div className="mt-20 w-full h-[450px] bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.797960787343!2d15.92211997665796!3d45.79528497108169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d14d3c3b0d2d%3A0x8f7f2c8a2a8a8a8a!2sRude%C5%A1ka%20cesta%2071%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1709221234567!5m2!1shr!2shr" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
