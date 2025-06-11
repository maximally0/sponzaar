
import React, { useState } from 'react';
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
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Sponsor Lists</h1>
        <p className="text-muted-foreground text-sm">Discover potential sponsors by event type</p>
      </div>

      <div className="flex space-x-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-sm transition-colors border-b pb-2 ${
              selectedCategory === category
                ? 'text-foreground border-foreground font-medium'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Sponsor Name</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Category</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Contact Email</TableHead>
              <TableHead className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-6 py-4">Website</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSponsors.map((sponsor, index) => (
              <TableRow key={index} className="border-b border-border last:border-b-0 hover:bg-accent/20">
                <TableCell className="text-foreground px-6 py-4">{sponsor.name}</TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-muted-foreground text-sm">
                    {sponsor.category}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm px-6 py-4">{sponsor.email}</TableCell>
                <TableCell className="px-6 py-4">
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
