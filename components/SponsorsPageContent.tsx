
'use client';

import React from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { Mail, Phone, ArrowRight, Handshake } from 'lucide-react';

interface Sponsor {
  name: string;
  tier: string;
  logoUrl?: string; 
  textClass?: string;
  websiteUrl?: string; // NOVO: URL sponzora
}

interface SponsorsPageProps {
  sponsors: Sponsor[];
  logoUrl?: string;
}

export default function SponsorsPageContent({ sponsors, logoUrl }: SponsorsPageProps) {
  // Find General sponsor (Tier = 'Generalni')
  const generalSponsor = sponsors.find(s => s.tier === 'Generalni') || sponsors[0];
  
  // All other sponsors
  const otherSponsors = sponsors.filter(s => s !== generalSponsor);

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      {/* --- HERO SECTION --- */}
      <section className="relative py-24 bg-[#001035] text-white overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          <div className="relative z-10 max-w-4xl px-4">
              <span className="text-[#00C2FF] font-condensed font-bold text-xl uppercase tracking-[0.3em] mb-4 block">Naša Snaga</span>
              <h1 className="font-condensed font-bold text-6xl md:text-8xl uppercase leading-none mb-6">
                  Ponosni <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Partneri</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto font-body">
                  Uspjeh KK Dinamo ne bi bio moguć bez podrške naših sponzora i partnera koji s nama grade budućnost zagrebačke košarke.
              </p>
          </div>
      </section>

      {/* --- TICKER SECTION --- */}
      <div className="bg-[#00C2FF] py-6 overflow-hidden border-y border-white/20 transform -rotate-1 shadow-xl relative z-20 -mt-8 mx-0 lg:-mx-10">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32">
              {[...sponsors, ...sponsors].map((s, i) => (
                  <span key={i} className="font-condensed font-black text-4xl text-[#001035] uppercase opacity-80">
                      {s.name} <span className="opacity-30 mx-4">•</span>
                  </span>
              ))}
          </div>
      </div>

      {/* --- SPONSORS GRID --- */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Premium Block (Generalni) */}
              {generalSponsor && (
                <div className="lg:col-span-3 mb-12 text-center">
                    <h2 className="font-condensed font-bold text-4xl text-[#001035] uppercase mb-12 relative inline-block">
                        Generalni Sponzor
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#00C2FF]"></div>
                    </h2>
                    <div className="flex justify-center">
                         <a 
                            href={generalSponsor.websiteUrl || '#'} 
                            target="_blank" 
                            className="w-full max-w-2xl aspect-[3/1] bg-gray-50 border-2 border-gray-100 flex items-center justify-center p-12 hover:shadow-2xl transition-all duration-500 group cursor-pointer overflow-hidden relative"
                         >
                             {generalSponsor.logoUrl ? (
                                <img src={generalSponsor.logoUrl} alt={generalSponsor.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                             ) : (
                                <span className={`font-condensed font-black ${generalSponsor.textClass || 'text-8xl'} text-gray-800 group-hover:text-[#002060] transition-colors`}>
                                    {generalSponsor.name}
                                </span>
                             )}
                             {generalSponsor.websiteUrl && <span className="absolute bottom-4 right-4 text-xs font-bold text-[#00C2FF] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Posjeti Web &rarr;</span>}
                         </a>
                    </div>
                </div>
              )}

              {/* Standard Grid */}
              {otherSponsors.map((s, i) => (
                  <a 
                    key={i} 
                    href={s.websiteUrl || '#'} 
                    target="_blank" 
                    className="aspect-[3/2] bg-white border border-gray-200 flex flex-col items-center justify-center p-8 hover:border-[#002060] transition-all duration-300 group hover:-translate-y-2 hover:shadow-lg overflow-hidden relative cursor-pointer"
                  >
                      {s.logoUrl ? (
                          <img src={s.logoUrl} alt={s.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                          <span className={`font-condensed font-black ${s.textClass || 'text-4xl'} text-gray-400 group-hover:text-[#002060] transition-colors`}>
                              {s.name}
                          </span>
                      )}
                      <span className="mt-4 text-xs font-bold uppercase tracking-widest text-[#00C2FF] opacity-0 group-hover:opacity-100 transition-opacity">
                          {s.tier} Partner
                      </span>
                  </a>
              ))}
          </div>
      </section>

      {/* --- BECOME A PARTNER CTA --- */}
      <section className="bg-[#002060] text-white py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00C2FF] rounded-full blur-[150px] opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                          <Handshake size={18} className="text-[#00C2FF]" />
                          <span className="text-xs font-bold uppercase tracking-widest">Poslovna Suradnja</span>
                      </div>
                      <h2 className="font-condensed font-bold text-5xl md:text-7xl uppercase leading-none mb-6">
                          Postani Dio <br/> Pobjedničkog Tima
                      </h2>
                      <p className="text-lg text-blue-200 leading-relaxed mb-8 max-w-lg">
                          Povežite svoj brend s vrijednostima sporta, upornosti i zajedništva.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                          <button onClick={() => window.location.href='mailto:marketing@kkdinamo.hr'} className="px-8 py-4 bg-[#00C2FF] text-[#001035] font-condensed font-bold text-xl uppercase hover:bg-white transition-colors flex items-center justify-center gap-2">
                              Kontaktiraj Marketing <ArrowRight size={20} />
                          </button>
                      </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-8 lg:p-12 backdrop-blur-sm">
                      <h3 className="font-condensed font-bold text-3xl uppercase mb-6">Kontakt Podaci</h3>
                      <div className="space-y-6">
                          <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-[#001035] flex items-center justify-center text-[#00C2FF] flex-shrink-0">
                                  <Mail size={24} />
                              </div>
                              <div>
                                  <span className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Email za partnere</span>
                                  <a href="mailto:marketing@kkdinamo.hr" className="text-xl font-bold hover:text-[#00C2FF] transition-colors">marketing@kkdinamo.hr</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
