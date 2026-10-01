from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["Admin demo"])

ADMIN_DEMO_HTML_PATH = Path(__file__).resolve().parent.parent / "static" / "admin-demo.html"


@router.get("/admin-demo", response_class=HTMLResponse, include_in_schema=False)
def admin_demo_page():
    return ADMIN_DEMO_HTML_PATH.read_text(encoding="utf-8")
