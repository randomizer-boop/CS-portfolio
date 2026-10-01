# ChinaShipments backend

FastAPI backend for the ChinaShipments portfolio demo.

## Stack

- FastAPI
- SQLAlchemy 2
- PostgreSQL (Neon)
- Pydantic
- Alembic
- psycopg 3

## Local setup

From `backend/`:

```bash
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

Create `.env` from `.env.example` and set `DATABASE_URL`.

Then run:

```bash
uvicorn app.main:app --reload --port 8000
```

API docs: `http://127.0.0.1:8000/api/docs`

Health check: `http://127.0.0.1:8000/api/health`

Public demo dashboard: `http://127.0.0.1:8000/admin-demo`

## Database migrations

```bash
alembic upgrade head
```

## Main API endpoints

- `POST /api/contact-requests` — create a public contact request
- `/admin-demo` — public static CRM demo; fictional in-memory data only
