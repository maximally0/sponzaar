
import React, { useState } from 'react';
import { TierEditor } from '../components/TierEditor';

const initialTiers = [
  {
    name: 'Silver',
    price: '₹5,000',
    benefits: ['Logo on website', 'Social media mention', 'Certificate of appreciation']
  },
  {
    name: 'Gold',
    price: '₹10,000',
    benefits: ['Logo on banners', 'Logo on website', 'Social media posts', 'Newsletter mention', 'Certificate']
  },
  {
    name: 'Title Sponsor',
    price: '₹20,000',
    benefits: ['Event naming rights', 'Prime logo placement', 'Speaking opportunity', 'Booth space', 'All Silver & Gold benefits']
  },
];

export const Settings = () => {
  const [tiers, setTiers] = useState(initialTiers);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Settings</h1>
        <p className="text-neutral-400 text-sm">Configure your event and account</p>
      </div>

      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Event Name</label>
            <input 
              type="text" 
              defaultValue="TechFest 2024"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Organizer Email</label>
            <input 
              type="email" 
              defaultValue="organizer@techfest.com"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Event Logo</label>
            <input 
              type="file" 
              className="w-full text-neutral-400 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-700 file:bg-transparent file:text-neutral-400"
            />
          </div>
        </div>
      </div>

      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Email Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-neutral-400 text-sm mb-3">SendGrid From Email</label>
            <input 
              type="email" 
              defaultValue="samplecollege@sponzaar.com"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white"
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Email Signature</label>
            <textarea 
              rows={4}
              defaultValue="Best regards,&#10;TechFest 2024 Team&#10;Sample College"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white"
            />
          </div>
        </div>
      </div>

      <div className="border border-neutral-800 p-8">
        <TierEditor tiers={tiers} onTiersChange={setTiers} />
      </div>

      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Team Members</h2>
        <div className="text-neutral-500 text-sm">
          Team collaboration features coming soon.
        </div>
      </div>

      <div className="flex space-x-6">
        <button className="px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors">
          Save Changes
        </button>
        <button className="px-6 py-3 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors">
          Reset to Default
        </button>
      </div>
    </div>
  );
};
