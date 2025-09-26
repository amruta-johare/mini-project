'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarPatientProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigation: NavigationItem[] = [
  {
    name: 'Profile',
    href: '/patient/profile',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: 'Doctor Appointments',
    href: '/patient/appointments',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Community',
    href: '/patient/community',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Chatbot',
    href: '/patient/chatbot',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export default function SidebarPatient({ sidebarOpen, setSidebarOpen }: SidebarPatientProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed inset-y-0 left-0 z-50 ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white shadow-2xl transition-all duration-300 ease-in-out border-r border-gray-200`}>
        
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`${isCollapsed ? 'p-3' : 'p-6'} border-b border-gray-200 transition-all duration-300`}>
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-gray-800">John Doe</h3>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                </div>
              )}
              
              {isCollapsed && (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}

              {/* Toggle Button - Only show on desktop */}
              <button
                onClick={toggleCollapse}
                className="hidden md:block p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    isCollapsed ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center ${
                        isCollapsed ? 'justify-center px-2' : 'px-4'
                      } py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <span className={`${
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      } transition-colors duration-200`}>
                        {item.icon}
                      </span>
                      
                      {!isCollapsed && (
                        <span className="ml-3 transition-opacity duration-300">
                          {item.name}
                        </span>
                      )}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                          {item.name}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200`}>
            <button 
              className={`group relative flex items-center ${
                isCollapsed ? 'justify-center px-2' : 'px-4'
              } py-3 w-full text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200`}
              title={isCollapsed ? 'Sign Out' : undefined}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              
              {!isCollapsed && (
                <span className="ml-3">Sign Out</span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  Sign Out
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}