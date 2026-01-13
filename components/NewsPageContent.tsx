
'use client';

import React, { useState } from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

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
  logoUrl?: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}.`;
};

export default function NewsPageContent({ news, logoUrl }: NewsPageProps) {
  const [activeCategory, setActiveCategory] = useState('Sve');
  const validNews = Array.isArray(news) ? news : [];

  const filteredNews = activeCategory === 'Sve' 
    ? validNews 
    : validNews.filter(item => item.category === activeCategory);

  return (
    <div className="font-sans text-[#001035] bg-gray-50 w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      {/* DYNAMIC HEADER SECTION */}
      <section className="relative py-24 lg:py-32 bg-[#001035] overflow-hidden text-white">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[20vw] font-condensed font-bold text-white opacity-5 select-none leading-none pointer-events-none">
              PRESS
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-1 bg-[#00C2FF]"></span>
                  <span className="font-condensed font-bold text-lg uppercase tracking-[0.2em] text-[#00C2FF]">Arhiva Vijesti</span>
              </div>
              {/* Changed leading from none to 1.1 */}
              <h1 className="font-condensed font-bold text-7xl lg:text-9xl uppercase leading-[1.1] tracking-tighter">
                  Dinamo<br/><span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Novosti</span>
              </h1>
          </div>
      </section>

      {/* MAIN CONTENT AREA - GRID ONLY */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-12 py-12 lg:py-20">
           
           {/* FILTERS - MOVED HERE & STYLED FOR LIGHT BACKGROUND */}
           <div className="flex flex-wrap gap-3 mb-12">
               {['Sve', 'Utakmice', 'Klub', 'Intervju', 'Škola', 'Ulaznice'].map((tag, i) => (
                   <button 
                      key={tag} 
                      onClick={() => setActiveCategory(tag)}
                      className={`px-6 py-2 rounded-full font-condensed font-bold uppercase text-sm transition-all border ${activeCategory === tag ? 'bg-[#002060] text-white border-[#002060] shadow-md' : 'bg-white text-gray-500 border-gray-300 hover:border-[#002060] hover:text-[#002060]'}`}
                   >
                       {tag}
                   </button>
               ))}
           </div>

           {/* NEWS GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
               {filteredNews.length > 0 ? (
                   filteredNews.map((item, i) => (
                       <Link href={`/vijesti/${item.slug}`} key={i} className="group cursor-pointer flex flex-col h-full bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                           <div className="aspect-[3/2] overflow-hidden relative bg-gray-100">
                               <div className="absolute inset-0 bg-[#002060] mix-blend-color opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
                               {item.imageUrl && (
                                    <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title}/>
                               )}
                               <div className="absolute top-4 right-4 z-20">
                                   <span className="bg-white text-[#002060] text-xs font-bold uppercase px-3 py-1 shadow-md">
                                       {item.category || 'Vijesti'}
                                   </span>
                               </div>
                           </div>
                           <div className="p-6 flex flex-col flex-grow relative">
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
                   ))
               ) : (
                   <div className="col-span-full py-12 text-center text-gray-500 font-bold uppercase tracking-widest">
                       Nema vijesti u ovoj kategoriji.
                   </div>
               )}
           </div>
           
           {/* Load More Button */}
           <div className="flex justify-center py-20 mt-8">
             <button className="relative overflow-hidden group px-12 py-5 bg-[#002060] text-white font-condensed font-bold text-xl uppercase tracking-wider shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#002060] transition-colors">Učitaj Više</span>
                 <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
             </button>
           </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
