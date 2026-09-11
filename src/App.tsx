/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ReferencesSection } from './components/ReferencesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { TransportationSection } from './components/TransportationSection';
import { PopularHoursSection } from './components/PopularHoursSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AppointmentModal } from './components/AppointmentModal';
import { DirectionsModal } from './components/DirectionsModal';
import { Appointment } from './types';
import { CheckCircle2, Calendar, X, MapPin } from 'lucide-react';

export default function App() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [savedAppointments, setSavedAppointments] = useState<Appointment[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load any saved appointments from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('salon_appointments');
      if (stored) {
        setSavedAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOpenAppointment = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsAppointmentOpen(true);
  };

  const handleAppointmentCreated = (appointment: Appointment) => {
    setSavedAppointments(prev => [appointment, ...prev]);
    setToastMessage(`Randevunuz (${appointment.serviceName}) başarıyla kaydedildi!`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const handleDismissAppointment = (id: string) => {
    const updated = savedAppointments.filter(a => a.id !== id);
    setSavedAppointments(updated);
    try {
      localStorage.setItem('salon_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] flex flex-col font-sans selection:bg-[#A68966]/20 selection:text-[#2D2D2D] pb-16 sm:pb-0 relative overflow-x-hidden">
      {/* Subtle Artistic Background Architectural Accents */}
      <div className="fixed top-[20%] right-[-120px] w-[500px] h-[500px] border border-[#A68966]/15 rounded-full pointer-events-none z-0 hidden md:block" />
      <div className="fixed bottom-[10%] left-[-100px] w-[400px] h-[400px] bg-[#A68966]/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Toast notification banner */}
      {toastMessage && (
        <div 
          id="appointment-toast"
          className="fixed top-16 right-4 z-50 bg-[#2D2D2D] text-white px-5 py-3.5 rounded-sm shadow-xl flex items-center gap-3 border border-[#E8E6E1]/20 animate-in slide-in-from-top-4 duration-300 max-w-md"
        >
          <CheckCircle2 className="w-5 h-5 text-[#A68966] shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-auto"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Persistent Saved Appointment Notification Pill if client already has a booking */}
      {savedAppointments.length > 0 && (
        <div className="bg-[#2D2D2D] text-white text-xs py-2.5 px-4 border-b border-[#E8E6E1]/20 relative z-30">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <Calendar className="w-4 h-4 text-[#A68966] shrink-0" />
              <span className="truncate">
                <strong className="tracking-wide">Kayıtlı Randevunuz:</strong> {savedAppointments[0].serviceName} • {savedAppointments[0].date} ({savedAppointments[0].time})
              </span>
            </div>
            <button
              onClick={() => handleDismissAppointment(savedAppointments[0].id)}
              className="text-[#A68966] hover:text-white text-[11px] uppercase tracking-wider underline shrink-0 transition-colors"
            >
              Kaldır
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenDirections={() => setIsDirectionsOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Trust Badges & Direct Actions */}
        <Hero
          onOpenAppointment={() => handleOpenAppointment()}
          onOpenDirections={() => setIsDirectionsOpen(true)}
        />

        {/* Popular Hours & Google Maps Schedule */}
        <PopularHoursSection />

        {/* Services & Treatment Catalog with Direct Booking Triggers */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId) => handleOpenAppointment(serviceId)}
        />

        {/* Real Customer Video Testimonials & References */}
        <ReferencesSection
          onSelectServiceForBooking={(serviceId) => handleOpenAppointment(serviceId)}
        />

        {/* Real Customer Reviews Section (5.0 Score / 72 Google Reviews) */}
        <ReviewsSection />

        {/* Complete Transportation Section (Google, Apple, Yandex Maps & Interactive Pin) */}
        <TransportationSection />
      </main>

      {/* Salon Footer */}
      <Footer
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenDirections={() => setIsDirectionsOpen(true)}
      />

      {/* Mobile Floating Actions Bar (Call, WhatsApp, Directions, Appointment) */}
      <FloatingActions
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenDirections={() => setIsDirectionsOpen(true)}
      />

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setSelectedServiceId(undefined);
        }}
        initialServiceId={selectedServiceId}
        onAppointmentCreated={handleAppointmentCreated}
      />

      {/* Directions & Navigation Apps Modal */}
      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
      />
    </div>
  );
}
