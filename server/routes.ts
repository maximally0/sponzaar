import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sgMail from "@sendgrid/mail";

// In-memory storage for deliverables and other data
const deliverables: any[] = [];
const sponsors: any[] = [];
const tiers: any[] = [];
const settings = {
  templates: [] as any[],
  email: {
    senderEmail: "samplecollege@sponzaar.com",
    replyTo: "team@sponzaar.com",
    orgName: "Sample College Hackathon"
  }
};

// Mock marketplace data
const marketplaceLists = [
  {
    id: "list-1",
    title: "Top D2C Brands - Jan 2024",
    price: "Free",
    tags: ["consumer", "ecommerce"],
    sponsors: [
      { name: "Zomato", email: "partnerships@zomato.com", type: "Food Tech", location: "Gurugram" },
      { name: "Razorpay", email: "sponsorships@razorpay.com", type: "Fintech", location: "Bangalore" },
      { name: "Mamaearth", email: "marketing@mamaearth.in", type: "D2C Beauty", location: "Gurugram" }
    ]
  },
  {
    id: "list-2", 
    title: "Tech Startups - Mumbai",
    price: "₹999",
    tags: ["tech", "startup", "mumbai"],
    sponsors: [
      { name: "PhonePe", email: "partnerships@phonepe.com", type: "Fintech", location: "Mumbai" },
      { name: "Dunzo", email: "business@dunzo.com", type: "Delivery", location: "Mumbai" },
      { name: "Dream11", email: "sponsorships@dream11.com", type: "Gaming", location: "Mumbai" }
    ]
  },
  {
    id: "list-3",
    title: "SaaS Companies - Global",
    price: "₹1499", 
    tags: ["saas", "b2b", "global"],
    sponsors: [
      { name: "Freshworks", email: "partnerships@freshworks.com", type: "SaaS", location: "Chennai" },
      { name: "Zoho", email: "sponsorships@zoho.com", type: "SaaS", location: "Chennai" },
      { name: "Chargebee", email: "marketing@chargebee.com", type: "SaaS", location: "Chennai" }
    ]
  }
];

// Activity log - dynamic data will be added here
const activityLog = [
  { title: "Email sent to Zomato", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { title: "Added Razorpay as sponsor", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { title: "Created Gold Sponsor tier", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { title: "Imported Tech Startups list", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
];

// Initialize SendGrid when API key is available
function initializeSendGrid() {
  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return true;
  }
  return false;
}

const sendGridEnabled = initializeSendGrid();
if (!sendGridEnabled) {
  console.log("SendGrid API key not configured. Email functionality will simulate sending for now.");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Deliverables routes
  
  // GET /api/deliverables - Returns all deliverables
  app.get('/api/deliverables', (req, res) => {
    try {
      res.json(deliverables);
    } catch (error) {
      console.error('Error fetching deliverables:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/deliverables - Creates new deliverable
  app.post('/api/deliverables', (req, res) => {
    try {
      const { id, sponsorId, title, dueDate, status } = req.body;
      
      if (!id || !sponsorId || !title || !dueDate) {
        return res.status(400).json({ error: 'id, sponsorId, title, and dueDate are required' });
      }

      const newDeliverable = {
        id,
        sponsorId,
        title,
        dueDate,
        status: status || 'pending',
        createdAt: new Date().toISOString()
      };

      deliverables.push(newDeliverable);
      res.status(201).json(newDeliverable);
    } catch (error) {
      console.error('Error creating deliverable:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /api/sponsors/:id/deliverables - Returns deliverables for specific sponsor
  app.get('/api/sponsors/:id/deliverables', (req, res) => {
    try {
      const { id } = req.params;
      const sponsorDeliverables = deliverables.filter(deliverable => deliverable.sponsorId === id);
      res.json(sponsorDeliverables);
    } catch (error) {
      console.error('Error fetching sponsor deliverables:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PATCH /api/deliverables/:id - Updates deliverable status or dueDate
  app.patch('/api/deliverables/:id', (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const deliverableIndex = deliverables.findIndex(deliverable => deliverable.id === id);
      
      if (deliverableIndex === -1) {
        return res.status(404).json({ error: 'Deliverable not found' });
      }

      // Update the deliverable with new data
      deliverables[deliverableIndex] = {
        ...deliverables[deliverableIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      res.json(deliverables[deliverableIndex]);
    } catch (error) {
      console.error('Error updating deliverable:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Email routes
  
  // POST /api/send-email - Send email using SendGrid
  app.post('/api/send-email', async (req, res) => {
    try {
      const { to, subject, html, from } = req.body;
      
      if (!to || !subject || !html) {
        return res.status(400).json({ error: 'to, subject, and html are required' });
      }

      const msg = {
        to,
        from: from || 'noreply@sponzaar.com',
        subject,
        html
      };

      // Check if SendGrid is configured
      if (!sendGridEnabled) {
        console.log(`[SIMULATED EMAIL] To: ${to}, Subject: ${subject}`);
        return res.json({ 
          success: true, 
          message: 'Email simulated successfully (SendGrid API key not configured)',
          simulated: true,
          emailData: msg
        });
      }

      // Try to send with SendGrid
      await sgMail.send(msg);
      res.json({ success: true, message: 'Email sent successfully via SendGrid' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      let errorMessage = 'Failed to send email';
      if (error.code === 403) {
        errorMessage = 'Sender email not verified with SendGrid. Please verify your sender email address in SendGrid dashboard.';
      } else if (error.code === 401) {
        errorMessage = 'Invalid SendGrid API key';
      }
      
      res.status(500).json({ 
        error: errorMessage, 
        details: error.message,
        sendgridError: error.response?.body?.errors || null
      });
    }
  });

  // Template management routes
  
  // GET /api/templates - Get all email templates
  app.get('/api/templates', (req, res) => {
    try {
      res.json(settings.templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/templates - Create new email template
  app.post('/api/templates', (req, res) => {
    try {
      const { id, name, subject, html } = req.body;
      
      if (!id || !name || !subject || !html) {
        return res.status(400).json({ error: 'id, name, subject, and html are required' });
      }

      const newTemplate = {
        id,
        name,
        subject,
        html,
        createdAt: new Date().toISOString()
      };

      settings.templates.push(newTemplate);
      res.status(201).json(newTemplate);
    } catch (error) {
      console.error('Error creating template:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Sponsor management routes
  
  // GET /api/sponsors - Get all sponsors
  app.get('/api/sponsors', (req, res) => {
    try {
      res.json(sponsors);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/sponsors - Create new sponsor
  app.post('/api/sponsors', (req, res) => {
    try {
      const { id, name, email, status, tier, notes } = req.body;
      
      if (!id || !name || !email) {
        return res.status(400).json({ error: 'id, name, and email are required' });
      }

      const newSponsor = {
        id,
        name,
        email,
        status: status || 'Not Contacted',
        tier: tier || 'bronze',
        notes: notes || '',
        createdAt: new Date().toISOString()
      };

      sponsors.push(newSponsor);
      res.status(201).json(newSponsor);
    } catch (error) {
      console.error('Error creating sponsor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PATCH /api/sponsors/:id - Update sponsor fields
  app.patch('/api/sponsors/:id', (req, res) => {
    try {
      const sponsorId = req.params.id;
      const updates = req.body;
      
      if (!sponsorId) {
        return res.status(400).json({ error: 'Sponsor ID is required' });
      }

      // Find the sponsor in the array
      const sponsorIndex = sponsors.findIndex(sponsor => sponsor.id === sponsorId);
      
      if (sponsorIndex === -1) {
        return res.status(404).json({ error: 'Sponsor not found' });
      }

      // Update the sponsor with provided fields
      const updatedSponsor = {
        ...sponsors[sponsorIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      sponsors[sponsorIndex] = updatedSponsor;
      res.json(updatedSponsor);
    } catch (error) {
      console.error('Error updating sponsor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // DELETE /api/sponsors/:id - Delete sponsor
  app.delete('/api/sponsors/:id', (req, res) => {
    try {
      const sponsorId = req.params.id;
      
      if (!sponsorId) {
        return res.status(400).json({ error: 'Sponsor ID is required' });
      }

      // Find the sponsor index
      const sponsorIndex = sponsors.findIndex(sponsor => sponsor.id === sponsorId);
      
      if (sponsorIndex === -1) {
        return res.status(404).json({ error: 'Sponsor not found' });
      }

      // Remove the sponsor from the array
      const deletedSponsor = sponsors.splice(sponsorIndex, 1)[0];
      
      res.json({ 
        success: true, 
        message: 'Sponsor deleted successfully', 
        deletedSponsor 
      });
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/send-to-uncontacted - Send emails to all uncontacted sponsors
  app.post('/api/send-to-uncontacted', async (req, res) => {
    try {
      const { templateId, sender } = req.body;
      
      if (!templateId || !sender) {
        return res.status(400).json({ error: 'templateId and sender are required' });
      }

      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ error: 'SendGrid API key not configured' });
      }

      // Find the template
      const template = settings.templates.find(t => t.id === templateId);
      if (!template) {
        return res.status(404).json({ error: 'Template not found' });
      }

      // Get uncontacted sponsors
      const uncontactedSponsors = sponsors.filter(sponsor => sponsor.status === 'Not Contacted');
      
      if (uncontactedSponsors.length === 0) {
        return res.json({ success: true, emailsSent: 0, message: 'No uncontacted sponsors found' });
      }

      let emailsSent = 0;
      const errors = [];

      // Send emails to each uncontacted sponsor
      for (const sponsor of uncontactedSponsors) {
        try {
          const msg = {
            to: sponsor.email,
            from: sender,
            subject: template.subject,
            html: template.html.replace(/{{name}}/g, sponsor.name) // Basic template replacement
          };

          await sgMail.send(msg);
          
          // Update sponsor status to Contacted
          sponsor.status = 'Contacted';
          sponsor.contactedAt = new Date().toISOString();
          
          emailsSent++;
        } catch (error: any) {
          console.error(`Failed to send email to ${sponsor.email}:`, error);
          errors.push({ sponsor: sponsor.email, error: (error as Error).message });
        }
      }

      res.json({ 
        success: true, 
        emailsSent, 
        totalSponsors: uncontactedSponsors.length,
        errors: errors.length > 0 ? errors : undefined
      });
    } catch (error: any) {
      console.error('Error sending bulk emails:', error);
      res.status(500).json({ error: 'Internal server error', details: (error as Error).message });
    }
  });

  // Marketplace routes
  
  // GET /api/marketplace - Get all sponsor lists from marketplace
  app.get('/api/marketplace', (req, res) => {
    try {
      res.json(marketplaceLists);
    } catch (error) {
      console.error('Error fetching marketplace lists:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Lists management routes
  
  // POST /api/lists/import - Import sponsors from a list
  app.post('/api/lists/import', (req, res) => {
    try {
      const { sponsors: sponsorList } = req.body;
      
      if (!Array.isArray(sponsorList)) {
        return res.status(400).json({ error: 'sponsors must be an array' });
      }

      let addedCount = 0;
      
      sponsorList.forEach(sponsor => {
        // Check if sponsor already exists
        const existingSponsor = sponsors.find(s => s.email === sponsor.email);
        if (!existingSponsor) {
          const newSponsor = {
            id: `sponsor-${Date.now()}-${addedCount}`,
            name: sponsor.name,
            email: sponsor.email,
            status: 'Not Contacted',
            tier: 'bronze',
            notes: '',
            type: sponsor.type || '',
            location: sponsor.location || '',
            source: 'Marketplace',
            createdAt: new Date().toISOString()
          };
          
          sponsors.push(newSponsor);
          addedCount++;
        }
      });

      // Add to activity log
      activityLog.unshift({
        title: `Imported ${addedCount} sponsors from list`,
        createdAt: new Date().toISOString()
      });

      res.json({ 
        success: true, 
        addedCount,
        message: `Successfully imported ${addedCount} sponsors`
      });
    } catch (error) {
      console.error('Error importing sponsors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /api/lists - Get previously imported sponsor lists
  app.get('/api/lists', (req, res) => {
    try {
      const importedSponsors = sponsors.filter(sponsor => sponsor.source === 'Marketplace');
      res.json(importedSponsors);
    } catch (error) {
      console.error('Error fetching imported lists:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Tiers management routes
  
  // GET /api/tiers - Get all sponsorship tiers
  app.get('/api/tiers', (req, res) => {
    try {
      res.json(tiers);
    } catch (error) {
      console.error('Error fetching tiers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/tiers - Create new sponsorship tier
  app.post('/api/tiers', (req, res) => {
    try {
      const { name, value, perks } = req.body;
      
      if (!name || !value) {
        return res.status(400).json({ error: 'name and value are required' });
      }

      const newTier = {
        id: `tier-${Date.now()}`,
        name,
        value: parseInt(value),
        perks: perks || [],
        createdAt: new Date().toISOString()
      };

      tiers.push(newTier);

      // Add to activity log
      activityLog.unshift({
        title: `Created ${name} tier`,
        createdAt: new Date().toISOString()
      });

      res.status(201).json(newTier);
    } catch (error) {
      console.error('Error creating tier:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Settings routes
  
  // GET /api/settings/email - Get email settings
  app.get('/api/settings/email', (req, res) => {
    try {
      res.json(settings.email);
    } catch (error) {
      console.error('Error fetching email settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST /api/settings/email - Update email settings
  app.post('/api/settings/email', (req, res) => {
    try {
      const { senderEmail, replyTo, orgName } = req.body;
      
      if (senderEmail) settings.email.senderEmail = senderEmail;
      if (replyTo) settings.email.replyTo = replyTo;
      if (orgName) settings.email.orgName = orgName;

      res.json({ 
        success: true, 
        settings: settings.email,
        message: 'Email settings updated successfully'
      });
    } catch (error) {
      console.error('Error updating email settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Stats route
  
  // GET /api/stats - Get sponsorship statistics
  app.get('/api/stats', (req, res) => {
    try {
      const totalSponsors = sponsors.length;
      const contacted = sponsors.filter(s => s.status === 'Contacted' || s.status === 'In Progress').length;
      const closed = sponsors.filter(s => s.status === 'Closed').length;
      const ghosted = sponsors.filter(s => s.status === 'Ghosted').length;
      
      // Calculate total raised from closed sponsors
      let totalRaised = 0;
      sponsors.filter(s => s.status === 'Closed').forEach(sponsor => {
        const tier = tiers.find(t => t.name.toLowerCase() === sponsor.tier.toLowerCase());
        if (tier) {
          totalRaised += tier.value;
        }
      });

      const stats = {
        totalSponsors,
        contacted,
        closed,
        ghosted,
        totalRaised: `₹${totalRaised.toLocaleString()}`
      };

      res.json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Activity route
  
  // GET /api/activity - Get recent activity log
  app.get('/api/activity', (req, res) => {
    try {
      res.json(activityLog.slice(0, 10)); // Return last 10 activities
    } catch (error) {
      console.error('Error fetching activity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
