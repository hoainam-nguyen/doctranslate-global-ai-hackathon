from fastapi import APIRouter
from src.api.v1.endpoints.video import video

router = APIRouter()

router.include_router(router=video.router, prefix="/api/v1.0/rest", tags=["Presentation Video"])
