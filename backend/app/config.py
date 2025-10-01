from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    """Loads environment variables from the .env file."""
    gemini_api_key: str = os.getenv("GEMINI_API_KEY")
    mongo_uri: str = os.getenv("MONGO_URI")

    class Config:
        case_sensitive = True

settings = Settings()