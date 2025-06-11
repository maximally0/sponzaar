
import React from 'react';

interface DeliverableRowProps {
  deliverable: {
    sponsorName: string;
    type: string;
    dueDate: string;
    status: string;
    notes: string;
  };
}

export const DeliverableRow = ({ deliverable }: DeliverableRowProps) => {
  return (
    <tr className="border-b border-neutral-800 hover:bg-neutral-950">
      <td className="px-6 py-4 text-white font-medium">{deliverable.sponsorName}</td>
      <td className="px-6 py-4 text-neutral-400 text-sm">{deliverable.type}</td>
      <td className="px-6 py-4 text-neutral-500 text-sm font-mono">{deliverable.dueDate}</td>
      <td className="px-6 py-4">
        <span className={`text-xs font-mono px-2 py-1 border ${
          deliverable.status === 'Done' 
            ? 'border-neutral-600 bg-neutral-800 text-neutral-300' 
            : 'border-neutral-700 bg-neutral-900 text-neutral-500'
        }`}>
          {deliverable.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <input 
          type="file" 
          className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2 file:border file:border-neutral-700 file:bg-transparent file:text-neutral-400"
        />
      </td>
      <td className="px-6 py-4 text-neutral-500 text-sm">{deliverable.notes}</td>
    </tr>
  );
};
