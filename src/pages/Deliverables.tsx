
import React from 'react';
import { Card } from '../components/ui/Card';
import { Table, TableRow, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';

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

export const Deliverables = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Deliverables</h1>
          <p className="text-gray-400">Track and manage sponsor deliverables and commitments.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add Deliverable
        </button>
      </div>

      <Card>
        <Table headers={['Sponsor Name', 'Deliverable Type', 'Due Date', 'Status', 'Proof Upload', 'Notes']}>
          {deliverables.map((deliverable, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium text-white">{deliverable.sponsorName}</div>
              </TableCell>
              <TableCell>{deliverable.type}</TableCell>
              <TableCell>{deliverable.dueDate}</TableCell>
              <TableCell>
                <Badge variant={deliverable.status === 'Done' ? 'success' : 'warning'}>
                  {deliverable.status}
                </Badge>
              </TableCell>
              <TableCell>
                <input 
                  type="file" 
                  className="text-sm text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-700 file:text-gray-300"
                />
              </TableCell>
              <TableCell>{deliverable.notes}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
};
