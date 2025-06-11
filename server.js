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

app.get('/api/deliverables', (req, res) => {
  try {
    const deliverables = db.data.deliverables;
    res.json(deliverables);
  } catch (error) {
    console.error('Error fetching deliverables:', error);
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