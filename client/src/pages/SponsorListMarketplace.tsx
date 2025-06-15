
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { apiGet, apiPost } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

// Backend provides id, title, price, tags, sponsors (array), not name/description/seller/count
interface MarketplaceList {
  id: string;
  title: string;
  price: string;
  tags: string[];
  sponsors: Array<{
    name: string;
    email: string;
    type: string;
    location: string;
  }>;
}

export const SponsorListMarketplace = () => {
  const [marketplaceLists, setMarketplaceLists] = useState<MarketplaceList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importingList, setImportingList] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiGet<MarketplaceList[]>('/marketplace');
        setMarketplaceLists(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketplaceData();
  }, []);

  const handlePreview = (listTitle: string) => {
    alert(`Preview functionality for "${listTitle}" would open here`);
  };

  const handleImport = async (list: MarketplaceList) => {
    setImportingList(list.id);

    try {
      await apiPost('/lists/import', {
        sponsors: list.sponsors
      });

      toast({
        title: "List imported successfully",
        description: `${list.sponsors.length} sponsors imported from "${list.title}"`
      });
    } catch (err: any) {
      toast({
        title: "Import failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setImportingList(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-16">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Sponsor List Marketplace</h1>
          <p className="text-neutral-400 text-sm font-mono">Loading marketplace lists...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-16">
        <div>
          <h1 className="text-2xl font-medium text-white mb-2">Sponsor List Marketplace</h1>
          <p className="text-red-400 text-sm">Error loading marketplace: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Sponsor List Marketplace</h1>
        <p className="text-neutral-400 text-sm font-mono">Browse and import curated sponsor lists</p>
      </div>

      {marketplaceLists.length === 0 ? (
        <div className="border border-neutral-800 p-12 text-center">
          <h3 className="text-lg font-medium text-white mb-4">No Lists Available</h3>
          <p className="text-neutral-400 text-sm mb-6">
            No sponsor lists are currently available in the marketplace. Check back later for new additions.
          </p>
          <Link 
            to="/crm"
            className="inline-block px-6 py-3 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
          >
            Add Sponsors Manually
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketplaceLists.map((list) => (
            <div 
              key={list.id}
              className="border border-neutral-800 p-6 bg-black hover:border-neutral-700 transition-colors group"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {list.title}
                  </h3>
                  {/* Description is not provided by backend, so omitted */}
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
                    <span className="text-neutral-500 text-xs font-mono">Sponsors</span>
                    <span className="text-neutral-300 text-xs">{list.sponsors.length} contacts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs font-mono">Price</span>
                    <span className="text-white text-sm font-medium">{list.price}</span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => handlePreview(list.title)}
                    className="flex-1 px-4 py-2 text-sm text-neutral-300 border border-neutral-800 bg-transparent hover:bg-neutral-950 hover:text-white transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleImport(list)}
                    disabled={importingList === list.id}
                    className="flex-1 px-4 py-2 text-sm text-white border border-neutral-700 bg-transparent hover:bg-neutral-900 transition-colors"
                  >
                    {importingList === list.id ? "Importing..." : "Import to CRM"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
