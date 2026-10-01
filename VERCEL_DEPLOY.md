# Vercel deployment

This repository is configured as one Vercel project with:

- `frontend/` — React + Vite
- `backend/` — FastAPI

The root `vercel.json` routes `/api/*` and `/admin-demo` to FastAPI and the remaining paths to the frontend service.

## 1. Neon

Create or reuse a PostgreSQL database in Neon, then run the Alembic migration from `backend/`:

```bash
alembic upgrade head
```

## 2. Vercel environment variables

Add the database connection string in the Vercel project settings:

```text
DATABASE_URL=your_neon_connection_string
```

Never commit real secrets to GitHub.

## 3. Deploy

From the repository root:

```bash
npm i -g vercel@latest
vercel link
vercel deploy --prod
```

## 4. Verify

Check:

```text
/
/admin-demo
/api/health
/api/docs
```

The `/admin-demo` route is intentionally public and uses only fictional in-memory records. The real production admin is intentionally kept out of this portfolio repository.
