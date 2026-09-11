import React, { useState } from 'react';
import { 
  Sparkles, Scissors, Palette, Smile, HeartHandshake, 
  Crown, Clock, ArrowRight, CheckCircle2, Feather, Star 
} from 'lucide-react';
import { SERVICES } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tüm Hizmetler' },
    { id: 'makyaj', label: 'Makyaj & Gelin' },
    { id: 'kas', label: 'Kaş & Yüz Tasarımı' },
    { id: 'orgu', label: 'Saç Örgüleri' },
    { id: 'renk', label: 'Renklendirme & Balyaj' },
    { id: 'sac', label: 'Kesim & Şekillendirme' },
    { id: 'bakim', label: 'Saç Bakımı & Keratin' },
    { id: 'tesettur', label: 'Tesettür & Gelin Başı' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => {
        if (selectedCategory === 'tesettur') return s.category === 'tesettur';
        if (selectedCategory === 'makyaj') return s.category === 'makyaj' || s.id === 'tesettur-gelin-basi-makyaj';
        return s.category === selectedCategory;
      });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#A68966]" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#2D2D2D]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#A68966]" />;
      case 'Smile': return <Smile className="w-5 h-5 text-[#A68966]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[#A68966]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#2D2D2D]" />;
      case 'Feather': return <Feather className="w-5 h-5 text-[#A68966]" />;
      default: return <Sparkles className="w-5 h-5 text-[#A68966]" />;
    }
  };

  return (
    <section id="hizmetlerimiz" className="py-20 bg-[#FAF9F6] border-b border-[#E8E6E1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A68966] font-semibold block mb-2">
            Sanat & Uzmanlık
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-normal tracking-tight">
            Güzelliğinizi Öne Çıkaran <span className="italic text-[#A68966]">Hizmetler</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Müşterilerimizin memnuniyetle bahsettiği tesettür saç tasarımı, gelin başı & porselen makyaj, imza kaş alımı, yaratıcı saç örgüleri ve zengin renklendirme dokunuşları.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-xs'
                  : 'bg-white text-stone-700 border-[#E8E6E1] hover:bg-[#F0EFEA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-sm border border-[#E8E6E1] bg-white hover:border-[#A68966] hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-2xs"
            >
              {/* Card Image Area */}
              {service.image && (
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      if (service.fallbackImage && e.currentTarget.src !== service.fallbackImage) {
                        e.currentTarget.src = service.fallbackImage;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                  {/* Floating Highlight / Badge */}
                  {service.highlight && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#2D2D2D] bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-white/60 flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                        {service.highlight}
                      </span>
                    </div>
                  )}

                  {/* Floating Service Icon */}
                  <div className="absolute bottom-3 left-3 w-9 h-9 rounded-sm bg-white/95 backdrop-blur-xs border border-white/50 flex items-center justify-center shadow-xs z-10">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2D2D] group-hover:text-[#A68966] transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Bottom bar of card */}
                <div className="mt-5 pt-4 border-t border-[#E8E6E1] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#A68966]" />
                    <span>{service.duration}</span>
                  </div>

                  <button
                    id={`book-service-${service.id}-btn`}
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="px-3.5 py-2 rounded-sm bg-[#2D2D2D] hover:bg-[#A68966] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Randevu Al</span>
                    <ArrowRight className="w-3 h-3 text-[#A68966] group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Banner for Customer Care */}
        <div className="mt-14 rounded-sm bg-[#2D2D2D] text-white p-7 sm:p-10 border border-[#E8E6E1]/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A68966]">
              Kişiye Özel İlgi & Danışmanlık
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-normal">
              Kararsız mısınız? Saç & Güzellik Analizi İçin <span className="italic text-[#A68966]">Kahveye Bekleriz</span>
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Yüz hatlarınıza ve ten renginize en uygun saç rengini, kesim modelini veya kaş şeklini belirlemek için Kezban Hanım ile birebir görüşebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => onSelectServiceForBooking(SERVICES[0].id)}
              className="px-7 py-4 rounded-sm bg-white hover:bg-[#FAF9F6] text-[#2D2D2D] font-bold text-xs uppercase tracking-widest transition-colors shadow-xs"
            >
              Hemen Randevu Oluştur
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
