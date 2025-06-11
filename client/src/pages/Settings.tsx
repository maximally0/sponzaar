
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

// New tier interface for enhanced management
interface SponsorshipTier {
  name: string;
  minimumAmount: number;
  description: string;
}

const initialSponsorshipTiers: SponsorshipTier[] = [
  {
    name: 'Silver',
    minimumAmount: 5000,
    description: 'Basic sponsorship package with website logo and social media mentions'
  },
  {
    name: 'Gold',
    minimumAmount: 10000,
    description: 'Premium sponsorship with banner placement and newsletter features'
  },
  {
    name: 'Title Sponsor',
    minimumAmount: 20000,
    description: 'Exclusive naming rights and prime positioning across all materials'
  }
];

export const Settings = () => {
  const [tiers, setTiers] = useState(initialTiers);
  const [sponsorshipTiers, setSponsorshipTiers] = useState(initialSponsorshipTiers);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [isEditingTier, setIsEditingTier] = useState(false);
  const [editingTierIndex, setEditingTierIndex] = useState(-1);
  const [tierFormData, setTierFormData] = useState({
    name: '',
    minimumAmount: '',
    description: ''
  });
  const [fromEmail, setFromEmail] = useState('samplecollege@sponzaar.com');

  const handleTierInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTierFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTier = () => {
    setTierFormData({ name: '', minimumAmount: '', description: '' });
    setIsEditingTier(false);
    setEditingTierIndex(-1);
    setIsTierModalOpen(true);
  };

  const handleEditTier = (index: number) => {
    const tier = sponsorshipTiers[index];
    setTierFormData({
      name: tier.name,
      minimumAmount: tier.minimumAmount.toString(),
      description: tier.description
    });
    setIsEditingTier(true);
    setEditingTierIndex(index);
    setIsTierModalOpen(true);
  };

  const handleDeleteTier = (index: number) => {
    if (confirm('Are you sure you want to delete this tier?')) {
      setSponsorshipTiers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleTierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tierData = {
      name: tierFormData.name,
      minimumAmount: parseInt(tierFormData.minimumAmount),
      description: tierFormData.description
    };

    if (isEditingTier && editingTierIndex >= 0) {
      setSponsorshipTiers(prev => prev.map((tier, index) =>
        index === editingTierIndex ? tierData : tier
      ));
    } else {
      setSponsorshipTiers(prev => [...prev, tierData]);
    }

    setIsTierModalOpen(false);
    setTierFormData({ name: '', minimumAmount: '', description: '' });
    setIsEditingTier(false);
    setEditingTierIndex(-1);
  };

  const handleTierCancel = () => {
    setIsTierModalOpen(false);
    setTierFormData({ name: '', minimumAmount: '', description: '' });
    setIsEditingTier(false);
    setEditingTierIndex(-1);
  };

  const handleTestEmail = () => {
    alert(`Test email would be sent from: ${fromEmail}`);
    console.log('Test email functionality triggered for:', fromEmail);
  };

  const handleSaveEmail = () => {
    localStorage.setItem('fromEmail', fromEmail);
    alert('Email configuration saved!');
  };

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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-neutral-400 text-sm mb-3">Default "From" Email Address</label>
              <input 
                type="email" 
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                className="w-full bg-black border border-neutral-700 px-4 py-3 text-white focus:border-neutral-500 focus:outline-none"
                placeholder="e.g., samplecollege@sponzaar.com"
              />
            </div>
            <div>
              <label className="block text-neutral-400 text-sm mb-3">Current Configured Sender</label>
              <div className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-neutral-300">
                {fromEmail}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleTestEmail}
              className="px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
            >
              Test Email
            </button>
            <button 
              onClick={handleSaveEmail}
              className="px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
            >
              Save Email Configuration
            </button>
          </div>
        </div>
      </div>

      <div className="border border-neutral-800 p-8">
        <TierEditor tiers={tiers} onTiersChange={setTiers} />
      </div>

      {/* Sponsorship Tiers Management */}
      <div className="border border-neutral-800 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-medium text-white">Sponsorship Tiers</h2>
          <button
            onClick={handleAddTier}
            className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
          >
            + Add Tier
          </button>
        </div>

        <div className="space-y-4">
          {sponsorshipTiers.map((tier, index) => (
            <div key={index} className="border border-neutral-700 p-6 rounded">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">{tier.name}</h3>
                  <p className="text-neutral-300 text-sm mb-2">
                    Minimum Amount: ₹{tier.minimumAmount.toLocaleString()}
                  </p>
                  <p className="text-neutral-400 text-sm">{tier.description}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditTier(index)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTier(index)}
                    className="text-neutral-400 hover:text-red-400 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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

      {/* Tier Modal */}
      {isTierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-white w-full max-w-md mx-4 p-8">
            <h2 className="text-xl font-medium text-white mb-6">
              {isEditingTier ? 'Edit Tier' : 'Add New Tier'}
            </h2>
            
            <form onSubmit={handleTierSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Tier Name</label>
                <input
                  type="text"
                  name="name"
                  value={tierFormData.name}
                  onChange={handleTierInputChange}
                  required
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none"
                  placeholder="e.g., Silver, Gold, Platinum"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Minimum Amount (₹)</label>
                <input
                  type="number"
                  name="minimumAmount"
                  value={tierFormData.minimumAmount}
                  onChange={handleTierInputChange}
                  required
                  min="0"
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Description</label>
                <textarea
                  name="description"
                  value={tierFormData.description}
                  onChange={handleTierInputChange}
                  required
                  rows={3}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none resize-none"
                  placeholder="Brief description of what this tier includes"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleTierCancel}
                  className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                >
                  {isEditingTier ? 'Update Tier' : 'Add Tier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
