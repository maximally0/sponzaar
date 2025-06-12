
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { apiGet, apiPost } from '../lib/api';
import { useToast } from '../hooks/use-toast';

interface Tier {
  id: string;
  name: string;
  price: string;
  benefits: string[];
}

export const SponsorshipTiers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    benefits: ['']
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tiers = [], isLoading } = useQuery({
    queryKey: ['/api/tiers'],
    queryFn: () => apiGet<Tier[]>('/api/tiers')
  });

  const createTierMutation = useMutation({
    mutationFn: (tierData: Omit<Tier, 'id'>) => apiPost('/api/tiers', tierData),
    onSuccess: () => {
      toast({ title: "Tier created successfully" });
      setIsModalOpen(false);
      setFormData({ name: '', price: '', benefits: [''] });
      queryClient.invalidateQueries({ queryKey: ['/api/tiers'] });
    },
    onError: () => {
      toast({ title: "Failed to create tier", variant: "destructive" });
    }
  });

  const handleAddBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validBenefits = formData.benefits.filter(b => b.trim());
    if (!formData.name || !formData.price || validBenefits.length === 0) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    
    createTierMutation.mutate({
      name: formData.name,
      price: formData.price,
      benefits: validBenefits
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-border p-8">
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
            >
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

      {/* Add Tier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-background border border-border w-full max-w-md mx-4 p-8">
            <h2 className="text-xl font-medium text-foreground mb-6">Add New Tier</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-muted-foreground text-sm mb-2">Tier Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-background border border-border px-3 py-2 text-foreground text-sm focus:border-ring focus:outline-none"
                  placeholder="e.g., Silver, Gold, Platinum"
                />
              </div>

              <div>
                <label className="block text-muted-foreground text-sm mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                  className="w-full bg-background border border-border px-3 py-2 text-foreground text-sm focus:border-ring focus:outline-none"
                  placeholder="e.g., ₹5,000"
                />
              </div>

              <div>
                <label className="block text-muted-foreground text-sm mb-2">Benefits</label>
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      className="flex-1 bg-background border border-border px-3 py-2 text-foreground text-sm focus:border-ring focus:outline-none"
                      placeholder="Enter benefit"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(index)}
                        className="px-3 py-2 text-sm text-muted-foreground border border-border hover:bg-accent transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  + Add Benefit
                </button>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-muted-foreground border border-border bg-transparent hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTierMutation.isPending}
                  className="px-4 py-2 text-sm text-foreground border border-border bg-transparent hover:bg-accent transition-colors disabled:opacity-50"
                >
                  {createTierMutation.isPending ? 'Creating...' : 'Create Tier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
