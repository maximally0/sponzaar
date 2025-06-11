
import React, { useState } from 'react';

interface Tier {
  name: string;
  price: string;
  benefits: string[];
}

interface TierEditorProps {
  tiers: Tier[];
  onTiersChange: (tiers: Tier[]) => void;
}

export const TierEditor = ({ tiers, onTiersChange }: TierEditorProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addTier = () => {
    const newTier = { name: '', price: '', benefits: [''] };
    onTiersChange([...tiers, newTier]);
    setEditingIndex(tiers.length);
  };

  const updateTier = (index: number, field: keyof Tier, value: any) => {
    const updatedTiers = [...tiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    onTiersChange(updatedTiers);
  };

  const deleteTier = (index: number) => {
    const updatedTiers = tiers.filter((_, i) => i !== index);
    onTiersChange(updatedTiers);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Sponsorship Tiers</h3>
        <button
          onClick={addTier}
          className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
        >
          Add Tier
        </button>
      </div>

      <div className="border border-neutral-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Benefits</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, index) => (
              <tr key={index} className="border-b border-neutral-800">
                <td className="px-6 py-4">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => updateTier(index, 'name', e.target.value)}
                      className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                    />
                  ) : (
                    <span className="text-white font-medium">{tier.name}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={tier.price}
                      onChange={(e) => updateTier(index, 'price', e.target.value)}
                      className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                    />
                  ) : (
                    <span className="text-neutral-400 text-sm">{tier.price}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingIndex === index ? (
                    <textarea
                      value={tier.benefits.join('\n')}
                      onChange={(e) => updateTier(index, 'benefits', e.target.value.split('\n'))}
                      className="w-full bg-black border border-neutral-700 px-3 py-2 text-white text-sm"
                      rows={3}
                    />
                  ) : (
                    <span className="text-neutral-500 text-sm">{tier.benefits.length} benefits</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    {editingIndex === index ? (
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="text-neutral-400 hover:text-white text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingIndex(index)}
                        className="text-neutral-400 hover:text-white text-sm"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => deleteTier(index)}
                      className="text-neutral-400 hover:text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
