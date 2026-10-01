from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import ContactRequest
from ..schemas import ContactRequestCreate, ContactRequestRead

router = APIRouter(
    prefix="/api/contact-requests",
    tags=["Contact requests"],
)


@router.post(
    "",
    response_model=ContactRequestRead,
    status_code=status.HTTP_201_CREATED,
)
def create_contact_request(
    payload: ContactRequestCreate,
    db: Session | None = Depends(get_db),
):
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database is not configured for this local demo.",
        )

    request = ContactRequest(
        name=payload.name.strip(),
        phone=payload.phone.strip(),
        message=payload.message.strip() if payload.message else None,
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return request
