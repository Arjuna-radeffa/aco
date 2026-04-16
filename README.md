# ACO Platform - Investment and Zakat Management System

## 📋 Project Overview

ACO (Amil, Crowdfunding, Ownership) is a comprehensive platform that manages investments, zakat, infaq, shadaqah, and waqf with complete transparency and accountability.

## 🏗️ Architecture

- **Backend**: NestJS with TypeScript
- **Frontend**: React with TypeScript + Vite
- **Database**: SQLite (development)
- **Authentication**: JWT with role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   # Run the setup script (PowerShell)
   .\setup.ps1
   
   # Or manually:
   cd aco-backend
   npm install
   
   cd ../aco-frontend  
   npm install
   ```

2. **Seed the database**:
   ```bash
   cd aco-backend
   npm run seed
   ```

3. **Start the backend**:
   ```bash
   cd aco-backend
   npm run start:dev
   ```
   Backend runs on http://localhost:3001

4. **Start the frontend**:
   ```bash
   cd aco-frontend
   npm run dev
   ```
   Frontend runs on http://localhost:3000

## 👥 Test Users

After seeding, you can login with:

- **Investor Micro**: rina@example.com / password123
- **Investor Enterprise**: budi@example.com / password123  
- **Project Owner**: dimas@example.com / password123
- **Muzakki**: paksalim@example.com / password123
- **Munfiq/Mutashadiq**: butari@example.com / password123

## 📁 Project Structure

```
aco/
├── aco-backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   ├── seed/               # Database seeding
│   │   └── app.module.ts       # Main module
│   └── package.json
│
├── aco-frontend/                # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── App.tsx            # Main app
│   │   └── main.tsx           # Entry point
│   └── package.json
│
├── ACO_FILE_STRUCTURE.md       # Complete file structure
├── application story.html      # Business narrative
└── setup.ps1                   # Setup script
```

## 🔐 Authentication Flow

1. User logs in with email/password
2. Backend validates credentials and returns JWT token
3. Frontend stores token and user data in localStorage
4. All subsequent requests include JWT in Authorization header
5. Role-based access control enforced on both frontend and backend

## 🎯 User Roles

- **Investor Micro** (Rina) - Small-scale investing
- **Investor Enterprise** (Budi) - Large-scale portfolio management  
- **Project Owner** (Dimas) - Business funding proposals
- **Muzakki** (Pak Salim) - Zakat management
- **Munfiq/Mutashadiq** (Bu Tari) - Infaq/Shadaqah management
- **Internal ACO Teams** - Administration and monitoring

## 🚧 Next Steps

1. Implement role-specific dashboards
2. Add investment project management
3. Implement ZIS (Zakat, Infaq, Shadaqah) modules
4. Add real-time notifications
5. Implement file upload for KYC documents
6. Add comprehensive reporting

## 📝 API Endpoints

- `POST /auth/login` - User login
- `POST /auth/profile` - Get user profile (protected)
- `POST /users` - Create user
- `GET /users` - List users (admin only)
- `GET /users/:id` - Get user by ID

## 🔧 Development

### Backend Commands
```bash
npm run start:dev    # Development mode with watch
npm run build        # Build for production
npm run test         # Run tests
npm run seed         # Seed database with test data
```

### Frontend Commands
```bash
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📄 License

This project is for demonstration purposes as part of the ACO application narrative.