import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { apiGet } from '@/lib/api';

interface Stats {
  totalSponsors: number;
  contacted: number;
  closed: number;
  ghosted: number;
  totalRaised: string;
}

interface Activity {
  type: string;
  sponsor: string;
  time: string;
}

const quickLinks = [
  { title: 'Add New Sponsor', path: '/crm' },
  { title: 'Import Sponsor List', path: '/sponsor-lists' },
  { title: 'Browse Marketplace', path: '/sponsor-marketplace' },
];

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const [statsData, activityData] = await Promise.all([
          apiGet<Stats>('/stats'),
          apiGet<Activity[]>('/activity')
        ]);
        
        setStats(statsData);
        setActivity(activityData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="text-neutral-400">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="text-red-400">Error loading dashboard: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  const pipelineStages = [
    { name: 'Contacted', count: stats?.contacted || 0, color: 'bg-neutral-600' },
    { name: 'In Talks', count: Math.floor((stats?.contacted || 0) * 0.6), color: 'bg-neutral-500' },
    { name: 'Closed', count: stats?.closed || 0, color: 'bg-white' },
    { name: 'Ghosted', count: stats?.ghosted || 0, color: 'bg-neutral-700' },
  ];

  const displayStats = [
    { title: 'Total Sponsors Contacted', value: stats?.contacted?.toString() || '0', description: 'Companies reached out to' },
    { title: 'Total Sponsors Closed', value: stats?.closed?.toString() || '0', description: 'Confirmed sponsorships' },
    { title: '₹ Amount Raised', value: stats?.totalRaised || '₹0', description: 'From closed sponsors' },
    { title: 'Total Sponsors', value: stats?.totalSponsors?.toString() || '0', description: 'In your database' },
  ];

  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-2xl font-medium text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400 text-sm font-mono">Overview of sponsorship activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayStats.map((stat, index) => (
          <div key={index} className="border border-neutral-800 p-8 hover:border-neutral-700 transition-colors group">
            <p className="text-neutral-400 text-xs uppercase tracking-wider mb-4 font-mono">{stat.title}</p>
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <p className="text-3xl font-light text-white mb-2 group-hover:text-neutral-200 transition-colors">{stat.value}</p>
                <p className="text-neutral-500 text-xs font-mono">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Visualization */}
        <div className="lg:col-span-2 border border-neutral-800 p-8">
          <h2 className="text-xl font-medium text-white mb-8">Sponsor Pipeline</h2>
          <div className="space-y-6">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-neutral-400 text-sm font-mono">{stage.name}</div>
                <div className="flex-1 h-8 bg-neutral-900 relative overflow-hidden">
                  <div 
                    className={`h-full ${stage.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min((stage.count / Math.max(stats?.totalSponsors || 1, 1)) * 100, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black font-medium text-sm mix-blend-difference">{stage.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border border-neutral-800 p-8">
          <h2 className="text-xl font-medium text-white mb-8">Quick Actions</h2>
          <div className="space-y-4">
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.path}>
                <a className="block p-4 border border-neutral-700 hover:border-neutral-600 transition-colors text-white hover:bg-neutral-950 text-sm font-mono">
                  {link.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="border border-neutral-800 p-8">
        <h2 className="text-xl font-medium text-white mb-8">Recent Activity</h2>
        {activity.length > 0 ? (
          <div className="space-y-4">
            {activity.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-neutral-900 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-neutral-300 text-sm font-mono">{item.sponsor}</span>
                </div>
                <span className="text-neutral-500 text-xs font-mono">{item.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-neutral-500">
            No recent activity. Start by adding sponsors or importing lists.
          </div>
        )}
      </div>
    </div>
  );
};