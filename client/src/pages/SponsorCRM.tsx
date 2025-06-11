
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeliverablesOpen, setIsDeliverablesOpen] = useState(false);
  const [selectedSponsorIndex, setSelectedSponsorIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Silver',
    contacted: false,
    notes: ''
  });

  // Deliverables state - grouped by sponsor index
  const [deliverables, setDeliverables] = useState<{[key: number]: Array<{
    task: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }>}>({
    0: [
      { task: 'Logo placement on website', dueDate: '2024-06-15', status: 'Completed' },
      { task: 'Social media announcement', dueDate: '2024-06-20', status: 'In Progress' }
    ],
    1: [
      { task: 'Banner design approval', dueDate: '2024-06-18', status: 'Not Started' },
      { task: 'Newsletter mention', dueDate: '2024-06-25', status: 'Not Started' }
    ]
  });
  
  const [newDeliverable, setNewDeliverable] = useState({
    task: '',
    dueDate: '',
    status: 'Not Started' as 'Not Started' | 'In Progress' | 'Completed'
  });

  // Sample sponsor lists for import
  const sampleLists = {
    'Hackathon Sponsors': [
      { name: 'GitHub', email: 'sponsor@github.com', tier: '₹20K', status: 'Contacted', notes: 'Interested in developer tools showcase' },
      { name: 'MongoDB', email: 'events@mongodb.com', tier: '₹15K', status: 'In Talks', notes: 'Database workshop sponsor' },
      { name: 'AWS', email: 'startup@aws.com', tier: '₹25K', status: 'Closed', notes: 'Cloud infrastructure partner' }
    ],
    'EdTech Sponsors': [
      { name: 'Coursera', email: 'partnerships@coursera.org', tier: '₹10K', status: 'Contacted', notes: 'Online learning platform' },
      { name: 'Khan Academy', email: 'sponsor@khanacademy.org', tier: '₹8K', status: 'In Talks', notes: 'Educational content provider' },
      { name: 'Udemy', email: 'business@udemy.com', tier: '₹12K', status: 'Closed', notes: 'Course creation tools' }
    ],
    'Startup Sponsors': [
      { name: 'Y Combinator', email: 'events@ycombinator.com', tier: '₹30K', status: 'Contacted', notes: 'Startup accelerator' },
      { name: 'Sequoia Capital', email: 'outreach@sequoiacap.com', tier: '₹25K', status: 'In Talks', notes: 'Venture capital firm' },
      { name: 'AngelList', email: 'partnerships@angellist.com', tier: '₹15K', status: 'Closed', notes: 'Startup platform' }
    ]
  };

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

    const sponsorData = {
      name: formData.name,
      email: formData.email,
      tier: tierPricing[formData.tier as keyof typeof tierPricing],
      status: formData.contacted ? 'Contacted' : 'Not Contacted',
      notes: formData.notes
    };

    if (isEditMode && editingIndex >= 0) {
      // Update existing sponsor
      setSponsors(prev => prev.map((sponsor, index) => 
        index === editingIndex ? sponsorData : sponsor
      ));
    } else {
      // Add new sponsor
      setSponsors(prev => [...prev, sponsorData]);
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      tier: 'Silver',
      contacted: false,
      notes: ''
    });
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingIndex(-1);
  };

  const handleEdit = (index: number) => {
    const sponsor = sponsors[index];
    const tierMap = {
      '₹5K': 'Silver',
      '₹10K': 'Gold',
      '₹20K': 'Title'
    };
    
    setFormData({
      name: sponsor.name,
      email: sponsor.email,
      phone: '',
      tier: tierMap[sponsor.tier as keyof typeof tierMap] || 'Silver',
      contacted: sponsor.status === 'Contacted' || sponsor.status === 'In Talks' || sponsor.status === 'Closed',
      notes: sponsor.notes
    });
    setEditingIndex(index);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this sponsor?')) {
      setSponsors(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const newSponsors = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const sponsor: any = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || '';
          switch (header) {
            case 'name':
              sponsor.name = value;
              break;
            case 'email':
              sponsor.email = value;
              break;
            case 'tier':
              sponsor.tier = value.includes('₹') ? value : `₹${value}`;
              break;
            case 'contacted':
              sponsor.status = value.toLowerCase() === 'true' || value.toLowerCase() === 'yes' ? 'Contacted' : 'Not Contacted';
              break;
            case 'notes':
              sponsor.notes = value;
              break;
          }
        });
        
        return {
          name: sponsor.name || 'Unknown',
          email: sponsor.email || '',
          tier: sponsor.tier || '₹5K',
          status: sponsor.status || 'Not Contacted',
          notes: sponsor.notes || ''
        };
      }).filter(sponsor => sponsor.name !== 'Unknown');

      setSponsors(prev => [...prev, ...newSponsors]);
    };
    
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  };

  const handleSampleImport = (listName: string) => {
    const sampleData = sampleLists[listName as keyof typeof sampleLists];
    if (sampleData) {
      setSponsors(prev => [...prev, ...sampleData]);
    }
  };

  const handleRowClick = (index: number) => {
    setSelectedSponsorIndex(index);
    setIsProfileOpen(true);
  };

  const handleViewDeliverables = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSponsorIndex(index);
    setIsDeliverablesOpen(true);
  };

  const handleAddDeliverable = () => {
    if (newDeliverable.task && newDeliverable.dueDate) {
      setDeliverables(prev => ({
        ...prev,
        [selectedSponsorIndex]: [
          ...(prev[selectedSponsorIndex] || []),
          { ...newDeliverable }
        ]
      }));
      setNewDeliverable({
        task: '',
        dueDate: '',
        status: 'Not Started'
      });
    }
  };

  const handleUpdateDeliverableStatus = (deliverableIndex: number, newStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    setDeliverables(prev => ({
      ...prev,
      [selectedSponsorIndex]: prev[selectedSponsorIndex]?.map((item, index) =>
        index === deliverableIndex ? { ...item, status: newStatus } : item
      ) || []
    }));
  };
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Sponsor CRM</h1>
          <p className="text-neutral-400 text-sm">Manage sponsor relationships</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* CSV Import */}
          <label className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors cursor-pointer">
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVImport}
              className="hidden"
            />
          </label>

          {/* Sample Lists Dropdown */}
          <div className="relative">
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  handleSampleImport(e.target.value);
                  e.target.value = '';
                }
              }}
              className="px-4 py-2 text-sm text-white border border-neutral-700 bg-black hover:bg-neutral-900 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Import Sample Lists</option>
              <option value="Hackathon Sponsors">Hackathon Sponsors</option>
              <option value="EdTech Sponsors">EdTech Sponsors</option>
              <option value="Startup Sponsors">Startup Sponsors</option>
            </select>
          </div>

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
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor, index) => (
              <tr 
                key={index} 
                onClick={() => handleRowClick(index)}
                className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-950 transition-colors cursor-pointer"
              >
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
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDeliverables(index, e);
                      }}
                      className="text-neutral-400 hover:text-white text-sm transition-colors"
                    >
                      Deliverables
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(index);
                      }}
                      className="text-neutral-400 hover:text-white text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                      className="text-neutral-400 hover:text-red-400 text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Sponsor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-white w-full max-w-md mx-4 p-8">
            <h2 className="text-xl font-medium text-white mb-6">
              {isEditMode ? 'Edit Sponsor' : 'Add New Sponsor'}
            </h2>
            
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
                  {isEditMode ? 'Update Sponsor' : 'Add Sponsor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sponsor Profile Modal */}
      {isProfileOpen && selectedSponsorIndex >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-white w-full max-w-lg mx-4 p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-medium text-white">Sponsor Profile</h2>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-neutral-400 text-sm mb-1">Name</label>
                <p className="text-white font-medium">{sponsors[selectedSponsorIndex].name}</p>
              </div>
              
              <div>
                <label className="block text-neutral-400 text-sm mb-1">Email</label>
                <p className="text-neutral-300">{sponsors[selectedSponsorIndex].email}</p>
              </div>
              
              <div>
                <label className="block text-neutral-400 text-sm mb-1">Tier</label>
                <p className="text-neutral-300">{sponsors[selectedSponsorIndex].tier}</p>
              </div>
              
              <div>
                <label className="block text-neutral-400 text-sm mb-1">Status</label>
                <span className={`px-2 py-1 text-xs rounded ${
                  sponsors[selectedSponsorIndex].status === 'Closed' ? 'bg-green-900 text-green-200' :
                  sponsors[selectedSponsorIndex].status === 'In Talks' ? 'bg-yellow-900 text-yellow-200' :
                  sponsors[selectedSponsorIndex].status === 'Contacted' ? 'bg-blue-900 text-blue-200' :
                  'bg-neutral-800 text-neutral-400'
                }`}>
                  {sponsors[selectedSponsorIndex].status}
                </span>
              </div>
              
              <div>
                <label className="block text-neutral-400 text-sm mb-1">Notes</label>
                <p className="text-neutral-300">{sponsors[selectedSponsorIndex].notes || 'No notes'}</p>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm mb-2">Associated Deliverables</label>
                <div className="bg-neutral-900 border border-neutral-700 p-4 rounded">
                  {deliverables[selectedSponsorIndex]?.length > 0 ? (
                    <ul className="space-y-2">
                      {deliverables[selectedSponsorIndex].map((deliverable, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span className="text-neutral-300 text-sm">{deliverable.task}</span>
                          <span className={`px-2 py-1 text-xs rounded ${
                            deliverable.status === 'Completed' ? 'bg-green-900 text-green-200' :
                            deliverable.status === 'In Progress' ? 'bg-yellow-900 text-yellow-200' :
                            'bg-neutral-800 text-neutral-400'
                          }`}>
                            {deliverable.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-500 text-sm">No deliverables assigned</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  handleEdit(selectedSponsorIndex);
                }}
                className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
              >
                Edit Sponsor
              </button>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deliverables Modal */}
      {isDeliverablesOpen && selectedSponsorIndex >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-white w-full max-w-2xl mx-4 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-medium text-white">
                Deliverables - {sponsors[selectedSponsorIndex].name}
              </h2>
              <button
                onClick={() => setIsDeliverablesOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Existing Deliverables */}
            <div className="space-y-4 mb-8">
              {deliverables[selectedSponsorIndex]?.length > 0 ? (
                deliverables[selectedSponsorIndex].map((deliverable, index) => (
                  <div key={index} className="border border-neutral-700 p-4 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-neutral-400 text-xs mb-1">Task</label>
                        <p className="text-white">{deliverable.task}</p>
                      </div>
                      <div>
                        <label className="block text-neutral-400 text-xs mb-1">Due Date</label>
                        <p className="text-neutral-300">{deliverable.dueDate}</p>
                      </div>
                      <div>
                        <label className="block text-neutral-400 text-xs mb-1">Status</label>
                        <select
                          value={deliverable.status}
                          onChange={(e) => handleUpdateDeliverableStatus(index, e.target.value as any)}
                          className="w-full bg-black border border-neutral-700 px-2 py-1 text-white text-sm"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 text-center py-8">No deliverables assigned yet</p>
              )}
            </div>

            {/* Add New Deliverable */}
            <div className="border-t border-neutral-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">Add New Deliverable</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">Task Description</label>
                  <input
                    type="text"
                    value={newDeliverable.task}
                    onChange={(e) => setNewDeliverable(prev => ({ ...prev, task: e.target.value }))}
                    className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                    placeholder="Enter task description"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newDeliverable.dueDate}
                    onChange={(e) => setNewDeliverable(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">Status</label>
                  <select
                    value={newDeliverable.status}
                    onChange={(e) => setNewDeliverable(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleAddDeliverable}
                className="mt-4 px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
              >
                Add Deliverable
              </button>
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={() => setIsDeliverablesOpen(false)}
                className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
