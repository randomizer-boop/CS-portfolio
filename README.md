# ChinaShipments

Full-stack portfolio project for a China → CIS sourcing and logistics service.

## About the project

ChinaShipments is a full-stack portfolio project that demonstrates a client-facing
logistics website, a contact-request flow, a backend API, PostgreSQL persistence
and a CRM-style admin dashboard demo.

> **Demo data notice.** ChinaShipments is a fictional company. Tariffs, delivery
> times and routes on the website, as well as all records in `/admin-demo`, are
> demo data created for this portfolio — not real business figures.

### What I built

- Responsive React + TypeScript frontend (one-page website)
- Interactive delivery calculator (mode + weight → estimated price and transit time)
- Contact-request flow: form validation → REST API → PostgreSQL
- Calculator → form hand-off (the estimate pre-fills the request message)
- FastAPI REST API with Pydantic validation and Swagger docs
- PostgreSQL persistence via SQLAlchemy 2 and Alembic migrations (Neon)
- CRM / admin dashboard demo with fictional data (`/admin-demo`)
- Vercel deployment setup (frontend + FastAPI in one project)

The public website demonstrates the client-facing flow. The FastAPI backend exposes a contact-request API, persists submissions in PostgreSQL, and serves a public admin dashboard demo with fictional data.

## Live routes

- `/` — public website
- `/admin-demo` — public admin dashboard demo with fictional data and no login
- `/api/docs` — FastAPI Swagger UI
- `/api/health` — health check

## Tech stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- FastAPI
- Pydantic
- SQLAlchemy 2
- Alembic
- psycopg 3

**Database**
- PostgreSQL / Neon

**Deployment**
- Vercel

## Architecture

```text
React + Vite
     │
     │ /api/*
     ▼
FastAPI
     │
     ├── Contact request API
     ├── Admin demo (/admin-demo)
     └── SQLAlchemy
             │
             ▼
       PostgreSQL / Neon
```

The `/admin-demo` page is intentionally public and never reads or writes the database. It uses **fictional records stored in browser memory** so the CRM-style interface can be demonstrated safely in a portfolio: filters, search, status changes, pinning, notes and CSV export all work, but every change resets on page reload.

The real production project can later add a protected admin area separately; this portfolio repository does not expose it.

## Frontend structure

```text
frontend/src/
  App.tsx              — page composition
  components/          — Navbar, Hero, Services, HowItWorks, Pricing,
                         FAQ, Contact, Footer, BackToTop, TransportIcon
  data/                — services, steps, pricing (demo tariffs + calculator logic), faq
  lib/                 — smooth scrolling, shared event names
  hooks/               — useReveal (section fade-in on scroll)
  api/                 — contactRequests.ts (POST /api/contact-requests)
```

## Main features

- Responsive one-page website
- Supplier search and sourcing service presentation
- Contact request form
- REST API for contact requests
- PostgreSQL persistence
- Public CRM/admin dashboard demo
- Search and filtering
- Status workflow in demo mode (closed requests move to a separate archive)
- Pin requests, manager notes, CSV export
- Interactive delivery calculator
- Alembic migrations
- Vercel-ready deployment

## Local development

### Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173/
http://localhost:5173/admin-demo
http://localhost:5173/api/docs
```

The Vite dev server proxies `/api` and `/admin-demo` to `http://127.0.0.1:8000`.
