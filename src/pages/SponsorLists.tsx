
import React from 'react';
import { SponsorListCard } from '../components/SponsorListCard';

const sponsorLists = [
  {
    name: 'India Tech Hackathon Sponsors',
    description: 'Curated list of technology companies that sponsor hackathons in India',
    tags: ['Hackathon', 'Tech', 'India'],
    seller: 'TechEvents',
    price: '₹2,999',
    count: 150
  },
  {
    name: 'Global EdTech Sponsors',
    description: 'Educational technology companies interested in sponsoring academic events',
    tags: ['EdTech', 'Education', 'Global'],
    seller: 'EduSponsors',
    price: '₹1,999',
    count: 89
  },
  {
    name: 'Cultural Fest Sponsors',
    description: 'Brands and companies that sponsor cultural festivals and events',
    tags: ['Cultural', 'Entertainment', 'Brands'],
    seller: 'CulturalHub',
    price: '₹1,499',
    count: 75
  },
  {
    name: 'Startup Ecosystem Sponsors',
    description: 'VCs, accelerators, and startup-focused companies',
    tags: ['Startup', 'VC', 'Accelerator'],
    seller: 'StartupDB',
    price: '₹3,499',
    count: 120
  },
];

export const SponsorLists = () => {
  const handleImport = (listName: string) => {
    console.log(`Importing ${listName} to CRM`);
    // Implementation for importing to CRM
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Sponsor Lists</h1>
        <p className="text-neutral-400 text-sm">Discover and import sponsor databases</p>
      </div>

      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-6">Upload Your Own List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-neutral-400 text-sm mb-3">List Name</label>
            <input 
              type="text" 
              placeholder="My Sponsor List"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Description</label>
            <input 
              type="text" 
              placeholder="Brief description of your list"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">CSV File</label>
            <input 
              type="file" 
              accept=".csv"
              className="w-full text-neutral-400 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-700 file:bg-transparent file:text-neutral-400"
            />
          </div>
          <div className="flex items-end">
            <button className="px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors">
              Upload List
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sponsorLists.map((list, index) => (
          <SponsorListCard 
            key={index} 
            list={list} 
            onImport={() => handleImport(list.name)}
          />
        ))}
      </div>
    </div>
  );
};
