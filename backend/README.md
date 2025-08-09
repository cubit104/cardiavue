# CardiaVue Backend API

FastAPI backend for the CardiaVue medical dashboard application.

## Features

- 🔐 JWT-based authentication with role-based access control
- 👥 User management (doctors, nurses, admins)
- 🏥 Clinic management
- 👤 Patient management with medical records
- 📡 Device transmission data handling
- 📊 Dashboard statistics API
- 🔒 Password hashing and security
- 📝 Comprehensive API documentation with FastAPI/OpenAPI

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize database with sample data:**
   ```bash
   python init_db.py
   ```

4. **Start the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at:
- **API Base URL:** http://localhost:8000/api
- **Interactive Documentation:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Clinics
- `GET /api/clinics/` - List clinics
- `POST /api/clinics/` - Create clinic (admin/doctor only)
- `GET /api/clinics/{id}` - Get clinic details
- `PUT /api/clinics/{id}` - Update clinic (admin/doctor only)
- `DELETE /api/clinics/{id}` - Delete clinic (admin only)

### Patients
- `GET /api/patients/` - List patients
- `POST /api/patients/` - Create patient
- `GET /api/patients/{id}` - Get patient details
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient (admin/doctor only)

### Transmissions
- `GET /api/transmissions/` - List transmissions (with filters)
- `POST /api/transmissions/` - Create transmission
- `GET /api/transmissions/{id}` - Get transmission details
- `PUT /api/transmissions/{id}` - Update transmission
- `GET /api/transmissions/stats/dashboard` - Get dashboard statistics

## Test Users

After running `init_db.py`, you can use these test accounts:

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| `doctor1` | `password123` | Doctor | Dr. Sarah Johnson |
| `nurse1` | `password123` | Nurse | Nurse Emily Chen |
| `admin` | `admin123` | Admin | Admin User |

## Project Structure

```
backend/
├── app/
│   ├── api/                 # API route handlers
│   │   ├── auth.py         # Authentication endpoints
│   │   ├── clinics.py      # Clinic management
│   │   ├── patients.py     # Patient management
│   │   └── transmissions.py # Device transmission data
│   ├── core/               # Core configuration
│   │   ├── config.py       # Application settings
│   │   └── security.py     # Security utilities
│   ├── models/             # Database models
│   │   ├── user.py         # User model
│   │   ├── clinic.py       # Clinic model
│   │   ├── patient.py      # Patient model
│   │   └── transmission.py # Transmission model
│   ├── schemas/            # Pydantic schemas
│   │   ├── user.py         # User validation schemas
│   │   ├── clinic.py       # Clinic validation schemas
│   │   ├── patient.py      # Patient validation schemas
│   │   └── transmission.py # Transmission validation schemas
│   ├── services/           # Business logic
│   │   ├── auth.py         # Authentication services
│   │   └── clinic.py       # Clinic services
│   ├── db/                 # Database configuration
│   │   └── session.py      # Database session management
│   └── main.py             # FastAPI application
├── init_db.py              # Database initialization script
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Database Models

### User
- Role-based access (doctor, nurse, admin)
- Secure password hashing
- Profile management

### Clinic
- Medical facility information
- Contact details
- Active/inactive status

### Patient
- Personal and medical information
- Emergency contact details
- Clinic association

### Transmission
- Device data from cardiac monitors
- Heart rate, battery, impedance data
- Alert levels and arrhythmia detection
- Raw device data storage

## Configuration

Key settings in `app/core/config.py`:

- `SECRET_KEY`: JWT signing key (change in production)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration (default: 8 days)
- `DATABASE_URL`: Database connection string
- `BACKEND_CORS_ORIGINS`: Allowed frontend origins

## Development

### Running Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests (when implemented)
pytest
```

### API Documentation
Visit http://localhost:8000/docs for interactive API documentation powered by FastAPI and OpenAPI.

## Integration with Frontend

The backend is designed to work seamlessly with the CardiaVue React frontend:

- CORS configured for `http://localhost:3000`
- API endpoints match frontend expectations
- Authentication flow compatible with existing frontend code
- Dashboard statistics API provides data for dashboard components

## Security Features

- JWT token-based authentication
- Bcrypt password hashing
- Role-based access control
- CORS protection
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy ORM

## Production Deployment

For production deployment:

1. Change `SECRET_KEY` in configuration
2. Use production database (PostgreSQL/MySQL)
3. Set up proper CORS origins
4. Configure environment variables
5. Use production ASGI server (like gunicorn)
6. Set up SSL/HTTPS
7. Configure proper logging

Example production command:
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```