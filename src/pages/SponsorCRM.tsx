
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const sponsors = [
  {
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '+91 9876543210',
    tier: '₹20K',
    contacted: true,
    status: 'Closed',
    notes: 'Title sponsor confirmed'
  },
  {
    name: 'CodeCafe',
    email: 'hello@codecafe.in',
    phone: '+91 9876543211',
    tier: '₹10K',
    contacted: true,
    status: 'In Talks',
    notes: 'Negotiating benefits'
  },
  {
    name: 'StartupForge',
    email: 'partnerships@startupforge.com',
    phone: '+91 9876543212',
    tier: '₹5K',
    contacted: false,
    status: 'Contacted',
    notes: 'Initial email sent'
  },
  {
    name: 'InnovateHub',
    email: 'sponsor@innovatehub.io',
    phone: '+91 9876543213',
    tier: '₹10K',
    contacted: true,
    status: 'Closed',
    notes: 'Payment received'
  },
];

export const SponsorCRM = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-2">Sponsor CRM</h1>
          <p className="text-muted-foreground text-sm">Manage sponsor relationships</p>
        </div>
        <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
          Add Sponsor
        </button>
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Sponsor Name</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Email</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Phone</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Tier</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Contacted</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Status</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsors.map((sponsor, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0 hover:bg-accent/20">
                <TableCell className="text-foreground px-6 py-4">{sponsor.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{sponsor.email}</TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{sponsor.phone}</TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{sponsor.tier}</TableCell>
                <TableCell className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={sponsor.contacted}
                    className="bg-transparent border-border"
                    readOnly
                  />
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-xs text-muted-foreground">{sponsor.status}</span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{sponsor.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
