
import React from 'react';
import { SponsorRow } from '../components/SponsorRow';

const sponsors = [
  {
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    tier: '₹20K',
    status: 'Closed',
    notes: 'Title sponsor confirmed'
  },
  {
    name: 'CodeCafe',
    email: 'hello@codecafe.in',
    tier: '₹10K',
    status: 'In Talks',
    notes: 'Negotiating benefits'
  },
  {
    name: 'StartupForge',
    email: 'partnerships@startupforge.com',
    tier: '₹5K',
    status: 'Contacted',
    notes: 'Initial email sent'
  },
  {
    name: 'InnovateHub',
    email: 'sponsor@innovatehub.io',
    tier: '₹10K',
    status: 'Closed',
    notes: 'Payment received'
  },
];

export const SponsorCRM = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Sponsor CRM</h1>
          <p className="text-neutral-400 text-sm">Manage sponsor relationships</p>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors">
            Import from Lists
          </button>
          <button className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors">
            Add Sponsor
          </button>
        </div>
      </div>

      <div className="border border-neutral-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Tier</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor, index) => (
              <SponsorRow key={index} sponsor={sponsor} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
