
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Table, TableRow, TableCell } from '../components/ui/Table';

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
        <h1 className="text-3xl font-bold text-white mb-2">Sponsor Lists</h1>
        <p className="text-gray-400">Discover potential sponsors filtered by event type.</p>
      </div>

      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Card>
        <Table headers={['Sponsor Name', 'Category', 'Contact Email', 'Website']}>
          {filteredSponsors.map((sponsor, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="font-medium text-white">{sponsor.name}</div>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
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
        </Table>
      </Card>
    </div>
  );
};
