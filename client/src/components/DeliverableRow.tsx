
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiPatch } from '../lib/api';
import { useToast } from '../hooks/use-toast';

interface DeliverableRowProps {
  deliverable: {
    id: string;
    sponsorName: string;
    type: string;
    dueDate: string;
    status: string;
    notes: string;
  };
}

export const DeliverableRow = ({ deliverable }: DeliverableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: deliverable.status,
    dueDate: deliverable.dueDate
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updates: Partial<typeof editData>) => 
      apiPatch(`/api/deliverables/${deliverable.id}`, updates),
    onSuccess: () => {
      toast({ title: "Deliverable updated successfully" });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['/api/deliverables'] });
    },
    onError: () => {
      toast({ title: "Failed to update deliverable", variant: "destructive" });
    }
  });

  const handleSave = () => {
    updateMutation.mutate(editData);
  };

  const handleCancel = () => {
    setEditData({
      status: deliverable.status,
      dueDate: deliverable.dueDate
    });
    setIsEditing(false);
  };
  return (
    <tr className="border-b border-neutral-800 hover:bg-neutral-950">
      <td className="px-6 py-4 text-white font-medium">{deliverable.sponsorName}</td>
      <td className="px-6 py-4 text-neutral-400 text-sm">{deliverable.type}</td>
      <td className="px-6 py-4 text-neutral-500 text-sm font-mono">
        {isEditing ? (
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
            className="bg-neutral-900 border border-neutral-700 px-2 py-1 text-neutral-300 text-xs"
          />
        ) : (
          deliverable.dueDate
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <select
            value={editData.status}
            onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
            className="bg-neutral-900 border border-neutral-700 px-2 py-1 text-neutral-300 text-xs"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        ) : (
          <span className={`text-xs font-mono px-2 py-1 border ${
            deliverable.status === 'Done' 
              ? 'border-neutral-600 bg-neutral-800 text-neutral-300' 
              : 'border-neutral-700 bg-neutral-900 text-neutral-500'
          }`}>
            {deliverable.status}
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        <input 
          type="file" 
          className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2 file:border file:border-neutral-700 file:bg-transparent file:text-neutral-400"
        />
      </td>
      <td className="px-6 py-4 text-neutral-500 text-sm">
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
          <div className="flex items-center space-x-2">
            <span>{deliverable.notes}</span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-neutral-400 hover:text-neutral-300"
            >
              Edit
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
