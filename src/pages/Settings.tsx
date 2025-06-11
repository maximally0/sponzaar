
import React from 'react';
import { Card, CardContent } from '../components/ui/card';

export const Settings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-foreground mb-1 tracking-wide">Settings</h1>
        <p className="text-muted-foreground text-sm font-light">Configure your account</p>
      </div>

      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-light text-foreground mb-6 tracking-wide">Event Configuration</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Event Name</label>
            <input 
              type="text" 
              defaultValue="TechFest 2024"
              className="w-full bg-background border border-border px-4 py-3 text-foreground font-light focus:outline-none focus:border-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Event Logo</label>
            <input 
              type="file" 
              className="w-full text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-transparent file:text-muted-foreground file:font-light"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-light text-foreground mb-6 tracking-wide">Email Configuration</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Sender Email</label>
            <input 
              type="email" 
              defaultValue="samplecollege@sponzaar.com"
              className="w-full bg-background border border-border px-4 py-3 text-foreground font-light focus:outline-none focus:border-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Email Signature</label>
            <textarea 
              rows={4}
              defaultValue="Best regards,&#10;TechFest 2024 Team&#10;Sample College"
              className="w-full bg-background border border-border px-4 py-3 text-foreground font-light focus:outline-none focus:border-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-light text-foreground mb-6 tracking-wide">Team Management</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-foreground font-light">Team Invitations</h3>
              <p className="text-muted-foreground text-sm">Invite team members to collaborate</p>
            </div>
            <button className="text-foreground text-sm font-light hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
              Invite Member
            </button>
          </div>
          
          <div className="bg-muted border border-border p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-foreground font-light">john@samplecollege.edu</div>
                <div className="text-muted-foreground text-sm">Admin</div>
              </div>
              <span className="text-muted-foreground text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border p-6">
        <h2 className="text-lg font-light text-foreground mb-6 tracking-wide">Account Settings</h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-foreground font-light">Dark Mode</h3>
              <p className="text-muted-foreground text-sm">Toggle dark/light theme</p>
            </div>
            <input type="checkbox" checked readOnly className="bg-transparent border-border" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-foreground font-light">Email Notifications</h3>
              <p className="text-muted-foreground text-sm">Receive updates via email</p>
            </div>
            <input type="checkbox" checked readOnly className="bg-transparent border-border" />
          </div>
        </div>
      </div>

      <div className="flex space-x-6">
        <button className="text-foreground text-sm font-light hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
          Save Changes
        </button>
        <button className="text-foreground text-sm font-light hover:text-muted-foreground transition-colors border-b border-transparent hover:border-muted-foreground">
          Reset to Default
        </button>
      </div>
    </div>
  );
};
