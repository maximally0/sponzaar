
import React from 'react';
import { Card, CardContent } from '../components/ui/card';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your Sponzaar account and preferences.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Event Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">Event Name</label>
              <input 
                type="text" 
                defaultValue="TechFest 2024"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">Event Logo</label>
              <input 
                type="file" 
                className="w-full text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-muted file:text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Email Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">Sender Email</label>
              <input 
                type="email" 
                defaultValue="samplecollege@sponzaar.com"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">Email Signature</label>
              <textarea 
                rows={4}
                defaultValue="Best regards,&#10;TechFest 2024 Team&#10;Sample College"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Team Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-foreground font-medium">Team Invitations</h3>
                <p className="text-muted-foreground text-sm">Invite team members to collaborate</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Invite Member
              </button>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-foreground">john@samplecollege.edu</div>
                  <div className="text-muted-foreground text-sm">Admin</div>
                </div>
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-foreground font-medium">Dark Mode</h3>
                <p className="text-muted-foreground text-sm">Toggle dark/light theme</p>
              </div>
              <input type="checkbox" checked readOnly className="rounded" />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-foreground font-medium">Email Notifications</h3>
                <p className="text-muted-foreground text-sm">Receive updates via email</p>
              </div>
              <input type="checkbox" checked readOnly className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
          Save Changes
        </button>
        <button className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-lg transition-colors">
          Reset to Default
        </button>
      </div>
    </div>
  );
};
