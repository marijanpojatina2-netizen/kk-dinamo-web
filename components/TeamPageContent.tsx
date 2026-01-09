'use client';

import React, { useRef } from 'react';
import HeaderV5 from './HeaderV5';
import FooterV5 from './FooterV5';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Player {
  name: string;
  lastname: string;
  number: number;
  position: string;
  height: string;
  weight: string;
  dob: string;
  city: string;
  nat: string;
  imageUrl: string;
}

interface Staff {
  name: string;
  lastname: string;
  role: string;
  imageUrl: string;
  dob?: string;
  city?: string;
  nat?: string;
}

interface TeamPageProps {
  players: Player[];
  staff: Staff[];
}

export default function TeamPageContent({ players, staff }: TeamPageProps) {
  // Sortiranje igrača po broju
  const sortedRoster = [...players].sort((a, b) => a.number - b.number);

  return (
    <div className="font-sans text-white bg-[#000d26] w-full overflow-x-hidden selection:bg-[#002060] selection:text-white pt-24">
      <HeaderV5 variant="solid" />

      {/* HEADER SECTION - "MOMČAD" */}
      <section className="relative py-20 lg:py-32 flex justify-center items-center bg-[#000d26] overflow-hidden">
          {/* Background Texture/Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[#002060] opacity-20 blur-[100px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          
          <h1 className="relative z-10 font-condensed font-bold text-7xl lg:text-9xl uppercase tracking-tighter text-white drop-shadow-2xl">
              MOMČAD
          </h1>
      </section>

      {/* ROSTER GRID */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-12 pb-32">
          {sortedRoster.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedRoster.map((player) => (
                    <div key={player.number} className="group h-[500px] [perspective:1000px] cursor-default">
                        {/* FLIP CONTAINER */}
                        <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl">
                            
                            {/* --- FRONT OF CARD --- */}
                            <div className="absolute inset-0 h-full w-full bg-[#020b1f] border border-white/5 [backface-visibility:hidden]">
                                {/* Player Image */}
                                <div className="absolute inset-0">
                                    {player.imageUrl && (
                                        <img 
                                            src={player.imageUrl} 
                                            alt={player.lastname} 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020b1f] via-transparent to-transparent opacity-90"></div>
                                </div>

                                {/* Number */}
                                <div className="absolute top-4 left-6 z-10">
                                    <span className="font-condensed font-bold text-7xl text-white drop-shadow-lg">{player.number}</span>
                                </div>

                                {/* Name */}
                                <div className="absolute bottom-8 left-6 z-10 w-full pr-6">
                                    <div className="flex items-center justify-between border-t border-white/20 pt-4 w-full">
                                        <h3 className="font-condensed font-bold text-3xl uppercase text-white leading-none tracking-wide">
                                            {player.name} {player.lastname}
                                        </h3>
                                        <ArrowRight className="text-white w-6 h-6 mr-4" />
                                    </div>
                                </div>
                            </div>

                            {/* --- BACK OF CARD --- */}
                            <div className="absolute inset-0 h-full w-full bg-[#002060] [transform:rotateY(180deg)] [backface-visibility:hidden] p-8 flex flex-col justify-center border border-white/10">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                
                                <div className="relative z-10">
                                    <div className="mb-12">
                                        <h4 className="font-condensed font-bold text-4xl text-blue-300 uppercase mb-4 tracking-wide">Profil</h4>
                                        <div className="space-y-2 font-sans">
                                            <p className="text-xl font-bold">
                                                Visina <span className="text-white text-2xl ml-2">{player.height}cm</span> <span className="mx-2 text-blue-400">|</span> Težina <span className="text-white text-2xl ml-2">{player.weight}kg</span>
                                            </p>
                                            <p className="text-xl font-bold text-white/80 uppercase tracking-widest mt-2">{player.position}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-condensed font-bold text-4xl text-blue-300 uppercase mb-6 tracking-wide">Info</h4>
                                        <div className="space-y-6">
                                            <div><p className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1">Datum Rođenja</p><p className="text-2xl font-bold text-white">{player.dob}</p></div>
                                            <div><p className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1">Mjesto Rođenja</p><p className="text-2xl font-bold text-white">{player.city}</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-[-20px] right-[-10px] text-[12rem] font-condensed font-bold text-white opacity-5 select-none leading-none">
                                    {player.number}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
              <div className="text-center py-20 text-gray-400">Podaci o igračima trenutno nisu dostupni.</div>
          )}
      </section>

      {/* STAFF SECTION */}
      {staff.length > 0 && (
        <section className="bg-white py-20 text-[#001035]">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
                <h2 className="font-condensed font-bold text-5xl uppercase mb-12 border-b-4 border-[#002060] inline-block pb-2">Stručni Stožer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {staff.map((s, i) => (
                        <div key={i} className="group h-[450px] [perspective:1000px] cursor-default">
                            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl hover:shadow-2xl">
                                <div className="absolute inset-0 h-full w-full bg-[#020b1f] border border-white/5 [backface-visibility:hidden]">
                                    <div className="absolute inset-0">
                                        {s.imageUrl && <img src={s.imageUrl} alt={s.lastname} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020b1f] via-transparent to-transparent opacity-90"></div>
                                    </div>
                                    <div className="absolute top-4 left-4 z-10"><span className="inline-block bg-[#002060] text-white px-3 py-1 font-condensed font-bold text-lg uppercase tracking-wider border border-white/20">{s.role}</span></div>
                                    <div className="absolute bottom-6 left-6 z-10 w-full pr-6"><h3 className="font-condensed font-bold text-3xl uppercase text-white leading-none tracking-wide">{s.name} <br/><span className="text-4xl text-blue-200">{s.lastname}</span></h3></div>
                                </div>
                                <div className="absolute inset-0 h-full w-full bg-[#002060] [transform:rotateY(180deg)] [backface-visibility:hidden] p-8 flex flex-col justify-center border border-white/10">
                                    <div className="relative z-10">
                                        <h4 className="font-condensed font-bold text-3xl text-blue-300 uppercase mb-8 tracking-wide border-b border-white/20 pb-4">Info</h4>
                                        <div className="space-y-6">
                                            <div><p className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1">Uloga</p><p className="text-xl font-bold text-white uppercase">{s.role}</p></div>
                                            {s.dob && <div><p className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-1">Datum Rođenja</p><p className="text-xl font-bold text-white">{s.dob}</p></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      )}

      <FooterV5 />
    </div>
  );
}