
'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, ChevronDown, ChevronUp, Check, Settings } from 'lucide-react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Default postavke: Nužni su uvijek true, ostali false dok se ne prihvate
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Provjeri postoji li već odluka u localStorage
    const storedConsent = localStorage.getItem('cookie_consent_v2');
    
    if (!storedConsent) {
      // Ako nema odluke, prikaži banner s malom odgodom
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (finalSettings: CookieSettings) => {
    localStorage.setItem('cookie_consent_v2', JSON.stringify(finalSettings));
    
    // Spremi i stari format za kompatibilnost ako treba
    if (finalSettings.analytics || finalSettings.marketing) {
        localStorage.setItem('cookie_consent', 'accepted');
    } else {
        localStorage.setItem('cookie_consent', 'declined');
    }

    setShowBanner(false);
    // Reload stranice da se primijene skripte (GTM/Pixel) ovisno o odabiru
    window.location.reload();
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveSelection = () => {
    savePreferences(settings);
  };

  const toggleSwitch = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Nužni se ne mogu mijenjati
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* BACKDROP BLUR ako su otvorene postavke */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[190] transition-opacity duration-300" onClick={() => setShowPreferences(false)} />
      )}

      <div className={`fixed bottom-0 left-0 w-full z-[200] transition-all duration-500 ease-in-out ${showPreferences ? 'translate-y-0' : 'translate-y-0'}`}>
        
        <div className="bg-[#001035] text-white border-t-4 border-[#00C2FF] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            
            {/* MAIN BANNER CONTENT */}
            <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    
                    {/* Text Section */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="text-[#00C2FF] w-6 h-6" />
                            <h4 className="font-condensed font-bold text-2xl uppercase tracking-wide">Vaša privatnost je naš teren</h4>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
                            Koristimo kolačiće kako bismo osigurali ispravan rad web stranice (nužni kolačići). 
                            Uz vaš pristanak, koristit ćemo i dodatne kolačiće za analizu prometa i marketinške aktivnosti kako bismo poboljšali vaše korisničko iskustvo.
                            Svoj odabir možete promijeniti u bilo kojem trenutku.
                        </p>
                        
                        {!showPreferences && (
                            <button 
                                onClick={() => setShowPreferences(true)} 
                                className="mt-4 text-[#00C2FF] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"
                            >
                                <Settings size={14} /> Prilagodi postavke
                            </button>
                        )}
                    </div>

                    {/* Buttons Section (Visible when Preferences are CLOSED) */}
                    {!showPreferences && (
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto min-w-fit">
                            <button 
                                onClick={handleRejectAll}
                                className="px-6 py-3 border border-gray-600 text-gray-300 font-condensed font-bold uppercase text-sm hover:border-white hover:text-white transition-all whitespace-nowrap"
                            >
                                Odbij sve
                            </button>
                            <button 
                                onClick={handleAcceptAll}
                                className="px-8 py-3 bg-[#00C2FF] text-[#001035] font-condensed font-bold uppercase text-sm hover:bg-white hover:scale-105 transition-all shadow-lg whitespace-nowrap"
                            >
                                Prihvati sve
                            </button>
                        </div>
                    )}
                </div>

                {/* PREFERENCES SECTION (EXPANDABLE) */}
                {showPreferences && (
                    <div className="mt-8 border-t border-white/10 pt-8 animate-fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            
                            {/* Option 1: Necessary */}
                            <div className="bg-white/5 p-4 rounded border border-white/10 opacity-70 cursor-not-allowed">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-condensed font-bold text-lg uppercase text-white">Nužni kolačići</span>
                                    <Check size={20} className="text-green-500" />
                                </div>
                                <p className="text-xs text-gray-400">Neophodni za funkcioniranje stranice. Ne mogu se isključiti.</p>
                            </div>

                            {/* Option 2: Analytics */}
                            <div 
                                className={`bg-white/5 p-4 rounded border cursor-pointer transition-colors ${settings.analytics ? 'border-[#00C2FF]' : 'border-white/10 hover:border-white/30'}`}
                                onClick={() => toggleSwitch('analytics')}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`font-condensed font-bold text-lg uppercase ${settings.analytics ? 'text-[#00C2FF]' : 'text-white'}`}>Analitika</span>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.analytics ? 'bg-[#00C2FF]' : 'bg-gray-600'}`}>
                                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${settings.analytics ? 'left-6' : 'left-1'}`}></div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">Pomažu nam razumjeti kako koristite stranicu (Google Analytics).</p>
                            </div>

                            {/* Option 3: Marketing */}
                            <div 
                                className={`bg-white/5 p-4 rounded border cursor-pointer transition-colors ${settings.marketing ? 'border-[#00C2FF]' : 'border-white/10 hover:border-white/30'}`}
                                onClick={() => toggleSwitch('marketing')}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`font-condensed font-bold text-lg uppercase ${settings.marketing ? 'text-[#00C2FF]' : 'text-white'}`}>Marketing</span>
                                    <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.marketing ? 'bg-[#00C2FF]' : 'bg-gray-600'}`}>
                                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${settings.marketing ? 'left-6' : 'left-1'}`}></div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400">Kolačići za društvene mreže i ciljane oglase (Facebook Pixel, YouTube).</p>
                            </div>
                        </div>

                        {/* Preferences Actions */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 border-t border-white/10 pt-6">
                             <button 
                                onClick={() => setShowPreferences(false)}
                                className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest px-4 py-2"
                            >
                                Odustani
                            </button>
                            <button 
                                onClick={handleSaveSelection}
                                className="px-8 py-3 bg-white text-[#002060] font-condensed font-bold uppercase text-sm hover:bg-gray-200 transition-colors shadow-lg"
                            >
                                Spremi odabrano
                            </button>
                            <button 
                                onClick={handleAcceptAll}
                                className="px-8 py-3 bg-[#00C2FF] text-[#001035] font-condensed font-bold uppercase text-sm hover:bg-white transition-colors shadow-lg"
                            >
                                Prihvati sve
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </>
  );
}
