import React from 'react';

const mockSponsorLists = [
  {
    id: 1,
    name: 'Hackathon Tech Sponsors',
    description: 'Curated list of technology companies that actively sponsor hackathons and coding competitions.',
    tags: ['Tech', 'Hackathon', 'Startups'],
    seller: 'TechEvent Pro',
    price: '₹2,500',
    count: 45
  },
  {
    id: 2,
    name: 'College Fest Corporate Sponsors',
    description: 'Major corporations with proven track record of sponsoring college cultural festivals.',
    tags: ['Corporate', 'College', 'Cultural'],
    seller: 'EventMaster',
    price: '₹3,200',
    count: 67
  },
  {
    id: 3,
    name: 'Sports Event Sponsors Database',
    description: 'Comprehensive list of brands and companies that sponsor sports events and tournaments.',
    tags: ['Sports', 'Tournament', 'Athletics'],
    seller: 'SportsBiz',
    price: '₹1,800',
    count: 38
  },
  {
    id: 4,
    name: 'Startup Community Sponsors',
    description: 'Emerging startups and scale-ups looking to sponsor tech events for brand visibility.',
    tags: ['Startup', 'Tech', 'Innovation'],
    seller: 'StartupConnect',
    price: 'Free',
    count: 23
  },
  {
    id: 5,
    name: 'Educational Institution Partners',
    description: 'Universities and educational organizations that sponsor academic conferences and seminars.',
    tags: ['Education', 'Academic', 'Research'],
    seller: 'EduPartners',
    price: '₹1,500',
    count: 31
  },
  {
    id: 6,
    name: 'Local Business Sponsors',
    description: 'Regional businesses and local enterprises interested in community event sponsorships.',
    tags: ['Local', 'Community', 'Regional'],
    seller: 'LocalBiz Hub',
    price: '₹900',
    count: 52
  }
];

export const SponsorListMarketplace = () => {
  const handlePreview = (listName: string) => {
    alert(`Preview functionality for "${listName}" would open here`);
  };

  const handleImport = (listName: string) => {
    alert(`Import functionality for "${listName}" would be triggered here`);
  };

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Sponsor List Marketplace</h1>
        <p className="text-neutral-400 text-sm font-mono">Browse and import curated sponsor lists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSponsorLists.map((list) => (
          <div 
            key={list.id}
            className="border border-neutral-800 p-6 bg-black hover:border-neutral-700 transition-colors group"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-neutral-200 transition-colors">
                  {list.name}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {list.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {list.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-xs font-mono">Seller</span>
                  <span className="text-neutral-300 text-xs">{list.seller}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-xs font-mono">Sponsors</span>
                  <span className="text-neutral-300 text-xs">{list.count} contacts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-xs font-mono">Price</span>
                  <span className="text-white text-sm font-medium">{list.price}</span>
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => handlePreview(list.name)}
                  className="flex-1 px-4 py-2 text-sm text-neutral-300 border border-neutral-800 bg-transparent hover:bg-neutral-950 hover:text-white transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleImport(list.name)}
                  className="flex-1 px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-neutral-800 p-8 text-center">
        <h3 className="text-lg font-medium text-white mb-4">Can't find what you're looking for?</h3>
        <p className="text-neutral-400 text-sm mb-6">
          Request a custom sponsor list or submit your own curated list to the marketplace.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors">
            Request Custom List
          </button>
          <button className="px-6 py-3 text-sm text-neutral-300 border border-neutral-800 bg-transparent hover:bg-neutral-950 hover:text-white transition-colors">
            Submit Your List
          </button>
        </div>
      </div>
    </div>
  );
};