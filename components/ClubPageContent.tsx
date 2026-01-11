
'use client';

import React from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { Shield, Check, UserPlus } from 'lucide-react';
import { PortableText } from '@portabletext/react';

interface ClubPageProps {
  clubInfo: {
    history: any;
    historyImageUrl: string;
  } | null;
  logoUrl?: string;
}

export default function ClubPageContent({ clubInfo, logoUrl }: ClubPageProps) {
  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      {/* HISTORY */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-6"><span className="w-12 h-1 bg-[#00C2FF]"></span><span className="font-condensed font-bold text-lg uppercase tracking-[0.2em] text-[#00C2FF]">O Klubu</span></div>
                  <h1 className="font-condensed font-bold text-6xl lg:text-8xl uppercase leading-[1.1] mb-8 text-[#001035]">Povijest <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px #001035' }}>Ponos i Čast</span></h1>
                  <div className="text-lg text-gray-600 font-body leading-relaxed space-y-4 prose prose-lg">
                      {clubInfo?.history ? (
                          <PortableText value={clubInfo.history} />
                      ) : (
                          <p>Podaci o povijesti kluba nisu dostupni.</p>
                      )}
                  </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                  <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden rounded-sm shadow-2xl">
                       {clubInfo?.historyImageUrl && (
                           <img src={clubInfo.historyImageUrl} alt="Povijest Kluba" className="w-full h-full object-cover"/>
                       )}
                       <div className="absolute inset-0 bg-[#002060] mix-blend-color opacity-30"></div>
                       <div className="absolute bottom-8 left-8 bg-white p-6 shadow-lg"><span className="block text-xs font-bold uppercase tracking-widest text-gray-400">Osnovan</span><span className="font-condensed font-bold text-6xl text-[#002060] leading-none">1972</span></div>
                  </div>
              </div>
          </div>
      </section>

      {/* MEMBERSHIP HERO */}
      <section className="bg-[#002060] py-24 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
               <Shield size={64} className="mx-auto mb-8 text-[#00C2FF]" />
               <h2 className="font-condensed font-bold text-6xl lg:text-8xl uppercase leading-none mb-8">Postani Član <br/>Obitelji</h2>
               <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">Učlanjenjem u KK Dinamo izravno pomažete radu kluba i razvoju omladinskog pogona.</p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mb-12">
                   <div className="bg-white/10 p-6 backdrop-blur-sm border border-white/10"><Check className="text-[#00C2FF] mb-4" /><h3 className="font-bold uppercase text-lg mb-2">Popusti</h3><p className="text-sm text-white/70">20% popusta na godišnje ulaznice.</p></div>
                   <div className="bg-white/10 p-6 backdrop-blur-sm border border-white/10"><Check className="text-[#00C2FF] mb-4" /><h3 className="font-bold uppercase text-lg mb-2">Prednost</h3><p className="text-sm text-white/70">Prvokup ulaznica za derbije.</p></div>
                   <div className="bg-white/10 p-6 backdrop-blur-sm border border-white/10"><Check className="text-[#00C2FF] mb-4" /><h3 className="font-bold uppercase text-lg mb-2">Ekskluziva</h3><p className="text-sm text-white/70">Pozivnice za druženja s igračima.</p></div>
               </div>
           </div>
      </section>

      {/* MEMBERSHIP FORM */}
      <section id="clanstvo-form" className="py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 lg:px-0">
              <div className="bg-white shadow-2xl p-8 lg:p-12 border-t-8 border-[#00C2FF]">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-[#001035] text-white flex items-center justify-center rounded-full"><UserPlus size={32} /></div>
                      <div><h3 className="font-condensed font-bold text-4xl uppercase text-[#001035] leading-none">Prijavnica</h3><span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Godišnja članarina: 20€</span></div>
                  </div>
                  <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#001035]">Ime</label><input type="text" className="w-full bg-gray-50 border border-gray-300 p-4 focus:border-[#002060] focus:outline-none" placeholder="Vaše ime" /></div>
                          <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#001035]">Prezime</label><input type="text" className="w-full bg-gray-50 border border-gray-300 p-4 focus:border-[#002060] focus:outline-none" placeholder="Vaše prezime" /></div>
                      </div>
                      <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#001035]">OIB</label><input type="text" maxLength={11} className="w-full bg-gray-50 border border-gray-300 p-4 focus:border-[#002060] focus:outline-none" placeholder="Osobni identifikacijski broj" /></div>
                      <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#001035]">Email</label><input type="email" className="w-full bg-gray-50 border border-gray-300 p-4 focus:border-[#002060] focus:outline-none" placeholder="email@adresa.com" /></div>
                      <div className="pt-4 space-y-3">
                          <label className="flex items-start gap-4 cursor-pointer group"><input type="checkbox" className="mt-1" /><span className="text-sm text-gray-600 leading-tight">Prihvaćam Statut kluba i dajem privolu za obradu osobnih podataka.</span></label>
                      </div>
                      <button type="button" className="w-full bg-[#001035] text-white font-condensed font-bold text-2xl uppercase py-5 hover:bg-[#00C2FF] hover:text-[#001035] transition-colors shadow-lg mt-8">Pošalji Zahtjev</button>
                  </form>
              </div>
          </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
