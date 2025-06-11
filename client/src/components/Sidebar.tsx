
import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Dashboard', path: '/' },
  { title: 'Sponsor CRM', path: '/crm' },
  { title: 'Automations', path: '/automations' },
  { title: 'Sponsor Lists', path: '/sponsor-lists' },
  { title: 'Marketplace', path: '/sponsor-marketplace' },
  { title: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="w-56 bg-black border-r border-neutral-800 flex flex-col min-h-screen">
      <div className="p-8 border-b border-neutral-800">
        <h1 className="text-xl font-medium text-white tracking-tight">Sponzaar</h1>
        {user && (
          <p className="text-sm text-neutral-400 mt-2">Welcome, {user.name}</p>
        )}
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
      
      <div className="p-6 border-t border-neutral-800">
        <Button 
          onClick={logout} 
          variant="outline" 
          className="w-full text-neutral-400 border-neutral-700 hover:text-white hover:bg-neutral-900"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
