# Katalyst — Full-Stack Software Development Company

A modern full-stack application with separate client, admin, and backend.

## Project Structure

```
katalyst-app/
├── client/          ← Customer-facing React site (port 5173)
│   ├── src/
│   │   ├── components/   ← Reusable UI components
│   │   ├── pages/        ← Route pages (Home, About, Works, Contact)
│   │   ├── App.tsx       ← React Router setup
│   │   └── main.tsx
│   ├── public/           ← Static assets (images, videos, fonts)
│   └── package.json
│
├── admin/           ← Admin dashboard React app (port 5174)
│   ├── src/
│   │   ├── pages/        ← Dashboard, Projects, Blog, Team, Settings
│   │   ├── App.tsx       ← React Router with sidebar nav
│   │   └── main.tsx
│   └── package.json
│
├── backend/         ← Node/Express API (port 4000)
│   ├── src/
│   │   └── index.js      ← Express server with API routes
│   └── package.json
│
└── package.json     ← Root scripts to run all three
```

## Tech Stack

### Client
- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM
- GSAP (animations)
- Lenis (smooth scroll)

### Admin
- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM

### Backend
- Node.js + Express
- CORS
- dotenv

## Getting Started

### Install all dependencies

```bash
npm run install:all
```

Or install individually:

```bash
cd client && npm install
cd ../admin && npm install
cd ../backend && npm install
```

### Run all three apps concurrently

```bash
npm run dev
```

This starts:
- **Client** → http://localhost:5173
- **Admin** → http://localhost:5174
- **Backend** → http://localhost:4000

### Run individually

```bash
npm run client    # Client only
npm run admin     # Admin only
npm run backend   # Backend only
```

Or navigate into each folder:

```bash
cd client && npm run dev
cd admin && npm run dev
cd backend && npm run dev
```

## Client Routes

- `/` — Homepage (full animated site)
- `/about` — About page
- `/works` — Works/portfolio page
- `/contact` — Contact page

## Admin Routes

- `/dashboard` — Overview stats
- `/projects` — Manage projects
- `/blog` — Manage blog posts
- `/team` — Manage team members
- `/settings` — Admin settings

## Backend API Endpoints

- `GET /api/health` — Health check
- `GET /api/projects` — Projects data
- `GET /api/blog` — Blog posts
- `GET /api/team` — Team members

## Build for Production

```bash
cd client && npm run build
cd ../admin && npm run build
```

Outputs to `dist/` in each folder.

## Environment Variables

Create `.env` in `backend/`:

```
PORT=4000
```

See `backend/.env.example` for reference.

---

Built with ♥ by Katalyst
