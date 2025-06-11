import React, { useState } from 'react';
import { Trash2, Plus, Send } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface PitchDeck {
  id: string;
  name: string;
  url: string;
}

interface Sponsor {
  id: string;
  name: string;
  email: string;
  tier: string;
  contacted: boolean;
}

// Mock sponsors data - in real app this would come from CRM
const mockSponsors: Sponsor[] = [
  { id: '1', name: 'TechCorp Inc', email: 'partnerships@techcorp.com', tier: 'Gold', contacted: false },
  { id: '2', name: 'Innovation Labs', email: 'sponsor@innovationlabs.io', tier: 'Silver', contacted: false },
  { id: '3', name: 'StartupHub', email: 'events@startuphub.com', tier: 'Bronze', contacted: false },
  { id: '4', name: 'Digital Dynamics', email: 'marketing@digitaldynamics.co', tier: 'Gold', contacted: false },
  { id: '5', name: 'Future Finance', email: 'outreach@futurefinance.com', tier: 'Silver', contacted: false },
  { id: '6', name: 'Cloud Solutions', email: 'partnerships@cloudsolutions.net', tier: 'Bronze', contacted: false },
];

export const Automations = () => {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Tech Event Partnership',
      subject: 'Partnership Opportunity - {{eventName}}',
      body: 'Hello {{sponsorName}},\n\nWe are excited to invite you to partner with us for our upcoming tech event. Your company\'s innovative solutions align perfectly with our audience.\n\nBest regards,\nEvent Team'
    }
  ]);

  const [pitchDecks, setPitchDecks] = useState<PitchDeck[]>([
    {
      id: '1',
      name: 'Tech Event Deck 2024',
      url: 'https://docs.google.com/presentation/d/sample-tech-deck'
    }
  ]);

  const [sponsors] = useState<Sponsor[]>(mockSponsors);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedPitchDeck, setSelectedPitchDeck] = useState<string>('');

  const [newTemplate, setNewTemplate] = useState<Omit<EmailTemplate, 'id'>>({
    name: '',
    subject: '',
    body: ''
  });

  const [newPitchDeck, setNewPitchDeck] = useState<Omit<PitchDeck, 'id'>>({
    name: '',
    url: ''
  });

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showPitchDeckForm, setShowPitchDeckForm] = useState(false);

  const uncontactedSponsors = sponsors.filter(sponsor => !sponsor.contacted);

  const addEmailTemplate = () => {
    if (newTemplate.name && newTemplate.subject && newTemplate.body) {
      const template: EmailTemplate = {
        ...newTemplate,
        id: Date.now().toString()
      };
      setEmailTemplates([...emailTemplates, template]);
      setNewTemplate({ name: '', subject: '', body: '' });
      setShowTemplateForm(false);
    }
  };

  const deleteEmailTemplate = (id: string) => {
    setEmailTemplates(emailTemplates.filter(template => template.id !== id));
  };

  const addPitchDeck = () => {
    if (newPitchDeck.name && newPitchDeck.url) {
      const pitchDeck: PitchDeck = {
        ...newPitchDeck,
        id: Date.now().toString()
      };
      setPitchDecks([...pitchDecks, pitchDeck]);
      setNewPitchDeck({ name: '', url: '' });
      setShowPitchDeckForm(false);
    }
  };

  const deletePitchDeck = (id: string) => {
    setPitchDecks(pitchDecks.filter(deck => deck.id !== id));
  };

  const toggleSponsorSelection = (sponsorId: string) => {
    setSelectedSponsors(prev => 
      prev.includes(sponsorId) 
        ? prev.filter(id => id !== sponsorId)
        : [...prev, sponsorId]
    );
  };

  const selectAllSponsors = () => {
    setSelectedSponsors(uncontactedSponsors.map(sponsor => sponsor.id));
  };

  const clearSelection = () => {
    setSelectedSponsors([]);
  };

  const sendBulkEmail = () => {
    if (!selectedTemplate || selectedSponsors.length === 0) {
      alert('Please select a template and at least one sponsor');
      return;
    }

    const template = emailTemplates.find(t => t.id === selectedTemplate);
    const pitchDeck = pitchDecks.find(p => p.id === selectedPitchDeck);
    const selectedSponsorData = sponsors.filter(s => selectedSponsors.includes(s.id));

    console.log('Sending bulk email:', {
      template: template?.name,
      pitchDeck: pitchDeck?.name,
      recipients: selectedSponsorData.map(s => s.email),
      count: selectedSponsors.length
    });

    alert(`Successfully sent outreach emails to ${selectedSponsors.length} sponsors!`);
    setSelectedSponsors([]);
  };

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Automations</h1>
        <p className="text-neutral-400 text-sm font-mono">Manage email outreach and sponsor communications</p>
      </div>

      {/* Email Templates Section */}
      <div className="border border-neutral-800 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">Email Templates</h2>
          <button
            onClick={() => setShowTemplateForm(!showTemplateForm)}
            className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Template</span>
          </button>
        </div>

        {showTemplateForm && (
          <div className="border border-neutral-800 p-6 mb-6 bg-neutral-950">
            <h3 className="text-white font-medium mb-4">New Email Template</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Template Name</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g. Tech Event Partnership"
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Subject Line</label>
                <input
                  type="text"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  placeholder="e.g. Partnership Opportunity - {{eventName}}"
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Email Body</label>
                <textarea
                  value={newTemplate.body}
                  onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                  placeholder="Use variables like {{sponsorName}}, {{eventName}}, etc."
                  rows={6}
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none resize-vertical"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addEmailTemplate}
                  className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                >
                  Save Template
                </button>
                <button
                  onClick={() => setShowTemplateForm(false)}
                  className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {emailTemplates.map((template) => (
            <div key={template.id} className="border border-neutral-800 p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{template.name}</h3>
                  <p className="text-neutral-400 text-sm mb-2">Subject: {template.subject}</p>
                  <p className="text-neutral-500 text-xs">{template.body.substring(0, 100)}...</p>
                </div>
                <button
                  onClick={() => deleteEmailTemplate(template.id)}
                  className="text-neutral-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pitch Deck Library Section */}
      <div className="border border-neutral-800 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">Pitch Deck Library</h2>
          <button
            onClick={() => setShowPitchDeckForm(!showPitchDeckForm)}
            className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Add Pitch Deck</span>
          </button>
        </div>

        {showPitchDeckForm && (
          <div className="border border-neutral-800 p-6 mb-6 bg-neutral-950">
            <h3 className="text-white font-medium mb-4">New Pitch Deck</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Deck Name</label>
                <input
                  type="text"
                  value={newPitchDeck.name}
                  onChange={(e) => setNewPitchDeck({ ...newPitchDeck, name: e.target.value })}
                  placeholder="e.g. Deck for F&B brands"
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-2">URL</label>
                <input
                  type="url"
                  value={newPitchDeck.url}
                  onChange={(e) => setNewPitchDeck({ ...newPitchDeck, url: e.target.value })}
                  placeholder="https://docs.google.com/presentation/..."
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={addPitchDeck}
                className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
              >
                Save Pitch Deck
              </button>
              <button
                onClick={() => setShowPitchDeckForm(false)}
                className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {pitchDecks.map((deck) => (
            <div key={deck.id} className="border border-neutral-800 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium mb-1">{deck.name}</h3>
                  <a 
                    href={deck.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-400 text-sm hover:text-white transition-colors"
                  >
                    {deck.url}
                  </a>
                </div>
                <button
                  onClick={() => deletePitchDeck(deck.id)}
                  className="text-neutral-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Sponsors Section */}
      <div className="border border-neutral-800 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">
            Uncontacted Sponsors ({uncontactedSponsors.length})
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={selectAllSponsors}
              className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearSelection}
              className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {uncontactedSponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex items-center space-x-4 p-3 border border-neutral-800 hover:bg-neutral-950 transition-colors">
              <input
                type="checkbox"
                checked={selectedSponsors.includes(sponsor.id)}
                onChange={() => toggleSponsorSelection(sponsor.id)}
                className="w-4 h-4 bg-black border-neutral-700 text-white focus:ring-neutral-600"
              />
              <div className="flex-1 grid grid-cols-3 gap-4">
                <span className="text-white font-medium">{sponsor.name}</span>
                <span className="text-neutral-400 text-sm">{sponsor.email}</span>
                <span className="text-neutral-500 text-xs font-mono">{sponsor.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Send Panel */}
      <div className="border border-neutral-800 p-8 bg-neutral-950">
        <h2 className="text-lg font-medium text-white mb-6">Send Bulk Outreach</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Email Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none"
            >
              <option value="">Select template...</option>
              {emailTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-neutral-400 text-sm mb-3">Pitch Deck (Optional)</label>
            <select
              value={selectedPitchDeck}
              onChange={(e) => setSelectedPitchDeck(e.target.value)}
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none"
            >
              <option value="">No pitch deck</option>
              {pitchDecks.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full">
              <span className="block text-neutral-400 text-sm mb-3">Selected Sponsors</span>
              <div className="text-white font-medium text-lg">{selectedSponsors.length}</div>
            </div>
          </div>
        </div>

        <button
          onClick={sendBulkEmail}
          disabled={!selectedTemplate || selectedSponsors.length === 0}
          className="w-full px-6 py-4 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Send size={16} />
          <span>Send Outreach Email to {selectedSponsors.length} Selected Sponsors</span>
        </button>
      </div>
    </div>
  );
};