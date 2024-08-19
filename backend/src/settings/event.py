from typing import Callable
from fastapi import FastAPI
from loguru import logger
from src.settings.config import APPLICATION

service_config = APPLICATION


def create_start_app_handler(app: FastAPI) -> Callable:  # noqa
    async def start_app():
        pass

    return start_app


def create_stop_app_handler(app: FastAPI) -> Callable:  # noqa
    @logger.catch
    async def stop_app() -> None:
        pass

    return stop_app
