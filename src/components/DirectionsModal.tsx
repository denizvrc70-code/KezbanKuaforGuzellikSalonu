import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, X, Phone, Compass } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SALON_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(SALON_INFO.plusCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div 
      id="directions-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="directions-modal-container"
        className="bg-[#FAF9F6] rounded-sm max-w-md w-full p-6 shadow-2xl border border-[#E8E6E1] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E6E1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#A68966]/15 border border-[#A68966]/30 flex items-center justify-center text-[#A68966]">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal text-[#2D2D2D]">Yol Tarifi & Navigasyon</h3>
              <p className="text-xs text-stone-500">Gaziemir / İzmir • Baş Bey Sitesi</p>
            </div>
          </div>
          <button 
            id="close-directions-modal-btn"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-sm hover:bg-[#F0EFEA] transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Address Card */}
        <div className="my-5 p-4 bg-white rounded-sm border border-[#E8E6E1] shadow-2xs">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#A68966] shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-serif font-bold text-[#2D2D2D]">{SALON_INFO.name}</p>
              <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">{SALON_INFO.address}</p>
              <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-[#E8E6E1] text-xs">
                <span className="text-stone-500 font-mono text-[11px]">Plus Code: {SALON_INFO.plusCode}</span>
                <button 
                  onClick={handleCopyPlusCode}
                  className="text-[#A68966] hover:text-stone-900 font-semibold text-xs ml-auto flex items-center gap-1 uppercase tracking-wider"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Kopyalandı' : 'Kodu Al'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-2">
            <button 
              id="copy-address-modal-btn"
              onClick={handleCopyAddress}
              className="flex-1 min-w-[110px] py-2 px-3 text-xs font-semibold rounded-sm border border-[#E8E6E1] bg-[#FAF9F6] hover:bg-[#F0EFEA] text-[#2D2D2D] flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#A68966]" />}
              <span>{copied ? 'Kopyalandı' : 'Adresi Kopyala'}</span>
            </button>
            <a 
              href={`tel:${SALON_INFO.landlinePhoneRaw}`}
              className="py-2 px-2.5 text-xs font-semibold rounded-sm border border-[#E8E6E1] bg-[#FAF9F6] hover:bg-[#F0EFEA] text-[#2D2D2D] flex items-center justify-center gap-1.5 transition-colors"
              title="Sabit Hat"
            >
              <Phone className="w-3.5 h-3.5 text-[#A68966]" />
              <span>0232 252 49 01</span>
            </a>
            <a 
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="py-2 px-2.5 text-xs font-semibold rounded-sm border border-[#E8E6E1] bg-[#FAF9F6] hover:bg-[#F0EFEA] text-[#2D2D2D] flex items-center justify-center gap-1.5 transition-colors"
              title="Cep & WhatsApp Hattı"
            >
              <Phone className="w-3.5 h-3.5 text-[#A68966]" />
              <span>0536 355 47 75</span>
            </a>
          </div>
        </div>

        {/* 3 Navigation App Options */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68966] mb-2.5">
          Harita Uygulamanızı Seçin:
        </p>

        <div className="space-y-2.5">
          {/* Google Maps */}
          <a
            id="modal-google-maps-btn"
            href={SALON_INFO.mapUrls.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-sm border border-[#E8E6E1] hover:border-[#A68966] bg-white hover:bg-[#F0EFEA]/60 transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-white border border-[#E8E6E1] text-[#2D2D2D] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-105 transition-transform">
                G
              </div>
              <div>
                <p className="font-serif font-bold text-[#2D2D2D] text-sm group-hover:text-black transition-colors">
                  Google Haritalar
                </p>
                <p className="text-xs text-stone-500">Doğrudan konum ve rota tarifi aç</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#A68966] transition-colors" />
          </a>

          {/* Apple Maps */}
          <a
            id="modal-apple-maps-btn"
            href={SALON_INFO.mapUrls.appleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-sm border border-[#E8E6E1] hover:border-[#A68966] bg-white hover:bg-[#F0EFEA]/60 transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#2D2D2D] text-white flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                
              </div>
              <div>
                <p className="font-serif font-bold text-[#2D2D2D] text-sm group-hover:text-black transition-colors">
                  Apple Haritalar (Apple Maps)
                </p>
                <p className="text-xs text-stone-500">iPhone, iPad & CarPlay için tek tıkla navigasyon</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#A68966] transition-colors" />
          </a>

          {/* Yandex Maps & Navi */}
          <a
            id="modal-yandex-maps-btn"
            href={SALON_INFO.mapUrls.yandexMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-sm border border-[#E8E6E1] hover:border-[#A68966] bg-white hover:bg-[#F0EFEA]/60 transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-white border border-[#E8E6E1] text-[#2D2D2D] flex items-center justify-center font-serif font-bold text-sm group-hover:scale-105 transition-transform">
                Y
              </div>
              <div>
                <p className="font-serif font-bold text-[#2D2D2D] text-sm group-hover:text-black transition-colors">
                  Yandex Haritalar & Navigasyon
                </p>
                <p className="text-xs text-stone-500">Yandex Navi & Yandex Maps rotası oluştur</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#A68966] transition-colors" />
          </a>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8E6E1] text-center">
          <p className="text-xs text-stone-500">
            Açık: <strong>08:30 - 20:30</strong> • Baş Bey Sitesi otopark imkanı vardır.
          </p>
        </div>
      </div>
    </div>
  );
};
