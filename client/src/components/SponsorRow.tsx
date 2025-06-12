
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
      <td className="px-6 py-4 text-neutral-400 text-sm">{sponsor.tier}</td>
      <td className="px-6 py-4">
        <span className="text-neutral-500 text-xs font-mono px-2 py-1 border border-neutral-700 bg-neutral-900">
          {sponsor.status}
        </span>
      </td>
      <td className="px-6 py-4 text-neutral-500 text-sm">{sponsor.notes}</td>
    </tr>
  );
};
