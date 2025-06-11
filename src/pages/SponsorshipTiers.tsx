
import React from 'react';
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
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Sponsorship Tiers</h1>
        <p className="text-muted-foreground text-sm">Manage sponsorship packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div key={index} className="border border-border p-8">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">{tier.name}</h3>
              <div className="text-2xl font-light text-foreground">{tier.price}</div>
              <ul className="space-y-3">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="text-muted-foreground text-sm">
                    {benefit}
                  </li>
                ))}
              </ul>
              <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors border-t border-border">
                Edit Tier
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-border">
        <div className="p-8 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-foreground">Tier Summary</h2>
            <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
              Add New Tier
            </button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Tier Name</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Price</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Benefits Count</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tiers.map((tier, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0 hover:bg-accent/20">
                <TableCell className="text-foreground px-6 py-4">{tier.name}</TableCell>
                <TableCell className="text-foreground px-6 py-4">{tier.price}</TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{tier.benefits.length} benefits</TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex space-x-4">
                    <button className="text-muted-foreground hover:text-foreground text-sm">Edit</button>
                    <button className="text-muted-foreground hover:text-foreground text-sm">Delete</button>
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
