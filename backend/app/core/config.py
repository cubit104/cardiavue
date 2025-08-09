from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "CardiaVue API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # JWT Settings
    SECRET_KEY: str = "cardiavue-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    ALGORITHM: str = "HS256"
    
    # Database
    DATABASE_URL: str = "sqlite:///./cardiavue.db"
    
    # CORS
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8080"]
    
    class Config:
        case_sensitive = True


settings = Settings()