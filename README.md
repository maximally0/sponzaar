# 🚀 Sponzaar

**AI-Assisted Sponsor CRM & Outreach Tool**

Sponzaar is a comprehensive sponsorship management platform designed for student organizers, event managers, and hackathon teams. Simplify sponsor discovery, tracking, communication, and deliverables management for any event - from college fests to hackathons and workshops.

## 📌 Project Overview

Sponzaar streamlines the entire sponsorship lifecycle with intelligent automation and intuitive management tools. Built with modern web technologies, it provides a seamless experience for managing sponsors, tracking deliverables, and automating outreach campaigns.

**Perfect for:**
- College event organizers
- Hackathon teams
- Workshop coordinators
- Conference planners
- Any event requiring sponsor management

## 🛠 Tech Stack

### Frontend
- **React** with Vite for fast development
- **TailwindCSS** for responsive styling
- **Wouter** for client-side routing
- **TanStack Query** for data fetching
- **Shadcn/ui** components
- **React Hook Form** with Zod validation

### Backend
- **Express.js** (Node.js)
- **TypeScript** for type safety
- **Drizzle ORM** with PostgreSQL
- **SendGrid** for email automation
- **Passport.js** for authentication

### Infrastructure
- **Replit** for development and hosting
- **PostgreSQL** database
- **Environment-based configuration**

## 💻 Features

### ✅ Sponsor Management
- **Dashboard** with visual sponsor statistics and insights
- **Sponsor CRM** with sortable, filterable table view
- **Status tracking** (Contacted, Closed, Ghosted, Pending, etc.)
- **Sponsor profiles** with detailed information and notes
- **Tier management** with customizable sponsorship levels

### ✅ Automation & Outreach
- **Email templates** for consistent communication
- **Bulk email campaigns** with personalization
- **Automated follow-ups** and reminders
- **Activity logging** for campaign tracking
- **SendGrid integration** for reliable delivery

### ✅ Deliverables Management
- **Kanban-style** deliverable tracking
- **Due date management** with notifications
- **Status updates** and progress monitoring
- **Sponsor-specific** deliverable assignments

### ✅ Marketplace Integration
- **Sponsor list marketplace** for discovering new sponsors
- **Curated sponsor databases** by industry and event type
- **Import functionality** for purchased lists
- **Tag-based filtering** for relevant sponsors

### ✅ User Experience
- **Responsive design** for desktop and mobile
- **Dark/light theme** support
- **Intuitive navigation** with sidebar layout
- **Real-time updates** and notifications

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use Replit's built-in database)
- SendGrid API key for email functionality

### 🚀 Quick Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd sponzaar
npm install
```

2. **Environment Configuration**
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
SESSION_SECRET=your_session_secret
NODE_ENV=development
```

3. **Database Setup**
```bash
npm run db:generate
npm run db:migrate
```

4. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### 🔐 Default Login
```
Email: admin@sponzaar.com
Password: admin123
```

## 📁 Project Structure

```
sponzaar/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── contexts/       # React contexts
│   │   └── lib/           # Utilities and helpers
├── server/                 # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data layer
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema
└── package.json           # Dependencies and scripts
```

## 🔗 API Endpoints

### Authentication
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

### Sponsors
- `GET /api/sponsors` - List all sponsors
- `POST /api/sponsors` - Create new sponsor
- `PUT /api/sponsors/:id` - Update sponsor
- `DELETE /api/sponsors/:id` - Delete sponsor

### Deliverables
- `GET /api/deliverables` - List all deliverables
- `POST /api/deliverables` - Create new deliverable
- `PUT /api/deliverables/:id` - Update deliverable

### Email & Automation
- `POST /api/send-email` - Send bulk emails
- `GET /api/email-templates` - List email templates
- `POST /api/email-templates` - Create email template

## 🛣 Roadmap

### ✅ Phase 1 - Core Features (Completed)
- [x] User interface design and implementation
- [x] Backend API development
- [x] Authentication system
- [x] Sponsor CRUD operations
- [x] Deliverables management
- [x] Email automation basics

### 🔜 Phase 2 - Enhanced Features (In Progress)
- [ ] Advanced email template editor
- [ ] CSV sponsor import/export
- [ ] Enhanced sponsor marketplace
- [ ] Campaign analytics and reporting
- [ ] Mobile-responsive optimizations

### 🚀 Phase 3 - Advanced Features (Planned)
- [ ] AI-powered sponsor recommendations
- [ ] Integration with popular event platforms
- [ ] Advanced reporting and analytics
- [ ] Team collaboration features
- [ ] API webhooks for external integrations

## 🧪 Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Database Operations
```bash
# Generate migration files
npm run db:generate

# Apply migrations
npm run db:migrate

# Reset database
npm run db:reset
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: [Wiki](../../wiki)
- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by successful event management workflows
- Designed for the next generation of event organizers

---

**Made with ❤️ for event organizers worldwide**