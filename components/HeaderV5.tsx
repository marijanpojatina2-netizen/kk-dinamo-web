
'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Ticket, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

interface HeaderV5Props {
  variant?: 'transparent' | 'solid';
  logoUrl?: string;
}

const HeaderV5: React.FC<HeaderV5Props> = ({ variant = 'solid', logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fallback logo if CMS url is missing
  const displayLogo = logoUrl || "https://upload.wikimedia.org/wikipedia/hr/thumb/2/23/KK_Dinamo_Zagreb.png/260px-KK_Dinamo_Zagreb.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    if (variant === 'transparent') {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const textColorClass = variant === 'transparent' && !isScrolled ? 'text-white' : 'text-[#002060]';
  const buttonBorderClass = variant === 'transparent' && !isScrolled ? 'border-white text-white hover:bg-[#002060] hover:border-[#002060]' : 'border-[#002060] text-[#002060] hover:bg-[#002060] hover:text-white';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1920px] mx-auto px-4 lg:px-12 flex items-center justify-between">
            <Link href="/" className="w-12 h-12 lg:w-20 lg:h-20 relative z-50 block hover:scale-105 transition-transform">
                <img 
                  src={displayLogo} 
                  alt="KK Dinamo" 
                  className="w-full h-full object-contain drop-shadow-md"
                  onError={(e) => {
                    // Fallback in case image load fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-[#002060]', 'text-white', 'flex', 'items-center', 'justify-center', 'rounded-full', 'font-black');
                    if(e.currentTarget.parentElement) e.currentTarget.parentElement.innerText = "d";
                  }}
                />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
                <nav className={`flex items-center gap-6 xl:gap-8 font-condensed text-xl xl:text-2xl font-bold uppercase ${textColorClass}`}>
                    <Link href="/vijesti" className="hover:opacity-70 transition-opacity">Vijesti</Link>
                    <Link href="/momcad" className="hover:opacity-70 transition-opacity">Momčad</Link>
                    <Link href="/skola" className="hover:opacity-70 transition-opacity">Škola Košarke</Link>
                    <Link href="/sponzori" className="hover:opacity-70 transition-opacity">Sponzori</Link>
                    <Link href="/klub" className="hover:opacity-70 transition-opacity">Klub</Link>
                </nav>
                <div className={`w-[1px] h-8 mx-2 opacity-30 ${isScrolled ? 'bg-[#002060]' : 'bg-white'}`}></div>
                <div className="flex items-center gap-4">
                    <a href="https://ulaznice.hr" target="_blank" className={`flex items-center gap-2 px-5 py-2 border-2 skew-x-[-10deg] transition-all hover:scale-105 bg-[#002060] border-[#002060] text-white ${isScrolled ? 'hover:bg-transparent hover:text-[#002060]' : 'hover:bg-transparent hover:text-white hover:border-white'}`}>
                        <Ticket size={18} className="skew-x-[10deg]" /> 
                        <span className="font-condensed font-bold text-xl uppercase skew-x-[10deg]">Ulaznice</span>
                    </a>
                    <a href="https://shop.kkdinamo.hr" target="_blank" className={`flex items-center gap-2 px-5 py-2 border-2 skew-x-[-10deg] transition-all hover:scale-105 ${buttonBorderClass}`}>
                        <ShoppingBag size={18} className="skew-x-[10deg]" /> 
                        <span className="font-condensed font-bold text-xl uppercase skew-x-[10deg]">Shop</span>
                    </a>
                </div>
            </div>

            <div className={`flex items-center gap-6 ${textColorClass}`}>
                <div className="hidden lg:flex gap-5">
                    <a href="https://www.instagram.com/kk_dinamo/" target="_blank" rel="noopener noreferrer">
                      <Instagram size={30} className="hover:scale-110 cursor-pointer transition-transform"/>
                    </a>
                    <a href="https://www.facebook.com/kkdinamo/" target="_blank" rel="noopener noreferrer">
                      <Facebook size={30} className="hover:scale-110 cursor-pointer transition-transform"/>
                    </a>
                    <a href="https://www.tiktok.com/@kk_dinamo" target="_blank" rel="noopener noreferrer">
                      <TikTokIcon size={30} className="hover:scale-110 cursor-pointer transition-transform"/>
                    </a>
                </div>
                <div className="lg:hidden cursor-pointer hover:opacity-70" onClick={() => setIsMenuOpen(true)}>
                    <Menu size={32} />
                </div>
            </div>
        </div>
      </header>

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
                <Link href="/momcad" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Momčad</Link>
                <Link href="/skola" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Škola Košarke</Link>
                <Link href="/sponzori" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Sponzori</Link>
                <Link href="/klub" className="font-condensed font-bold text-4xl uppercase hover:text-blue-300 transition-colors">Klub</Link>
              </nav>

              {/* Social Icons - Moved Up */}
              <div className="mt-8 mb-8">
                  <div className="flex gap-6 text-white">
                      <a href="https://www.instagram.com/kk_dinamo/" target="_blank" rel="noopener noreferrer"><Instagram size={28} /></a>
                      <a href="https://www.facebook.com/kkdinamo/" target="_blank" rel="noopener noreferrer"><Facebook size={28} /></a>
                      <a href="https://www.tiktok.com/@kk_dinamo" target="_blank" rel="noopener noreferrer"><TikTokIcon size={28} /></a>
                  </div>
              </div>

              {/* CTAs for Mobile - High Contrast Buttons */}
              <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-auto pb-12">
                  <a href="https://ulaznice.hr" target="_blank" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#002060] font-condensed font-bold text-xl uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-lg active:scale-95 transition-transform">
                      <Ticket size={22} /> Ulaznice
                  </a>
                  <a href="https://shop.kkdinamo.hr" target="_blank" className="flex items-center justify-center gap-3 w-full py-4 bg-[#00C2FF] text-[#001035] font-condensed font-bold text-xl uppercase tracking-wider hover:bg-white transition-colors shadow-lg active:scale-95 transition-transform">
                      <ShoppingBag size={22} /> Webshop
                  </a>
              </div>
          </div>
      </div>
    </>
  );
};

export default HeaderV5;
