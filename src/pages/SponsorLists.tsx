
import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const sponsorData = [
  {
    name: 'Microsoft',
    category: 'Hackathon',
    email: 'partnerships@microsoft.com',
    website: 'microsoft.com'
  },
  {
    name: 'Google',
    category: 'Hackathon',
    email: 'devrel@google.com',
    website: 'google.com'
  },
  {
    name: 'Red Bull',
    category: 'Cultural Fest',
    email: 'events@redbull.com',
    website: 'redbull.com'
  },
  {
    name: 'Coca Cola',
    category: 'Cultural Fest',
    email: 'marketing@coca-cola.com',
    website: 'coca-cola.com'
  },
  {
    name: 'Tata Foundation',
    category: 'NGO',
    email: 'grants@tata.com',
    website: 'tata.com'
  },
  {
    name: 'Infosys Foundation',
    category: 'NGO',
    email: 'foundation@infosys.com',
    website: 'infosys.com'
  },
];

const categories = ['All', 'Hackathon', 'Cultural Fest', 'NGO'];

export const SponsorLists = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSponsors = selectedCategory === 'All' 
    ? sponsorData 
    : sponsorData.filter(sponsor => sponsor.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-foreground mb-1 tracking-wide">Sponsor Lists</h1>
        <p className="text-muted-foreground text-sm font-light">Discover potential sponsors by event type</p>
      </div>

      <div className="flex space-x-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-sm font-light transition-colors border-b pb-1 ${
              selectedCategory === category
                ? 'text-foreground border-foreground'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Sponsor Name</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Category</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Contact Email</TableHead>
              <TableHead className="text-muted-foreground font-light text-xs uppercase tracking-wider">Website</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSponsors.map((sponsor, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0">
                <TableCell className="text-foreground font-light">{sponsor.name}</TableCell>
                <TableCell>
                  <span className="text-muted-foreground text-sm">
                    {sponsor.category}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{sponsor.email}</TableCell>
                <TableCell>
                  <a 
                    href={`https://${sponsor.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {sponsor.website}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
