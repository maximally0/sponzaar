import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface SponsorList {
  id: number;
  name: string;
  description: string;
  tags: string[];
  seller: string;
  price: string;
  count: number;
}

interface SponsorListContextType {
  allMarketplaceLists: SponsorList[];
  purchasedLists: SponsorList[];
  availableLists: SponsorList[];
  purchaseList: (listId: number) => void;
  importToCSM: (listId: number) => void;
}

const SponsorListContext = createContext<SponsorListContextType | undefined>(undefined);

const initialMarketplaceLists: SponsorList[] = [
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

export const SponsorListProvider = ({ children }: { children: ReactNode }) => {
  const [allMarketplaceLists] = useState<SponsorList[]>(initialMarketplaceLists);
  const [purchasedLists, setPurchasedLists] = useState<SponsorList[]>([]);

  const availableLists = allMarketplaceLists.filter(
    list => !purchasedLists.some(purchased => purchased.id === list.id)
  );

  const purchaseList = (listId: number) => {
    const listToPurchase = allMarketplaceLists.find(list => list.id === listId);
    if (listToPurchase && !purchasedLists.some(purchased => purchased.id === listId)) {
      setPurchasedLists(prev => [...prev, listToPurchase]);
      toast({
        title: "List added to your Sponsor Library!",
        description: `"${listToPurchase.name}" has been purchased successfully.`
      });
    }
  };

  const importToCSM = (listId: number) => {
    const listToImport = purchasedLists.find(list => list.id === listId);
    if (listToImport) {
      toast({
        title: "List imported to CRM!",
        description: `"${listToImport.name}" has been imported to your CRM system.`
      });
    }
  };

  return (
    <SponsorListContext.Provider value={{
      allMarketplaceLists,
      purchasedLists,
      availableLists,
      purchaseList,
      importToCSM
    }}>
      {children}
    </SponsorListContext.Provider>
  );
};

export const useSponsorListStore = () => {
  const context = useContext(SponsorListContext);
  if (context === undefined) {
    throw new Error('useSponsorListStore must be used within a SponsorListProvider');
  }
  return context;
};