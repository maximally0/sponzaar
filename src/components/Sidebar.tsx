
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  List, 
  FileText, 
  FileBarChart, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Sponsor CRM', icon: List, path: '/crm' },
  { title: 'Deliverables', icon: FileText, path: '/deliverables' },
  { title: 'Sponsor Lists', icon: List, path: '/sponsor-lists' },
  { title: 'Sponsorship Tiers', icon: FileBarChart, path: '/tiers' },
  { title: 'Reports', icon: FileBarChart, path: '/reports' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-56 bg-sidebar-background border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-lg font-light text-sidebar-foreground tracking-wide">Sponzaar</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Icon size={16} />
                  <span className="font-light">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
