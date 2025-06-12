
import React, { useState, useEffect } from 'react';
import { SponsorRow } from '../components/SponsorRow';
import { apiGet, apiPost } from '@/lib/api';

interface Sponsor {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: 'Not Contacted' | 'Contacted' | 'Interested' | 'Closed' | 'Ghosted';
  notes: string;
}

export const SponsorCRM = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeliverablesOpen, setIsDeliverablesOpen] = useState(false);
  const [selectedSponsorIndex, setSelectedSponsorIndex] = useState(-1);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(-1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Silver',
    contacted: false,
    notes: ''
  });

  // Fetch sponsors on component mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    apiGet<Sponsor[]>('/sponsors')
      .then(setSponsors)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

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
      { id: 'github-1', name: 'GitHub', email: 'sponsor@github.com', tier: 'title', status: 'Contacted' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Interested in developer tools showcase' },
      { id: 'mongodb-1', name: 'MongoDB', email: 'events@mongodb.com', tier: 'gold', status: 'Interested' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Database workshop sponsor' },
      { id: 'aws-1', name: 'AWS', email: 'startup@aws.com', tier: 'title', status: 'Closed' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Cloud infrastructure partner' }
    ],
    'EdTech Sponsors': [
      { id: 'coursera-1', name: 'Coursera', email: 'partnerships@coursera.org', tier: 'gold', status: 'Contacted' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Online learning platform' },
      { id: 'khan-1', name: 'Khan Academy', email: 'sponsor@khanacademy.org', tier: 'bronze', status: 'Interested' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Educational content provider' },
      { id: 'udemy-1', name: 'Udemy', email: 'business@udemy.com', tier: 'gold', status: 'Closed' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Course creation tools' }
    ],
    'Startup Sponsors': [
      { id: 'yc-1', name: 'Y Combinator', email: 'events@ycombinator.com', tier: 'title', status: 'Contacted' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Startup accelerator' },
      { id: 'sequoia-1', name: 'Sequoia Capital', email: 'outreach@sequoiacap.com', tier: 'title', status: 'Interested' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Venture capital firm' },
      { id: 'angellist-1', name: 'AngelList', email: 'partnerships@angellist.com', tier: 'gold', status: 'Closed' as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted', notes: 'Startup platform' }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tierPricing = {
      'Silver': 'bronze',
      'Gold': 'gold',
      'Title': 'title'
    };

    const sponsorData = {
      id: `sponsor-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      tier: tierPricing[formData.tier as keyof typeof tierPricing],
      status: (formData.contacted ? 'Contacted' : 'Not Contacted') as 'Not Contacted' | 'Contacted' | 'Interested' | 'Closed' | 'Ghosted',
      notes: formData.notes
    };

    try {
      if (isEditMode && editingIndex >= 0) {
        // Update existing sponsor (would need PUT endpoint)
        setSponsors(prev => prev.map((sponsor, index) => 
          index === editingIndex ? sponsorData : sponsor
        ));
      } else {
        // Add new sponsor
        await apiPost('/sponsors', sponsorData);
        // Refetch sponsors to get updated list
        const updatedSponsors = await apiGet<Sponsor[]>('/sponsors');
        setSponsors(updatedSponsors);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
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
      'bronze': 'Silver',
      'gold': 'Gold', 
      'title': 'Title'
    };
    
    setFormData({
      name: sponsor.name,
      email: sponsor.email,
      phone: '',
      tier: tierMap[sponsor.tier as keyof typeof tierMap] || 'Silver',
      contacted: sponsor.status === 'Contacted' || sponsor.status === 'Interested' || sponsor.status === 'Closed',
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
      
      const newSponsors = lines.slice(1).map((line, lineIndex) => {
        const values = line.split(',').map(v => v.trim());
        const sponsor: any = {};
        
        headers.forEach((header, headerIndex) => {
          const value = values[headerIndex] || '';
          switch (header) {
            case 'name':
              sponsor.name = value;
              break;
            case 'email':
              sponsor.email = value;
              break;
            case 'tier':
              sponsor.tier = value.includes('₹') ? 'bronze' : 'bronze';
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
          id: `sponsor-${Date.now()}-${lineIndex}`,
          name: sponsor.name || 'Unknown',
          email: sponsor.email || '',
          tier: sponsor.tier || 'bronze',
          status: (sponsor.status || 'Not Contacted') as 'Not Contacted' | 'Contacted' | 'Interested' | 'Closed' | 'Ghosted',
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

  const handleStatusUpdate = (sponsorIndex: number, newStatus: 'Contacted' | 'Interested' | 'Closed' | 'Ghosted') => {
    setSponsors(prev => prev.map((sponsor, index) =>
      index === sponsorIndex ? { ...sponsor, status: newStatus } : sponsor
    ));
    setStatusDropdownOpen(-1);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Contacted':
        return 'bg-yellow-800 text-white';
      case 'Interested':
        return 'bg-blue-800 text-white';
      case 'Closed':
        return 'bg-green-800 text-white';
      case 'Ghosted':
        return 'bg-gray-700 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
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
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-neutral-400">
                  Loading sponsors...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-red-400">
                  Error loading sponsors: {error}
                </td>
              </tr>
            ) : sponsors.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-neutral-400">
                  No sponsors found. Add a sponsor to get started.
                </td>
              </tr>
            ) : 
              sponsors.map((sponsor, index) => (
                <tr 
                  key={index} 
                  onClick={() => handleRowClick(index)}
                  className="border-b border-neutral-800 last:border-b-0 hover:bg-neutral-950 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 text-white font-medium">{sponsor.name}</td>
                  <td className="px-6 py-4 text-neutral-300">{sponsor.email}</td>
                  <td className="px-6 py-4 text-neutral-300">{sponsor.tier}</td>
                  <td className="px-6 py-4 text-center">
                    {sponsor.status === 'Contacted' || sponsor.status === 'Interested' || sponsor.status === 'Closed' ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-red-400">✗</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatusDropdownOpen(statusDropdownOpen === index ? -1 : index);
                        }}
                        className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeClass(sponsor.status)} hover:opacity-80 transition-opacity`}
                      >
                        {sponsor.status}
                      </button>
                      
                      {statusDropdownOpen === index && (
                        <div className="absolute top-full left-0 mt-1 bg-black border border-neutral-700 rounded shadow-lg z-10">
                          {['Contacted', 'Interested', 'Closed', 'Ghosted'].map((status) => (
                            <button
                              key={status}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(index, status as 'Contacted' | 'Interested' | 'Closed' | 'Ghosted');
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm hover:bg-neutral-900 transition-colors ${
                                sponsor.status === status ? 'bg-neutral-800' : ''
                              }`}
                            >
                              <span className={`inline-block px-2 py-1 rounded-full text-xs mr-2 ${getStatusBadgeClass(status)}`}>
                                {status}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
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
              ))
            }
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
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeClass(sponsors[selectedSponsorIndex].status)}`}>
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

      {/* Kanban Deliverables Modal */}
      {isDeliverablesOpen && selectedSponsorIndex >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-black border border-white w-full max-w-6xl mx-4 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-medium text-white">
                Deliverables Tracker - {sponsors[selectedSponsorIndex].name}
              </h2>
              <button
                onClick={() => setIsDeliverablesOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Not Started', 'In Progress', 'Completed'].map((columnStatus) => (
                <div key={columnStatus} className="bg-zinc-900 border border-white rounded-lg p-4">
                  <h3 className="text-white font-medium mb-4 text-center">
                    {columnStatus}
                    <span className="ml-2 text-xs text-neutral-400">
                      ({deliverables[selectedSponsorIndex]?.filter(d => d.status === columnStatus).length || 0})
                    </span>
                  </h3>
                  
                  <div className="space-y-3">
                    {deliverables[selectedSponsorIndex]?.filter(d => d.status === columnStatus).map((deliverable, index) => {
                      const originalIndex = deliverables[selectedSponsorIndex]?.findIndex(d => d === deliverable) || 0;
                      return (
                        <div key={originalIndex} className="bg-black text-white border border-gray-700 rounded-md p-3">
                          <h4 className="text-sm font-medium mb-2">{deliverable.task}</h4>
                          <div className="flex justify-between items-center text-xs text-neutral-400">
                            <span>Due: {new Date(deliverable.dueDate).toLocaleDateString()}</span>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                deliverable.status === 'Completed' ? 'bg-green-500' :
                                deliverable.status === 'In Progress' ? 'bg-yellow-500' :
                                'bg-gray-500'
                              }`}></div>
                              <span className="text-xs bg-neutral-800 px-2 py-1 rounded">
                                {sponsors[selectedSponsorIndex].name}
                              </span>
                            </div>
                          </div>
                          
                          {/* Status Update Buttons */}
                          <div className="mt-3 flex space-x-2">
                            {deliverable.status !== 'Not Started' && (
                              <button
                                onClick={() => handleUpdateDeliverableStatus(originalIndex, 'Not Started')}
                                className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                              >
                                Reset
                              </button>
                            )}
                            {deliverable.status !== 'In Progress' && (
                              <button
                                onClick={() => handleUpdateDeliverableStatus(originalIndex, 'In Progress')}
                                className="text-xs px-2 py-1 bg-yellow-700 hover:bg-yellow-600 rounded transition-colors"
                              >
                                Start
                              </button>
                            )}
                            {deliverable.status !== 'Completed' && (
                              <button
                                onClick={() => handleUpdateDeliverableStatus(originalIndex, 'Completed')}
                                className="text-xs px-2 py-1 bg-green-700 hover:bg-green-600 rounded transition-colors"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Add New Deliverable Button */}
                    <button
                      onClick={() => setNewDeliverable(prev => ({ ...prev, status: columnStatus as any }))}
                      className="w-full p-3 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-md text-gray-400 hover:text-gray-300 transition-colors text-sm"
                    >
                      + Add Deliverable
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Deliverable Form */}
            {(newDeliverable.task || newDeliverable.dueDate) && (
              <div className="mt-6 p-4 bg-zinc-900 border border-gray-600 rounded-lg">
                <h3 className="text-white font-medium mb-4">Add New Deliverable</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-neutral-400 text-sm mb-2">Task Description</label>
                    <input
                      type="text"
                      value={newDeliverable.task}
                      onChange={(e) => setNewDeliverable(prev => ({ ...prev, task: e.target.value }))}
                      className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                      placeholder="e.g., Add logo to website"
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
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={handleAddDeliverable}
                    className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                  >
                    Add Deliverable
                  </button>
                  <button
                    onClick={() => setNewDeliverable({ task: '', dueDate: '', status: 'Not Started' })}
                    className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

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
