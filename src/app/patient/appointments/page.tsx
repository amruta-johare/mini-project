'use client';
import { useState } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import AppointmentBooking from '@/components/patient/AppointmentBooking';
import AppointmentList from '@/components/patient/AppointmentList';

interface Appointment {
  id: number;
  token: string;
  doctor: string;
  date: string;
  time: string;
  status: 'queued' | 'called' | 'completed';
}

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [nextToken, setNextToken] = useState(1);

  const handleBookAppointment = (doctor: string, date: string, time: string) => {
    const token = `APT${nextToken.toString().padStart(3, '0')}`;
    const newAppt: Appointment = {
      id: Date.now(),
      token,
      doctor,
      date,
      time,
      status: 'queued',
    };
    setAppointments((prev) => [...prev, newAppt]);
    setNextToken((prev) => prev + 1);
    // Simulate doctor notification
    console.log(`Doctor notified: New booking from patient for ${doctor} on ${date} at ${time}. Token: ${token}`);
    setShowBooking(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <CalendarIcon className="w-7 h-7 text-blue-500" />
          <span>My Appointments</span>
        </h1>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition flex items-center space-x-2"
        >
          <ClockIcon className="w-5 h-5" />
          <span>Book New</span>
        </button>
      </div>

      <AppointmentList appointments={appointments} />

      {showBooking && (
        <AppointmentBooking
          onBook={handleBookAppointment}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}