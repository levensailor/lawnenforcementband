import os
import logging
from logging.handlers import RotatingFileHandler

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

load_dotenv()

APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
APP_PORT = int(os.getenv("APP_PORT", "8000"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "info")

LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FORMAT = "%(asctime)s %(levelname)s [%(funcName)s:%(lineno)d] %(message)s"
formatter = logging.Formatter(LOG_FORMAT)
formatter.converter = lambda *args: __import__("datetime").datetime.now(
    __import__("datetime").timezone(__import__("datetime").timedelta(hours=-5))
).timetuple()

console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)

file_handler = RotatingFileHandler(
    os.path.join(LOG_DIR, "app.log"),
    maxBytes=1_000_000,
    backupCount=3,
)
file_handler.setFormatter(formatter)

logging.basicConfig(
    level=getattr(logging, LOG_LEVEL.upper(), logging.INFO),
    handlers=[console_handler, file_handler],
)

logger = logging.getLogger(__name__)

app = FastAPI(title="Lawn Enforcement")


@app.get("/")
async def root():
    logger.info("Redirecting to index.html")
    return RedirectResponse(url="/index.html")


app.mount("/", StaticFiles(directory="static"), name="static")


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting Lawn Enforcement on %s:%s", APP_HOST, APP_PORT)
    uvicorn.run("main:app", host=APP_HOST, port=int(APP_PORT), reload=True)
