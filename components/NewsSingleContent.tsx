
'use client';

import React from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { Calendar, User, Facebook, Twitter, Linkedin, Ticket, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../app/lib/sanity';

interface NewsArticle {
  title: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  body: any;
}

interface NewsSingleContentProps {
  article: NewsArticle;
  relatedNews: any[];
  logoUrl?: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}.`;
};

// Custom component to render images within PortableText
const PortableTextImage = ({ value }: any) => {
  return (
    <div className="my-8">
      <img
        src={urlFor(value)?.url() || ""}
        alt={value.caption || "Article Image"}
        className="w-full h-auto rounded-sm max-h-[600px] object-contain bg-gray-50"
      />
      {value.caption && (
        <p className="text-center text-gray-500 text-sm mt-2 italic">{value.caption}</p>
      )}
    </div>
  );
};

export default function NewsSingleContent({ article, relatedNews, logoUrl }: NewsSingleContentProps) {
  if (!article) return null;

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" logoUrl={logoUrl} />

      {/* --- ARTICLE HEADER --- */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-8">
          <div className="flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-[#002060] transition-colors">
              <Link href="/vijesti" className="flex items-center gap-1"><ChevronLeft size={16} /> Povratak na vijesti</Link>
          </div>

          <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#00C2FF] text-[#001035] px-3 py-1 font-condensed font-bold uppercase text-sm tracking-wider shadow-sm">
                  {article.category || 'Vijesti'}
              </span>
              <span className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                  <Calendar size={14} className="text-[#00C2FF]" /> {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                  <User size={14} className="text-[#00C2FF]" /> Press Služba
              </span>
          </div>

          <h1 className="font-condensed font-bold text-4xl md:text-6xl lg:text-7xl text-[#001035] uppercase leading-[1.1] mb-8 tracking-tight max-w-5xl">
              {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl md:text-2xl text-gray-600 font-body leading-relaxed border-l-4 border-[#00C2FF] pl-6 max-w-4xl">
                {article.excerpt}
            </p>
          )}
      </section>

      {/* --- FEATURED IMAGE --- */}
      {article.imageUrl && (
        <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 mb-16">
            <div className="aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden relative shadow-2xl bg-gray-100">
                <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
      )}

      {/* --- MAIN CONTENT & SIDEBAR MOVED TO BOTTOM --- */}
      <section className="max-w-[1200px] mx-auto px-4 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* SOCIALS - Sticky Left */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center gap-6 sticky top-32 h-fit">
                  {/* Fixed rotation */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Podijeli</span>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"><Facebook size={18} /></button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"><Twitter size={18} /></button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"><Linkedin size={18} /></button>
              </div>

              {/* ARTICLE BODY - WIDER */}
              <div className="lg:col-span-10 font-body text-lg text-gray-800 leading-relaxed space-y-8 prose prose-lg prose-blue max-w-none">
                  {article.body ? (
                      <PortableText 
                        value={article.body} 
                        components={{
                            types: {
                                image: PortableTextImage
                            }
                        }}
                      />
                  ) : (
                      <p className="text-gray-500 italic">Više detalja uskoro...</p>
                  )}
              </div>
          </div>
      </section>

      {/* --- BOTTOM "SIDEBAR" CONTENT --- */}
      <section className="bg-gray-50 border-t border-gray-200 py-20">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  
                  {/* CTA Ticket Widget */}
                  <div className="bg-[#002060] text-white p-8 text-center h-fit">
                      <Ticket size={48} className="mx-auto mb-4 text-[#00C2FF]" />
                      <h3 className="font-condensed font-bold text-4xl uppercase leading-none mb-2">Osiguraj svoje mjesto</h3>
                      <p className="text-blue-200 text-sm mb-6">Ne propusti spektakl u Draženovom domu.</p>
                      <a href="https://core-event.co/organizers/kk-dinamo-zagreb-b746/" target="_blank" className="block w-full bg-[#00C2FF] text-[#001035] font-condensed font-bold text-xl uppercase py-4 hover:bg-white transition-colors">
                          Kupi Ulaznice
                      </a>
                  </div>

                  {/* Related News */}
                  <div className="lg:col-span-1">
                      <h3 className="font-condensed font-bold text-2xl text-[#001035] uppercase mb-6 border-b-2 border-gray-200 pb-2">Povezane Vijesti</h3>
                      <div className="space-y-6">
                          {relatedNews.length > 0 ? relatedNews.map((item, i) => (
                              <Link href={`/vijesti/${item.slug}`} key={i} className="flex gap-4 group cursor-pointer">
                                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-gray-200">
                                      {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title}/>}
                                  </div>
                                  <div>
                                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">{formatDate(item.publishedAt)}</span>
                                      <h4 className="font-condensed font-bold text-lg leading-tight uppercase group-hover:text-[#00C2FF] transition-colors">{item.title}</h4>
                                  </div>
                              </Link>
                          )) : <p>Nema povezanih vijesti.</p>}
                      </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-white p-8 border border-gray-200 h-fit">
                      <h3 className="font-condensed font-bold text-2xl text-[#001035] uppercase mb-2">Newsletter</h3>
                      <p className="text-xs text-gray-500 mb-4">Prijavi se za novosti i ekskluzivne intervjue.</p>
                      <input type="email" placeholder="Tvoj email..." className="w-full bg-gray-50 border border-gray-300 p-3 text-sm mb-2 focus:outline-none focus:border-[#002060]" />
                      <button className="w-full bg-[#001035] text-white font-bold uppercase text-xs py-3 hover:bg-[#00C2FF] hover:text-[#001035] transition-colors">Prijavi se</button>
                  </div>

              </div>
          </div>
      </section>

      <FooterV5 />
    </div>
  );
}
