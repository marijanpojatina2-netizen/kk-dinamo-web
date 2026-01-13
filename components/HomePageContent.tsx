
'use client';

import React, { useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, ShoppingBag, ArrowRight, Play, Pause, MapPin, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';

interface HeroData {
  title: string;
  subtitle: string;
  type?: 'image' | 'video';
  imageUrl: string;
  mobileImageUrl?: string;
  videoDesktopUrl?: string;
  videoMobileUrl?: string;
  buttonText: string;
  buttonLink: string;
}

interface NewsItem {
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  excerpt: string;
}

interface MatchItem {
  homeTeam: string;
  homeTeamLogo?: string;
  awayTeam: string;
  awayTeamLogo?: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  location?: string;
  league: string;
  leagueLogo?: string;
  round: string;
  isFinished: boolean;
  ticketLink?: string;
  isBigAnnouncement?: boolean;
}

interface PlayerItem {
  name: string;
  lastname: string;
  number: number;
  position: string;
  imageUrl: string;
  height?: string;
  weight?: string;
  dob?: string;
  city?: string;
  nat?: string;
}

interface ShopItem {
  name: string;
  price: string;
  imageUrl: string;
  link: string;
}

interface StandingItem {
  position: number;
  teamName: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  diff: string;
  isDinamo: boolean;
}

interface ShopConfig {
  title: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

interface StandingsConfig {
  source: 'manual' | 'sofascore';
  sofascoreEmbedUrl?: string;
}

interface HomePageProps {
  hero: HeroData;
  mainTicker: string;
  news: NewsItem[];
  featuredMatch: MatchItem | null;
  matches: MatchItem[];
  shopItems: ShopItem[];
  roster: PlayerItem[];
  standings: StandingItem[];
  logoUrl?: string;
  shopConfig?: ShopConfig;
  standingsConfig?: StandingsConfig;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.`;
};

const formatTime = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const days = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];
  const dayName = days[date.getDay()];
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return `${dayName}, ${time} h`;
};

// Spotify Icon SVG
const SpotifyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954]">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.46-1.02 15.96 1.681.539.3.719 1.02.419 1.56-.24.42-1.02.6-1.56.3z"/>
  </svg>
);

// PlayerFlipCard Component
const PlayerFlipCard: React.FC<{ player: PlayerItem }> = ({ player }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="min-w-[300px] md:min-w-[360px] aspect-[3/4] [perspective:1000px] cursor-pointer snap-start"
      onClick={() => setIsFlipped(!isFlipped)}
    >
        <div className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] shadow-lg ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            {/* FRONT */}
            <div className="absolute inset-0 h-full w-full bg-white [backface-visibility:hidden]">
                <div className="relative h-full w-full overflow-hidden bg-gray-100">
                    {player.imageUrl && (
                      <img 
                        src={player.imageUrl} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                        alt={player.lastname}
                      />
                    )}
                    <div className="absolute top-0 right-0 p-4">
                      <span className="font-condensed font-bold text-7xl text-white drop-shadow-md opacity-80">{player.number}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-white p-6 border-b-8 border-[#002060]">
                        <span className="block font-body text-sm font-bold text-gray-400 uppercase tracking-widest">{player.name}</span>
                        <span className="block font-condensed text-5xl font-bold text-[#002060] uppercase mt-1">{player.lastname}</span>
                    </div>
                </div>
            </div>
            {/* BACK */}
            <div className="absolute inset-0 h-full w-full bg-[#002060] [transform:rotateY(180deg)] [backface-visibility:hidden] p-8 flex flex-col justify-center border border-white/10 text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10">
                    <div className="mb-10">
                        <h4 className="font-condensed font-bold text-3xl text-blue-300 uppercase mb-4 tracking-wide border-b border-white/20 pb-2">Profil</h4>
                        <div className="space-y-2 font-sans">
                            <p className="text-xl font-bold">
                                Visina <span className="text-white text-2xl ml-2">{player.height}cm</span>
                            </p>
                            <p className="text-xl font-bold">
                                Težina <span className="text-white text-2xl ml-2">{player.weight}kg</span>
                            </p>
                            <p className="text-xl font-bold text-blue-200 uppercase tracking-widest mt-4">{player.position}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-condensed font-bold text-3xl text-blue-300 uppercase mb-4 tracking-wide border-b border-white/20 pb-2">Info</h4>
                        <div className="space-y-4">
                            <div>
                              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Datum Rođenja</p>
                              <p className="text-xl font-bold text-white">{player.dob}</p>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Mjesto Rođenja</p>
                              <p className="text-xl font-bold text-white">{player.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-[-20px] right-[-10px] text-[8rem] font-condensed font-bold text-white opacity-5 select-none leading-none">
                    {player.number}
                </div>
            </div>
        </div>
    </div>
  );
};

export default function HomePageContent({
  hero,
  mainTicker,
  news,
  featuredMatch,
  matches,
  shopItems,
  roster,
  standings,
  logoUrl,
  shopConfig,
  standingsConfig
}: HomePageProps) {
  const rosterRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) {
        ref.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError(true);
    } else {
      setEmailError(false);
      alert('Hvala na prijavi!');
      setEmail('');
    }
  };

  const featuredNews = news && news.length > 0 ? news[0] : null;
  const gridNews = news && news.length > 1 ? news.slice(1, 5) : [];

  const hasShopImage = !!shopConfig?.imageUrl;

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white">
      <HeaderV5 variant="transparent" logoUrl={logoUrl} />

      {/* HERO SECTION */}
      {hero && (
        <section className="relative min-h-[85vh] lg:min-h-screen w-full overflow-hidden flex flex-col justify-end pt-40 pb-12 lg:pb-16 bg-gray-900">
            {hero.type === 'video' ? (
                <>
                    {hero.videoDesktopUrl && (
                        <video autoPlay muted loop playsInline className={`absolute inset-0 w-full h-full object-cover ${hero.videoMobileUrl ? 'hidden md:block' : 'block'}`}>
                            <source src={hero.videoDesktopUrl} type="video/mp4" />
                        </video>
                    )}
                    {hero.videoMobileUrl && (
                        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover md:hidden">
                            <source src={hero.videoMobileUrl} type="video/mp4" />
                        </video>
                    )}
                </>
            ) : (
                <>
                    <img src={hero.imageUrl || "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=1600"} className={`absolute inset-0 w-full h-full object-cover ${hero.mobileImageUrl ? 'hidden md:block' : 'block'}`} alt="KK Dinamo Hero" />
                    {hero.mobileImageUrl && <img src={hero.mobileImageUrl} className="absolute inset-0 w-full h-full object-cover md:hidden" alt="KK Dinamo Hero Mobile" />}
                </>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#001035]/80 via-[#001035]/30 to-transparent lg:bg-gradient-to-r lg:from-[#001035]/80 lg:via-[#001035]/30 lg:to-transparent z-10"></div>

            <div className="relative z-20 max-w-[1920px] mx-auto px-6 lg:px-12 w-full text-left">
                <span className="font-condensed font-bold text-white text-xl lg:text-3xl uppercase tracking-wider mb-2 block drop-shadow-md">
                    {hero.subtitle}
                </span>
                <h1 className="font-condensed font-bold text-[11vw] lg:text-[10vw] text-white uppercase leading-[0.9] mb-6 drop-shadow-lg tracking-tighter whitespace-pre-line">
                    {hero.title}
                </h1>
                {hero.buttonLink && (
                    <a href={hero.buttonLink} className="inline-block bg-[#002060] text-white font-condensed font-bold text-lg lg:text-3xl uppercase px-6 py-3 lg:px-10 lg:py-5 hover:bg-white hover:text-[#002060] transition-colors skew-x-[-10deg] border-2 border-white">
                        <span className="skew-x-[10deg] inline-block">{hero.buttonText}</span>
                    </a>
                )}
            </div>
        </section>
      )}

      {/* MARQUEE */}
      <div className="bg-gray-100 border-b border-gray-200 overflow-hidden py-3 lg:py-6 whitespace-nowrap relative z-20">
          <div className="animate-marquee inline-block">
             {[1,2,3,4].map(i => (
                <span key={i} className="font-condensed font-bold text-[9vw] lg:text-[7vw] uppercase text-black leading-none tracking-tight">
                    &nbsp;{mainTicker || "KK DINAMO ZAGREB /// PONOS GRADA"} <span className="text-[#002060]">///</span>
                </span>
             ))}
          </div>
      </div>

      {/* NEWS SECTION */}
      <section className="max-w-[1920px] mx-auto px-4 lg:px-12 py-6 lg:py-10 pb-0 lg:pb-0">
          {featuredNews && (
            <Link href={`/vijesti/${featuredNews.slug}`} className="flex flex-col lg:grid lg:grid-cols-2 gap-0 mb-4 lg:mb-4 group cursor-pointer shadow-lg lg:shadow-none block">
                <div className="order-1 relative aspect-video lg:aspect-auto min-h-[250px] lg:min-h-[340px] overflow-hidden">
                    <img src={featuredNews.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={featuredNews.title}/>
                </div>
                <div className="order-2 bg-white p-6 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-l border-gray-100">
                    <span className="font-body text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">{formatDate(featuredNews.publishedAt)}</span>
                    <h2 className="font-condensed font-bold text-4xl lg:text-[6.5rem] xl:text-[8rem] text-black uppercase leading-[0.9] tracking-tighter transition-colors duration-500 group-hover:text-[#002060]">
                        {featuredNews.title}
                    </h2>
                    {featuredNews.excerpt && (
                        <p className="font-body text-lg text-gray-600 mt-6 leading-relaxed line-clamp-3">
                            {featuredNews.excerpt}
                        </p>
                    )}
                    <div className="relative w-full mt-8 h-2">
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black z-0"></div>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-[#002060] z-10 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                    </div>
                </div>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {gridNews.map((newsItem, i) => (
                  <Link href={`/vijesti/${newsItem.slug}`} key={i} className="group cursor-pointer flex flex-col block">
                      <div className="overflow-hidden aspect-[16/10] mb-6 bg-gray-100">
                          {newsItem.imageUrl && (
                            <img src={newsItem.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={newsItem.title}/>
                          )}
                      </div>
                      <span className="font-body text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">{formatDate(newsItem.publishedAt)}</span>
                      <h3 className="font-condensed font-bold text-2xl lg:text-4xl text-black uppercase leading-tight group-hover:text-[#002060] transition-colors tracking-tight">
                          {newsItem.title}
                      </h3>
                  </Link>
              ))}
          </div>
          
          <div className="flex justify-center mt-4 mb-0">
              <Link href="/vijesti" className="inline-block border-2 border-gray-300 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:border-[#002060] hover:text-[#002060] transition-colors">
                  Arhiva Vijesti
              </Link>
          </div>
      </section>

      {/* MATCH CENTER */}
      <section className="max-w-[1920px] mx-auto px-4 lg:px-12 py-6 lg:py-8">
          <h2 className="font-condensed font-bold text-5xl md:text-8xl uppercase text-black leading-none mb-8 tracking-tighter">Raspored</h2>
          
          {featuredMatch ? (
             <>
                <div className="w-full bg-[#002060] text-white flex justify-between items-center px-4 md:px-8 py-3 font-condensed font-bold uppercase tracking-widest text-lg md:text-xl rounded-t-sm">
                    <div className="flex items-center gap-3">
                        {featuredMatch.leagueLogo ? (
                            <img src={featuredMatch.leagueLogo} className="w-8 h-8 object-contain" alt={featuredMatch.league} />
                        ) : (
                            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-[10px] font-sans">PL</div>
                        )}
                        <span>{featuredMatch.league}</span>
                    </div>
                    <span>{featuredMatch.round}</span>
                </div>

                <div className="w-full bg-[#002060] text-white relative overflow-hidden py-10 lg:py-20 border-t border-white/10 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-[0.05]">
                        <div className="animate-marquee whitespace-nowrap">
                            <span className="text-[25vw] font-condensed font-bold leading-none tracking-tighter">NEXT MATCH NEXT MATCH</span>
                        </div>
                    </div>

                    <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 px-2 md:px-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right flex-1 justify-end min-w-0">
                            <span className="hidden md:block font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight">{featuredMatch.homeTeam}</span>
                            {featuredMatch.homeTeamLogo ? (
                                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 flex items-center justify-center">
                                    <img src={featuredMatch.homeTeamLogo} className="w-full h-full object-contain drop-shadow-lg" alt={featuredMatch.homeTeam} />
                                </div>
                            ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                    <span className="font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{featuredMatch.homeTeam.substring(0,1)}</span>
                                </div>
                            )}
                            <span className="md:hidden font-condensed font-bold text-4xl uppercase mt-2">{featuredMatch.homeTeam}</span>
                        </div>

                        <div className="flex flex-col items-center text-center shrink-0 mx-2 lg:mx-6">
                            <span className="font-condensed font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 tracking-tighter whitespace-nowrap">
                                {formatDate(featuredMatch.date).slice(0, -1)}
                            </span>
                            <span className="font-condensed font-bold text-xl lg:text-3xl uppercase tracking-widest mb-2 lg:mb-4 text-blue-200">
                                {formatDateTime(featuredMatch.date)}
                            </span>
                            
                            <span className="font-condensed font-bold text-lg uppercase tracking-wider mb-6 text-white/80">
                                <MapPin size={16} className="inline mr-1 -mt-1"/> {featuredMatch.location || 'KC Dražen Petrović'}
                            </span>
                            
                            {featuredMatch.ticketLink && (
                                <a href={featuredMatch.ticketLink} className="bg-white text-[#002060] px-8 py-3 lg:px-10 lg:py-4 font-condensed font-bold text-lg lg:text-2xl uppercase hover:scale-105 transition-transform skew-x-[-10deg]">
                                    <span className="skew-x-[10deg] inline-block">Ulaznice</span>
                                </a>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row-reverse items-center gap-4 text-center md:text-left flex-1 justify-end min-w-0">
                            <span className="hidden md:block font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight">{featuredMatch.awayTeam}</span>
                            {featuredMatch.awayTeamLogo ? (
                                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 flex items-center justify-center">
                                    <img src={featuredMatch.awayTeamLogo} className="w-full h-full object-contain drop-shadow-lg" alt={featuredMatch.awayTeam} />
                                </div>
                            ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                    <span className="font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{featuredMatch.awayTeam.substring(0,1)}</span>
                                </div>
                            )}
                            <span className="md:hidden font-condensed font-bold text-4xl uppercase mt-2">{featuredMatch.awayTeam}</span>
                        </div>
                    </div>
                </div>
             </>
          ) : (
            <div className="w-full bg-gray-100 p-12 text-center"><p>Trenutno nema najavljenih utakmica.</p></div>
          )}

          <div className="w-full bg-gray-100 border-t border-gray-200 relative">
              <button onClick={() => scrollContainer(tickerRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#002060] text-white p-3 rounded-full -ml-6 shadow-xl z-20 hidden lg:flex hover:scale-110 transition-transform"><ChevronLeft size={24} /></button>
              <div ref={tickerRef} className="flex overflow-x-auto no-scrollbar divide-x divide-gray-300">
                  {matches.map((g, i) => (
                      <div key={i} className="flex-none w-[320px] md:w-[380px] py-6 px-8 flex flex-col justify-center gap-3 hover:bg-white transition-colors cursor-pointer group">
                          <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-1 group-hover:border-[#002060] transition-colors">
                              <span className="flex items-center gap-1"><Calendar size={12}/> {formatDate(g.date)}</span>
                              <span className="flex items-center gap-1"><Clock size={12}/> {formatTime(g.date)}</span>
                          </div>
                          
                          <div className="flex items-center justify-between w-full font-condensed font-bold text-3xl text-gray-800">
                              <div className="flex items-center gap-3">
                                <span className="uppercase">{g.homeTeam.substring(0,3)}</span>
                              </div>
                              <span className={`text-2xl px-3 py-1 rounded ${g.isFinished ? 'bg-[#002060] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {g.isFinished ? `${g.homeScore}:${g.awayScore}` : 'VS'}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="uppercase">{g.awayTeam.substring(0,3)}</span>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                              <MapPin size={12}/> {g.location || 'KC Dražen Petrović'}
                          </div>
                      </div>
                  ))}
              </div>
              <button onClick={() => scrollContainer(tickerRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#002060] text-white p-3 rounded-full -mr-6 shadow-xl z-20 hidden lg:flex hover:scale-110 transition-transform"><ChevronRight size={24} /></button>
          </div>
      </section>

      {/* SHOP SECTION */}
      <section className="max-w-[1920px] mx-auto w-full bg-white border-y border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Left Side: Big Promo Banner */}
              <div className={`relative h-[600px] lg:h-auto overflow-hidden group ${hasShopImage ? 'bg-[#002060]' : 'bg-white'}`}>
                  
                  {hasShopImage ? (
                      // IMAGE MODE
                      <>
                          <img 
                            src={shopConfig!.imageUrl} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                            alt="Shop Promo"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#002060] via-transparent to-transparent"></div>
                      </>
                  ) : (
                      // FALLBACK MODE (Ticker)
                      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-10 pointer-events-none select-none overflow-hidden transform -rotate-12 scale-150">
                           <div className="animate-marquee whitespace-nowrap flex items-center gap-16 mb-12">
                              {[...Array(8)].map((_, i) => (
                                  <div key={`r1-${i}`} className="flex items-center gap-16 text-[#002060]">
                                      <span className="font-condensed font-bold text-9xl">SHOP</span>
                                      <ShoppingBag size={80} strokeWidth={2.5} />
                                  </div>
                              ))}
                           </div>
                           <div className="animate-marquee-rev whitespace-nowrap flex items-center gap-16">
                              {[...Array(8)].map((_, i) => (
                                  <div key={`r2-${i}`} className="flex items-center gap-16 text-[#002060]">
                                      <span className="font-condensed font-bold text-9xl">SHOP</span>
                                      <ShoppingBag size={80} strokeWidth={2.5} />
                                  </div>
                              ))}
                           </div>
                      </div>
                  )}
                  
                  <div className={`relative z-10 h-full flex flex-col justify-end p-8 lg:p-16 ${hasShopImage ? 'text-white' : 'text-[#001035]'}`}>
                      <div className="mb-6">
                          <h2 className="font-condensed font-black text-6xl lg:text-8xl uppercase leading-[0.9] tracking-tighter">
                              {shopConfig?.title || "Proud to be\nDinamo"}
                          </h2>
                      </div>
                      <a 
                        href={shopConfig?.buttonLink || "https://shop.kkdinamo.hr"} 
                        target="_blank"
                        className={`inline-flex items-center gap-4 px-8 py-4 w-fit font-condensed font-bold text-xl uppercase transition-colors ${
                            hasShopImage 
                            ? 'bg-white text-[#002060] hover:bg-[#00C2FF] hover:text-white' 
                            : 'bg-[#002060] text-white hover:bg-[#00C2FF] hover:text-[#001035]'
                        }`}
                      >
                          {shopConfig?.buttonText || "Posjeti Webshop"} <ArrowRight size={24} />
                      </a>
                  </div>
              </div>

              {/* Right Side: Product Grid (2x2) */}
              <div className="grid grid-cols-2">
                  {shopItems.slice(0, 4).map((p, i) => (
                      <a key={i} href={p.link} target="_blank" className="relative group border-b border-r border-gray-200 bg-white overflow-hidden flex flex-col aspect-square">
                          <div className="flex-1 relative flex items-center justify-center p-6">
                              {p.imageUrl && (
                                <img 
                                    src={p.imageUrl} 
                                    className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                                    alt={p.name}
                                />
                              )}
                          </div>
                          <div className="p-6 text-center z-20 bg-white group-hover:bg-[#002060] group-hover:text-white transition-colors duration-300">
                              <h3 className="font-condensed font-bold text-xl lg:text-2xl uppercase mb-1">{p.name}</h3>
                              <span className="font-body font-bold text-gray-500 group-hover:text-blue-300">{p.price}</span>
                          </div>
                      </a>
                  ))}
              </div>
          </div>
      </section>

      {/* ROSTER PREVIEW (FLIP CARDS) */}
      <section className="bg-white py-20 overflow-hidden">
           <div className="max-w-[1920px] mx-auto px-4 lg:px-12 mb-12 flex justify-between items-end">
              <h2 className="font-condensed font-bold text-5xl md:text-8xl uppercase text-black leading-none tracking-tighter">Momčad</h2>
              <div className="hidden lg:flex gap-2">
                  <button onClick={() => scrollContainer(rosterRef, 'left')} className="p-4 border border-gray-300 hover:bg-[#002060] hover:text-white"><ChevronLeft size={24} /></button>
                  <button onClick={() => scrollContainer(rosterRef, 'right')} className="p-4 border border-gray-300 hover:bg-[#002060] hover:text-white"><ChevronRight size={24} /></button>
              </div>
           </div>
           
           <div ref={rosterRef} className="pl-4 lg:pl-12 overflow-x-auto no-scrollbar flex gap-6 pb-8 snap-x">
              {roster.map((p, i) => (
                  <PlayerFlipCard key={i} player={p} />
              ))}
           </div>
      </section>

      {/* SPOTIFY PLAYLIST SECTION */}
      <section className="bg-black text-white py-20 lg:py-28 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-[#111] to-black"></div>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, #1DB954 0, #1DB954 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px'}}></div>
          
          <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                      <SpotifyIcon />
                      <span className="text-[#1DB954] font-bold tracking-widest uppercase text-sm">SLUŽBENA PLAYLISTA</span>
                  </div>
                  <h2 className="font-condensed font-black text-6xl lg:text-8xl uppercase leading-none mb-8">
                      Ritam <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>Tribine</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0">
                      Pripremi se za utakmicu uz službenu playlistu KK Dinama. Najveći hitovi s tribina i svlačionice na jednom mjestu.
                  </p>
                  <a href="https://open.spotify.com" target="_blank" className="inline-flex items-center gap-3 bg-[#1DB954] text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform">
                      <Play fill="black" size={20} /> SLUŠAJ NA SPOTIFYU
                  </a>
              </div>

              <div className="flex-1 flex justify-center items-center h-64 gap-2 lg:gap-4">
                  {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4 lg:w-6 bg-[#1DB954] rounded-full animate-pulse"
                        style={{
                            height: `${Math.random() * 100 + 20}%`,
                            animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                            animationIterationCount: 'infinite'
                        }}
                      ></div>
                  ))}
              </div>
          </div>
      </section>

      {/* STANDINGS & NEWSLETTER */}
      <section className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto border-t border-gray-200">
           <div className="w-full lg:w-1/2 bg-[#F8F8F6] p-8 lg:p-24 flex flex-col">
                <h2 className="font-condensed font-bold text-5xl md:text-7xl text-black uppercase leading-none mb-10 tracking-tighter">LJESTVICA</h2>
                <div className="flex gap-8 mb-8 font-condensed font-bold uppercase text-2xl text-gray-400">
                    <span className="text-black border-b-2 border-black pb-1 cursor-pointer">PREMIJER LIGA</span>
                    <span className="cursor-pointer hover:text-black transition-colors">KUP</span>
                </div>

                {standingsConfig?.source === 'sofascore' && standingsConfig.sofascoreEmbedUrl ? (
                  <div className="w-full h-[600px]">
                    <iframe width="100%" height="100%" src={standingsConfig.sofascoreEmbedUrl} frameBorder="0" scrolling="no" className="w-full h-full" style={{ border: 'none' }}></iframe>
                    <div className="text-[10px] text-gray-400 mt-2 text-right uppercase tracking-widest">Powered by Sofascore</div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-12 gap-2 text-sm font-bold font-body text-gray-500 uppercase tracking-wider mb-4 px-2">
                        <div className="col-span-1">PL</div><div className="col-span-5">KLUB</div><div className="col-span-1 text-center">U</div><div className="col-span-1 text-center">P</div><div className="col-span-1 text-center">I</div><div className="col-span-2 text-center">PTS</div><div className="col-span-1 text-center">+/-</div>
                    </div>
                    <div className="border-t border-black mb-6">
                        {standings.map((team, i) => (
                            <div key={i} className={`grid grid-cols-12 gap-2 py-4 px-2 border-b border-gray-200 items-center ${team.isDinamo ? 'text-[#002060] font-black' : 'text-black font-bold'}`}>
                                <div className="col-span-1 font-condensed text-xl">{team.position}</div>
                                <div className="col-span-5 flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] text-white ${team.isDinamo ? 'bg-[#002060]' : 'bg-gray-800'}`}>{team.teamName.substring(0,1)}</div><span className="uppercase font-condensed text-lg">{team.teamName}</span></div>
                                <div className="col-span-1 text-center font-body">{team.played}</div><div className="col-span-1 text-center font-body">{team.won}</div><div className="col-span-1 text-center font-body">{team.lost}</div><div className="col-span-2 text-center font-body">{team.points}</div><div className="col-span-1 text-center font-body text-xs text-gray-500">{team.diff}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4"><button className="border-2 border-black bg-transparent text-black px-8 py-3 font-condensed font-bold text-xl uppercase hover:bg-black hover:text-white transition-colors">PUNA LJESTVICA</button></div>
                  </>
                )}
           </div>

           <div className="w-full lg:w-1/2 bg-[#002060] p-8 lg:p-24 flex flex-col justify-center text-white">
                <h2 className="font-condensed font-bold text-5xl md:text-7xl uppercase leading-none mb-10 tracking-tighter">NEWSLETTER</h2>
                <form className="flex flex-col gap-6 w-full max-w-lg" onSubmit={handleNewsletterSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-condensed font-bold text-2xl uppercase">IME</label>
                        <input type="text" className="bg-transparent border border-white p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/10" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-condensed font-bold text-2xl uppercase">PREZIME</label>
                        <input type="text" className="bg-transparent border border-white p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/10" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-condensed font-bold text-2xl uppercase">E-MAIL</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`bg-transparent border p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/10 ${emailError ? 'border-red-500' : 'border-white'}`} 
                        />
                        {emailError && <span className="text-red-500 text-sm font-bold">Molimo unesite ispravnu email adresu.</span>}
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative w-6 h-6 border border-white flex-shrink-0 mt-1 flex items-center justify-center">
                                <input type="checkbox" required className="peer opacity-0 absolute inset-0 cursor-pointer"/>
                                <div className="w-3 h-3 bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-sm font-body leading-tight opacity-80 group-hover:opacity-100">
                                Slažem se s obradom svojih osobnih podataka u svrhu primanja Dinamo Fan-Newslettera, u skladu s Politikom privatnosti.
                            </span>
                        </label>
                    </div>
                    <button type="submit" className="mt-8 bg-white text-[#002060] font-condensed font-bold text-2xl uppercase py-4 px-10 self-start hover:scale-105 transition-transform">PRIJAVI SE</button>
                </form>
           </div>
      </section>

      <FooterV5 logoUrl={logoUrl} />
    </div>
  );
}
