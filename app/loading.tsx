export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#001035] flex flex-col items-center justify-center">
      {/* Logo Pulse */}
      <div className="w-24 h-24 mb-8 relative">
         <div className="absolute inset-0 bg-[#00C2FF] rounded-full opacity-20 animate-ping"></div>
         <div className="relative z-10 w-full h-full bg-[#002060] rounded-full flex items-center justify-center border-4 border-white">
            <span className="font-condensed font-bold text-3xl text-white">d</span>
         </div>
      </div>
      
      {/* Text Loader */}
      <div className="flex items-end gap-1">
          <span className="font-condensed font-bold text-2xl text-white uppercase tracking-widest">Učitavanje</span>
          <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
          <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      </div>
    </div>
  );
}