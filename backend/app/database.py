import os
from collections.abc import Generator
from typing import Optional

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Neon commonly provides a plain postgresql:// URL.
# SQLAlchemy needs the psycopg3 dialect explicitly because this project uses psycopg v3.
if DATABASE_URL:
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)
    elif DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)

engine = create_engine(DATABASE_URL, pool_pre_ping=True) if DATABASE_URL else None
SessionLocal = (
    sessionmaker(bind=engine, autoflush=False, autocommit=False)
    if engine
    else None
)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Optional[Session], None, None]:
    # Database is optional for the portfolio demo.
    # When DATABASE_URL is missing, the dependency yields None so the API
    # can return a clear 503 instead of crashing the whole application.
    if SessionLocal is None:
        yield None
        return

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
