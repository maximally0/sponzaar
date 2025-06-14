import React, { useState } from 'react';
import { Trash2, Plus, Send, Eye, Edit } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiGet, apiPost } from '@/lib/api';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
}

interface Sponsor {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  notes: string;
}

export const Automations = () => {
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    html: ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: emailTemplates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['/api/templates'],
    queryFn: () => apiGet<EmailTemplate[]>('/api/templates')
  });

  const { data: sponsors = [], isLoading: sponsorsLoading } = useQuery({
    queryKey: ['/api/sponsors'],
    queryFn: () => apiGet<Sponsor[]>('/api/sponsors')
  });

  const isLoading = templatesLoading || sponsorsLoading;

  const createTemplateMutation = useMutation({
    mutationFn: (templateData: Omit<EmailTemplate, 'id'>) => 
      apiPost('/api/templates', { ...templateData, id: `template-${Date.now()}` }),
    onSuccess: () => {
      toast({
        title: "Template created successfully",
        description: `"${newTemplate.name}" has been added to your templates.`
      });
      setNewTemplate({ name: '', subject: '', html: '' });
      setShowTemplateForm(false);
      queryClient.invalidateQueries({ queryKey: ['/api/templates'] });
    },
    onError: (err: any) => {
      toast({
        title: "Error creating template",
        description: err.message,
        variant: "destructive"
      });
    }
  });

  const bulkEmailMutation = useMutation({
    mutationFn: (data: { templateId: string; sender: string }) => 
      apiPost('/api/send-to-uncontacted', data),
    onSuccess: () => {
      toast({
        title: "Emails sent successfully",
        description: "Bulk emails sent to uncontacted sponsors."
      });
      setSelectedTemplateId('');
      queryClient.invalidateQueries({ queryKey: ['/api/sponsors'] });
    },
    onError: (err: any) => {
      toast({
        title: "Error sending emails",
        description: err.message,
        variant: "destructive"
      });
    }
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    createTemplateMutation.mutate({
      name: newTemplate.name,
      subject: newTemplate.subject,
      html: newTemplate.html
    });
  };

  const handleSendBulkEmails = () => {
    if (!selectedTemplateId) {
      toast({
        title: "Missing selection",
        description: "Please select a template to send emails.",
        variant: "destructive"
      });
      return;
    }

    bulkEmailMutation.mutate({
      templateId: selectedTemplateId,
      sender: 'noreply@sponzaar.com'
    });
  };

  const uncontactedSponsors = sponsors.filter(sponsor => sponsor.status === 'Not Contacted');

  if (isLoading) {
    return (
      <div className="space-y-16">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Automations</h1>
          <p className="text-neutral-400 text-sm font-mono">Loading email automation tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Automations</h1>
        <p className="text-neutral-400 text-sm font-mono">Email automation and outreach management</p>
      </div>

      {/* Email Templates Section */}
      <div className="border border-neutral-800 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-white">Email Templates</h2>
          <button
            onClick={() => setShowTemplateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-mono"
          >
            <Plus size={16} />
            <span>New Template</span>
          </button>
        </div>

        {showTemplateForm && (
          <div className="mb-8 p-6 border border-neutral-700 bg-neutral-950">
            <h3 className="text-lg font-medium text-white mb-4">Create New Template</h3>
            <form onSubmit={handleCreateTemplate} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-neutral-400 mb-2">Template Name</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-black border border-neutral-700 text-white text-sm font-mono focus:border-neutral-500 focus:outline-none"
                  placeholder="e.g., Tech Event Partnership"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-neutral-400 mb-2">Subject Line</label>
                <input
                  type="text"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 bg-black border border-neutral-700 text-white text-sm font-mono focus:border-neutral-500 focus:outline-none"
                  placeholder="e.g., Partnership Opportunity - {{eventName}}"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-neutral-400 mb-2">Email Body (HTML)</label>
                <textarea
                  value={newTemplate.html}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, html: e.target.value }))}
                  className="w-full px-3 py-2 bg-black border border-neutral-700 text-white text-sm font-mono focus:border-neutral-500 focus:outline-none h-32"
                  placeholder="Hello {{sponsorName}}, we would like to invite you..."
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={createTemplateMutation.isPending}
                  className="px-4 py-2 bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-mono disabled:opacity-50"
                >
                  {createTemplateMutation.isPending ? 'Creating...' : 'Create Template'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTemplateForm(false)}
                  className="px-4 py-2 border border-neutral-700 text-white hover:bg-neutral-900 transition-colors text-sm font-mono"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {emailTemplates.length > 0 ? (
            emailTemplates.map((template) => (
              <div key={template.id} className="border border-neutral-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{template.name}</h3>
                    <p className="text-neutral-400 text-sm font-mono">{template.subject}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-neutral-400 hover:text-white text-sm transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="text-neutral-400 hover:text-red-400 text-sm transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-neutral-500">
              No email templates found. Create your first template to get started.
            </div>
          )}
        </div>
      </div>

      {/* Bulk Email Section */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-xl font-medium text-white mb-8">Send Bulk Emails</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Select Template</h3>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-neutral-700 text-white text-sm font-mono focus:border-neutral-500 focus:outline-none"
            >
              <option value="">Choose a template...</option>
              {emailTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Uncontacted Sponsors</h3>
            <div className="text-sm font-mono text-neutral-400">
              {uncontactedSponsors.length} sponsors ready to contact
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSendBulkEmails}
            disabled={bulkEmailMutation.isPending || !selectedTemplateId}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-sm font-mono disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            <span>{bulkEmailMutation.isPending ? 'Sending...' : 'Send to All Uncontacted'}</span>
          </button>
        </div>
      </div>

      {/* Sponsors Overview */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-xl font-medium text-white mb-8">Sponsor Status Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-2">{sponsors.length}</div>
            <div className="text-neutral-400 text-sm font-mono">Total Sponsors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-2">{uncontactedSponsors.length}</div>
            <div className="text-neutral-400 text-sm font-mono">Not Contacted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-2">
              {sponsors.filter(s => s.status === 'Contacted').length}
            </div>
            <div className="text-neutral-400 text-sm font-mono">Contacted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-white mb-2">
              {sponsors.filter(s => s.status === 'Closed').length}
            </div>
            <div className="text-neutral-400 text-sm font-mono">Closed</div>
          </div>
        </div>
      </div>
    </div>
  );
};