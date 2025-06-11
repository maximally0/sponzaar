
import React from 'react';
import { Card } from '../components/ui/Card';

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-gray-400">Auto-generated sponsorship reports and analytics.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          Export as PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Amount Raised:</span>
              <span className="text-green-400 font-semibold text-xl">{reportData.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Number of Sponsors:</span>
              <span className="text-white font-semibold">{reportData.totalSponsors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average per Sponsor:</span>
              <span className="text-white font-semibold">₹19,583</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Tier-wise Breakdown</h2>
          <div className="space-y-3">
            {reportData.tierBreakdown.map((tier, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <div className="text-white font-medium">{tier.tier}</div>
                  <div className="text-gray-400 text-sm">{tier.count} sponsors</div>
                </div>
                <div className="text-blue-400 font-semibold">{tier.amount}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Monthly Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportData.monthlyProgress.map((month, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
              <div className="text-gray-400 text-sm">{month.month}</div>
              <div className="text-2xl font-bold text-white mt-1">{month.amount}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Report Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
            Generate Detailed Report
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors">
            Email Report to Team
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors">
            Schedule Auto Reports
          </button>
        </div>
      </Card>
    </div>
  );
};
