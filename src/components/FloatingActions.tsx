import React from 'react';
import { Calendar, Phone, Navigation } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingActionsProps {
  onOpenAppointment: () => void;
  onOpenDirections: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenAppointment,
  onOpenDirections,
}) => {
  return (
    <aside aria-label="Hızlı İşlemler" className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-[#E8E6E1] px-3 py-2 sm:hidden shadow-lg">
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Call */}
        <a
          id="mobile-float-call-btn"
          href={`tel:${SALON_INFO.phoneRaw}`}
          className="flex flex-col items-center justify-center p-1.5 rounded-sm text-[#2D2D2D] hover:bg-[#F0EFEA] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#A68966] mb-0.5" />
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Ara</span>
        </a>

        {/* WhatsApp */}
        <a
          id="mobile-float-whatsapp-btn"
          href={SALON_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1.5 rounded-sm text-[#2D2D2D] hover:bg-[#F0EFEA] transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">WhatsApp</span>
        </a>

        {/* Directions */}
        <button
          id="mobile-float-directions-btn"
          onClick={onOpenDirections}
          className="flex flex-col items-center justify-center p-1.5 rounded-sm text-[#2D2D2D] hover:bg-[#F0EFEA] transition-colors"
        >
          <Navigation className="w-4 h-4 text-[#A68966] mb-0.5" />
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">Yol Tarifi</span>
        </button>

        {/* Appointment Primary */}
        <button
          id="mobile-float-book-btn"
          onClick={onOpenAppointment}
          className="flex flex-col items-center justify-center p-1.5 rounded-sm bg-[#2D2D2D] text-white font-semibold shadow-xs hover:bg-[#404040]"
        >
          <Calendar className="w-4 h-4 text-[#A68966] mb-0.5" />
          <span className="text-[10px] uppercase font-mono tracking-wider">Randevu</span>
        </button>
      </div>
    </aside>
  );
};
