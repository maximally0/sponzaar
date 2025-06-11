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
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Closed': return 'default';
      case 'In Talks': return 'secondary';
      case 'Contacted': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sponsor CRM</h1>
          <p className="text-muted-foreground">Manage your sponsor relationships and communications.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Add Sponsor
        </button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sponsor Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Contacted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsors.map((sponsor, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium text-foreground">{sponsor.name}</div>
                  </TableCell>
                  <TableCell>{sponsor.email}</TableCell>
                  <TableCell>{sponsor.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{sponsor.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      checked={sponsor.contacted}
                      className="rounded bg-muted border-border"
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(sponsor.status)}>
                      {sponsor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sponsor.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
