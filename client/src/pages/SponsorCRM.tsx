
import React, { useState } from 'react';
import { SponsorRow } from '../components/SponsorRow';

const initialSponsors = [
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
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Silver',
    contacted: false,
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tierPricing = {
      'Silver': '₹5K',
      'Gold': '₹10K',
      'Title': '₹20K'
    };

    const newSponsor = {
      name: formData.name,
      email: formData.email,
      tier: tierPricing[formData.tier as keyof typeof tierPricing],
      status: formData.contacted ? 'Contacted' : 'Not Contacted',
      notes: formData.notes
    };

    setSponsors(prev => [...prev, newSponsor]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      tier: 'Silver',
      contacted: false,
      notes: ''
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      tier: 'Silver',
      contacted: false,
      notes: ''
    });
    setIsModalOpen(false);
  };
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
          >
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
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Contacted</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor, index) => (
              <tr key={index} className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-950 transition-colors">
                <td className="px-6 py-4 text-white font-medium">{sponsor.name}</td>
                <td className="px-6 py-4 text-neutral-300">{sponsor.email}</td>
                <td className="px-6 py-4 text-neutral-300">{sponsor.tier}</td>
                <td className="px-6 py-4 text-center">
                  {sponsor.status === 'Contacted' || sponsor.status === 'In Talks' || sponsor.status === 'Closed' ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <span className="text-red-400">✗</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    sponsor.status === 'Closed' ? 'bg-green-900 text-green-200' :
                    sponsor.status === 'In Talks' ? 'bg-yellow-900 text-yellow-200' :
                    sponsor.status === 'Contacted' ? 'bg-blue-900 text-blue-200' :
                    'bg-neutral-800 text-neutral-400'
                  }`}>
                    {sponsor.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-400 text-sm max-w-xs truncate">{sponsor.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Sponsor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-white w-full max-w-md mx-4 p-8">
            <h2 className="text-xl font-medium text-white mb-6">Add New Sponsor</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Sponsor Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Tier</label>
                <select
                  name="tier"
                  value={formData.tier}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none"
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Title">Title</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="contacted"
                  checked={formData.contacted}
                  onChange={handleInputChange}
                  className="w-4 h-4 bg-black border border-neutral-700 text-white focus:ring-0"
                />
                <label className="text-neutral-400 text-sm">Contacted</label>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm focus:border-neutral-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                >
                  Add Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
