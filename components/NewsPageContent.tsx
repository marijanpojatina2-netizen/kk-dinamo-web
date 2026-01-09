'use client';

import React from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

// Definiramo interface unutar same datoteke i exportamo ga ako treba
export interface NewsItem {
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  excerpt: string;
}

export interface NewsPageProps {
  news: NewsItem[];
}

// Helper za formatiranje datuma
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}.`;
};

export default function NewsPageContent({ news }: NewsPageProps) {
  // Sigurnosna provjera ako je news undefined
  const validNews = Array.isArray(news) ? news : [];
  
  const featured = validNews.length > 0 ? validNews[0] : null;
  const gridItems = validNews.length > 1 ? validNews.slice(1) : [];

  return (
    <div className="font-sans text-[#001035] bg-gray-50 w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" />

      {/* DYNAMIC HEADER SECTION */}
      <section className="relative py-24 lg:py-32 bg-[#001035] overflow-hidden text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          
          {/* Large Floating Text */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[20vw] font-condensed font-bold text-white opacity-5 select-none leading-none pointer-events-none">
              PRESS
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-1 bg-[#00C2FF]"></span>
                  <span className="font-condensed font-bold text-lg uppercase tracking-[0.2em] text-[#00C2FF]">Arhiva Vijesti</span>
              </div>
              <h1 className="font-condensed font-bold text-7xl lg:text-9xl uppercase leading-none tracking-tighter">
                  Dinamo<br/><span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Novosti</span>
              </h1>
          </div>

          {/* MARQUEE TICKER AT BOTTOM OF HEADER */}
          <div className="absolute bottom-0 w-full bg-[#00C2FF] py-3 transform -skew-y-2 translate-y-4 shadow-xl z-20">
               <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-condensed font-bold text-xl uppercase text-[#001035]">
                   {[...Array(10)].map((_, i) => (
                       <React.Fragment key={i}>
                           <span>/// Najnovije Vijesti</span>
                           <span className="text-white/50">|</span>
                           <span>/// Ekskluzivno</span>
                           <span className="text-white/50">|</span>
                           <span>/// Intervjui</span>
                           <span className="text-white/50">|</span>
                           <span>/// Transferi</span>
                           <span className="text-white/50">|</span>
                       </React.Fragment>
                   ))}
               </div>
          </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-12 py-20">
           
           {/* FEATURED NEWS */}
           {featured && (
               <div className="mb-24 relative group cursor-pointer">
                   {/* Gradient Glow Effect */}
                   <div className="absolute -inset-2 bg-gradient-to-r from-[#002060] to-[#00C2FF] rounded-sm opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500"></div>
                   
                   <Link href={`/vijesti/${featured.slug}`} className="relative block bg-white shadow-2xl rounded-sm overflow-hidden">
                        {/* Image Container */}
                        <div className="aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-gray-200">
                            {featured.imageUrl && (
                                <img 
                                    src={featured.imageUrl} 
                                    alt={featured.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                            )}
                        </div>
                        
                        {/* Content Block - Below Image */}
                        <div className="p-8 lg:p-12 relative">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <span className="bg-[#00C2FF] text-[#001035] px-3 py-1 font-condensed font-bold uppercase text-sm tracking-wider shadow-md">
                                        {featured.category || 'Vijesti'}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-500 text-xs font-bold uppercase tracking-widest px-2 py-1 border border-gray-200">
                                        <Calendar size={12} /> {formatDate(featured.publishedAt)}
                                    </span>
                                </div>
                                
                                <h2 className="font-condensed font-bold text-4xl md:text-6xl lg:text-7xl text-[#001035] uppercase leading-[0.9] group-hover:text-[#002060] transition-colors">
                                    {featured.title}
                                </h2>
                                
                                <p className="text-gray-600 max-w-4xl text-lg font-body leading-relaxed">
                                    {featured.excerpt}
                                </p>
                                
                                <div className="mt-4 flex items-center gap-2 text-[#002060] font-condensed font-bold uppercase text-xl group-hover:gap-4 transition-all">
                                     <span>Pročitaj više</span>
                                     <ArrowRight size={24} className="text-[#00C2FF]" />
                                 </div>
                            </div>
                        </div>
                   </Link>
               </div>
           )}

           {/* FILTERS / TAGS ROW */}
           <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 pb-8 sticky top-20 z-30 bg-gray-50/95 backdrop-blur-sm py-4 -mx-4 px-4 lg:mx-0 lg:px-0">
               {['Sve', 'Utakmice', 'Klub', 'Intervju', 'Škola', 'Ulaznice'].map((tag, i) => (
                   <button key={tag} className={`px-6 py-2 rounded-full font-condensed font-bold uppercase text-sm transition-all border ${i === 0 ? 'bg-[#002060] text-white border-[#002060] shadow-md' : 'bg-white text-gray-500 border-gray-300 hover:border-[#002060] hover:text-[#002060]'}`}>
                       {tag}
                   </button>
               ))}
           </div>

           {/* NEWS GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
               {gridItems.map((item, i) => (
                   <Link href={`/vijesti/${item.slug}`} key={i} className="group cursor-pointer flex flex-col h-full bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                       {/* Image Area */}
                       <div className="aspect-[3/2] overflow-hidden relative bg-gray-100">
                           <div className="absolute inset-0 bg-[#002060] mix-blend-color opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
                           {item.imageUrl && (
                                <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title}/>
                           )}
                           
                           {/* Floating Category Badge */}
                           <div className="absolute top-4 right-4 z-20">
                               <span className="bg-white text-[#002060] text-xs font-bold uppercase px-3 py-1 shadow-md">
                                   {item.category || 'Vijesti'}
                               </span>
                           </div>
                       </div>
                       
                       {/* Content Area */}
                       <div className="p-6 flex flex-col flex-grow relative">
                           {/* Decorative Line Animation - Electric Blue */}
                           <div className="absolute top-0 left-0 w-0 h-1 bg-[#00C2FF] transition-all duration-500 group-hover:w-full"></div>

                           <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                               <Calendar size={14} className="text-[#00C2FF]" /> {formatDate(item.publishedAt)}
                           </div>
                           
                           <h3 className="font-condensed font-bold text-2xl text-black uppercase leading-tight mb-4 group-hover:text-[#002060] transition-colors">
                               {item.title}
                           </h3>
                           
                           <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-black transition-colors">Pročitaj članak</span>
                               <ArrowRight size={18} className="text-[#00C2FF] transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                           </div>
                       </div>
                   </Link>
               ))}
           </div>
           
           {/* Load More Button */}
           <div className="flex justify-center py-20 mt-8">
             <button className="relative overflow-hidden group px-12 py-5 bg-[#002060] text-white font-condensed font-bold text-xl uppercase tracking-wider shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#002060] transition-colors">Učitaj Više</span>
                 <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
             </button>
           </div>
      </section>

      <FooterV5 />
    </div>
  );
}