import logging
import sys

from dotenv import dotenv_values
from loguru import logger

from src.settings.logging_config import InterceptHandler
from src.utils.functions import decode_dict

# load config from .env file
config = dotenv_values('.env')

DEBUG = bool(config.get("DEBUG", "False") if config.get("DEBUG", "") in ["True", "true", "1"] else False)

MESSAGE_QUEUE = []

TOKEN = "eyJQUklWQUNZIjogeyJBdXRob3JpemF0aW9uIjogIkJlYXJlciBleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW1RME1qWTVZVEUzTXpCbE5UQTNNVGxsTm1JeE5qQTJaVFF5WXpOaFlqTXlZakV5T0RBME5Ea2lMQ0owZVhBaU9pSktWMVFpZlEuZXlKdVlXMWxJam9pU0dGamEzUm9iMjRnVkdocGJtdHdjbTl0Y0hRaUxDSnBjM01pT2lKb2RIUndjem92TDNObFkzVnlaWFJ2YTJWdUxtZHZiMmRzWlM1amIyMHZaRzlqZEhKaGJuTnNZWFJsTFdsdklpd2lZWFZrSWpvaVpHOWpkSEpoYm5Oc1lYUmxMV2x2SWl3aVlYVjBhRjkwYVcxbElqb3hOekl6T1RrMk1UWTRMQ0oxYzJWeVgybGtJam9pZG5Rd2FtMTRhVU5rV21oNlEwOTFUVVZZVG1OWWQzTk1kMGx4TVNJc0luTjFZaUk2SW5aME1HcHRlR2xEWkZwb2VrTlBkVTFGV0U1aldIZHpUSGRKY1RFaUxDSnBZWFFpT2pFM01qTTVPVFl4Tmpnc0ltVjRjQ0k2TVRjeU16azVPVGMyT0N3aVpXMWhhV3dpT2lKb1lXTnJZWFJvYjI1QWRHaHBibXR3Y205dGNIUXVZMjl0SWl3aVpXMWhhV3hmZG1WeWFXWnBaV1FpT21aaGJITmxMQ0p3YUc5dVpWOXVkVzFpWlhJaU9pSXJPRFExTWpJNU1EZzVNemdpTENKbWFYSmxZbUZ6WlNJNmV5SnBaR1Z1ZEdsMGFXVnpJanA3SW1WdFlXbHNJanBiSW1oaFkydGhkR2h2YmtCMGFHbHVhM0J5YjIxd2RDNWpiMjBpWFN3aWNHaHZibVVpT2xzaUt6ZzBOVEl5T1RBNE9UTTRJbDE5TENKemFXZHVYMmx1WDNCeWIzWnBaR1Z5SWpvaWNHRnpjM2R2Y21RaWZYMC5WV2djZjhyQVlNM3hqVHZxT01wdXFhVVI0Rl8tZy1WZzRReThRUjRnSGhRR3lsM0hJNUxrd0k1U0FWV2JRY1RLX1hEbmpfSVJNVm9HaDZxSThZTlJzY2p0eWJvMjFUNTZwdEI3NWNObU9yaENzNllab0d2NHlSZ2oxQUxkY2p0Skd1T1NUMnh1TEhJTC12Z2JXbnRVcGFiMmQ5SDBUdWc5OHV6ZTQ5WU1OYnhUOU9NNzVNMUpJRndzdGt0a205MldqenotVE5uZ2g5LUNxNHN1NWM0VXctQVROVy03NXcxdS1ydzB4YnhhWHJqQll5YnBsX3dXOHVSVW85am5Zb0YwS2lmamo2RklpbjJjc2kxbXYwWjFjZnZrWldGczB5Vm91QWJwLWp2Q2tzaHkzZ1dOVlF1SFdlQS1ROUJvVUF5YVZ5R3ZRYndXb3hsa0RQbU1PUTJfVlEifSwgIlRSQU5TQ1JJUFRTIjogImh0dHBzOi8vZG9jdHJhbnNsYXRlLWFwaS5kb2N0cmFuc2xhdGUuaW8vdjEvY3JlYXRlL3RyYW5zY3JpcHRzIiwgIkNSRUFURV9WSURFTyI6ICJodHRwczovL2RvY3RyYW5zbGF0ZS1hcGkuZG9jdHJhbnNsYXRlLmlvL3YxL2NyZWF0ZS92aWRlbyJ9"

TOKEN_DATA = decode_dict(TOKEN)

APPLICATION = {
    "version": config.get("VERSION", "1.0.0"),
    "project_name": config.get("PROJECT_NAME"),
    "debug": DEBUG,
    "server_host": config.get("SERVER_HOST", "0.0.0.0"),
    "server_port": config.get("SERVER_PORT", "8000"),
    "headers": TOKEN_DATA.get('PRIVACY', {}),
    "transcripts": TOKEN_DATA.get('TRANSCRIPTS'),
    "video": TOKEN_DATA.get('CREATE_VIDEO'),
    "llm_key": config.get("LLM_API_KEY")
}

DATE_FORMAT = '%Y-%m-%d'
TIME_FORMAT = '%H:%M:%S'
DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'

# logging configuration
LOGGING_LEVEL = logging.DEBUG if APPLICATION["debug"] else logging.INFO
LOGGERS = ("hypercorn.asgi", "hypercorn.access")  # noqa
logger.level("CUSTOM", no=15, color="<blue>", icon="@")
logger.level("SERVICE", no=200)

logging.getLogger().handlers = [InterceptHandler()]

if APPLICATION["debug"]:
    logger.configure(
        handlers=[
            {"sink": sys.stderr, "level": LOGGING_LEVEL},
            {
                "sink": sys.stderr,
                "level": 200,
                "format": "<blue>{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}</blue>",
            },
        ]
    )
else:
    logger.configure(
        handlers=[
            {
                "sink": sys.stderr,
                "level": 200,
                "format": "<blue>{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}</blue>",
            },
        ]
    )

logger.add("./logs/app.log", rotation='10 MB')
