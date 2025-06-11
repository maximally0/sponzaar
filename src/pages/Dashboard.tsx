import React from 'react';
import { Card, CardContent } from '../components/ui/card';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your sponsorship overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  stat.change.startsWith('+') ? 'text-green-400 bg-green-900' : 'text-red-400 bg-red-900'
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-muted-foreground">{activity.action}</p>
                    <p className="text-blue-400 text-sm">{activity.sponsor}</p>
                  </div>
                  <span className="text-muted-foreground text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Add New Sponsor
              </button>
              <button className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg transition-colors">
                Generate Report
              </button>
              <button className="w-full bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded-lg transition-colors">
                View All Deliverables
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
