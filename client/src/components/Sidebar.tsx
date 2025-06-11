
import React from 'react';
import { Link, useLocation } from 'wouter';

const menuItems = [
  { title: 'Dashboard', path: '/' },
  { title: 'Sponsor CRM', path: '/crm' },
  { title: 'Sponsor Lists', path: '/sponsor-lists' },
  { title: 'Marketplace', path: '/sponsor-marketplace' },
  { title: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [location] = useLocation();

  return (
    <div className="w-56 bg-black border-r border-neutral-800 flex flex-col min-h-screen">
      <div className="p-8 border-b border-neutral-800">
        <h1 className="text-xl font-medium text-white tracking-tight">Sponzaar</h1>
      </div>
      
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-neutral-900 border border-neutral-700'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
