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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Sponsor Lists</h1>
        <p className="text-muted-foreground">Discover potential sponsors filtered by event type.</p>
      </div>

      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sponsor Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSponsors.map((sponsor, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium text-foreground">{sponsor.name}</div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm">
                      {sponsor.category}
                    </span>
                  </TableCell>
                  <TableCell>{sponsor.email}</TableCell>
                  <TableCell>
                    <a 
                      href={`https://${sponsor.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {sponsor.website}
                    </a>
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
