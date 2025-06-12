
import React, { useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPost } from '../lib/api';
import { useToast } from '../hooks/use-toast';

interface SponsorList {
  id: string;
  name: string;
  description: string;
  tags: string[];
  seller: string;
  price: string;
  count: number;
  imported: boolean;
}

export const SponsorLists = () => {
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    file: null as File | null
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: purchasedLists = [], isLoading } = useQuery({
    queryKey: ['/api/lists'],
    queryFn: () => apiGet<SponsorList[]>('/api/lists')
  });

  const importMutation = useMutation({
    mutationFn: (listId: string) => apiPost(`/api/lists/import`, { listId }),
    onSuccess: () => {
      toast({ title: "List imported successfully to CRM" });
      queryClient.invalidateQueries({ queryKey: ['/api/lists'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sponsors'] });
    },
    onError: () => {
      toast({ title: "Failed to import list", variant: "destructive" });
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiPost('/api/lists/upload', formData);
    },
    onSuccess: () => {
      toast({ title: "List uploaded successfully" });
      setUploadForm({ name: '', description: '', file: null });
      queryClient.invalidateQueries({ queryKey: ['/api/lists'] });
    },
    onError: () => {
      toast({ title: "Failed to upload list", variant: "destructive" });
    }
  });

  const handleImport = (listId: string) => {
    importMutation.mutate(listId);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.name) {
      toast({ title: "Please fill all fields and select a file", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append('name', uploadForm.name);
    formData.append('description', uploadForm.description);
    formData.append('file', uploadForm.file);
    
    uploadMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-neutral-800 animate-pulse rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-neutral-800 p-6 bg-black">
              <div className="space-y-4">
                <div className="h-6 bg-neutral-800 animate-pulse rounded"></div>
                <div className="h-4 bg-neutral-800 animate-pulse rounded"></div>
                <div className="h-10 bg-neutral-800 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Your Sponsor Lists</h1>
        <p className="text-neutral-400 text-sm font-mono">Manage and import your purchased sponsor lists</p>
      </div>

      {purchasedLists.length === 0 ? (
        <div className="border border-neutral-800 p-12 text-center">
          <h3 className="text-lg font-medium text-white mb-4">No Purchased Lists</h3>
          <p className="text-neutral-400 text-sm mb-6">
            You haven't purchased any sponsor lists yet. Browse the marketplace to find lists that match your needs.
          </p>
          <Link 
            to="/sponsor-marketplace"
            className="inline-block px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {purchasedLists.map((list) => (
            <div 
              key={list.id}
              className="border border-neutral-800 p-6 bg-black hover:border-neutral-700 transition-colors group"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {list.name}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {list.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {list.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs font-mono">Source</span>
                    <span className="text-neutral-300 text-xs">{list.seller}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs font-mono">Sponsors</span>
                    <span className="text-neutral-300 text-xs">{list.count} contacts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs font-mono">Purchased</span>
                    <span className="text-green-400 text-xs font-medium">✓ Owned</span>
                  </div>
                </div>

                <button
                  onClick={() => handleImport(list.id)}
                  disabled={list.imported || importMutation.isPending}
                  className="w-full px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {importMutation.isPending ? 'Importing...' : list.imported ? 'Already Imported' : 'Import to CRM'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-6">Upload Custom List</h2>
        <p className="text-neutral-400 text-sm mb-6">
          Have your own sponsor database? Upload it as a CSV file to add to your collection.
        </p>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-neutral-400 text-sm mb-3">List Name</label>
            <input 
              type="text" 
              value={uploadForm.name}
              onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="My Custom Sponsor List"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">Description</label>
            <input 
              type="text" 
              value={uploadForm.description}
              onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your list"
              className="w-full bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-neutral-400 text-sm mb-3">CSV File</label>
            <input 
              type="file" 
              accept=".csv"
              onChange={(e) => setUploadForm(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
              className="w-full text-neutral-400 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-700 file:bg-transparent file:text-neutral-400 file:hover:bg-neutral-950"
              required
            />
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              disabled={uploadMutation.isPending}
              className="px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadMutation.isPending ? 'Uploading...' : 'Upload List'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
