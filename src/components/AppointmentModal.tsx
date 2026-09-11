import React, { useState, useEffect } from 'react';
import { 
  X, Calendar as CalendarIcon, Clock, CheckCircle, User, Phone, 
  Sparkles, AlertCircle, ChevronRight, ArrowLeft 
} from 'lucide-react';
import { SERVICES, SALON_INFO } from '../data/salonData';
import { Appointment } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onAppointmentCreated?: (appointment: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  onAppointmentCreated
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('11:30');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastAppointment, setLastAppointment] = useState<Appointment | null>(null);

  // Generate next 14 days starting from today
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const dayOfWeek = d.getDay(); // 0 is Sunday
      const dayName = d.toLocaleDateString('tr-TR', { weekday: 'short' });
      const dayNumber = d.getDate();
      const monthName = d.toLocaleDateString('tr-TR', { month: 'short' });
      const fullDateStr = d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
      const isoDate = d.toISOString().split('T')[0];

      dates.push({
        isoDate,
        dayName,
        dayNumber,
        monthName,
        fullDateStr,
        isSunday: dayOfWeek === 0,
        isToday: i === 0,
      });
    }
    return dates;
  }, []);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].isoDate);
    }
  }, [initialServiceId, availableDates, selectedDate]);

  if (!isOpen) return null;

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const timeSlots = [
    { time: '08:30', status: 'available', tag: 'İlk Randevu' },
    { time: '10:00', status: 'available', tag: 'Sakin' },
    { time: '11:30', status: 'available', tag: 'Önerilen' },
    { time: '13:00', status: 'available', tag: 'Öğle' },
    { time: '14:30', status: 'available', tag: 'Popüler' },
    { time: '16:00', status: 'available', tag: 'Yoğun' },
    { time: '17:30', status: 'available', tag: 'Popüler' },
    { time: '18:45', status: 'available', tag: 'Akşam' },
    { time: '19:45', status: 'available', tag: 'Son Randevu' },
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !selectedDate || !selectedTime) {
      return;
    }

    const dateObj = availableDates.find(d => d.isoDate === selectedDate);
    const dateFormatted = dateObj ? dateObj.fullDateStr : selectedDate;

    const newAppointment: Appointment = {
      id: 'apt-' + Date.now(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: dateFormatted,
      time: selectedTime,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'onaylandi',
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('salon_appointments') || '[]');
      existing.unshift(newAppointment);
      localStorage.setItem('salon_appointments', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setLastAppointment(newAppointment);
    setIsSuccess(true);
    if (onAppointmentCreated) {
      onAppointmentCreated(newAppointment);
    }
  };

  const generateWhatsAppMessage = () => {
    if (!lastAppointment) return '';
    const text = `Merhaba Kezban Hanım, web siteniz üzerinden randevu talebi oluşturdum:\n\n` +
      `👤 *İsim:* ${lastAppointment.fullName}\n` +
      `📞 *Telefon:* ${lastAppointment.phone}\n` +
      `✨ *Hizmet:* ${lastAppointment.serviceName}\n` +
      `📅 *Tarih:* ${lastAppointment.date}\n` +
      `⏰ *Saat:* ${lastAppointment.time}\n` +
      (lastAppointment.notes ? `📝 *Not:* ${lastAppointment.notes}\n\n` : '\n') +
      `Randevumu teyit edebilir misiniz? Teşekkür ederim!`;
    return encodeURIComponent(text);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setLastAppointment(null);
  };

  return (
    <div 
      id="appointment-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="appointment-modal-container"
        className="bg-[#FAF9F6] rounded-sm max-w-xl w-full my-auto shadow-2xl border border-[#E8E6E1] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2D2D2D] text-white p-5 sm:p-6 relative border-b border-stone-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-sm bg-[#A68966] text-white flex items-center justify-center font-serif text-base font-bold">
                K
              </span>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-normal">Online Randevu Oluştur</h3>
                <p className="text-xs text-stone-400">Kezban Güzellik Salonu • Gaziemir Baş Bey Sitesi</p>
              </div>
            </div>
            <button
              id="close-appointment-modal-btn"
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1.5 rounded-sm hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {isSuccess && lastAppointment ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#A68966]/15 text-[#A68966] mx-auto flex items-center justify-center border border-[#A68966]/30">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-[#A68966] bg-white px-3 py-1 rounded-sm border border-[#E8E6E1]">
                Randevunuz Kaydedildi
              </span>
              <h4 className="font-serif text-2xl font-normal text-[#2D2D2D] mt-3">
                Sizi Bekliyoruz, <span className="italic text-[#A68966]">{lastAppointment.fullName.split(' ')[0]}</span>!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Randevu kaydınız oluşturuldu. Kezban Hanım ve ekibi randevu saatinizde salonumuzda hazır olacaktır.
              </p>
            </div>

            {/* Appointment Summary Card */}
            <div className="bg-white border border-[#E8E6E1] rounded-sm p-4 text-left text-xs sm:text-sm space-y-2 shadow-2xs">
              <div className="flex justify-between pb-2 border-b border-[#E8E6E1]">
                <span className="text-stone-500">Seçilen Hizmet:</span>
                <span className="font-semibold text-[#2D2D2D]">{lastAppointment.serviceName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8E6E1]">
                <span className="text-stone-500">Tarih & Saat:</span>
                <span className="font-semibold text-[#2D2D2D]">{lastAppointment.date} · {lastAppointment.time}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#E8E6E1]">
                <span className="text-stone-500">Müşteri İletişim:</span>
                <span className="font-semibold text-[#2D2D2D]">{lastAppointment.fullName} ({lastAppointment.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Konum:</span>
                <span className="font-semibold text-[#2D2D2D]">Baş Bey Sitesi no 7S, Gaziemir</span>
              </div>
            </div>

            {/* WhatsApp Integration Button */}
            <div className="space-y-2 pt-2">
              <a
                id="send-appointment-whatsapp-btn"
                href={`https://wa.me/905363554775?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp ile Kezban Hanım'a Bildir</span>
              </a>
              <p className="text-[11px] text-stone-500">
                Tek tıkla WhatsApp mesajı ileterek randevunuzu anında teyit edebilirsiniz.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="text-xs text-stone-600 hover:text-stone-900 underline"
              >
                Yeni Bir Randevu Al
              </button>
              <span className="text-stone-300">•</span>
              <button
                onClick={onClose}
                className="text-xs text-[#2D2D2D] font-semibold hover:underline"
              >
                Tamam ve Kapat
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBook} className="p-5 sm:p-6 space-y-5">
            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#A68966] mb-2">
                1. Hizmet Seçimi
              </label>
              <select
                id="appointment-service-select"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full p-3 rounded-sm border border-[#E8E6E1] bg-white text-[#2D2D2D] text-sm font-medium focus:outline-hidden focus:border-[#A68966] transition-all"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.duration}) {s.highlight ? `• ${s.highlight}` : ''}
                  </option>
                ))}
              </select>
              <div className="mt-2 p-2.5 bg-white rounded-sm border border-[#E8E6E1] flex items-center justify-between text-xs text-stone-700">
                <span>{selectedService.description}</span>
                <span className="font-semibold shrink-0 ml-2 bg-[#FAF9F6] px-2 py-0.5 rounded-sm text-[#A68966] border border-[#E8E6E1]">
                  {selectedService.duration}
                </span>
              </div>
            </div>

            {/* Step 2: Date Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#A68966] mb-2 flex items-center justify-between">
                <span>2. Tarih Seçimi</span>
                <span className="text-[11px] font-normal text-stone-500">Pazar günleri randevuludur</span>
              </label>
              
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-40 overflow-y-auto p-1">
                {availableDates.slice(0, 7).map((d) => {
                  const isSelected = selectedDate === d.isoDate;
                  return (
                    <button
                      key={d.isoDate}
                      type="button"
                      onClick={() => setSelectedDate(d.isoDate)}
                      className={`p-2 rounded-sm text-center border transition-all ${
                        isSelected
                          ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-xs'
                          : 'bg-white hover:bg-[#F0EFEA] text-[#2D2D2D] border-[#E8E6E1]'
                      }`}
                    >
                      <span className={`block text-[10px] uppercase font-semibold ${isSelected ? 'text-[#A68966]' : 'text-stone-400'}`}>
                        {d.dayName}
                      </span>
                      <span className="block text-base font-bold my-0.5">
                        {d.dayNumber}
                      </span>
                      <span className="block text-[9px]">
                        {d.isToday ? 'Bugün' : d.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Time Slot */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#A68966] mb-2">
                3. Saat Seçimi (08:30 - 20:30)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-2.5 rounded-sm border text-xs font-medium flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#A68966] text-white border-[#A68966] shadow-2xs'
                          : 'bg-white hover:bg-[#F0EFEA] text-[#2D2D2D] border-[#E8E6E1]'
                      }`}
                    >
                      <span className="font-bold">{slot.time}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${
                        isSelected ? 'bg-[#8F7453] text-white' : 'bg-[#FAF9F6] text-stone-600 border border-[#E8E6E1]'
                      }`}>
                        {slot.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#A68966]">
                4. İletişim Bilgileri
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A68966] absolute left-3 top-3.5" />
                    <input
                      id="appointment-name-input"
                      type="text"
                      required
                      placeholder="Adınız Soyadınız"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#E8E6E1] bg-white text-sm text-[#2D2D2D] focus:border-[#A68966] focus:outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A68966] absolute left-3 top-3.5" />
                    <input
                      id="appointment-phone-input"
                      type="tel"
                      required
                      placeholder="Telefon (05xx xxx xx xx)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#E8E6E1] bg-white text-sm text-[#2D2D2D] focus:border-[#A68966] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <input
                  id="appointment-notes-input"
                  type="text"
                  placeholder="Eklemek istediğiniz özel not veya istek (isteğe bağlı)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#E8E6E1] bg-white text-xs text-[#2D2D2D] focus:border-[#A68966] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="submit-appointment-btn"
                type="submit"
                className="w-full py-3.5 rounded-sm bg-[#2D2D2D] hover:bg-[#404040] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <CalendarIcon className="w-4 h-4 text-[#A68966]" />
                <span>Randevuyu Onayla ve Oluştur</span>
              </button>
              <p className="text-center text-[11px] text-stone-500 mt-2">
                Randevunuz kaydedildikten sonra WhatsApp ile doğrudan Kezban Hanım'a teyit iletebilirsiniz.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
