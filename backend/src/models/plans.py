from pydantic import BaseModel
from datetime import datetime


class Plan(BaseModel):
    id: int
    title: str
    body: str
    date: datetime
    dDay: int
    importance: int
    category: str


class CreatePlan(BaseModel):
    title: str
    body: str
    date: datetime
    importance: int
    category: str
