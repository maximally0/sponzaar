
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPatch, apiDelete } from '../lib/api';
import { useToast } from '../hooks/use-toast';

interface SponsorRowProps {
  sponsor: {
    id: string;
    name: string;
    email: string;
    tier: string;
    status: string;
    notes: string;
  };
}

export const SponsorRow = ({ sponsor }: SponsorRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: sponsor.status,
    tier: sponsor.tier,
    notes: sponsor.notes
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updates: Partial<typeof editData>) => 
      apiPatch(`/sponsors/${sponsor.id}`, updates),
    onSuccess: () => {
      toast({ title: "Sponsor updated successfully" });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['/api/sponsors'] });
    },
    onError: () => {
      toast({ title: "Failed to update sponsor", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiDelete(`/sponsors/${sponsor.id}`),
    onSuccess: () => {
      toast({ title: "Sponsor deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/sponsors'] });
    },
    onError: () => {
      toast({ title: "Failed to delete sponsor", variant: "destructive" });
    }
  });

  const handleSave = () => {
    updateMutation.mutate(editData);
  };

  const handleCancel = () => {
    setEditData({
      status: sponsor.status,
      tier: sponsor.tier,
      notes: sponsor.notes
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${sponsor.name}?`)) {
      deleteMutation.mutate();
    }
  };
  return (
    <tr className="border-b border-neutral-800 hover:bg-neutral-950">
      <td className="px-6 py-4 text-white font-medium">{sponsor.name}</td>
      <td className="px-6 py-4 text-neutral-400 text-sm font-mono">{sponsor.email}</td>
      <td className="px-6 py-4 text-neutral-400 text-sm">
        {isEditing ? (
          <select
            value={editData.tier}
            onChange={(e) => setEditData(prev => ({ ...prev, tier: e.target.value }))}
            className="bg-neutral-900 border border-neutral-700 px-2 py-1 text-neutral-300 text-xs"
          >
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        ) : (
          sponsor.tier
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <select
            value={editData.status}
            onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
            className="bg-neutral-900 border border-neutral-700 px-2 py-1 text-neutral-300 text-xs"
          >
            <option value="Not Contacted">Not Contacted</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Closed">Closed</option>
            <option value="Ghosted">Ghosted</option>
          </select>
        ) : (
          <span className="text-neutral-500 text-xs font-mono px-2 py-1 border border-neutral-700 bg-neutral-900">
            {sponsor.status}
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-neutral-500 text-sm">
        {isEditing ? (
          <input
            type="text"
            value={editData.notes}
            onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
            className="bg-neutral-900 border border-neutral-700 px-2 py-1 text-neutral-300 text-xs w-full"
            placeholder="Add notes..."
          />
        ) : (
          sponsor.notes || '-'
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="text-xs text-green-400 hover:text-green-300 disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="text-xs text-neutral-400 hover:text-neutral-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
