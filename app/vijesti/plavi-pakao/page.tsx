'use client';

import React from 'react';
import HeaderV5 from '../../../components/HeaderV5';
import FooterV5 from '../../../components/FooterV5';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewsSinglePage() {
  return (
    <div className="font-sans text-[#001035] bg-white w-full overflow-x-hidden pt-24">
      <HeaderV5 variant="solid" />

      <section className="max-w-[1000px] mx-auto px-4 lg:px-0 pt-12 lg:pt-20 pb-8">
          <div className="flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-[#002060] transition-colors">
              <Link href="/vijesti" className="flex items-center gap-1"><ChevronLeft size={16} /> Povratak na vijesti</Link>
          </div>
          <h1 className="font-condensed font-bold text-5xl md:text-7xl lg:text-8xl text-[#001035] uppercase leading-[1.15] mb-8 tracking-tight">
              I u petak trebamo <br/><span className="text-[#002060]">plavi pakao!</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-body leading-relaxed border-l-4 border-[#00C2FF] pl-6">
              Dinamo dočekuje Zadar u ključnoj utakmici sezone. Očekuje se puna dvorana, a trener Sesar najavljuje borbu za svaku loptu do posljednje sekunde.
          </p>
      </section>

      <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 mb-16">
          <div className="aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1600" alt="Navijači Dinama" className="w-full h-full object-cover"/>
          </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-20">
          <div className="lg:col-span-7 font-body text-lg text-gray-700 leading-relaxed space-y-8 max-w-3xl mx-auto">
              <p>Nakon velike pobjede u Splitu, košarkaši Dinama vraćaju se u Draženov dom gdje ih u petak od 20 sati očekuje novi derbi Premijer lige protiv Zadra.</p>
              <div className="bg-gray-100 p-6 border-l-4 border-[#002060] mt-8">
                  <h4 className="font-bold text-[#002060] uppercase mb-2">Informacije o utakmici:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Datum:</strong> Petak, 09.01.2025.</li>
                      <li><strong>Vrijeme:</strong> 20:00 sati</li>
                      <li><strong>Lokacija:</strong> KC Dražen Petrović</li>
                  </ul>
              </div>
          </div>
      </section>

      <FooterV5 />
    </div>
  );
}