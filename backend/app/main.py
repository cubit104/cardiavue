from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .db.session import engine, Base
from .api import auth, clinics, patients, transmissions
import re

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="CardiaVue Medical Dashboard API"
)

# Custom CORS middleware to handle wildcard domains for Codespaces
def custom_cors_handler(origin: str) -> bool:
    """Check if origin is allowed, including wildcard patterns for Codespaces."""
    # Allow exact matches from our origins list
    if origin in settings.BACKEND_CORS_ORIGINS:
        return True
    
    # Handle wildcard pattern for GitHub Codespaces
    if origin and origin.endswith('.app.github.dev'):
        return True
    
    return False

# Set up CORS middleware with custom origin validation
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.app\.github\.dev$|http://localhost:\d+$|https://localhost:\d+$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["authentication"])
app.include_router(clinics.router, prefix=f"{settings.API_V1_STR}/clinics", tags=["clinics"])
app.include_router(patients.router, prefix=f"{settings.API_V1_STR}/patients", tags=["patients"])
app.include_router(transmissions.router, prefix=f"{settings.API_V1_STR}/transmissions", tags=["transmissions"])


@app.get("/")
def read_root():
    """Root endpoint."""
    return {
        "message": "CardiaVue API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)