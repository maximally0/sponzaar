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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Deliverables</h1>
          <p className="text-muted-foreground">Track and manage sponsor deliverables and commitments.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add Deliverable
        </button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sponsor Name</TableHead>
                <TableHead>Deliverable Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Proof Upload</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliverables.map((deliverable, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium text-foreground">{deliverable.sponsorName}</div>
                  </TableCell>
                  <TableCell>{deliverable.type}</TableCell>
                  <TableCell>{deliverable.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={deliverable.status === 'Done' ? 'default' : 'secondary'}>
                      {deliverable.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <input 
                      type="file" 
                      className="text-sm text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-muted file:text-foreground"
                    />
                  </TableCell>
                  <TableCell>{deliverable.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
