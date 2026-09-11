import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Navigation, Phone, MessageSquare, CheckCircle, Clock, ShieldCheck, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenAppointment: () => void;
  onOpenDirections: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onOpenDirections }) => {
  const [heroImage, setHeroImage] = useState<string>(
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
  );

  useEffect(() => {
    try {
      const savedOverrides = localStorage.getItem('kezban_photo_overrides');
      if (savedOverrides) {
        const parsed = JSON.parse(savedOverrides);
        if (parsed['gal-2']) {
          setHeroImage(parsed['gal-2']);
        } else if (parsed['gal-1']) {
          setHeroImage(parsed['gal-1']);
        }
      }
    } catch {
      // ignore
    }
  }, []);
  return (
    <section id="genel-bakis" className="relative overflow-hidden bg-[#FAF9F6] pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-[#E8E6E1]">
      {/* Subtle geometric & circular artistic accents */}
      <div className="absolute top-[25%] right-[-100px] w-[450px] h-[450px] border border-[#A68966]/20 rounded-full pointer-events-none hidden md:block" />
      <div className="absolute bottom-[-100px] left-[-50px] w-[320px] h-[320px] bg-[#A68966]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Micro Google Proof Badge */}
        <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-sm bg-white border border-[#E8E6E1] text-xs mb-8 shadow-2xs">
          <div className="flex text-[#FFB800] tracking-tighter text-sm">★★★★★</div>
          <span className="font-serif font-bold text-[#2D2D2D]">5,0</span>
          <span className="text-[#E8E6E1]">|</span>
          <span className="text-stone-600 font-medium">72 Gerçek Google Yorumu</span>
          <span className="text-[#E8E6E1]">|</span>
          <span className="text-[#A68966] font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A68966]" />
            Doğrulanmış İşletme
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#A68966] font-semibold block">
                Gaziemir'in En Sevilen Adresi
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-serif leading-[1.1] text-[#2D2D2D] font-normal tracking-tight">
                Güzelliğinizi <br />
                <span className="italic text-[#A68966]">Sanata</span> Dönüştürün.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                Saç kesimi, gelin başı tasarımı, boyama, efsane kaş alımı, özel bakım teknikleri, profesyonel makyaj ve tesettür tasarımıyla <strong>28 yıldır değişmeyen</strong> samimiyet ve uzmanlık.
              </p>
            </div>

            {/* Quick Status and Location Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#2D2D2D]">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white border border-[#E8E6E1]">
                <MapPin className="w-3.5 h-3.5 text-[#A68966] shrink-0" />
                <span>Dokuz Eylül, Havacılar Cd. Baş Bey Sitesi no 7S, Gaziemir/İzmir</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#F0EFEA] text-[#2D2D2D] border border-[#E8E6E1]">
                <Clock className="w-3.5 h-3.5 text-[#A68966] shrink-0" />
                <span>Bugün Açık: 08:30 - 20:30</span>
              </div>
            </div>

            {/* Primary Action Button and Line Accent Phone */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-book-appointment-btn"
                onClick={onOpenAppointment}
                className="bg-[#2D2D2D] text-white px-8 sm:px-10 py-4 sm:py-4.5 text-xs sm:text-sm uppercase tracking-widest hover:bg-[#404040] transition-all rounded-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#A68966]" />
                <span>Hemen Randevu Al</span>
              </button>

              <button
                id="hero-get-directions-btn"
                onClick={onOpenDirections}
                className="px-5 py-4 rounded-sm bg-white hover:bg-[#F0EFEA] text-[#2D2D2D] border border-[#E8E6E1] text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all shadow-2xs"
              >
                <Navigation className="w-4 h-4 text-[#A68966]" />
                <span>Yol Tarifi Al</span>
              </button>

              <div className="flex items-center gap-3 px-2 sm:px-4 py-2">
                <div className="w-8 sm:w-12 h-[1px] bg-[#A68966]" />
                <a
                  id="hero-call-btn"
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="text-xs sm:text-sm font-medium text-[#2D2D2D] hover:text-[#A68966] transition-colors tracking-wide"
                >
                  {SALON_INFO.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Quote Card (Artistic Flair Signature Card) */}
            <div className="mt-4 p-5 sm:p-6 bg-white border border-[#E8E6E1] rounded-sm max-w-xl shadow-2xs">
              <div className="flex text-[#FFB800] text-sm mb-2.5">★★★★★</div>
              <p className="italic text-xs sm:text-sm text-stone-600 mb-3 leading-relaxed">
                "6 yıldır güvenle gittiğim tek adres. Özellikle saç rengi, kesim ve bakım konusunda harika bir ekip..."
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#E8E6E1]/60">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D2D2D]">
                  — Hacer Özen
                </span>
                <span className="text-[11px] text-[#A68966] uppercase tracking-wider font-semibold">
                  Google Haritalar Yorumu
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Direct Nav Shortcuts */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Visual Photo Card with Working Hours Overlay */}
            <div className="h-64 sm:h-72 rounded-sm border border-[#E8E6E1] relative overflow-hidden group shadow-xs">
              <img
                src={heroImage}
                alt="Kezban Güzellik Salonu Gaziemir"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#A68966] font-semibold mb-1">
                  Çalışma Saatleri
                </div>
                <div className="text-2xl font-serif tracking-tight">Bugün Açık: 08:30 - 20:30</div>
                <p className="text-xs text-white/80 mt-1">
                  Kezban Kuaför & Güzellik Salonu • Baş Bey Sitesi
                </p>
              </div>
            </div>

            {/* Location & Navigation App Shortcuts (Artistic Flair Layout) */}
            <div className="bg-white p-6 sm:p-7 border border-[#E8E6E1] rounded-sm space-y-5 shadow-2xs">
              <div className="space-y-1.5 pb-3 border-b border-[#E8E6E1]">
                <h3 className="text-xs uppercase tracking-widest font-bold text-[#A68966]">
                  Konum Bilgisi
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  Dokuz Eylül, Havacılar Cd. Baş Bey Sitesi no 7S, 35410 Gaziemir/İzmir
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-400">
                    Yol Tarifi Al
                  </h3>
                  <span className="text-[10px] text-[#A68966] font-mono">
                    Plus: 84FQ+XG
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <a
                    href={SALON_INFO.mapUrls.googleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 border border-[#F0EFEA] hover:bg-[#FAF9F6] transition-colors rounded-sm group"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-black">Google Haritalar</span>
                    <span className="text-[#A68966] font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a
                    href={SALON_INFO.mapUrls.appleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 border border-[#F0EFEA] hover:bg-[#FAF9F6] transition-colors rounded-sm group"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-black">Apple Haritalar</span>
                    <span className="text-[#A68966] font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a
                    href={SALON_INFO.mapUrls.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 border border-[#F0EFEA] hover:bg-[#FAF9F6] transition-colors rounded-sm group"
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#2D2D2D] group-hover:text-black">Yandex Navigasyon</span>
                    <span className="text-[#A68966] font-bold text-sm group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
