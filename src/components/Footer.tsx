import React from 'react';
import { MapPin, Phone, Clock, Star, Navigation, ExternalLink, Heart, Instagram } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenAppointment: () => void;
  onOpenDirections: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppointment, onOpenDirections }) => {
  return (
    <footer className="bg-[#2D2D2D] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-700/80">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#A68966] text-white flex items-center justify-center font-serif text-xl font-bold shadow-md">
                K
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-white leading-tight">
                  {SALON_INFO.name}
                </h3>
                <p className="text-xs text-stone-400">Gaziemir / İzmir • Baş Bey Sitesi</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Gaziemir'de 28 yılı aşkın tecrübe ile saç renklendirme, kesim, efsane kaş tasarımı, saç örgüleri ve profesyonel makyaj hizmetleri sunuyoruz.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FFB800] bg-stone-800/80 p-2.5 rounded-sm border border-stone-700 w-fit">
              <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
              <span className="font-bold text-white">5.0 / 5.0</span>
              <span className="text-stone-400">• 72 Google Haritalar Yorumu</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A68966]">
              Hızlı Menü
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#genel-bakis" className="hover:text-white transition-colors">
                  Genel Bakış
                </a>
              </li>
              <li>
                <a href="#hizmetlerimiz" className="hover:text-white transition-colors">
                  Hizmetlerimiz
                </a>
              </li>
              <li>
                <a href="#referanslar" className="hover:text-white transition-colors">
                  Referanslarımız & Videolar
                </a>
              </li>
              <li>
                <a href="#musteri-yorumlari" className="hover:text-white transition-colors">
                  Müşteri Yorumları (5.0 ★)
                </a>
              </li>
              <li>
                <a href="#ulasim" className="hover:text-white transition-colors">
                  Ulaşım & Haritalar
                </a>
              </li>
              <li>
                <a 
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram (@kezban_kuafor_guzellik)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="text-[#A68966] hover:text-[#c4a984] font-semibold"
                >
                  Online Randevu Al
                </button>
              </li>
            </ul>
          </div>

          {/* Transportation & Maps */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A68966] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
              <span>Harita & Navigasyon</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Cihazınızda yüklü uygulamayla direkt açın:
            </p>
            <div className="space-y-2">
              <a
                href={SALON_INFO.mapUrls.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 hover:text-white transition-colors border border-stone-700"
              >
                📍 Google Haritalar (Maps)
              </a>
              <a
                href={SALON_INFO.mapUrls.appleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 hover:text-white transition-colors border border-stone-700"
              >
                🍏 Apple Haritalar (Apple Maps)
              </a>
              <a
                href={SALON_INFO.mapUrls.yandexMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 hover:text-white transition-colors border border-stone-700"
              >
                🔴 Yandex Haritalar & Navi
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A68966]">
              İletişim & Adres
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A68966] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A68966] shrink-0" />
                <span>Her gün 08:30 - 20:30 (Pazar randevulu)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A68966] shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span>
                    <span className="text-stone-400 text-xs mr-1">Sabit:</span>
                    <a href={`tel:${SALON_INFO.landlinePhoneRaw}`} className="text-white hover:underline font-bold">
                      {SALON_INFO.landlinePhoneFormatted}
                    </a>
                  </span>
                  <span className="text-stone-600">·</span>
                  <span>
                    <span className="text-stone-400 text-xs mr-1">Cep:</span>
                    <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-white hover:underline font-bold">
                      {SALON_INFO.phoneFormatted}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={SALON_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp ile Mesaj Gönder</span>
              </a>
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-sm bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 hover:opacity-90 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-opacity shadow-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram'da Bizi Takip Edin</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {SALON_INFO.name}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <span>Gaziemir / İzmir</span>
            <span>•</span>
            <span className="font-mono text-stone-400">Plus Code: {SALON_INFO.plusCode}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
