import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#001035] text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="font-condensed font-bold text-[15rem] leading-none text-[#002060] select-none opacity-50">
        404
      </div>
      <h1 className="font-condensed font-bold text-6xl uppercase mb-4 relative z-10 -mt-16">
        Stranica nije <span className="text-[#00C2FF]">pronađena</span>
      </h1>
      <p className="text-xl text-blue-200 mb-12 max-w-md font-body">
        Izgleda da ste promašili koš. Stranica koju tražite ne postoji ili je premještena.
      </p>
      <Link 
        href="/" 
        className="flex items-center gap-2 bg-[#00C2FF] text-[#001035] px-8 py-4 font-condensed font-bold text-xl uppercase hover:bg-white transition-colors"
      >
        <ArrowLeft size={24} /> Povratak na naslovnicu
      </Link>
    </div>
  );
}