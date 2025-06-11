
import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';

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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-foreground mb-1 tracking-wide">Sponsor CRM</h1>
          <p className="text-muted-foreground text-sm font-light">Manage sponsor relationships</p>
        </div>
        <button className="text-foreground text-sm font-light hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
          Add Sponsor
        </button>
      </div>

      <div className="bg-card border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Sponsor Name</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Email</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Phone</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Tier</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Contacted</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsors.map((sponsor, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0">
                <TableCell className="text-foreground font-light">{sponsor.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{sponsor.email}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{sponsor.phone}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{sponsor.tier}</TableCell>
                <TableCell>
                  <input 
                    type="checkbox" 
                    checked={sponsor.contacted}
                    className="bg-transparent border-border"
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <span className="text-xs font-light text-muted-foreground">{sponsor.status}</span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{sponsor.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
