from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["Admin"])

ADMIN_HTML_PATH = Path(__file__).resolve().parent.parent / "static" / "admin.html"


def _render_admin_html(*, demo: bool = False) -> str:
    html = ADMIN_HTML_PATH.read_text(encoding="utf-8")
    marker = "    window.__CS_ADMIN_DEMO__ = false;"
    value = "true" if demo else "false"
    return html.replace(marker, f"    window.__CS_ADMIN_DEMO__ = {value};", 1)


@router.get("/admin", response_class=HTMLResponse)
def admin_page():
    return _render_admin_html(demo=False)


@router.get("/admin-demo", response_class=HTMLResponse)
def admin_demo_page():
    return _render_admin_html(demo=True)
