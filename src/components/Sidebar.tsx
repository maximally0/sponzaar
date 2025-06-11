
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', path: '/' },
  { title: 'Sponsor CRM', path: '/crm' },
  { title: 'Deliverables', path: '/deliverables' },
  { title: 'Sponsor Lists', path: '/sponsor-lists' },
  { title: 'Sponsorship Tiers', path: '/tiers' },
  { title: 'Reports', path: '/reports' },
  { title: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-48 bg-sidebar-background border-r border-sidebar-border flex flex-col">
      <div className="p-8 border-b border-sidebar-border">
        <h1 className="text-lg font-medium text-sidebar-foreground">Sponzaar</h1>
      </div>
      
      <nav className="flex-1 p-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'text-sidebar-primary font-medium'
                      : 'text-sidebar-foreground hover:text-sidebar-primary'
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
