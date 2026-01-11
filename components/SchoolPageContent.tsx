
'use client';

import React, { useRef } from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { ArrowRight, Mail, Phone, MapPin, Calendar, User, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface SchoolPageProps {
  news: any[];
  staff: any[];
  locations: any[];
  youthTeams: any[];
  logoUrl?: string;
}

export default function SchoolPageContent({ news, staff, locations, youthTeams, logoUrl }: SchoolPageProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: 'left' | 'right') => {
      if (sliderRef.current) {
          sliderRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
      }
  };

  const headOfAcademy = staff.find(s => s.role && s.role.includes('Voditelj')) || staff[0];

  return (
    <div className="font-sans text-[#001035] bg-gray-50 w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#001035] text-white py-24 lg:py-32 overflow-hidden">
          {/* Abstract pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#00C2FF] rounded-full blur-[150px] transform translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                   <div className="flex items-center gap-3 mb-6">
                       <div className="px-3 py-1 bg-[#00C2FF] text-[#001035] font-condensed font-bold uppercase text-xs tracking-wider">
                           Omladinski Pogon
                       </div>
                   </div>
                   <h1 className="font-condensed font-bold text-6xl lg:text-8xl uppercase leading-[1.1] mb-8">
                       Budućnost <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>Počinje Ovdje</span>
                   </h1>
                   <p className="text-xl text-blue-100 max-w-xl leading-relaxed mb-10 border-l-4 border-[#00C2FF] pl-6">
                       Više od 450 polaznika, 12 stručnih trenera i 7 lokacija. Pridruži se najbrže rastućoj školi košarke u Zagrebu.
                   </p>
                   <button onClick={() => document.getElementById('upisi-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[#00C2FF] text-[#001035] font-condensed font-bold text-xl uppercase hover:bg-white transition-colors skew-x-[-10deg]">
                       <span className="skew-x-[10deg] inline-block">Upiši se</span>
                   </button>
              </div>
              <div className="flex-1 relative">
                  <div className="relative z-10 border-4 border-[#00C2FF] p-2 transform rotate-2">
                      <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800" alt="Mladi košarkaši" className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"/>
                  </div>
                  <div className="absolute inset-0 border-4 border-white transform -rotate-2"></div>
              </div>
          </div>
      </section>

      {/* --- TEAM SLIDER (SELEKCIJE) --- */}
      <section className="py-20 bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12 mb-12 flex justify-between items-end">
              <div>
                  <h2 className="font-condensed font-bold text-5xl uppercase text-[#001035] leading-none mb-2">Naše <span className="text-[#00C2FF]">Ekipe</span></h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Od škole košarke do seniora B</p>
              </div>
              <div className="flex gap-2">
                  <button onClick={() => scrollSlider('left')} className="p-3 border-2 border-[#001035] hover:bg-[#001035] hover:text-white transition-colors"><ChevronLeft size={24}/></button>
                  <button onClick={() => scrollSlider('right')} className="p-3 border-2 border-[#001035] hover:bg-[#001035] hover:text-white transition-colors"><ChevronRight size={24}/></button>
              </div>
          </div>

          <div ref={sliderRef} className="flex overflow-x-auto no-scrollbar gap-6 px-4 lg:px-12 snap-x snap-mandatory pb-8">
              {youthTeams.map((team, i) => (
                  <div key={i} className="min-w-[350px] md:min-w-[500px] snap-center flex-shrink-0 group relative overflow-hidden bg-[#001035] text-white shadow-xl rounded-sm">
                      {/* Image Area */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                          <img src={team.imageUrl} alt={team.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001035] via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-6">
                              <h3 className="font-condensed font-bold text-4xl uppercase">{team.title}</h3>
                              <span className="text-[#00C2FF] font-bold uppercase text-sm tracking-widest">Trener: {team.coach}</span>
                          </div>
                      </div>
                      
                      {/* Schedule Area */}
                      <div className="p-6 bg-[#001540] border-t border-white/10">
                          <h4 className="font-condensed font-bold text-lg uppercase mb-4 flex items-center gap-2">
                              <Calendar size={18} className="text-[#00C2FF]" /> Nadolazeće Utakmice
                          </h4>
                          {team.schedule && team.schedule.length > 0 ? (
                              <div className="space-y-3">
                                  {team.schedule.map((game: any, idx: number) => (
                                      <div key={idx} className="flex justify-between items-center text-sm border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                          <span className="font-bold text-white/90">vs {game.opponent}</span>
                                          <div className="text-right">
                                              <span className="block text-[#00C2FF] font-bold text-xs">{new Date(game.date).toLocaleDateString('hr-HR', {day: '2-digit', month: '2-digit'})}</span>
                                              <span className="block text-white/50 text-[10px] uppercase">{game.location}</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <p className="text-white/40 text-sm italic">Nema najavljenih utakmica.</p>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* --- TRAINING LOCATIONS (GRID) --- */}
      <section className="py-20 lg:py-32 bg-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="text-center mb-16">
                  <span className="text-[#00C2FF] font-bold uppercase tracking-widest text-sm mb-2 block">Gdje treniramo?</span>
                  <h2 className="font-condensed font-bold text-5xl lg:text-7xl uppercase text-[#001035] leading-none">Lokacije <br/> Škola</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {locations.map((loc, i) => (
                      <div key={i} className="bg-white p-2 shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                          <div className="aspect-square overflow-hidden relative mb-4">
                              <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-[#002060]">
                                  <MapPin size={20} />
                              </div>
                          </div>
                          <div className="px-4 pb-4 text-center">
                              <h3 className="font-condensed font-bold text-2xl uppercase text-[#001035] mb-1">{loc.name}</h3>
                              <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">{loc.address}</p>
                              {loc.mapLink && (
                                  <a href={loc.mapLink} target="_blank" className="inline-block mt-4 text-[#00C2FF] font-bold text-xs uppercase tracking-widest border-b border-[#00C2FF] pb-0.5 hover:text-[#001035] hover:border-[#001035] transition-colors">
                                      Prikaži na mapi
                                  </a>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- REGISTRATION FORM (EXPANDED) --- */}
      <section id="upisi-form" className="bg-[#002060] py-20 lg:py-32 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00C2FF] rounded-full blur-[120px] opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  
                  {/* Left Info */}
                  <div className="lg:col-span-5">
                      <h2 className="font-condensed font-bold text-6xl lg:text-7xl uppercase leading-none mb-8 tracking-tighter">
                          Postani Dio <br/><span className="text-[#00C2FF]">Dinamo Obitelji</span>
                      </h2>
                      <p className="text-xl text-blue-100 mb-12 font-body leading-relaxed">
                          Ispunite obrazac za upis u školu košarke. Naši treneri će vas kontaktirati s informacijama o terminima treninga na odabranoj lokaciji.
                      </p>
                      
                      <div className="bg-[#001035] p-8 border-l-4 border-[#00C2FF]">
                          <h3 className="font-condensed font-bold text-2xl uppercase mb-6">Kontakt za upise</h3>
                          <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#00C2FF]"><Mail size={20} /></div>
                                  <div>
                                      <span className="block text-[10px] uppercase tracking-widest text-white/40">Email</span>
                                      <span className="text-lg font-bold">skola@kkdinamo.hr</span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#00C2FF]"><Phone size={20} /></div>
                                  <div>
                                      <span className="block text-[10px] uppercase tracking-widest text-white/40">Voditelj Škole</span>
                                      <span className="text-lg font-bold">+385 91 234 5678</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Form */}
                  <div className="lg:col-span-7 bg-white p-8 lg:p-12 text-[#001035] shadow-2xl rounded-sm">
                      <form className="space-y-8">
                          
                          {/* Child Info */}
                          <div>
                              <h3 className="font-condensed font-bold text-2xl uppercase mb-6 flex items-center gap-2">
                                  <User size={24} className="text-[#00C2FF]" /> Podaci o djetetu
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Ime i Prezime</label>
                                      <input type="text" className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Datum Rođenja</label>
                                      <input type="date" className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors" />
                                  </div>
                                  <div className="space-y-2 md:col-span-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Željena Lokacija Treninga</label>
                                      <select className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors">
                                          <option value="">Odaberite školu...</option>
                                          {locations.map((loc, i) => (
                                              <option key={i} value={loc.name}>{loc.name} ({loc.address})</option>
                                          ))}
                                      </select>
                                  </div>
                              </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Parent Info */}
                          <div>
                              <h3 className="font-condensed font-bold text-2xl uppercase mb-6 flex items-center gap-2">
                                  <User size={24} className="text-[#00C2FF]" /> Podaci o roditelju
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Ime i Prezime Roditelja</label>
                                      <input type="text" className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Kontakt Telefon</label>
                                      <input type="tel" className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors" />
                                  </div>
                                  <div className="space-y-2 md:col-span-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Adresa</label>
                                      <input type="email" className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors" />
                                  </div>
                                  <div className="space-y-2 md:col-span-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Napomena (opcionalno)</label>
                                      <textarea rows={3} className="w-full bg-gray-50 border border-gray-300 p-3 focus:outline-none focus:border-[#002060] transition-colors"></textarea>
                                  </div>
                              </div>
                          </div>

                          <div className="pt-4">
                              <button type="button" className="w-full bg-[#002060] text-white font-condensed font-bold text-2xl uppercase py-5 hover:bg-[#00C2FF] hover:text-[#001035] transition-colors shadow-xl">
                                  Pošalji Prijavu
                              </button>
                              <p className="text-center text-xs text-gray-400 mt-4 leading-tight">
                                  Slanjem obrasca pristajete na obradu osobnih podataka u svrhu kontaktiranja vezano za upis u školu košarke.
                              </p>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
