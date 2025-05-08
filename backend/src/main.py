from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.plans import plans_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(plans_router)
