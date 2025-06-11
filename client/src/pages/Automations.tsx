import React, { useState, useRef } from 'react';
import { Trash2, Plus, Send, Eye, Edit, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

interface OutreachPack {
  id: string;
  name: string;
  templateId: string;
  deckId: string;
  ctaLabel: string;
}

interface Sponsor {
  id: string;
  name: string;
  email: string;
  tier: string;
  contacted: boolean;
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'success' | 'warning';
  message: string;
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
      body: 'Hello {{sponsorName}},\n\nWe are excited to invite you to partner with us for our upcoming {{eventName}}. Your company\'s innovative solutions align perfectly with our {{tier}} tier audience.\n\nWe would love to discuss this opportunity further.\n\nBest regards,\n{{yourName}}'
    }
  ]);

  const [pitchDecks, setPitchDecks] = useState<PitchDeck[]>([
    {
      id: '1',
      name: 'Tech Event Deck 2024',
      url: 'https://docs.google.com/presentation/d/sample-tech-deck'
    }
  ]);

  const [outreachPacks, setOutreachPacks] = useState<OutreachPack[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>(mockSponsors);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [selectedOutreachPack, setSelectedOutreachPack] = useState<string>('');
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  const [newTemplate, setNewTemplate] = useState<Omit<EmailTemplate, 'id'>>({
    name: '',
    subject: '',
    body: ''
  });

  const [newPitchDeck, setNewPitchDeck] = useState<Omit<PitchDeck, 'id'>>({
    name: '',
    url: ''
  });

  const [newOutreachPack, setNewOutreachPack] = useState<Omit<OutreachPack, 'id'>>({
    name: '',
    templateId: '',
    deckId: '',
    ctaLabel: ''
  });

  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showPitchDeckForm, setShowPitchDeckForm] = useState(false);
  const [showOutreachPackForm, setShowOutreachPackForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<string>('');

  // Mock data for preview
  const mockPreviewData = {
    sponsorName: "TechForge",
    eventName: "Maximally Startup Makeathon",
    tier: "Gold",
    yourName: "Rishul"
  };

  const uncontactedSponsors = sponsors.filter(sponsor => !sponsor.contacted);

  // Helper function to replace variables in text
  const replaceVariables = (text: string, data: any) => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  };

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

  const updateEmailTemplate = (id: string, updates: Partial<EmailTemplate>) => {
    setEmailTemplates(templates => 
      templates.map(template => 
        template.id === id ? { ...template, ...updates } : template
      )
    );
    setEditingTemplate(null);
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

  const addOutreachPack = () => {
    if (newOutreachPack.name && newOutreachPack.templateId && newOutreachPack.ctaLabel) {
      const pack: OutreachPack = {
        ...newOutreachPack,
        id: Date.now().toString()
      };
      setOutreachPacks([...outreachPacks, pack]);
      setNewOutreachPack({ name: '', templateId: '', deckId: '', ctaLabel: '' });
      setShowOutreachPackForm(false);
    }
  };

  const deleteOutreachPack = (id: string) => {
    setOutreachPacks(outreachPacks.filter(pack => pack.id !== id));
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

  const addActivityLog = (type: 'success' | 'warning', message: string) => {
    const log: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type,
      message
    };
    setLogs(prev => [log, ...prev]);
  };

  const sendBulkEmail = () => {
    if (!selectedOutreachPack || selectedSponsors.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select an outreach pack and at least one sponsor"
      });
      return;
    }

    const pack = outreachPacks.find(p => p.id === selectedOutreachPack);
    const selectedSponsorData = sponsors.filter(s => selectedSponsors.includes(s.id));

    // Mark sponsors as contacted
    setSponsors(prev => 
      prev.map(sponsor => 
        selectedSponsors.includes(sponsor.id) 
          ? { ...sponsor, contacted: true }
          : sponsor
      )
    );

    // Log each email
    selectedSponsorData.forEach(sponsor => {
      console.log(`Email sent to ${sponsor.email} using ${pack?.name}`);
      addActivityLog('success', `Sent to ${sponsor.email} using "${pack?.name}"`);
    });

    toast({
      title: "Emails Sent Successfully",
      description: `Emails sent to ${selectedSponsors.length} sponsors using ${pack?.name}`
    });

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
                <label className="block text-neutral-400 text-sm mb-2">
                  Email Body
                  <span className="text-neutral-500 text-xs ml-2">Supports variables like {{sponsorName}}, {{eventName}}, {{tier}}, {{yourName}}</span>
                </label>
                <textarea
                  value={newTemplate.body}
                  onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                  placeholder="Use variables like {{sponsorName}}, {{eventName}}, etc."
                  rows={6}
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none resize-vertical"
                />
              </div>
              
              {/* Preview */}
              {newTemplate.body && (
                <div className="border border-neutral-700 p-4 bg-black">
                  <h4 className="text-neutral-300 text-sm font-medium mb-2">Preview with sample data:</h4>
                  <div className="text-neutral-400 text-sm">
                    <div className="mb-2">
                      <strong>Subject:</strong> {replaceVariables(newTemplate.subject, mockPreviewData)}
                    </div>
                    <div className="whitespace-pre-wrap">
                      {replaceVariables(newTemplate.body, mockPreviewData)}
                    </div>
                  </div>
                </div>
              )}

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
                  {editingTemplate === template.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        defaultValue={template.name}
                        onBlur={(e) => updateEmailTemplate(template.id, { name: e.target.value })}
                        className="w-full bg-black border border-neutral-700 px-3 py-2 text-white"
                      />
                      <input
                        type="text"
                        defaultValue={template.subject}
                        onBlur={(e) => updateEmailTemplate(template.id, { subject: e.target.value })}
                        className="w-full bg-black border border-neutral-700 px-3 py-2 text-white"
                      />
                      <textarea
                        defaultValue={template.body}
                        onBlur={(e) => updateEmailTemplate(template.id, { body: e.target.value })}
                        rows={4}
                        className="w-full bg-black border border-neutral-700 px-3 py-2 text-white resize-vertical"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-white font-medium mb-1">{template.name}</h3>
                      <p className="text-neutral-400 text-sm mb-2">Subject: {template.subject}</p>
                      <p className="text-neutral-500 text-xs">{template.body.substring(0, 100)}...</p>
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPreviewTemplate(previewTemplate === template.id ? '' : template.id)}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => setEditingTemplate(editingTemplate === template.id ? null : template.id)}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    {editingTemplate === template.id ? <Check size={16} /> : <Edit size={16} />}
                  </button>
                  <button
                    onClick={() => deleteEmailTemplate(template.id)}
                    className="text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {/* Template Preview */}
              {previewTemplate === template.id && (
                <div className="mt-4 border border-neutral-700 p-4 bg-neutral-950">
                  <h4 className="text-neutral-300 text-sm font-medium mb-2">Preview with sample data:</h4>
                  <div className="text-neutral-400 text-sm">
                    <div className="mb-2">
                      <strong>Subject:</strong> {replaceVariables(template.subject, mockPreviewData)}
                    </div>
                    <div className="whitespace-pre-wrap">
                      {replaceVariables(template.body, mockPreviewData)}
                    </div>
                  </div>
                </div>
              )}
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

      {/* Outreach Pack Section */}
      <div className="border border-neutral-800 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">Outreach Packs</h2>
          <button
            onClick={() => setShowOutreachPackForm(!showOutreachPackForm)}
            className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Create Pack</span>
          </button>
        </div>

        {showOutreachPackForm && (
          <div className="border border-neutral-800 p-6 mb-6 bg-neutral-950">
            <h3 className="text-white font-medium mb-4">New Outreach Pack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Pack Name</label>
                <input
                  type="text"
                  value={newOutreachPack.name}
                  onChange={(e) => setNewOutreachPack({ ...newOutreachPack, name: e.target.value })}
                  placeholder="e.g. Hackathon Pack"
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-2">CTA Label</label>
                <input
                  type="text"
                  value={newOutreachPack.ctaLabel}
                  onChange={(e) => setNewOutreachPack({ ...newOutreachPack, ctaLabel: e.target.value })}
                  placeholder="e.g. Schedule Call"
                  className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Email Template</label>
                <select
                  value={newOutreachPack.templateId}
                  onChange={(e) => setNewOutreachPack({ ...newOutreachPack, templateId: e.target.value })}
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
                <label className="block text-neutral-400 text-sm mb-2">Pitch Deck (Optional)</label>
                <select
                  value={newOutreachPack.deckId}
                  onChange={(e) => setNewOutreachPack({ ...newOutreachPack, deckId: e.target.value })}
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
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={addOutreachPack}
                className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
              >
                Create Pack
              </button>
              <button
                onClick={() => setShowOutreachPackForm(false)}
                className="px-4 py-2 text-sm text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-950 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outreachPacks.map((pack) => {
            const template = emailTemplates.find(t => t.id === pack.templateId);
            const deck = pitchDecks.find(d => d.id === pack.deckId);
            
            return (
              <div key={pack.id} className="border border-neutral-800 p-4 bg-neutral-950">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-medium">{pack.name}</h3>
                  <button
                    onClick={() => deleteOutreachPack(pack.id)}
                    className="text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Template:</span>
                    <span className="text-neutral-300">{template?.name}</span>
                  </div>
                  {deck && (
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Pitch Deck:</span>
                      <span className="text-neutral-300">{deck.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CTA:</span>
                    <span className="text-neutral-300">{pack.ctaLabel}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 px-3 py-2 text-xs text-neutral-400 border border-neutral-800 bg-transparent hover:bg-neutral-900 transition-colors">
                    Preview
                  </button>
                  <button 
                    onClick={() => setSelectedOutreachPack(pack.id)}
                    className="flex-1 px-3 py-2 text-xs text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                  >
                    Use This Pack
                  </button>
                </div>
              </div>
            );
          })}
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
                <span className="text-neutral-500 text-xs font-mono bg-neutral-900 px-2 py-1 rounded-full w-fit">{sponsor.tier}</span>
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
            <label className="block text-neutral-400 text-sm mb-3">Outreach Pack</label>
            <select
              value={selectedOutreachPack}
              onChange={(e) => setSelectedOutreachPack(e.target.value)}
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none"
            >
              <option value="">Select pack...</option>
              {outreachPacks.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.name}
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

          <div className="flex items-end">
            <button
              onClick={sendBulkEmail}
              disabled={!selectedOutreachPack || selectedSponsors.length === 0}
              className="w-full px-6 py-4 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Send Outreach Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      {logs.length > 0 && (
        <div className="border border-neutral-800 p-8">
          <h2 className="text-lg font-medium text-white mb-6">Activity Log</h2>
          <div className="bg-zinc-900 p-4 rounded max-h-64 overflow-y-auto space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="text-sm text-gray-400 flex items-center space-x-2">
                <span>{log.type === 'success' ? '✅' : '⚠️'}</span>
                <span>{log.message}</span>
                <span className="text-gray-500 text-xs ml-auto">
                  {log.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};