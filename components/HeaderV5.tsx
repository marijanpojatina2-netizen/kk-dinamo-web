
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Ticket, Instagram, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TikTokIcon = ({ size = 24, className = "" }: {size?: number, className?: string}) => (
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

interface HeaderV5Props {
  variant?: 'transparent' | 'solid'; // Ostavljamo prop radi kompatibilnosti, ali logika se bazira na pathu
  logoUrl?: string;
}

const HeaderV5: React.FC<HeaderV5Props> = ({ logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Fallback logo if CMS url is missing
  const displayLogo = logoUrl || "https://upload.wikimedia.org/wikipedia/hr/thumb/2/23/KK_Dinamo_Zagreb.png/260px-KK_Dinamo_Zagreb.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // LOGIKA PRIKAZA HEADERA:
  // 1. Ako je Homepage: Početno skriven (ili transparentan bez sadržaja), prikazuje se tek na scroll.
  // 2. Ostale stranice: Uvijek vidljiv, uvijek bijela pozadina (kao da je scrollan).
  
  const headerVisibleClass = isHomePage 
    ? (isScrolled ? 'translate-y-0 bg-white shadow-md py-2' : '-translate-y-full py-4 opacity-0 pointer-events-none') 
    : 'translate-y-0 bg-white shadow-md py-2';

  // Text color is always dark blue if visible (since visible means white background on home scroll OR solid on other pages)
  const textColorClass = 'text-[#002060]';
  
  // Button logic: Always solid/dark because header is white when visible
  // Hover effect: Outline blue, Text Blue
  const shopButtonClass = 'border-[#002060] text-[#002060] hover:bg-[#002060] hover:text-white';
  const ticketButtonClass = 'bg-[#002060] border-[#002060] text-white hover:bg-white hover:text-[#002060]';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform ${headerVisibleClass}`}>
        <div className="max-w-[1920px] mx-auto px-4 lg:px-12 flex items-center justify-between">
            <Link 
              href="/" 
              className="w-12 h-12 lg:w-20 lg:h-20 relative z-50 block hover:scale-105 transition-all duration-300"
            >
                <img 
                  src={displayLogo} 
                  alt="KK Dinamo" 
                  className="w-full h-full object-contain drop-shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-[#002060]', 'text-white', 'flex', 'items-center', 'justify-center', 'rounded-full', 'font-black');
                    if(e.currentTarget.parentElement) e.currentTarget.parentElement.innerText = "d";
                  }}
                />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
                <nav className={`flex items-center gap-6 xl:gap-8 font-condensed text-xl xl:text-2xl font-bold uppercase ${textColorClass}`}>
                    <Link href="/vijesti" className="hover:opacity-70 transition-opacity">Vijesti</Link>
                    <Link href="/klub/momcad" className="hover:opacity-70 transition-opacity">Momčad</Link>
                    <Link href="/skola" className="hover:opacity-70 transition-opacity">Škola Košarke</Link>
                    <Link href="/sponzori" className="hover:opacity-70 transition-opacity">Sponzori</Link>
                    <Link href="/klub" className="hover:opacity-70 transition-opacity">Klub</Link>
                </nav>
                <div className={`w-[1px] h-8 mx-2 opacity-30 bg-[#002060]`}></div>
                <div className="flex items-center gap-4">
                    {/* GUMB ULAZNICE - POPRAVLJEN HOVER */}
                    <a href="https://core-event.co/organizers/kk-dinamo-zagreb-b746/" target="_blank" className={`flex items-center gap-2 px-5 py-2 border-2 skew-x-[-10deg] transition-all hover:scale-105 ${ticketButtonClass}`}>
                        <Ticket size={18} className="skew-x-[10deg]" /> 
                        <span className="font-condensed font-bold text-xl uppercase skew-x-[10deg]">Ulaznice</span>
                    </a>
                    <a href="https://shop.kkdinamo.hr" target="_blank" className={`flex items-center gap-2 px-5 py-2 border-2 skew-x-[-10deg] transition-all hover:scale-105 ${shopButtonClass}`}>
                        <ShoppingBag size={18} className="skew-x-[10deg]" /> 
                        <span className="font-condensed font-bold text-xl uppercase skew-x-[10deg]">Shop</span>
                    </a>
                </div>
            </div>

            <div className={`flex items-center gap-6 ${textColorClass}`}>
                <div className="hidden lg:flex gap-5">
                    <a href="https://www.instagram.com/kk_dinamo/" target="_blank" rel="noopener noreferrer"><Instagram size={24} className="hover:scale-110 cursor-pointer transition-transform"/></a>
                    <a href="https://www.facebook.com/kkdinamo/" target="_blank" rel="noopener noreferrer"><Facebook size={24} className="hover:scale-110 cursor-pointer transition-transform"/></a>
                    <a href="https://www.tiktok.com/@kk_dinamo" target="_blank" rel="noopener noreferrer"><TikTokIcon size={24} className="hover:scale-110 cursor-pointer transition-transform"/></a>
                    <a href="https://hr.linkedin.com/company/kkdinamozagreb" target="_blank" rel="noopener noreferrer"><Linkedin size={24} className="hover:scale-110 cursor-pointer transition-transform"/></a>
                </div>
                <div className="lg:hidden cursor-pointer hover:opacity-70" onClick={() => setIsMenuOpen(true)}>
                    <Menu size={32} />
                </div>
            </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMenuOpen(false)}
      />
      
      <div className={`fixed inset-y-0 right-0 z-[100] w-[85%] max-w-[380px] bg-[#002060] text-white transform transition-transform duration-500 cubic-bezier(0.77, 0, 0.175, 1) shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="font-condensed font-bold text-2xl uppercase tracking-wider">IZBORNIK</span>
              <button onClick={() => setIsMenuOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                  <X size={32} />
              </button>
          </div>
          
          <div className="flex flex-col p-6 h-full overflow-y-auto">
              <nav className="flex flex-col gap-4">
                <Link href="/vijesti" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Vijesti</Link>
                <Link href="/klub/momcad" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Momčad</Link>
                <Link href="/skola" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Škola Košarke</Link>
                <Link href="/sponzori" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Sponzori</Link>
                <Link href="/klub" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Klub</Link>
                <Link href="/kontakt" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Kontakt</Link>
              </nav>

              <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-white/10">
                  <a href="https://core-event.co/organizers/kk-dinamo-zagreb-b746/" target="_blank" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#002060] font-condensed font-bold text-xl uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-lg active:scale-95 transition-transform">
                      <Ticket size={22} /> Ulaznice
                  </a>
                  <a href="https://shop.kkdinamo.hr" target="_blank" className="flex items-center justify-center gap-3 w-full py-4 bg-[#00C2FF] text-[#001035] font-condensed font-bold text-xl uppercase tracking-wider hover:bg-white transition-colors shadow-lg active:scale-95 transition-transform">
                      <ShoppingBag size={22} /> Webshop
                  </a>
              </div>

              <div className="mt-8 mb-12">
                  <div className="flex gap-6 text-white justify-center">
                      <a href="https://www.instagram.com/kk_dinamo/" target="_blank" rel="noopener noreferrer"><Instagram size={28} /></a>
                      <a href="https://www.facebook.com/kkdinamo/" target="_blank" rel="noopener noreferrer"><Facebook size={28} /></a>
                      <a href="https://www.tiktok.com/@kk_dinamo" target="_blank" rel="noopener noreferrer"><TikTokIcon size={28} /></a>
                      <a href="https://hr.linkedin.com/company/kkdinamozagreb" target="_blank" rel="noopener noreferrer"><Linkedin size={28} /></a>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default HeaderV5;
