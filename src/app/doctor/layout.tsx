'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Brain, Users, Calendar, MessageCircle } from 'lucide-react'; // Import icons

export default function DoctorLayout({ children }) {
  const pathname = usePathname();
  const navItems = [
    { id: 'overview', name: 'Overview', icon: Activity, href: '/doctor/dashboard' },
    { id: 'ai-detection', name: 'AI Tumor Detection', icon: Brain, href: '/doctor/ai-detection' },
    { id: 'patients', name: 'My Patients', icon: Users, href: '/doctor/patients' },
    { id: 'appointments', name: 'Appointments', icon: Calendar, href: '/doctor/appointments' },
    { id: 'community', name: 'Community Insights', icon: MessageCircle, href: '/doctor/community' },
  ];

  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">MediMitra</h1>
            <p className="text-sm text-gray-500">Doctor Dashboard</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">SJ</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{doctorInfo.name}</p>
              <p className="text-xs text-gray-500">{doctorInfo.specialization}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}