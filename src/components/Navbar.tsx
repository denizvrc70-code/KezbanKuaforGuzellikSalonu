import React, { useState } from 'react';
import { Sparkles, Phone, MapPin, Calendar, Clock, Menu, X, Star, Navigation, Instagram } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onOpenAppointment: () => void;
  onOpenDirections: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment, onOpenDirections }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E6E1]">
      {/* Top micro-bar */}
      <div className="bg-[#2D2D2D] text-[#FAF9F6]/80 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-black/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-white font-medium whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A68966] animate-pulse"></span>
              <span>Açık</span>
              <span className="text-[#FAF9F6]/40 hidden xs:inline">·</span>
              <span className="text-[#FAF9F6]/75 text-[10px] sm:text-xs hidden xs:inline">{SALON_INFO.closingTime}'a kadar</span>
            </span>
            <span className="hidden md:inline text-[#E8E6E1]/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-[#FAF9F6]/70 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#A68966] shrink-0" />
              <span>Gaziemir Baş Bey Sitesi, İzmir</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 shrink-0">
            <div className="flex items-center gap-1 text-[#FFB800] font-medium text-[11px] sm:text-xs">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#FFB800]" />
              <span className="text-[#FAF9F6] font-semibold">5.0</span>
              <span className="hidden sm:inline text-[#FAF9F6]/60">(72 Yorum)</span>
            </div>
            {/* Sabit Hat: 0232 252 49 01 - 5.0 (72 Yorum) ile WhatsApp arasında */}
            <a 
              id="topbar-landline-phone-btn"
              href={`tel:${SALON_INFO.landlinePhoneRaw}`}
              className="hover:text-white font-medium flex items-center gap-1 text-[#FAF9F6] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
              title="Salon Sabit Hat: 0232 252 49 01"
            >
              <Phone className="w-3 h-3 text-[#A68966]" />
              <span className="text-[#FAF9F6]/70 hidden md:inline">Sabit:</span>
              <span className="tracking-wider">{SALON_INFO.landlinePhoneFormatted}</span>
            </a>
            <a 
              id="topbar-whatsapp-btn"
              href={SALON_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors text-[11px] sm:text-xs"
              title="WhatsApp İletişim Hattı"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tracking-wider hidden sm:inline">WhatsApp</span>
            </a>
            <a 
              id="topbar-instagram-btn"
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 font-medium flex items-center gap-1 transition-colors text-[11px] sm:text-xs"
              title="Instagram: @kezban_kuafor_guzellik"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span className="tracking-wider hidden sm:inline">Instagram</span>
            </a>
            <a 
              id="topbar-mobile-phone-btn"
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="hover:text-white font-medium flex items-center gap-1 text-[#FAF9F6] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
              title="Cep & Randevu Hattı"
            >
              <Phone className="w-3 h-3 text-[#A68966]" />
              <span className="text-[#FAF9F6]/70 hidden lg:inline">Cep:</span>
              <span className="tracking-wider">{SALON_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#2D2D2D] text-[#A68966] flex items-center justify-center font-serif text-lg sm:text-xl font-bold border border-[#E8E6E1]/20 shadow-xs group-hover:bg-[#3D3D3D] transition-colors shrink-0">
            K
          </div>
          <div className="min-w-0">
            <span className="block font-serif text-lg sm:text-xl lg:text-2xl tracking-tight text-[#2D2D2D] leading-tight truncate">
              KEZBAN <span className="italic text-[#A68966] font-normal">Kuaför</span>
            </span>
            <span className="block text-[8px] sm:text-[9px] lg:text-[10px] text-stone-500 uppercase tracking-wider sm:tracking-[0.2em] font-medium truncate">
              Güzellik Salonu • Gaziemir
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-[#2D2D2D]/80 shrink-0">
          <a href="#genel-bakis" className="hover:text-[#A68966] transition-colors border-b border-[#2D2D2D] pb-0.5 text-[#2D2D2D]">
            Ana Sayfa
          </a>
          <a href="#hizmetlerimiz" className="hover:text-[#A68966] transition-colors">
            Hizmetler
          </a>
          <a href="#referanslar" className="hover:text-[#A68966] transition-colors flex items-center gap-1.5">
            <span>Referanslar</span>
            <span className="px-1.5 py-0.2 rounded-sm text-[10px] bg-rose-50 text-rose-600 border border-rose-200 font-semibold">Video</span>
          </a>
          <a href="#musteri-yorumlari" className="hover:text-[#A68966] transition-colors flex items-center gap-1.5">
            <span>Yorumlar</span>
            <span className="px-1.5 py-0.2 rounded-sm text-[10px] bg-[#FAF9F6] border border-[#E8E6E1] text-[#A68966] font-semibold">5.0 ★</span>
          </a>
          <a href="#ulasim" className="hover:text-[#A68966] transition-colors flex items-center gap-1">
            <span>İletişim & Ulaşım</span>
          </a>
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Instagram Button */}
          <a
            id="nav-instagram-btn"
            href={SALON_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs uppercase tracking-wider font-semibold text-[#B23B72] bg-pink-50 hover:bg-pink-100/90 border border-pink-200 rounded-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs group"
            title="Instagram Hesabımız: @kezban_kuafor_guzellik"
            aria-label="Instagram Hesabımız"
          >
            <Instagram className="w-4 h-4 text-[#D82D7E] group-hover:scale-110 transition-transform shrink-0" />
            <span className="hidden sm:inline">Instagram</span>
          </a>

          {/* WhatsApp Hattı Button */}
          <a
            id="nav-whatsapp-btn"
            href={SALON_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300 rounded-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            title="WhatsApp Randevu ve Bilgi Hattı: 0536 355 47 75"
            aria-label="WhatsApp İletişim Hattı"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Yol Tarifi (Desktop / Tablet) */}
          <button
            id="nav-directions-btn"
            onClick={onOpenDirections}
            className="hidden md:flex px-3 py-2 text-xs uppercase tracking-wider font-semibold text-[#2D2D2D] bg-white hover:bg-[#FAF9F6] border border-[#E8E6E1] rounded-sm items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
            <span>Yol Tarifi</span>
          </button>

          {/* Randevu Al */}
          <button
            id="nav-appointment-btn"
            onClick={onOpenAppointment}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs uppercase tracking-wider font-semibold text-white bg-[#2D2D2D] hover:bg-[#404040] rounded-sm flex items-center gap-1 sm:gap-1.5 transition-all shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#A68966] shrink-0" />
            <span>Randevu</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#2D2D2D] hover:bg-[#F0EFEA] rounded-sm transition-colors"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-[#FAF9F6] border-b border-[#E8E6E1] px-6 pt-3 pb-6 space-y-4">
          <div className="space-y-2 pb-3 border-b border-[#E8E6E1]">
            <a
              id="mobile-whatsapp-btn"
              href={SALON_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Hattı (0536 355 47 75)</span>
            </a>
            <a
              id="mobile-instagram-btn"
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 hover:opacity-95 text-white rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-2xs transition-opacity"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>Instagram (@kezban_kuafor_guzellik)</span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="py-2.5 px-3 bg-[#2D2D2D] text-white rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Randevu Al</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDirections();
                }}
                className="py-2.5 px-3 bg-white text-[#2D2D2D] border border-[#E8E6E1] rounded-sm text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A68966]" />
                <span>Yol Tarifi</span>
              </button>
            </div>
          </div>

          <nav className="flex flex-col space-y-2.5 text-xs uppercase tracking-widest font-medium text-[#2D2D2D]">
            <a 
              href="#genel-bakis" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#A68966] transition-colors"
            >
              Ana Sayfa
            </a>
            <a 
              href="#hizmetlerimiz" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#A68966] transition-colors"
            >
              Hizmetler
            </a>
            <a 
              href="#referanslar" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#A68966] transition-colors flex items-center justify-between"
            >
              <span>Referanslar & Videolar</span>
              <span className="px-2 py-0.5 rounded-sm text-[10px] bg-rose-50 border border-rose-200 text-rose-600 font-semibold">Video</span>
            </a>
            <a 
              href="#musteri-yorumlari" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#A68966] transition-colors flex items-center justify-between"
            >
              <span>Yorumlar</span>
              <span className="px-2 py-0.5 rounded-sm text-[10px] bg-white border border-[#E8E6E1] text-[#A68966] font-semibold">5.0 ★</span>
            </a>
            <a 
              href="#ulasim" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#A68966] transition-colors flex items-center justify-between"
            >
              <span>Ulaşım & Haritalar</span>
              <span className="text-[#A68966]">→</span>
            </a>
          </nav>

          <div className="pt-3 border-t border-[#E8E6E1] flex flex-col gap-2 text-xs text-stone-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Phone className="w-3.5 h-3.5 text-[#A68966]" />
                <span className="font-medium text-stone-500">Sabit:</span> {SALON_INFO.landlinePhoneFormatted}
              </span>
              <a 
                href={`tel:${SALON_INFO.landlinePhoneRaw}`}
                className="font-bold text-[#A68966] uppercase tracking-wider underline text-[11px]"
              >
                Ara
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-700">
                <Phone className="w-3.5 h-3.5 text-[#A68966]" />
                <span className="font-medium text-stone-500">Cep:</span> {SALON_INFO.phoneFormatted}
              </span>
              <a 
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="font-bold text-[#A68966] uppercase tracking-wider underline text-[11px]"
              >
                Ara
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
