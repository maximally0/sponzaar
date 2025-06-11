
import React from 'react';

const reportData = {
  totalAmount: '₹2,35,000',
  totalSponsors: 12,
  tierBreakdown: [
    { tier: 'Title Sponsor', count: 2, amount: '₹40,000' },
    { tier: 'Gold', count: 4, amount: '₹40,000' },
    { tier: 'Silver', count: 6, amount: '₹30,000' },
  ],
  monthlyProgress: [
    { month: 'January', amount: '₹45,000' },
    { month: 'February', amount: '₹78,000' },
    { month: 'March', amount: '₹112,000' },
  ]
};

export const Reports = () => {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-medium text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground text-sm">Sponsorship analytics</p>
        </div>
        <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
          Export as PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border border-border p-8">
          <h2 className="text-lg font-medium text-foreground mb-8">Summary</h2>
          <div className="space-y-6">
            <div className="flex justify-between border-b border-border pb-4">
              <span className="text-muted-foreground text-sm">Total Amount Raised</span>
              <span className="text-foreground font-light text-lg">{reportData.totalAmount}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-4">
              <span className="text-muted-foreground text-sm">Number of Sponsors</span>
              <span className="text-foreground font-light">{reportData.totalSponsors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Average per Sponsor</span>
              <span className="text-foreground font-light">₹19,583</span>
            </div>
          </div>
        </div>

        <div className="border border-border p-8">
          <h2 className="text-lg font-medium text-foreground mb-8">Tier-wise Breakdown</h2>
          <div className="space-y-6">
            {reportData.tierBreakdown.map((tier, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                <div>
                  <div className="text-foreground">{tier.tier}</div>
                  <div className="text-muted-foreground text-sm">{tier.count} sponsors</div>
                </div>
                <div className="text-foreground font-light">{tier.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="text-lg font-medium text-foreground mb-8">Monthly Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reportData.monthlyProgress.map((month, index) => (
            <div key={index} className="border border-border p-6">
              <div className="text-muted-foreground text-sm mb-2">{month.month}</div>
              <div className="text-xl font-light text-foreground">{month.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="text-lg font-medium text-foreground mb-8">Report Actions</h2>
        <div className="space-y-4">
          <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors border-b border-border">
            Generate Detailed Report
          </button>
          <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors border-b border-border">
            Email Report to Team
          </button>
          <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors">
            Schedule Auto Reports
          </button>
        </div>
      </div>
    </div>
  );
};
