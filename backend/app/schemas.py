from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ContactRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=3, max_length=40)
    message: str | None = Field(default=None, max_length=5000)


class ContactRequestRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    phone: str
    message: str | None
    status: str
    created_at: datetime
