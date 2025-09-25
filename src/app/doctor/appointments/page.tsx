'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Appointments() {
  const todayAppointments = [
    { id: 1, time: '09:00 AM', patient: 'John Doe', age: 32, condition: 'Hypertension Follow-up', type: 'Follow-up', status: 'confirmed' },
    // ... (rest of appointments)
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Add Appointment
          </Link>
        </div>
        <div className="space-y-4">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{appointment.patient}, {appointment.age}</h3>
                    <p className="text-sm text-gray-600">{appointment.condition}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{appointment.time}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}