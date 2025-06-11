
import React from 'react';

const stats = [
  { title: 'Total Funds Raised', value: '₹2,35,000', change: '+12%' },
  { title: 'Sponsors Contacted', value: '48', change: '+8%' },
  { title: 'Deals Closed', value: '12', change: '+25%' },
  { title: 'Deliverables Due', value: '7', change: '-3%' },
];

const recentActivity = [
  { action: 'New sponsor added', sponsor: 'TechCorp Solutions', time: '2 hours ago' },
  { action: 'Deliverable completed', sponsor: 'CodeCafe', time: '4 hours ago' },
  { action: 'Payment received', sponsor: 'InnovateHub', time: '1 day ago' },
  { action: 'Proposal sent', sponsor: 'StartupForge', time: '2 days ago' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of sponsorship activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-3">
            <p className="text-muted-foreground text-xs uppercase tracking-wider">{stat.title}</p>
            <p className="text-2xl font-light text-foreground">{stat.value}</p>
            <p className="text-muted-foreground text-xs font-mono">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="border border-border p-8">
          <h2 className="text-lg font-medium text-foreground mb-8">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-start py-3 border-b border-border last:border-b-0">
                <div className="space-y-1">
                  <p className="text-sm text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.sponsor}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border p-8">
          <h2 className="text-lg font-medium text-foreground mb-8">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors border-b border-border">
              Add New Sponsor
            </button>
            <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors border-b border-border">
              Generate Report
            </button>
            <button className="w-full text-left py-3 text-sm text-foreground hover:text-muted-foreground transition-colors">
              View All Deliverables
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
