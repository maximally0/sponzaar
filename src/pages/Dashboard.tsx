
import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { title: 'Total Sponsors', value: '48' },
  { title: 'Total Raised', value: '₹2,35,000' },
  { title: 'Deliverables Due', value: '7' },
];

const quickLinks = [
  { title: 'Add New Sponsor', path: '/crm' },
  { title: 'Import Sponsor List', path: '/sponsor-lists' },
  { title: 'View Deliverables', path: '/deliverables' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400 text-sm">Overview of sponsorship activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="border border-neutral-800 p-6">
            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-3">{stat.title}</p>
            <p className="text-3xl font-light text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="px-6 py-4 text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors text-center"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
