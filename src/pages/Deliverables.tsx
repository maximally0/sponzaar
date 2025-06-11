
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

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
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-2">Deliverables</h1>
          <p className="text-muted-foreground text-sm">Track sponsor commitments</p>
        </div>
        <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
          Add Deliverable
        </button>
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Sponsor Name</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Deliverable Type</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Due Date</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Status</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Proof Upload</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverables.map((deliverable, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0 hover:bg-accent/20">
                <TableCell className="text-foreground px-6 py-4">{deliverable.sponsorName}</TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{deliverable.type}</TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{deliverable.dueDate}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`text-xs ${
                    deliverable.status === 'Done' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {deliverable.status}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <input 
                    type="file" 
                    className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-transparent file:text-muted-foreground"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{deliverable.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
