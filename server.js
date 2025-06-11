import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database with default structure
const defaultData = {
  sponsors: [],
  deliverables: [],
  settings: {}
};

let db;

// Initialize lowdb
async function initDatabase() {
  try {
    db = await JSONFilePreset('db.json', defaultData);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Routes
app.get('/api/sponsors', (req, res) => {
  try {
    const sponsors = db.data.sponsors;
    res.json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sponsors', async (req, res) => {
  try {
    const { name, email, status, tier, notes } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newSponsor = {
      id: Date.now().toString(),
      name,
      email,
      status: status || 'active',
      tier: tier || 'bronze',
      notes: notes || '',
      createdAt: new Date().toISOString()
    };

    db.data.sponsors.push(newSponsor);
    await db.write();

    res.status(201).json(newSponsor);
  } catch (error) {
    console.error('Error creating sponsor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/sponsors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const sponsorIndex = db.data.sponsors.findIndex(sponsor => sponsor.id === id);
    
    if (sponsorIndex === -1) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }

    // Update the sponsor with new data
    db.data.sponsors[sponsorIndex] = {
      ...db.data.sponsors[sponsorIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await db.write();

    res.json(db.data.sponsors[sponsorIndex]);
  } catch (error) {
    console.error('Error updating sponsor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/sponsors/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sponsorIndex = db.data.sponsors.findIndex(sponsor => sponsor.id === id);
    
    if (sponsorIndex === -1) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }

    const deletedSponsor = db.data.sponsors[sponsorIndex];
    db.data.sponsors.splice(sponsorIndex, 1);

    await db.write();

    res.json({ 
      message: 'Sponsor deleted successfully',
      deletedSponsor 
    });
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/deliverables', (req, res) => {
  try {
    const deliverables = db.data.deliverables;
    res.json(deliverables);
  } catch (error) {
    console.error('Error fetching deliverables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/deliverables', async (req, res) => {
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

    db.data.deliverables.push(newDeliverable);
    await db.write();

    res.status(201).json(newDeliverable);
  } catch (error) {
    console.error('Error creating deliverable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/sponsors/:id/deliverables', (req, res) => {
  try {
    const { id } = req.params;
    const deliverables = db.data.deliverables.filter(deliverable => deliverable.sponsorId === id);
    res.json(deliverables);
  } catch (error) {
    console.error('Error fetching sponsor deliverables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/deliverables/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const deliverableIndex = db.data.deliverables.findIndex(deliverable => deliverable.id === id);
    
    if (deliverableIndex === -1) {
      return res.status(404).json({ error: 'Deliverable not found' });
    }

    // Update the deliverable with new data
    db.data.deliverables[deliverableIndex] = {
      ...db.data.deliverables[deliverableIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await db.write();

    res.json(db.data.deliverables[deliverableIndex]);
  } catch (error) {
    console.error('Error updating deliverable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/settings', (req, res) => {
  try {
    const settings = db.data.settings;
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`SendGrid API Key configured: ${process.env.SENDGRID_API_KEY ? 'Yes' : 'No'}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});