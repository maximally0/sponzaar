# Sponzaar Backend & Frontend Integration Guide

## Backend

### 1. Backend API Routes

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/deliverables` | Get all deliverables |
| `POST` | `/api/deliverables` | Create new deliverable |
| `GET` | `/api/sponsors/:id/deliverables` | Get deliverables for specific sponsor |
| `PATCH` | `/api/deliverables/:id` | Update deliverable status or dueDate |
| `POST` | `/api/send-email` | Send email using SendGrid |
| `GET` | `/api/templates` | Get all email templates |
| `POST` | `/api/templates` | Create new email template |
| `GET` | `/api/sponsors` | Get all sponsors |
| `POST` | `/api/sponsors` | Create new sponsor |
| `POST` | `/api/send-to-uncontacted` | Send emails to all uncontacted sponsors |
| `GET` | `/api/marketplace` | Get all sponsor lists from marketplace |
| `POST` | `/api/lists/import` | Import sponsors from a list |
| `GET` | `/api/lists` | Get previously imported sponsor lists |
| `GET` | `/api/tiers` | Get all sponsorship tiers |
| `POST` | `/api/tiers` | Create new sponsorship tier |
| `GET` | `/api/settings/email` | Get email settings |
| `POST` | `/api/settings/email` | Update email settings |
| `GET` | `/api/stats` | Get sponsorship statistics |
| `GET` | `/api/activity` | Get recent activity log |

### 2. Route Inputs/Parameters

**POST /api/deliverables**
```json
{
  "id": "string",
  "sponsorId": "string", 
  "title": "string",
  "dueDate": "string",
  "status": "pending" // optional
}
```

**POST /api/sponsors**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "status": "Not Contacted", // optional
  "tier": "bronze", // optional
  "notes": "" // optional
}
```

**POST /api/send-email**
```json
{
  "to": "email@example.com",
  "subject": "Email subject",
  "html": "<h1>Email content</h1>",
  "from": "sender@example.com" // optional
}
```

**POST /api/templates**
```json
{
  "id": "string",
  "name": "Template Name",
  "subject": "Email Subject",
  "html": "<html>Template content</html>"
}
```

**POST /api/lists/import**
```json
{
  "sponsors": [
    {
      "name": "Company Name",
      "email": "contact@company.com",
      "type": "Tech", // optional
      "location": "City" // optional
    }
  ]
}
```

**POST /api/tiers**
```json
{
  "name": "Gold Tier",
  "value": 50000,
  "perks": ["perk1", "perk2"] // optional
}
```

### 3. Route Responses

**GET /api/sponsors**
```json
[
  {
    "id": "sponsor-123",
    "name": "TechCorp",
    "email": "contact@techcorp.com",
    "status": "Not Contacted",
    "tier": "bronze",
    "notes": "",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**GET /api/marketplace**
```json
[
  {
    "id": "list-1",
    "title": "Top D2C Brands - Jan 2024",
    "price": "Free",
    "tags": ["consumer", "ecommerce"],
    "sponsors": [
      {
        "name": "Zomato",
        "email": "partnerships@zomato.com",
        "type": "Food Tech",
        "location": "Gurugram"
      }
    ]
  }
]
```

**GET /api/stats**
```json
{
  "totalSponsors": 25,
  "contacted": 15,
  "closed": 8,
  "ghosted": 3,
  "totalRaised": "₹2,35,000"
}
```

**POST /api/send-email (simulated)**
```json
{
  "success": true,
  "message": "Email simulated successfully (SendGrid API key not configured)",
  "simulated": true,
  "emailData": {
    "to": "recipient@example.com",
    "from": "sender@example.com",
    "subject": "Test Subject",
    "html": "<h1>Content</h1>"
  }
}
```

### 4. Local Base URL
```
http://localhost:5000
```

### 5. Authentication & Headers
- **No authentication required** - all routes are public
- **No custom headers required** - standard REST API
- Content-Type: application/json for POST requests

### 6. CORS Settings
- **CORS is configured** - frontend can communicate with backend locally
- Server serves both frontend and backend on same port (5000)

## Frontend

### 7. Components That Need GET Data

| Component | Data Source | API Endpoint |
|-----------|-------------|--------------|
| `Dashboard.tsx` | Stats, activity feed | `/api/stats`, `/api/activity` |
| `SponsorCRM.tsx` | Sponsors list | `/api/sponsors` |
| `Automations.tsx` | Templates, sponsors | `/api/templates`, `/api/sponsors` |
| `SponsorListMarketplace.tsx` | Marketplace lists | `/api/marketplace` |
| `SponsorLists.tsx` | Imported lists | `/api/lists` |
| `SponsorshipTiers.tsx` | Tier definitions | `/api/tiers` |
| `Settings.tsx` | Email settings | `/api/settings/email` |
| `Reports.tsx` | Stats and analytics | `/api/stats`, `/api/activity` |

### 8. Components That Need POST/PUT/DELETE Data

| Component | Actions | API Endpoints |
|-----------|---------|---------------|
| `SponsorCRM.tsx` | Add new sponsors | `POST /api/sponsors` |
| `Automations.tsx` | Create templates, send emails | `POST /api/templates`, `POST /api/send-email` |
| `SponsorListMarketplace.tsx` | Import sponsor lists | `POST /api/lists/import` |
| `SponsorshipTiers.tsx` | Create tiers | `POST /api/tiers` |
| `Settings.tsx` | Update email settings | `POST /api/settings/email` |
| `DeliverableRow.tsx` | Update deliverable status | `PATCH /api/deliverables/:id` |

### 9. State Variables for Fetched Data

**Currently using local state (needs API integration):**
```typescript
// SponsorCRM.tsx
const [sponsors, setSponsors] = useState(initialSponsors);

// Automations.tsx  
const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
const [sponsors, setSponsors] = useState<Sponsor[]>(mockSponsors);

// SponsorListMarketplace.tsx (via context)
const { allMarketplaceLists, purchasedLists } = useSponsorListStore();

// Dashboard.tsx
// Currently using hardcoded stats - needs API integration
```

### 10. Current API Call Implementation

**Currently NO fetch or Axios calls implemented.** All data is:
- Hardcoded mock data in components
- Local state management
- Context providers with static data

**Example of what needs to be added:**
```typescript
// This pattern needs to be implemented:
useEffect(() => {
  fetch('/api/sponsors')
    .then(res => res.json())
    .then(data => setSponsors(data))
    .catch(err => console.error(err));
}, []);
```

### 11. Form Submission Flow

**Current form handling (needs API integration):**

1. **Add Sponsor Form** (SponsorCRM.tsx)
   - Form data stored in `formData` state
   - On submit: adds to local `sponsors` array
   - **Needs**: POST to `/api/sponsors`

2. **Email Template Form** (Automations.tsx)
   - Form data in `newTemplate` state  
   - On submit: adds to local `emailTemplates` array
   - **Needs**: POST to `/api/templates`

3. **Tier Creation** (SponsorshipTiers.tsx)
   - Uses TierEditor component
   - **Needs**: POST to `/api/tiers`

4. **Settings Update** (Settings.tsx)
   - Email settings form
   - **Needs**: POST to `/api/settings/email`

## Project Structure

### Client Structure
```
client/
├── src/
│   ├── components/
│   │   ├── DeliverableRow.tsx
│   │   ├── Layout.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SponsorListCard.tsx
│   │   ├── SponsorRow.tsx
│   │   ├── TierEditor.tsx
│   │   └── ui/ (shadcn components)
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useSponsorListStore.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Automations.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   ├── SponsorCRM.tsx
│   │   ├── SponsorListMarketplace.tsx
│   │   ├── SponsorLists.tsx
│   │   └── SponsorshipTiers.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
└── public/
```

### Server Structure
```
server/
├── db.ts (database connection)
├── index.ts (main server file)
├── routes.ts (API routes)
├── storage.ts (in-memory storage interface)
└── vite.ts (Vite dev server setup)
```

### Shared
```
shared/
└── schema.ts (database schema definitions)
```

## Next Steps for Integration

1. **Replace mock data** with API calls using fetch or React Query
2. **Implement error handling** for failed API requests  
3. **Add loading states** during API calls
4. **Update form submissions** to POST to backend APIs
5. **Add API key configuration** for SendGrid email functionality
6. **Implement real-time updates** when data changes