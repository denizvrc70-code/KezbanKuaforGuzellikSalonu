import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, SALON_INFO } from '../data/salonData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photoOverrides, setPhotoOverrides] = useState<Record<string, string>>({});

  // Load custom photo overrides from localStorage if any were previously configured
  useEffect(() => {
    try {
      const savedOverrides = localStorage.getItem('kezban_photo_overrides');
      if (savedOverrides) {
        setPhotoOverrides(JSON.parse(savedOverrides));
      }
    } catch {
      // ignore
    }
  }, []);

  // Merge items with overrides applied if any exist
  const baseItems: GalleryItem[] = GALLERY_ITEMS.map(item => {
    if (photoOverrides[item.id]) {
      return { ...item, img: photoOverrides[item.id] };
    }
    return item;
  });

  const filters = [
    { id: 'all', label: 'Tümü (18 Fotoğraf + Video)' },
    { id: 'gelin', label: 'Gelin, Nişan & Tesettür' },
    { id: 'renk', label: 'Balyaj & Canlı Renk' },
    { id: 'orgu', label: 'Örgü & Özel Topuz' },
    { id: 'kesim', label: 'Islak Kesim & Fön' },
    { id: 'makyaj', label: 'Taşlı Makyaj' },
    { id: 'distan', label: 'Dış Cephe & Vitrin' },
    { id: 'videolar', label: 'Videolar (0:21)' },
  ];

  const filteredItems = activeFilter === 'all'
    ? baseItems
    : baseItems.filter(item => item.category === activeFilter);

  // Lightbox navigation
  const currentLightbox = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="galeri" className="py-20 bg-[#FAF9F6] border-b border-[#E8E6E1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E8E6E1] rounded-sm mb-3">
            <Camera className="w-3.5 h-3.5 text-[#A68966]" />
            <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-[#A68966]">
              Kezban Güzellik Salonu • 16 Gerçek Çalışma & Salon Vitrini
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-normal tracking-tight">
            Gerçek Çalışmalarımız & <span className="italic text-[#A68966]">Özel Tasarımlar</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            İnci işlemeli gelin topuzları, ateş kızılı & neon peekaboo renklendirmeler, hassas ıslak kesim ve taşlı gece makyajı.
          </p>
        </div>

        {/* Category Tabs & External Maps Link */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E6E1]">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center lg:justify-start">
            {filters.map(f => (
              <button
                key={f.id}
                id={`filter-tab-${f.id}`}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-sm text-xs tracking-wider font-semibold transition-all border ${
                  activeFilter === f.id
                    ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-xs'
                    : 'bg-white text-stone-700 border-[#E8E6E1] hover:bg-[#F0EFEA]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Google Maps link */}
          <a
            id="google-maps-photos-link"
            href={SALON_INFO.mapUrls.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-sm bg-white hover:bg-[#F0EFEA] text-[#2D2D2D] border border-[#E8E6E1] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs shrink-0"
            title="Google Haritalar'da Tüm Fotoğrafları Gör"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#A68966]" />
            <span>Haritalar'da İncele</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-card-${item.id}`}
              onClick={() => setLightboxIndex(index)}
              className="group cursor-pointer rounded-sm overflow-hidden bg-white border border-[#E8E6E1] shadow-2xs hover:border-[#A68966] transition-all duration-300 flex flex-col relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Category & Duration Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  {item.duration ? (
                    <span className="px-2 py-0.5 rounded-xs bg-black/80 text-white text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur-xs">
                      <Play className="w-2.5 h-2.5 fill-white" />
                      <span>{item.duration}</span>
                    </span>
                  ) : item.tag ? (
                    <span className="px-2 py-0.5 rounded-xs bg-white/95 text-[#2D2D2D] text-[10px] font-semibold tracking-wider uppercase backdrop-blur-xs border border-stone-200">
                      {item.tag}
                    </span>
                  ) : null}
                </div>

                {/* Hover overlay with play or eye icon */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-sm bg-white text-[#2D2D2D] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                    {item.category === 'videolar' ? (
                      <>
                        <Play className="w-4 h-4 fill-[#A68966] text-[#A68966]" />
                        <span className="text-xs font-bold text-[#2D2D2D]">Videoyu Oynat (0:21)</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-[#A68966]" />
                        <span className="text-xs font-bold text-[#2D2D2D]">Büyük Boyutta Gör</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#2D2D2D] group-hover:text-black transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8E6E1] flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A68966]">
                    {item.category === 'videolar' ? 'Video İzle • 0:21' : item.category === 'distan' ? 'Dış Cephe Görseli' : item.category === 'gelin' ? 'Özel Gün Tasarımı' : 'Salon Çalışması'}
                  </span>
                  <span className="text-[#A68966] font-bold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal with Carousel, Video, and Image support */}
        {currentLightbox && lightboxIndex !== null && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xs animate-in fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-2 sm:left-4 z-30 p-2.5 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-2 sm:right-4 z-30 p-2.5 rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-4xl w-full bg-[#2D2D2D] rounded-sm overflow-hidden shadow-2xl border border-[#E8E6E1]/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-3 right-3 z-30">
                <button
                  id="close-lightbox-btn"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-sm bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {currentLightbox.category === 'videolar' && currentLightbox.videoUrl ? (
                <div className="relative bg-black flex items-center justify-center">
                  <video
                    src={currentLightbox.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[70vh] object-contain"
                  />
                </div>
              ) : (
                <div className="relative bg-black flex items-center justify-center">
                  <img
                    src={currentLightbox.img}
                    alt={currentLightbox.title}
                    className="w-full max-h-[75vh] object-contain"
                  />
                </div>
              )}

              <div className="p-5 bg-[#2D2D2D] text-white border-t border-stone-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#A68966] font-semibold">
                      {currentLightbox.tag || currentLightbox.category}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      ({lightboxIndex + 1} / {filteredItems.length})
                    </span>
                  </div>
                  {currentLightbox.duration && (
                    <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-xs font-mono text-stone-300">
                      Süre: {currentLightbox.duration}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-normal mt-1">{currentLightbox.title}</h3>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">{currentLightbox.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

