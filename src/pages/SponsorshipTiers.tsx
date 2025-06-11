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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sponsorship Tiers</h1>
        <p className="text-muted-foreground">Manage sponsorship packages and their benefits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <Card key={index} className="relative">
            {tier.name === 'Title Sponsor' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-4">{tier.price}</div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-muted-foreground text-sm">
                      ✓ {benefit}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Edit Tier
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">Tier Summary</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              Add New Tier
            </button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tier Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Benefits Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((tier, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium text-foreground">{tier.name}</div>
                  </TableCell>
                  <TableCell className="text-blue-400 font-semibold">{tier.price}</TableCell>
                  <TableCell>{tier.benefits.length} benefits</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
