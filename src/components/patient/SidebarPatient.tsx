'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; 
import { Calendar, User, Home, Search, GroupIcon, PhoneCall, Apple, Menu, X, BotIcon, AlertCircle } from 'lucide-react';

interface PatientSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function PatientSidebar({ sidebarOpen, setSidebarOpen }: PatientSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    console.log('Logged out'); 
    router.push('/login'); 
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/patient/dashboard' },
    { id: 'profile', icon: User, label: 'My Profile', href: '/patient/profile' },
    { id: 'appointments', icon: Calendar, label: 'Appointments', href: '/patient/appointments' },
    { id: 'connect', icon: PhoneCall, label: 'Connect with Doctor', href: '/patient/connect' },
    { id: 'community', icon: GroupIcon, label: 'Community', href: '/patient/community' },
    { id: 'ChatBot', icon: BotIcon, label: 'Stress Reliever Bot', href: '/patient/chatbot' },
  ];

  return (
    <>
      {/* Sidebar - Fixed on mobile, sticky on desktop */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 ${
          isCollapsed ? 'w-16' : 'w-64'
        } h-screen bg-gradient-to-b from-blue-600 via-indigo-600 to-violet-600 text-white transition-all duration-300 ease-in-out flex flex-col justify-between shadow-lg`}>
        
        {/* Header section */}
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="font-bold text-xl">MediMitra</div>
          )}
          <button 
            onClick={toggleSidebar} 
            className={`p-2 rounded-lg hover:bg-blue-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* User Profile section */}
        {!isCollapsed && (
          <div className="px-4 py-2">
            <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                JS
              </div>
              <div className="ml-3">
                <div className="font-medium">Jane Smith</div>
                <div className="text-xs text-blue-100">Patient ID: P78934</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 cursor-pointer ${
                      pathname.includes(item.href)
                        ? 'bg-white text-indigo-600 font-medium shadow-md'
                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-80'
                    }`}
                  >
                    <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                    {!isCollapsed && <span>{item.label}</span>}
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout section */}
        <div className="p-4 border-t border-indigo-700">
          <button 
            onClick={handleLogout} 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ease-in-out w-full hover:bg-red-500 hover:bg-opacity-80 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <AlertCircle size={20} />
            {!isCollapsed && <span>Logout</span>}
            
            {/* Tooltip for collapsed logout */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Logout
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}