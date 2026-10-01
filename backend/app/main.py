import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers.admin_demo import router as admin_demo_router
from .routers.contact_requests import router as contact_requests_router

load_dotenv()

app = FastAPI(
    title="ChinaShipments API",
    version="0.2.0",
    description="REST API for the ChinaShipments portfolio demo.",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

frontend_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "").split(",")
    if origin.strip()
]

if frontend_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=frontend_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
        allow_headers=["Content-Type"],
    )

app.include_router(contact_requests_router)
app.include_router(admin_demo_router)


@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "ok"}
