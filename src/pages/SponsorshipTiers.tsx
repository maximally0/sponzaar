
import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const tiers = [
  {
    name: 'Silver',
    price: '₹5,000',
    benefits: ['Logo on website', 'Social media mention', 'Certificate of appreciation']
  },
  {
    name: 'Gold',
    price: '₹10,000',
    benefits: ['Logo on banners', 'Logo on website', 'Social media posts', 'Newsletter mention', 'Certificate']
  },
  {
    name: 'Title Sponsor',
    price: '₹20,000',
    benefits: ['Event naming rights', 'Prime logo placement', 'Speaking opportunity', 'Booth space', 'All Silver & Gold benefits']
  },
];

export const SponsorshipTiers = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-foreground mb-1 tracking-wide">Sponsorship Tiers</h1>
        <p className="text-muted-foreground text-sm font-light">Manage sponsorship packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <div key={index} className="bg-card border border-border p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground tracking-wide">{tier.name}</h3>
              <div className="text-2xl font-light text-foreground">{tier.price}</div>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="text-muted-foreground text-sm font-light">
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="w-full text-left py-2 text-sm text-foreground font-light hover:text-muted-foreground transition-colors border-t border-border">
                Edit Tier
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-light text-foreground tracking-wide">Tier Summary</h2>
            <button className="text-foreground text-sm font-light hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
              Add New Tier
            </button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Tier Name</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Price</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Benefits Count</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0">
                <TableCell className="text-foreground font-light">{tier.name}</TableCell>
                <TableCell className="text-foreground font-light">{tier.price}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{tier.benefits.length} benefits</TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <button className="text-muted-foreground hover:text-foreground text-sm font-light">Edit</button>
                    <button className="text-muted-foreground hover:text-foreground text-sm font-light">Delete</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
