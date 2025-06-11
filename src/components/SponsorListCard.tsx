
import React from 'react';

interface SponsorListCardProps {
  list: {
    name: string;
    description: string;
    tags: string[];
    seller: string;
    price: string;
    count: number;
  };
  onImport: () => void;
}

export const SponsorListCard = ({ list, onImport }: SponsorListCardProps) => {
  return (
    <div className="border border-neutral-800 p-6 hover:bg-neutral-950 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-medium mb-2">{list.name}</h3>
          <p className="text-neutral-400 text-sm mb-3">{list.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {list.tags.map((tag, index) => (
              <span key={index} className="text-xs font-mono px-2 py-1 border border-neutral-700 text-neutral-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-medium mb-1">{list.price}</div>
          <div className="text-neutral-500 text-xs font-mono">{list.count} sponsors</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-neutral-500 text-sm">by {list.seller}</span>
        <button
          onClick={onImport}
          className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
        >
          Import to CRM
        </button>
      </div>
    </div>
  );
};
