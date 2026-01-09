'use client';

import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';

// Definiramo tipove podataka koji dolaze iz Sanityja
interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
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
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string; // ISO string iz Sanityja
  league: string;
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

interface HomePageProps {
  hero: HeroData;
  mainTicker: string;
  news: NewsItem[];
  featuredMatch: MatchItem | null;
  matches: MatchItem[];
  shopItems: ShopItem[];
  roster: PlayerItem[];
  standings: StandingItem[];
}

// Helper za formatiranje datuma (pretvara 2024-03-20 u "20.03.")
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.`;
};

// Helper za formatiranje vremena (pretvara ISO u "Petak, 20:00 h")
const formatDateTime = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const days = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];
  const dayName = days[date.getDay()];
  const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return `${dayName}, ${time} h`;
};

export default function HomePageContent({
  hero,
  mainTicker,
  news,
  featuredMatch,
  matches,
  shopItems,
  roster,
  standings
}: HomePageProps) {
  const rosterRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') => {
    if (ref.current) {
        ref.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  // Uzimamo prvu vijest kao glavnu, ostale za grid
  const featuredNews = news && news.length > 0 ? news[0] : null;
  const gridNews = news && news.length > 1 ? news.slice(1, 5) : [];

  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden selection:bg-[#002060] selection:text-white">
      <HeaderV5 variant="transparent" />

      {/* HERO SECTION - Dodan pt-40 da se tekst spusti ispod menija */}
      {hero && (
        <section className="relative min-h-[85vh] lg:min-h-screen w-full overflow-hidden flex flex-col justify-end pt-40 pb-12 lg:pb-32 bg-gray-900">
            <img 
                src={hero.imageUrl || "https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=1600"} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="KK Dinamo Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002060] via-transparent to-black/40 opacity-90 lg:opacity-80"></div>

            <div className="relative z-10 max-w-[1920px] mx-auto px-6 lg:px-12 w-full text-left">
                <span className="font-condensed font-bold text-white text-xl lg:text-3xl uppercase tracking-wider mb-2 block drop-shadow-md">
                    {hero.subtitle}
                </span>
                <h1 className="font-condensed font-bold text-[11vw] lg:text-[10vw] text-white uppercase leading-[0.9] mb-6 drop-shadow-lg tracking-tighter whitespace-pre-line">
                    {hero.title}
                </h1>
                {hero.buttonLink && (
                    <a href={hero.buttonLink} className="inline-block bg-[#002060] text-white font-condensed font-bold text-lg lg:text-3xl uppercase px-6 py-3 lg:px-10 lg:py-5 hover:bg-white hover:text-[#002060] transition-colors skew-x-[-10deg] border-2 border-white lg:border-[#002060]">
                        <span className="skew-x-[10deg] inline-block">{hero.buttonText}</span>
                    </a>
                )}
            </div>
        </section>
      )}

      {/* MARQUEE */}
      <div className="bg-gray-100 border-b border-gray-200 overflow-hidden py-4 lg:py-8 whitespace-nowrap relative z-20">
          <div className="animate-marquee inline-block">
             {[1,2,3,4].map(i => (
                <span key={i} className="font-condensed font-bold text-[12vw] lg:text-[9vw] uppercase text-black leading-none tracking-tight">
                    &nbsp;{mainTicker || "KK DINAMO ZAGREB /// PONOS GRADA"} <span className="text-[#002060]">///</span>
                </span>
             ))}
          </div>
      </div>

      {/* NEWS SECTION */}
      <section className="max-w-[1920px] mx-auto px-4 lg:px-12 py-12 lg:py-20">
          {/* Main Article */}
          {featuredNews && (
            <Link href={`/vijesti`} className="flex flex-col lg:grid lg:grid-cols-2 gap-0 mb-12 lg:mb-24 group cursor-pointer shadow-lg lg:shadow-none block">
                <div className="order-1 relative aspect-video lg:aspect-auto min-h-[250px] lg:min-h-[600px] overflow-hidden">
                    <img src={featuredNews.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={featuredNews.title}/>
                </div>
                <div className="order-2 bg-white p-6 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-l border-gray-100">
                    <span className="font-body text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">{formatDate(featuredNews.publishedAt)}</span>
                    
                    <h2 className="font-condensed font-bold text-4xl lg:text-[6.5rem] xl:text-[8rem] text-black uppercase leading-[0.9] tracking-tighter transition-colors duration-500 group-hover:text-[#002060]">
                        {featuredNews.title}
                    </h2>
                    
                    <div className="relative w-full mt-8 h-2">
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black z-0"></div>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-[#002060] z-10 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                    </div>
                </div>
            </Link>
          )}

          {/* Sub Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {gridNews.map((newsItem, i) => (
                  <Link href="/vijesti" key={i} className="group cursor-pointer flex flex-col block">
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
      </section>

      {/* MATCH CENTER - Poboljšano skaliranje i dimenzije za sve ekrane */}
      <section className="max-w-[1920px] mx-auto px-4 lg:px-12 py-8 lg:py-24">
          <h2 className="font-condensed font-bold text-5xl md:text-8xl uppercase text-black leading-none mb-8 tracking-tighter">Raspored</h2>
          
          {featuredMatch ? (
             <>
                <div className="w-full bg-[#002060] text-white flex justify-between items-center px-4 md:px-8 py-3 font-condensed font-bold uppercase tracking-widest text-lg md:text-xl rounded-t-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-[10px] font-sans">PL</div>
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

                    {/* Glavni kontejner - Smanjen gap i bolje centriranje */}
                    <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 px-2 md:px-4">
                        
                        {/* Home Team */}
                        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right flex-1 justify-end min-w-0">
                            {/* Ime kluba: Smanjen maksimalni font na xl i lg da stane */}
                            <span className="hidden md:block font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight">
                                {featuredMatch.homeTeam}
                            </span>
                            {/* Krug sa slovom: Smanjen na lg i xl */}
                            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                <span className="font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{featuredMatch.homeTeam.substring(0,1)}</span>
                            </div>
                            <span className="md:hidden font-condensed font-bold text-4xl uppercase mt-2">{featuredMatch.homeTeam}</span>
                        </div>

                        {/* Center Info */}
                        <div className="flex flex-col items-center text-center shrink-0 mx-2 lg:mx-6">
                            {/* Datum: Smanjen font (lg:text-8xl umjesto [8rem]) da ostavi mjesta klubovima */}
                            <span className="font-condensed font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-2 tracking-tighter whitespace-nowrap">
                                {formatDate(featuredMatch.date).slice(0, -1)}
                            </span>
                            <span className="font-condensed font-bold text-xl lg:text-3xl uppercase tracking-widest mb-6 lg:mb-10 text-blue-200">
                                {formatDateTime(featuredMatch.date)}
                            </span>
                            {featuredMatch.ticketLink && (
                                <a href={featuredMatch.ticketLink} className="bg-white text-[#002060] px-8 py-3 lg:px-10 lg:py-4 font-condensed font-bold text-lg lg:text-2xl uppercase hover:scale-105 transition-transform skew-x-[-10deg]">
                                    <span className="skew-x-[10deg] inline-block">Ulaznice</span>
                                </a>
                            )}
                        </div>

                        {/* Away Team */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-4 text-center md:text-left flex-1 justify-end min-w-0">
                            <span className="hidden md:block font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight">
                                {featuredMatch.awayTeam}
                            </span>
                             <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 shrink-0 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                                <span className="font-condensed font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{featuredMatch.awayTeam.substring(0,1)}</span>
                            </div>
                            <span className="md:hidden font-condensed font-bold text-4xl uppercase mt-2">{featuredMatch.awayTeam}</span>
                        </div>
                    </div>
                </div>
             </>
          ) : (
            <div className="w-full bg-gray-100 p-12 text-center"><p>Trenutno nema najavljenih utakmica.</p></div>
          )}

          {/* Ticker */}
          <div className="w-full bg-gray-100 border-t border-gray-200 relative">
              <button onClick={() => scrollContainer(tickerRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#002060] text-white p-3 rounded-full -ml-6 shadow-xl z-20 hidden lg:flex hover:scale-110 transition-transform"><ChevronLeft size={24} /></button>
              <div ref={tickerRef} className="flex overflow-x-auto no-scrollbar divide-x divide-gray-300">
                  {matches.map((g, i) => (
                      <div key={i} className="flex-none w-[280px] md:w-[320px] py-4 px-6 flex flex-col items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer">
                          <div className="flex items-center justify-between w-full font-condensed font-bold text-2xl lg:text-3xl text-gray-800">
                              <span>{g.homeTeam.substring(0,3).toUpperCase()}</span>
                              <span className={`text-xl ${g.isFinished ? 'text-[#002060]' : 'text-gray-400'}`}>
                                {g.isFinished ? `${g.homeScore} : ${g.awayScore}` : 'VS'}
                              </span>
                              <span>{g.awayTeam.substring(0,3).toUpperCase()}</span>
                          </div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{formatDate(g.date)}</span>
                      </div>
                  ))}
              </div>
              <button onClick={() => scrollContainer(tickerRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#002060] text-white p-3 rounded-full -mr-6 shadow-xl z-20 hidden lg:flex hover:scale-110 transition-transform"><ChevronRight size={24} /></button>
          </div>
      </section>

      {/* SHOP */}
      <section className="max-w-[1920px] mx-auto w-full bg-white border-y border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[500px]">
              <a href="https://shop.kkdinamo.hr" className="bg-[#002060] text-white flex flex-col justify-center items-center p-12 text-center group hover:bg-[#001540] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.07] pointer-events-none select-none overflow-hidden transform -rotate-12 scale-150">
                       <div className="animate-marquee whitespace-nowrap flex items-center gap-16 mb-12">
                          {[...Array(8)].map((_, i) => (
                              <div key={`r1-${i}`} className="flex items-center gap-16">
                                  <span className="font-condensed font-bold text-9xl">SHOP</span>
                                  <ShoppingBag size={80} strokeWidth={2.5} />
                              </div>
                          ))}
                       </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                       <h2 className="font-condensed font-bold text-7xl lg:text-9xl uppercase leading-none tracking-tighter mb-6">SHOP</h2>
                       <span className="inline-block border-2 border-white px-8 py-3 font-condensed font-bold text-xl uppercase group-hover:bg-white group-hover:text-[#002060] transition-colors">Posjeti</span>
                  </div>
              </a>
              {shopItems.slice(0, 3).map((p, i) => (
                  <a key={i} href={p.link} className="bg-gray-50 border-r border-gray-200 relative group overflow-hidden flex flex-col">
                      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
                          {p.imageUrl && <img src={p.imageUrl} className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={p.name}/>}
                      </div>
                      <div className="p-8 bg-white border-t border-gray-100 relative z-10 text-center">
                          <h3 className="font-condensed font-bold text-3xl lg:text-4xl text-black uppercase mb-2 group-hover:text-[#002060] transition-colors">{p.name}</h3>
                          <span className="font-body font-bold text-xl text-gray-500">{p.price}</span>
                      </div>
                  </a>
              ))}
          </div>
      </section>

      {/* ROSTER PREVIEW */}
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
                  <Link href="/momcad" key={i} className="min-w-[300px] md:min-w-[360px] relative group cursor-pointer snap-start block">
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                          {p.imageUrl && <img src={p.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={p.lastname}/>}
                          <div className="absolute top-0 right-0 p-4"><span className="font-condensed font-bold text-7xl text-white drop-shadow-md opacity-80">{p.number}</span></div>
                      </div>
                      <div className="bg-white p-6 border-b-8 border-transparent group-hover:border-[#002060] transition-colors">
                          <span className="block font-body text-sm font-bold text-gray-400 uppercase tracking-widest">{p.name}</span>
                          <span className="block font-condensed text-5xl font-bold text-[#002060] uppercase mt-1">{p.lastname}</span>
                      </div>
                  </Link>
              ))}
           </div>
      </section>

      {/* STANDINGS & NEWSLETTER */}
      <section className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto border-t border-gray-200">
           {/* STANDINGS */}
           <div className="w-full lg:w-1/2 bg-[#F8F8F6] p-8 lg:p-24 flex flex-col">
                <h2 className="font-condensed font-bold text-5xl md:text-7xl text-black uppercase leading-none mb-10 tracking-tighter">LJESTVICA</h2>
                <div className="flex gap-8 mb-8 font-condensed font-bold uppercase text-2xl text-gray-400">
                    <span className="text-black border-b-2 border-black pb-1 cursor-pointer">PREMIJER LIGA</span>
                    <span className="cursor-pointer hover:text-black transition-colors">KUP</span>
                </div>
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
           </div>

           {/* NEWSLETTER */}
           <div className="w-full lg:w-1/2 bg-[#002060] p-8 lg:p-24 flex flex-col justify-center text-white">
                <h2 className="font-condensed font-bold text-5xl md:text-7xl uppercase leading-none mb-10 tracking-tighter">NEWSLETTER</h2>
                <form className="flex flex-col gap-6 w-full max-w-lg">
                    <div className="flex flex-col gap-2"><label className="font-condensed font-bold text-2xl uppercase">IME</label><input type="text" className="bg-transparent border border-white p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/10" /></div>
                    <div className="flex flex-col gap-2"><label className="font-condensed font-bold text-2xl uppercase">PREZIME</label><input type="text" className="bg-transparent border border-white p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/10" /></div>
                    <div className="flex flex-col gap-2"><label className="font-condensed font-bold text-2xl uppercase">E-MAIL *</label><input type="email" placeholder="name@example.com" className="bg-transparent border border-white p-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/10" /></div>
                    <div className="flex flex-col gap-4 mt-4">
                        <label className="flex items-start gap-4 cursor-pointer group"><div className="relative w-6 h-6 border border-white flex-shrink-0 mt-1 flex items-center justify-center"><input type="checkbox" className="peer opacity-0 absolute inset-0 cursor-pointer"/><div className="w-3 h-3 bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div></div><span className="text-sm font-body leading-tight opacity-80 group-hover:opacity-100">Želim primati Dinamo Fan-Newsletter.</span></label>
                    </div>
                    <button className="mt-8 bg-white text-[#002060] font-condensed font-bold text-2xl uppercase py-4 px-10 self-start hover:scale-105 transition-transform">PRIJAVI SE</button>
                </form>
           </div>
      </section>

      <FooterV5 />
    </div>
  );
}