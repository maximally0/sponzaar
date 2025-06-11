import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import sgMail from "@sendgrid/mail";

// In-memory storage for deliverables and other data
const deliverables: any[] = [];
const sponsors: any[] = [];
const settings = {
  templates: [] as any[]
};

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

      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ error: 'SendGrid API key not configured' });
      }

      const msg = {
        to,
        from: from || 'noreply@sponzaar.com', // Use provided sender or default
        subject,
        html
      };

      await sgMail.send(msg);
      res.json({ success: true, message: 'Email sent successfully' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      
      // Provide more specific error messages
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

  const httpServer = createServer(app);

  return httpServer;
}
