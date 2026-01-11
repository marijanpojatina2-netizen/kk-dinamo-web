
'use client';

import React from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface SchoolPageProps {
  news: any[];
  staff: any[];
  logoUrl?: string;
}

export default function SchoolPageContent({ news, staff, logoUrl }: SchoolPageProps) {
  // Filtriraj voditelja (pretpostavka: role sadrži 'Voditelj' ili je prvi na listi ako nema match-a)
  const headOfAcademy = staff.find(s => s.role && s.role.includes('Voditelj')) || staff[0];
  // Ostali treneri (izbaci voditelja s liste trenera da se ne dupla, ako je nađen)
  const coaches = staff.filter(s => s._id !== headOfAcademy?._id);

  // Paleta boja za kartice trenera
  const cardStyles = [
    { bg: 'bg-[#001035]', text: 'text-white', accent: 'text-[#00C2FF]' },
    { bg: 'bg-[#002060]', text: 'text-white', accent: 'text-[#00C2FF]' },
    { bg: 'bg-[#00C2FF]', text: 'text-[#001035]', accent: 'text-white' }
  ];

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      {/* INTRO */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-12 py-12 lg:py-24">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative w-full aspect-[4/3] lg:aspect-square overflow-hidden group">
                   <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#002060] z-20"></div>
                   <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#00C2FF] z-20"></div>
                   <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200" alt="Škola Košarke" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-0 group-hover:saturate-100"/>
              </div>
              <div className="flex flex-col justify-center">
                   <div className="flex items-center gap-3 mb-6"><span className="w-12 h-1 bg-[#00C2FF]"></span><span className="font-condensed font-bold text-lg uppercase tracking-[0.2em] text-[#00C2FF]">Omladinski Pogon</span></div>
                   <h1 className="font-condensed font-bold text-6xl lg:text-8xl uppercase leading-[1.3] mb-8 text-[#001035]">Više od <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px #001035' }}>Košarke</span></h1>
                   <p className="text-xl leading-relaxed text-gray-600 mb-8 font-body">Škola košarke KK Dinamo Zagreb predstavlja temelj naše budućnosti. Naš program obuhvaća razvoj od najranije dobi pa sve do ulaska u seniorsku košarku.</p>
                   <button onClick={() => document.getElementById('upisi-form')?.scrollIntoView({ behavior: 'smooth' })} className="self-start px-10 py-4 bg-[#002060] text-white font-condensed font-bold text-xl uppercase hover:bg-[#00C2FF] hover:text-[#001035] transition-colors shadow-lg">Upiši se danas</button>
              </div>
          </div>
      </section>

      {/* LEADERSHIP (Dynamic from CMS) */}
      {headOfAcademy && (
        <section className="bg-[#001035] text-white py-20 lg:py-32">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-5">
                        <span className="text-[#00C2FF] font-condensed font-bold text-xl uppercase tracking-widest block mb-4">Voditelj omladinskog pogona</span>
                        <h2 className="font-condensed font-bold text-6xl lg:text-8xl uppercase leading-none mb-8">
                            {headOfAcademy.name} <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>{headOfAcademy.lastname}</span>
                        </h2>
                    </div>
                    <div className="lg:col-span-7">
                        <p className="text-blue-100 text-2xl font-body leading-relaxed border-l-4 border-[#00C2FF] pl-8 italic">"Naš cilj nije samo stvaranje vrhunskih igrača, već i zdravih, discipliniranih mladih ljudi."</p>
                        <div className="mt-12 flex gap-12">
                            <div className="flex flex-col"><span className="font-condensed font-bold text-5xl text-[#00C2FF]">450+</span><span className="text-xs uppercase tracking-widest text-white/50">Aktivnih polaznika</span></div>
                            <div className="flex flex-col"><span className="font-condensed font-bold text-5xl text-[#00C2FF]">{staff.length}</span><span className="text-xs uppercase tracking-widest text-white/50">Stručnih trenera</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* COACHES GRID (Dynamic with Colored Cards) */}
      <section className="bg-white py-24">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="mb-16">
                  <h2 className="font-condensed font-black text-6xl md:text-8xl uppercase leading-none tracking-tighter text-[#001035]">
                      NAŠI <span className="text-[#00C2FF]">TRENERI</span>
                  </h2>
                  <div className="w-20 h-2 bg-[#00C2FF] mt-4"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coaches.map((coach, i) => {
                      const style = cardStyles[i % cardStyles.length];
                      return (
                          <div key={i} className={`flex flex-col group relative ${style.bg} transition-colors duration-300 h-full`}>
                              {/* Image Container */}
                              <div className="aspect-[4/5] overflow-hidden relative">
                                  {coach.imageUrl ? (
                                      <img 
                                        src={coach.imageUrl} 
                                        alt={coach.lastname} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                      />
                                  ) : (
                                      <div className="w-full h-full flex items-center justify-center opacity-10">
                                          <span className={`font-condensed font-black text-6xl ${style.text}`}>KKD</span>
                                      </div>
                                  )}
                                  {/* Gradient Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                              </div>
                              
                              {/* Content */}
                              <div className="p-8 relative mt-auto">
                                  <h3 className={`font-condensed font-bold text-3xl uppercase tracking-tight mb-2 ${style.text}`}>
                                      {coach.name} <br/> {coach.lastname}
                                  </h3>
                                  <span className={`text-sm font-bold uppercase tracking-[0.2em] ${style.accent} opacity-90`}>
                                      {coach.role || 'Trener'}
                                  </span>
                              </div>
                          </div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* NEWS */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-12 py-20 lg:py-32">
          <div className="flex justify-between items-end mb-16">
              <h2 className="font-condensed font-bold text-5xl lg:text-7xl uppercase text-[#001035] leading-none tracking-tighter">Vijesti iz <br/>škole</h2>
              <Link href="/vijesti" className="hidden md:flex items-center gap-2 font-bold uppercase text-[#001035] hover:text-[#00C2FF] transition-colors border-b-2 border-[#001035] hover:border-[#00C2FF] pb-1">Sve Vijesti <ArrowRight size={20} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {news.map((item, i) => (
                  <Link href={`/vijesti/${item.slug}`} key={i} className="group cursor-pointer">
                      <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-4 left-4"><span className="bg-[#00C2FF] text-[#001035] text-[10px] font-bold uppercase px-3 py-1">{item.category}</span></div>
                      </div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{new Date(item.publishedAt).toLocaleDateString()}</span>
                      <h3 className="font-condensed font-bold text-3xl uppercase leading-tight group-hover:text-[#002060] transition-colors">{item.title}</h3>
                  </Link>
              ))}
          </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="upisi-form" className="bg-[#001035] py-20 lg:py-32 text-white">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                  <div>
                      <h2 className="font-condensed font-bold text-6xl lg:text-8xl uppercase leading-none mb-8 tracking-tighter">Upis novih <br/><span className="text-[#00C2FF]">članova</span></h2>
                      <p className="text-xl text-blue-200 mb-12">Ispunite formu i postani dio Dinamo obitelji. Naš stručni stožer će vas kontaktirati u roku od 48 sati.</p>
                      <div className="space-y-8">
                          <div className="flex items-center gap-6"><div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-[#00C2FF]"><Mail size={24} /></div><div><span className="block text-xs uppercase tracking-widest text-white/40">Email za upise</span><span className="text-2xl font-bold">upisi@kkdinamo.hr</span></div></div>
                          <div className="flex items-center gap-6"><div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-[#00C2FF]"><Phone size={24} /></div><div><span className="block text-xs uppercase tracking-widest text-white/40">Kontakt broj</span><span className="text-2xl font-bold">+385 1 234 5678</span></div></div>
                      </div>
                  </div>
                  
                  {/* Form */}
                  <div className="bg-white/5 p-8 lg:p-12 backdrop-blur-sm border border-white/10">
                      <form className="space-y-6">
                          <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#00C2FF]">Ime i prezime djeteta</label><input type="text" className="w-full bg-[#000d26] border border-white/20 p-4 focus:outline-none focus:border-[#00C2FF] transition-colors text-white" /></div>
                          <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#00C2FF]">Godište rođenja</label><input type="number" placeholder="npr. 2012" className="w-full bg-[#000d26] border border-white/20 p-4 focus:outline-none focus:border-[#00C2FF] transition-colors text-white" /></div>
                          <div className="space-y-2"><label className="text-xs font-bold uppercase tracking-widest text-[#00C2FF]">Kontakt broj (Mobitel)</label><input type="tel" className="w-full bg-[#000d26] border border-white/20 p-4 focus:outline-none focus:border-[#00C2FF] transition-colors text-white" /></div>
                          <div className="pt-4"><button type="button" className="w-full bg-[#00C2FF] text-[#001035] font-condensed font-bold text-2xl uppercase py-5 hover:bg-white transition-colors shadow-2xl">Pošalji prijavu</button></div>
                      </form>
                  </div>
              </div>
          </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
