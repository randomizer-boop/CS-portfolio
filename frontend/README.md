# ChinaShipments frontend

React + TypeScript + Vite frontend for the ChinaShipments portfolio demo.

## Structure

- `src/App.tsx` — composes the page from section components
- `src/components/` — one file per page section (Navbar, Hero, Services, HowItWorks, Pricing, FAQ, Contact, Footer)
- `src/data/` — page content and demo tariffs (fictional data)
- `src/lib/`, `src/hooks/` — scrolling helpers, shared event names, reveal animation
- `src/api/` — API client for contact requests

The hero photo is served from `public/hero-shanghai.jpg`.

## Local setup

From `frontend/`:

```bash
npm install
npm run dev
```

The Vite dev server proxies `/api` and `/admin-demo` to the local FastAPI server at `http://127.0.0.1:8000`.

## Production

The portfolio repository is configured as a Vercel multi-service project from the repository root. The frontend is served from `frontend/`, while FastAPI is deployed from `backend/`.

The browser always calls the API through the same-origin path:

```text
/api/contact-requests
```

so the code does not depend on a hard-coded localhost URL or a public backend hostname.
