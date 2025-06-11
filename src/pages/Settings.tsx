
import React from 'react';

export const Settings = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground text-sm">Configure your account</p>
      </div>

      <div className="border border-border p-8">
        <h2 className="text-lg font-medium text-foreground mb-8">Event Configuration</h2>
        <div className="space-y-8">
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Event Name</label>
            <input 
              type="text" 
              defaultValue="TechFest 2024"
              className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Event Logo</label>
            <input 
              type="file" 
              className="w-full text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-transparent file:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="text-lg font-medium text-foreground mb-8">Email Configuration</h2>
        <div className="space-y-8">
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Sender Email</label>
            <input 
              type="email" 
              defaultValue="samplecollege@sponzaar.com"
              className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-muted-foreground text-xs uppercase tracking-wider mb-3">Email Signature</label>
            <textarea 
              rows={4}
              defaultValue="Best regards,&#10;TechFest 2024 Team&#10;Sample College"
              className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="text-lg font-medium text-foreground mb-8">Team Management</h2>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-foreground">Team Invitations</h3>
              <p className="text-muted-foreground text-sm">Invite team members to collaborate</p>
            </div>
            <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
              Invite Member
            </button>
          </div>
          
          <div className="border border-border p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-foreground">john@samplecollege.edu</div>
                <div className="text-muted-foreground text-sm">Admin</div>
              </div>
              <span className="text-muted-foreground text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="text-lg font-medium text-foreground mb-8">Account Settings</h2>
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-foreground">Dark Mode</h3>
              <p className="text-muted-foreground text-sm">Toggle dark/light theme</p>
            </div>
            <input type="checkbox" checked readOnly className="bg-transparent border-border" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-foreground">Email Notifications</h3>
              <p className="text-muted-foreground text-sm">Receive updates via email</p>
            </div>
            <input type="checkbox" checked readOnly className="bg-transparent border-border" />
          </div>
        </div>
      </div>

      <div className="flex space-x-6">
        <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
          Save Changes
        </button>
        <button className="border border-border px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
          Reset to Default
        </button>
      </div>
    </div>
  );
};
