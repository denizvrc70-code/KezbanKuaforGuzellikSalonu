import React, { useState, useMemo } from 'react';
import { Clock, Calendar, Info, CheckCircle, Sparkles } from 'lucide-react';
import { BUSINESS_HOURS, POPULAR_HOURS, SALON_INFO } from '../data/salonData';

const DAYS_OF_WEEK = [
  'Pazar',       // 0
  'Pazartesi',   // 1
  'Salı',        // 2
  'Çarşamba',    // 3
  'Perşembe',    // 4
  'Cuma',        // 5
  'Cumartesi'    // 6
];

const getCurrentDayName = (): string => {
  try {
    const dayIndex = new Date().getDay();
    return DAYS_OF_WEEK[dayIndex] || 'Çarşamba';
  } catch (e) {
    return 'Çarşamba';
  }
};

export const PopularHoursSection: React.FC = () => {
  const currentDay = useMemo(() => getCurrentDayName(), []);
  const [selectedDay, setSelectedDay] = useState<string>(currentDay);

  return (
    <section className="py-16 bg-white border-b border-[#E8E6E1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Popular Hours (Google Maps Style) */}
          <div className="lg:col-span-7 bg-[#FAF9F6] rounded-sm p-6 sm:p-8 border border-[#E8E6E1] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-sm bg-[#2D2D2D] text-[#A68966]">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#2D2D2D]">Popüler Saatler</h3>
                    <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Google Haritalar Yoğunluk Verisi</p>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold bg-white text-[#2D2D2D] px-3 py-1 rounded-sm border border-[#E8E6E1]">
                  {selectedDay}
                </span>
              </div>

              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Google Maps verilerine göre salonumuz öğleden sonra 14:00 - 17:00 saatleri arasında en hareketli saatlerini yaşamaktadır. Beklemeden hizmet almak için online randevunuzu önceden oluşturabilirsiniz.
              </p>
            </div>

            {/* Popular times bar chart */}
            <div className="space-y-4">
              <div className="h-44 flex items-end justify-between gap-2 sm:gap-3 pt-6 px-2 border-b border-[#E8E6E1]">
                {POPULAR_HOURS.map((item, idx) => {
                  const isPeak = item.percent >= 80;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#2D2D2D] text-white text-[10px] font-bold py-1 px-2 rounded-sm pointer-events-none whitespace-nowrap shadow-md z-20">
                        {item.time} • %{item.percent} ({item.label})
                      </div>

                      {/* Bar */}
                      <div className="w-full max-w-[32px] bg-[#E8E6E1]/60 rounded-t-xs relative overflow-hidden flex items-end justify-center transition-all group-hover:brightness-95">
                        <div
                          className={`w-full rounded-t-xs transition-all duration-500 ${
                            isPeak
                              ? 'bg-[#2D2D2D] group-hover:bg-[#404040]'
                              : 'bg-[#A68966] group-hover:bg-[#8e7354]'
                          }`}
                          style={{ height: `${item.percent}%` }}
                        />
                      </div>

                      {/* Time Label */}
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-600 mt-1">
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Time legend */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A68966]"></span>
                  <span className="text-[11px]">Sakin / İdeal Saatler</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D2D2D]"></span>
                  <span className="text-[11px]">Yoğun Dönem (14:00 - 17:30)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Working Hours Schedule */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white rounded-sm p-6 sm:p-7 border border-[#E8E6E1] shadow-2xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#E8E6E1]">
                  <Calendar className="w-4 h-4 text-[#A68966]" />
                  <h3 className="font-serif text-xl font-bold text-[#2D2D2D]">Çalışma Saatleri</h3>
                </div>

                <div className="divide-y divide-[#E8E6E1] text-xs sm:text-sm">
                  {BUSINESS_HOURS.map((b, idx) => {
                    const isToday = b.day.toLowerCase() === currentDay.toLowerCase();
                    return (
                      <div
                        key={idx}
                        className={`py-2.5 flex items-center justify-between transition-colors ${
                          isToday ? 'font-bold text-[#2D2D2D] bg-[#FAF9F6] px-2.5 rounded-sm border-l-2 border-[#A68966]' : 'text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A68966] animate-pulse" />
                          )}
                          <span>{b.day}</span>
                          {isToday && <span className="text-[10px] text-[#A68966] font-semibold uppercase tracking-wider">(Bugün)</span>}
                        </span>
                        <span className="font-medium text-[#2D2D2D]">{b.hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E6E1] flex items-center gap-2 text-xs text-stone-500">
                <Info className="w-4 h-4 text-[#A68966] shrink-0" />
                <span className="text-[11px] leading-relaxed">Özel gün, gelin başı ve nişan hazırlıkları için randevu ile pazar günleri de hizmet verilmektedir.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
