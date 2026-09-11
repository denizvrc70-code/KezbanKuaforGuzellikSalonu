import React, { useState } from 'react';
import { 
  MapPin, Navigation, ExternalLink, Copy, Check, Car, 
  Bus, Compass, Phone, Clock, AlertCircle, Share2 
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const TransportationSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [mapType, setMapType] = useState<'m' | 'k'>('m'); // 'm' for standard map, 'k' for satellite

  const copyToClipboard = (text: string, isCode = false) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedPlusCode(true);
      setTimeout(() => setCopiedPlusCode(false), 2500);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SALON_INFO.name,
          text: `${SALON_INFO.name} - Gaziemir Havacılar Cd. Baş Bey Sitesi no 7S`,
          url: SALON_INFO.mapUrls.googleMaps,
        });
      } catch (e) {
        console.log('Share dismissed', e);
      }
    } else {
      copyToClipboard(SALON_INFO.address);
    }
  };

  return (
    <section id="ulasim" className="py-20 bg-white border-b border-[#E8E6E1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A68966] font-semibold block mb-2">
            Kolay Ulaşım & Navigasyon
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-normal tracking-tight">
            Bize Nasıl <span className="italic text-[#A68966]">Ulaşırsınız?</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Gaziemir Baş Bey Sitesi'nde merkezi ve ferah konum. Tercih ettiğiniz harita uygulamasıyla tek tıkla yol tarifi başlatın.
          </p>
        </div>

        {/* 3 Dedicated Map Apps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Google Maps Card */}
          <div className="bg-[#FAF9F6] rounded-sm p-6 border border-[#E8E6E1] shadow-2xs hover:border-[#A68966] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-sm bg-white border border-[#E8E6E1] text-[#2D2D2D] flex items-center justify-center font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                    G
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#2D2D2D] text-base">Google Haritalar</h3>
                    <p className="text-xs text-stone-500">Google Maps Navigasyon</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold bg-white text-[#2D2D2D] px-2 py-0.5 rounded-sm border border-[#E8E6E1]">
                  Android & Web
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                Google Haritalar üzerinden doğrudan <strong>Kezban Kuaför</strong> konumunu görüntüleyin, canlı trafik durumuna göre en hızlı rotayı başlatın.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#E8E6E1]">
              <a
                id="open-google-maps-btn"
                href={SALON_INFO.mapUrls.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-sm bg-[#2D2D2D] hover:bg-[#404040] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Google Maps Rota Başlat</span>
                <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
              </a>
              <a
                href={SALON_INFO.mapUrls.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 text-center text-xs text-stone-600 hover:text-[#A68966] block transition-colors"
              >
                Konumu ve Google Yorumlarını Aç →
              </a>
            </div>
          </div>

          {/* Apple Maps Card */}
          <div className="bg-[#FAF9F6] rounded-sm p-6 border border-[#E8E6E1] shadow-2xs hover:border-[#A68966] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-sm bg-white border border-[#E8E6E1] text-[#2D2D2D] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                    
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#2D2D2D] text-base">Apple Haritalar</h3>
                    <p className="text-xs text-stone-500">Apple Maps</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold bg-white text-[#2D2D2D] px-2 py-0.5 rounded-sm border border-[#E8E6E1]">
                  iOS & CarPlay
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                iPhone, iPad, Apple Watch ve Apple CarPlay kullanıcıları için tek tıkla doğrudan Apple Haritalar uygulamasına yönlendirme.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#E8E6E1]">
              <a
                id="open-apple-maps-btn"
                href={SALON_INFO.mapUrls.appleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-sm bg-[#2D2D2D] hover:bg-[#404040] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Apple Maps'te Aç & Rota Çiz</span>
                <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
              </a>
              <span className="block text-center text-[11px] text-stone-500 py-1 font-medium">
                Siri & Apple Cihazları ile Uyumlu
              </span>
            </div>
          </div>

          {/* Yandex Maps Card */}
          <div className="bg-[#FAF9F6] rounded-sm p-6 border border-[#E8E6E1] shadow-2xs hover:border-[#A68966] transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-sm bg-white border border-[#E8E6E1] text-[#2D2D2D] flex items-center justify-center font-serif font-bold text-lg group-hover:scale-105 transition-transform">
                    Y
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#2D2D2D] text-base">Yandex Haritalar</h3>
                    <p className="text-xs text-stone-500">Yandex Navi & Harita</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold bg-white text-[#2D2D2D] px-2 py-0.5 rounded-sm border border-[#E8E6E1]">
                  Yandex Navi
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                İzmir trafiğinde sıkça tercih edilen Yandex Navigasyon ile anlık trafik, şerit ve sokak detaylarıyla salonumuza zahmetsizce gelin.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#E8E6E1]">
              <a
                id="open-yandex-maps-btn"
                href={SALON_INFO.mapUrls.yandexMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-sm bg-[#2D2D2D] hover:bg-[#404040] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Yandex Maps ile Rota Oluştur</span>
                <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
              </a>
              <a
                href={SALON_INFO.mapUrls.yandexNavi}
                className="w-full py-1.5 text-center text-xs text-stone-600 hover:text-[#A68966] block transition-colors"
              >
                Yandex Navi Uygulamasında Aç →
              </a>
            </div>
          </div>
        </div>

        {/* Map & Address Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FAF9F6] rounded-sm p-6 sm:p-9 border border-[#E8E6E1] shadow-2xs">
          {/* Left Column: Address Info & Transport Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A68966] block mb-1">
                Açık Adres ve Konum
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2D2D2D] mt-1">
                {SALON_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                {SALON_INFO.address}
              </p>
            </div>

            {/* Quick Copy Box */}
            <div className="p-4 rounded-sm bg-white border border-[#E8E6E1] space-y-3 shadow-2xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block">
                    Konum Tanımı
                  </span>
                  <p className="text-xs font-medium text-[#2D2D2D] mt-0.5">
                    Baş Bey Sitesi, Havacılar Cd. No 7S, Gaziemir
                  </p>
                </div>
                <button
                  id="copy-address-btn"
                  onClick={() => copyToClipboard(SALON_INFO.address, false)}
                  className="p-2 rounded-sm bg-[#FAF9F6] border border-[#E8E6E1] hover:bg-[#F0EFEA] text-[#2D2D2D] text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
                  title="Adresi Kopyala"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#A68966]" />}
                  <span>{copiedAddress ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-[#E8E6E1] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-stone-500">
                    Google Plus Code: <strong className="text-[#2D2D2D]">{SALON_INFO.plusCode}</strong>
                  </span>
                </div>
                <button
                  id="copy-pluscode-btn"
                  onClick={() => copyToClipboard(SALON_INFO.plusCode, true)}
                  className="text-xs text-[#A68966] hover:text-stone-900 font-semibold uppercase tracking-wider flex items-center gap-1"
                >
                  {copiedPlusCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPlusCode ? 'Kopyalandı' : 'Kodu Al'}</span>
                </button>
              </div>
            </div>

            {/* Transit Advice */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2D2D]">
                Ulaşım & Park Rehberi
              </h4>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border border-[#E8E6E1]">
                  <Car className="w-4 h-4 text-[#A68966] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2D2D2D] block">Özel Araçla Geliş & Otopark:</strong>
                    Havacılar Caddesi üzerinden Baş Bey Sitesi otoparkı veya site önündeki cadde park alanları kullanılabilir. Park yeri bulması oldukça rahattır.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-sm bg-white border border-[#E8E6E1]">
                  <Bus className="w-4 h-4 text-[#A68966] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2D2D2D] block">Toplu Taşıma & İZBAN:</strong>
                    Gaziemir İZBAN istasyonundan dolmuş veya otobüslerle Havacılar Caddesi yönüne gelerek Baş Bey Sitesi durağında inebilirsiniz.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="py-2.5 px-4 rounded-sm border border-[#E8E6E1] bg-white text-[#2D2D2D] text-xs font-semibold flex items-center gap-2 hover:bg-[#F0EFEA] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Yol Tarifi İçin Ara: {SALON_INFO.phoneFormatted}</span>
              </a>

              <button
                onClick={handleShare}
                className="py-2.5 px-4 rounded-sm border border-[#E8E6E1] bg-white text-[#2D2D2D] text-xs font-semibold flex items-center gap-2 hover:bg-[#F0EFEA] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Konumu Paylaş</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Precision Google Maps Interactive Embed & Navigation */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-sm overflow-hidden border border-[#E8E6E1] bg-white flex flex-col shadow-2xs">
              {/* Map Header with Mode Toggle & Location Title */}
              <div className="px-4 py-3 bg-[#FAF9F6] border-b border-[#E8E6E1] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-xs bg-[#2D2D2D] text-[#A68966] flex items-center justify-center text-xs font-bold shadow-xs">
                    📍
                  </span>
                  <div>
                    <h5 className="font-serif font-bold text-[#2D2D2D] text-xs sm:text-sm">
                      Kezban Kuaför • Baş Bey Sitesi
                    </h5>
                    <p className="text-[10px] text-stone-500">
                      Havacılar Cd. No: 7S, Gaziemir / İzmir
                    </p>
                  </div>
                </div>

                {/* Satellite / Street Switch & Haritada Aç */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <div className="inline-flex rounded-xs bg-white border border-[#E8E6E1] p-0.5 shadow-2xs text-[11px]">
                    <button
                      type="button"
                      onClick={() => setMapType('m')}
                      className={`px-2.5 py-1 rounded-xs font-semibold transition-all ${
                        mapType === 'm'
                          ? 'bg-[#2D2D2D] text-white'
                          : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      Harita
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapType('k')}
                      className={`px-2.5 py-1 rounded-xs font-semibold transition-all ${
                        mapType === 'k'
                          ? 'bg-[#2D2D2D] text-white'
                          : 'text-stone-600 hover:text-black'
                      }`}
                    >
                      Uydu
                    </button>
                  </div>

                  <a
                    href={SALON_INFO.mapUrls.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-stone-500 hover:text-[#2D2D2D] rounded-xs bg-white border border-[#E8E6E1] hover:bg-[#F0EFEA] transition-colors"
                    title="Büyük Haritada Aç"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Responsive Google Maps Embed */}
              <div className="relative w-full h-[380px] sm:h-[420px] bg-stone-100 overflow-hidden">
                <iframe
                  key={mapType}
                  title="Kezban Güzellik Salonu Gaziemir Google Haritalar Konumu"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=38.32491,27.13872+(Kezban+Kuaf%C3%B6r+-+Ba%C5%9F+Bey+Sitesi+Gaziemir)&t=${mapType}&z=16&hl=tr&ie=UTF8&iwloc=B&output=embed`}
                />
              </div>

              {/* Navigation Action Bar below Map */}
              <div className="p-3 bg-[#FAF9F6] border-t border-[#E8E6E1] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                  <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
                  <span>Tek tıkla navigasyon başlat:</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <a
                    id="map-embed-google-btn"
                    href={SALON_INFO.mapUrls.googleMapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xs bg-[#2D2D2D] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#A68966]" />
                  </a>
                  <a
                    id="map-embed-apple-btn"
                    href={SALON_INFO.mapUrls.appleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xs bg-white hover:bg-[#F0EFEA] text-[#2D2D2D] text-xs font-semibold flex items-center gap-1.5 border border-[#E8E6E1] transition-colors shadow-2xs"
                  >
                    <span>Apple Maps</span>
                  </a>
                  <a
                    id="map-embed-yandex-btn"
                    href={SALON_INFO.mapUrls.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xs bg-white hover:bg-[#F0EFEA] text-[#2D2D2D] text-xs font-semibold flex items-center gap-1.5 border border-[#E8E6E1] transition-colors shadow-2xs"
                  >
                    <span>Yandex Navi</span>
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
