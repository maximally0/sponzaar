import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// In-memory storage for deliverables
const deliverables: any[] = [];

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

  const httpServer = createServer(app);

  return httpServer;
}
