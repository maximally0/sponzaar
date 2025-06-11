
import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-foreground mb-1 tracking-wide">Deliverables</h1>
          <p className="text-muted-foreground text-sm font-light">Track sponsor commitments</p>
        </div>
        <button className="text-foreground text-sm font-light hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
          Add Deliverable
        </button>
      </div>

      <div className="bg-card border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Sponsor Name</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Deliverable Type</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Due Date</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Proof Upload</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverables.map((deliverable, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0">
                <TableCell className="text-foreground font-light">{deliverable.sponsorName}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{deliverable.type}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{deliverable.dueDate}</TableCell>
                <TableCell>
                  <span className={`text-xs font-light px-2 py-1 ${
                    deliverable.status === 'Done' ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {deliverable.status}
                  </span>
                </TableCell>
                <TableCell>
                  <input 
                    type="file" 
                    className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-transparent file:text-muted-foreground file:font-light"
                  />
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{deliverable.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
