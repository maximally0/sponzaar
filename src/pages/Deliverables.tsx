
import React from 'react';
import { DeliverableRow } from '../components/DeliverableRow';

const deliverables = [
  {
    sponsorName: 'TechCorp Solutions',
    type: 'Logo on Banner',
    dueDate: '2024-06-15',
    status: 'Done',
    notes: 'Banner displayed at main stage'
  },
  {
    sponsorName: 'CodeCafe',
    type: 'Social Media Post',
    dueDate: '2024-06-12',
    status: 'Pending',
    notes: 'Instagram post scheduled'
  },
  {
    sponsorName: 'InnovateHub',
    type: 'Website Logo',
    dueDate: '2024-06-10',
    status: 'Done',
    notes: 'Logo added to sponsors page'
  },
  {
    sponsorName: 'StartupForge',
    type: 'Email Newsletter',
    dueDate: '2024-06-18',
    status: 'Pending',
    notes: 'Newsletter draft ready'
  },
];

const dueSoon = deliverables.filter(d => d.status === 'Pending').slice(0, 2);

export const Deliverables = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Deliverables</h1>
          <p className="text-neutral-400 text-sm">Track sponsor commitments</p>
        </div>
        <button className="px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors">
          Add Deliverable
        </button>
      </div>

      {dueSoon.length > 0 && (
        <div className="border border-neutral-800 p-6">
          <h2 className="text-lg font-medium text-white mb-4">Due This Week</h2>
          <div className="space-y-2">
            {dueSoon.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-800 last:border-b-0">
                <div>
                  <span className="text-white font-medium">{item.sponsorName}</span>
                  <span className="text-neutral-400 ml-2">— {item.type}</span>
                </div>
                <span className="text-neutral-500 text-sm font-mono">{item.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border border-neutral-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Sponsor</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Deliverable</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Due Date</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Proof</th>
              <th className="text-left px-6 py-4 text-neutral-400 text-xs font-medium uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {deliverables.map((deliverable, index) => (
              <DeliverableRow key={index} deliverable={deliverable} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
