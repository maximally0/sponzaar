
import React from 'react';

interface SponsorRowProps {
  sponsor: {
    name: string;
    email: string;
    tier: string;
    status: string;
    notes: string;
  };
}

export const SponsorRow = ({ sponsor }: SponsorRowProps) => {
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
