
'use client';

import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { sponsors } from '../app/data/siteData';

// Custom TikTok Icon (Lucide doesn't have it)
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface FooterV5Props {
  logoUrl?: string;
}

const FooterV5: React.FC<FooterV5Props> = ({ logoUrl }) => {
  const half = Math.ceil(sponsors.length / 2);
  const firstRow = sponsors.slice(0, half);
  const secondRow = sponsors.slice(half);

  const repeatRow1 = [...firstRow, ...firstRow, ...firstRow];
  const repeatRow2 = [...secondRow, ...secondRow, ...secondRow];

  // Fallback logo if CMS url is missing
  const displayLogo = logoUrl || "https://upload.wikimedia.org/wikipedia/hr/thumb/2/23/KK_Dinamo_Zagreb.png/260px-KK_Dinamo_Zagreb.png";

  return (
    <div className="flex flex-col">
        <section className="py-20 bg-gray-50 border-t border-gray-200 overflow-hidden">
           <div className="max-w-[1920px] mx-auto px-4 lg:px-12 text-center mb-12">
               <span className="font-body text-sm font-bold text-gray-400 uppercase tracking-[0.3em] block">Ponosni Partneri</span>
           </div>
           
           <div className="w-full flex relative overflow-hidden mask-linear-fade mb-8">
               <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-32 min-w-full">
                    {repeatRow1.map((p, i) => (
                        <div key={i} className="group cursor-pointer grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex-shrink-0">
                             <span className={`font-condensed font-black ${p.footerSize} text-black block`}>{p.name}</span>
                        </div>
                    ))}
               </div>
           </div>

           <div className="w-full flex relative overflow-hidden mask-linear-fade">
               <div className="animate-marquee-rev whitespace-nowrap flex items-center gap-16 md:gap-32 min-w-full">
                    {repeatRow2.map((p, i) => (
                        <div key={i} className="group cursor-pointer grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex-shrink-0">
                             <span className={`font-condensed font-black ${p.footerSize} text-black block`}>{p.name}</span>
                        </div>
                    ))}
               </div>
           </div>
        </section>

        <footer className="bg-[#002060] border-t border-white/10 pt-20 pb-10">
            <div className="max-w-[1920px] mx-auto px-4 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-0">
                    <div>
                        <img 
                          src={displayLogo} 
                          className="w-20 h-20 mb-6 brightness-0 invert object-contain" 
                          alt="Logo"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <address className="not-italic text-base text-blue-200 font-body">KK Dinamo Zagreb<br/>Rudeška 71, Zagreb</address>
                        <p className="text-white/60 mt-4 text-sm">info@kkdinamo.hr</p>
                    </div>
                    
                    <div className="col-span-1 lg:col-span-2 flex flex-col md:flex-row gap-8 lg:gap-32 font-bold text-white uppercase text-lg font-condensed">
                        <ul className="space-y-4">
                            <li><Link href="/vijesti" className="hover:text-blue-300 transition-colors">Vijesti</Link></li>
                            <li><Link href="/momcad" className="hover:text-blue-300 transition-colors">Momčad</Link></li>
                            <li><Link href="/skola" className="hover:text-blue-300 transition-colors">Škola</Link></li>
                            <li><Link href="/klub" className="hover:text-blue-300 transition-colors">Klub</Link></li>
                        </ul>
                        <ul className="space-y-4 text-white/70">
                            <li><Link href="#" className="hover:text-white transition-colors">Impresum</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Politika Privatnosti</Link></li>
                            <li><Link href="/sponzori" className="hover:text-white transition-colors">Kontakt</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Dokumenti</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-start lg:items-end">
                        <div className="flex gap-6 mb-6 text-white">
                            <a href="https://www.instagram.com/kk_dinamo/" target="_blank" rel="noopener noreferrer">
                              <Instagram size={30} className="hover:text-blue-300 cursor-pointer transition-colors" />
                            </a>
                            <a href="https://www.facebook.com/kkdinamo/" target="_blank" rel="noopener noreferrer">
                              <Facebook size={30} className="hover:text-blue-300 cursor-pointer transition-colors" />
                            </a>
                            <a href="https://www.tiktok.com/@kk_dinamo" target="_blank" rel="noopener noreferrer">
                              <TikTokIcon size={30} className="hover:text-blue-300 cursor-pointer transition-colors" />
                            </a>
                        </div>
                        <p className="text-sm text-blue-300 font-body">© 2025 KK Dinamo Zagreb</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default FooterV5;
