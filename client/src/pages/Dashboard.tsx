import React from 'react';
import { Link } from 'wouter';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const stats = [
  { title: 'Total Sponsors Contacted', value: '48', description: 'Companies reached out to' },
  { title: 'Total Sponsors Closed', value: '15', description: 'Confirmed sponsorships' },
  { title: '₹ Amount Raised', value: '₹2,35,000', description: 'From closed sponsors' },
  { title: 'Deliverables Completed', value: '71%', description: '5 of 7 deliverables done', showProgress: true },
];

const quickLinks = [
  { title: 'Add New Sponsor', path: '/crm' },
  { title: 'Import Sponsor List', path: '/sponsor-lists' },
  { title: 'View Deliverables', path: '/deliverables' },
];

// Sample data for fundraising progress
const fundraisingData = [
  { day: 1, amount: 45000 },
  { day: 2, amount: 78000 },
  { day: 3, amount: 92000 },
  { day: 4, amount: 125000 },
  { day: 5, amount: 156000 },
  { day: 6, amount: 178000 },
  { day: 7, amount: 195000 },
  { day: 8, amount: 210000 },
  { day: 9, amount: 225000 },
  { day: 10, amount: 235000 },
];

// Pipeline stages data
const pipelineStages = [
  { name: 'Contacted', count: 12, color: 'bg-neutral-600' },
  { name: 'In Talks', count: 8, color: 'bg-neutral-500' },
  { name: 'Closed', count: 15, color: 'bg-white' },
  { name: 'Ghosted', count: 5, color: 'bg-neutral-700' },
];

// Recent sponsor logos (placeholder data)
const recentSponsors = [
  'Razorpay', 'Boat', 'Zomato', 'Swiggy', 'Paytm', 'CRED', 'Zerodha', 'Flipkart', 'Myntra'
];

// Activity feed data
const activityFeed = [
  '₹10K from Razorpay',
  'Deliverable sent to Boat',
  '₹25K from Zomato',
  'Logo delivered to Swiggy',
  '₹15K from Paytm',
  'Social post for CRED',
  '₹30K from Zerodha',
];

export const Dashboard = () => {
  const completionPercentage = 71; // 5 out of 7 deliverables done
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400 text-sm font-mono">Overview of sponsorship activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="border border-neutral-800 p-8 hover:border-neutral-700 transition-colors group">
            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-4 font-mono">{stat.title}</p>
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <p className="text-3xl font-light text-white mb-2 group-hover:text-neutral-200 transition-colors">{stat.value}</p>
                <p className="text-neutral-500 text-xs font-mono">{stat.description}</p>
              </div>
              
              {/* Progress Ring for Deliverables Completed */}
              {stat.showProgress && (
                <div className="relative w-12 h-12 ml-4">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-neutral-800"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="text-white"
                      strokeLinecap="square"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-neutral-400">{completionPercentage}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fundraising Progress Chart */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Fundraising Progress</h2>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fundraisingData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#525252' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#525252' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="white" 
                strokeWidth={1}
                dot={{ fill: 'white', strokeWidth: 0, r: 2 }}
                activeDot={{ r: 3, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CRM Pipeline */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">CRM Pipeline</h2>
        <div className="flex items-center space-x-4">
          {pipelineStages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div className="flex flex-col items-center space-y-3">
                <div className={`w-16 h-16 ${stage.color} flex items-center justify-center`}>
                  <span className={`text-lg font-mono ${stage.name === 'Closed' ? 'text-black' : 'text-white'}`}>
                    {stage.count}
                  </span>
                </div>
                <span className="text-xs text-neutral-400 font-mono text-center">{stage.name}</span>
              </div>
              {index < pipelineStages.length - 1 && (
                <div className="flex-1 h-px bg-neutral-700 min-w-8"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Recent Activity</h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-12">
            {[...activityFeed, ...activityFeed].map((activity, index) => (
              <span key={index} className="text-neutral-400 font-mono text-sm whitespace-nowrap">
                {activity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sponsors Logo Grid */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Recent Sponsors</h2>
        <div className="grid grid-cols-3 gap-6">
          {recentSponsors.map((sponsor, index) => (
            <div key={index} className="aspect-square border border-neutral-800 flex items-center justify-center bg-neutral-950">
              <span className="text-neutral-600 font-mono text-xs opacity-50">{sponsor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-lg font-medium text-white mb-8">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="px-6 py-4 text-white border border-neutral-700 bg-transparent hover:bg-neutral-950 transition-colors text-center font-mono text-sm"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
