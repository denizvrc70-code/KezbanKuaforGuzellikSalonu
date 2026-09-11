import React, { useState } from 'react';
import { Star, MessageCircle, ShieldCheck, Check, CornerDownRight, ExternalLink, Heart, Award } from 'lucide-react';
import { REVIEWS, SALON_INFO } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const tags = [
    { id: 'all', label: 'Tüm Yorumlar (72)' },
    { id: 'kaş', label: 'Kaş Tasarımı' },
    { id: 'renk', label: 'Saç Rengi & Ombre' },
    { id: 'örgü', label: 'Saç Örgüleri' },
    { id: 'makyaj', label: 'Makyaj' },
  ];

  const filteredReviews = filterTag === 'all'
    ? REVIEWS
    : REVIEWS.filter(r => 
        r.highlightTags?.some(t => t.toLowerCase().includes(filterTag.toLowerCase())) ||
        r.text.toLowerCase().includes(filterTag.toLowerCase())
      );

  return (
    <section id="musteri-yorumlari" className="py-20 bg-white border-b border-[#E8E6E1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#A68966] font-semibold block mb-2">
            Doğrulanmış Müşteri Deneyimleri
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2D2D] font-normal tracking-tight">
            Müşterilerimizin Gözünden <span className="italic text-[#A68966]">Kezban Kuaför</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2.5 leading-relaxed">
            Google Haritalar üzerinde 72 gerçek değerlendirme ile 5.0 üzerinden tam 5.0 puan. Yıllara dayanan samimiyet, güven ve hijyen.
          </p>
        </div>

        {/* Rating Summary Banner */}
        <div className="bg-[#FAF9F6] rounded-sm p-6 sm:p-8 border border-[#E8E6E1] shadow-2xs mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Big Score */}
            <div className="md:col-span-4 text-center md:border-r md:border-[#E8E6E1] md:pr-6">
              <div className="font-serif text-6xl font-normal text-[#2D2D2D] tracking-tight">
                5,0
              </div>
              <div className="flex items-center justify-center gap-1 text-[#FFB800] my-2 text-xl">
                ★★★★★
              </div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#2D2D2D]">
                72 Google Haritalar Yorumu
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#A68966] bg-white border border-[#E8E6E1] px-3 py-1 rounded-sm mt-3 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A68966]" />
                %100 Memnuniyet • Tümü 5 Yıldız
              </span>
            </div>

            {/* Middle Rating Bars */}
            <div className="md:col-span-5 space-y-2.5">
              <div className="flex items-center gap-3 text-xs">
                <span className="w-14 font-medium text-stone-600">5 Yıldız</span>
                <div className="flex-1 h-2 rounded-xs bg-[#E8E6E1] overflow-hidden">
                  <div className="h-full bg-[#A68966] rounded-xs w-full"></div>
                </div>
                <span className="w-10 font-bold text-[#2D2D2D] text-right">100%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-14 font-medium text-stone-600">4 Yıldız</span>
                <div className="flex-1 h-2 rounded-xs bg-[#E8E6E1] overflow-hidden">
                  <div className="h-full bg-[#A68966] rounded-xs w-0"></div>
                </div>
                <span className="w-10 font-medium text-stone-400 text-right">0%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-14 font-medium text-stone-600">3 Yıldız</span>
                <div className="flex-1 h-2 rounded-xs bg-[#E8E6E1] overflow-hidden">
                  <div className="h-full bg-[#A68966] rounded-xs w-0"></div>
                </div>
                <span className="w-10 font-medium text-stone-400 text-right">0%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-14 font-medium text-stone-600">2 Yıldız</span>
                <div className="flex-1 h-2 rounded-xs bg-[#E8E6E1] overflow-hidden">
                  <div className="h-full bg-[#A68966] rounded-xs w-0"></div>
                </div>
                <span className="w-10 font-medium text-stone-400 text-right">0%</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="w-14 font-medium text-stone-600">1 Yıldız</span>
                <div className="flex-1 h-2 rounded-xs bg-[#E8E6E1] overflow-hidden">
                  <div className="h-full bg-[#A68966] rounded-xs w-0"></div>
                </div>
                <span className="w-10 font-medium text-stone-400 text-right">0%</span>
              </div>
            </div>

            {/* Right Action CTA */}
            <div className="md:col-span-3 text-center md:text-right space-y-2">
              <a
                id="write-google-review-btn"
                href={SALON_INFO.mapUrls.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-sm bg-[#2D2D2D] hover:bg-[#404040] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Google'da Yorum Yaz</span>
                <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
              </a>
              <p className="text-[11px] text-stone-500">
                Deneyiminizi Google Haritalar profilimizde paylaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Filter tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setFilterTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all border ${
                filterTag === tag.id
                  ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-xs'
                  : 'bg-white hover:bg-[#FAF9F6] text-stone-700 border-[#E8E6E1]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-sm p-6 sm:p-7 border border-[#E8E6E1] shadow-2xs hover:border-[#A68966] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#FAF9F6] text-[#A68966] font-serif font-bold text-sm flex items-center justify-center border border-[#E8E6E1]">
                      {review.avatarText}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D2D2D] text-sm">{review.author}</h4>
                      {review.role && (
                        <p className="text-[11px] text-stone-500 font-medium">{review.role}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">{review.timeAgo}</span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#FFB800] mb-3 text-sm">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFB800]" />
                  ))}
                </div>

                {/* Tags */}
                {review.highlightTags && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {review.highlightTags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-[#FAF9F6] text-stone-700 px-2 py-0.5 rounded-xs border border-[#E8E6E1]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic font-serif">
                  "{review.text}"
                </p>
              </div>

              {/* Salon Owner Reply if present */}
              {review.ownerReply && (
                <div className="mt-5 pt-3 border-t border-[#E8E6E1] bg-[#FAF9F6] rounded-sm p-3.5 border">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2D2D2D] mb-1">
                    <CornerDownRight className="w-3.5 h-3.5 text-[#A68966]" />
                    <span>İşletme Sahibinin Yanıtı</span>
                    <span className="text-[10px] text-stone-400 font-normal ml-auto">
                      {review.ownerReply.date}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-normal">
                    {review.ownerReply.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
