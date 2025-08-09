from pydantic_settings import BaseSettings
from typing import Optional
import os


def get_cors_origins():
    """Generate CORS origins for both local development and Codespaces environment."""
    origins = [
        "http://localhost:3000", 
        "http://localhost:8080",
        "https://localhost:3000",  # For HTTPS local development
        "https://localhost:8080"
    ]
    
    # Check if we're in GitHub Codespaces
    codespace_name = os.getenv("CODESPACE_NAME")
    if codespace_name:
        # Add Codespaces origins with common port patterns
        codespaces_domain = "app.github.dev"
        origins.extend([
            f"https://{codespace_name}-3000.{codespaces_domain}",
            f"https://{codespace_name}-8080.{codespaces_domain}",
        ])
    
    # Also check for GitHub Codespaces port forwarding domain
    port_forwarding_domain = os.getenv("GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN")
    if port_forwarding_domain:
        origins.extend([
            f"https://{port_forwarding_domain}:3000",
            f"https://{port_forwarding_domain}:8080",
        ])
    
    # Allow any *.app.github.dev domain for Codespaces flexibility
    origins.append("https://*.app.github.dev")
    
    return origins


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
    
    # CORS - Dynamic origins for local and Codespaces
    BACKEND_CORS_ORIGINS: list = get_cors_origins()
    
    class Config:
        case_sensitive = True


settings = Settings()