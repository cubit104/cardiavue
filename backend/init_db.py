"""
Script to initialize the database with sample data for testing.
Run this after setting up the backend to populate with test data.
"""

from datetime import datetime, date, timedelta
import random
from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base
from app.models.user import User
from app.models.clinic import Clinic
from app.models.patient import Patient
from app.models.transmission import Transmission
from app.core.security import get_password_hash

# Create database tables
Base.metadata.create_all(bind=engine)


def init_sample_data():
    """Initialize database with sample data."""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(User).first():
            print("Sample data already exists. Skipping initialization.")
            return
        
        # Create sample users
        users = [
            User(
                username="doctor1",
                email="doctor1@cardiavue.com",
                full_name="Dr. Sarah Johnson",
                role="doctor",
                hashed_password=get_password_hash("password123"),
                is_active=True
            ),
            User(
                username="nurse1",
                email="nurse1@cardiavue.com",
                full_name="Nurse Emily Chen",
                role="nurse",
                hashed_password=get_password_hash("password123"),
                is_active=True
            ),
            User(
                username="admin",
                email="admin@cardiavue.com",
                full_name="Admin User",
                role="admin",
                hashed_password=get_password_hash("admin123"),
                is_active=True
            ),
        ]
        
        for user in users:
            db.add(user)
        
        # Create sample clinics
        clinics = [
            Clinic(
                name="CardiaVue Medical Center",
                address="123 Medical Plaza, Healthcare City, HC 12345",
                phone="(555) 123-4567",
                email="contact@cardiavue-medical.com",
                is_active=True
            ),
            Clinic(
                name="Heart Care Institute",
                address="456 Cardiac Ave, Wellness Town, WT 67890",
                phone="(555) 987-6543",
                email="info@heartcare.com",
                is_active=True
            ),
        ]
        
        for clinic in clinics:
            db.add(clinic)
        
        db.commit()
        
        # Create sample patients
        patients = [
            Patient(
                patient_id="P001",
                first_name="John",
                last_name="Doe",
                date_of_birth=date(1970, 5, 15),
                gender="Male",
                phone="(555) 111-2222",
                email="john.doe@email.com",
                address="789 Patient St, Care City, CC 11111",
                emergency_contact="Jane Doe",
                emergency_phone="(555) 111-3333",
                medical_notes="Pacemaker implanted 2020. Regular follow-ups required.",
                clinic_id=1,
                is_active=True
            ),
            Patient(
                patient_id="P002",
                first_name="Mary",
                last_name="Smith",
                date_of_birth=date(1965, 8, 22),
                gender="Female",
                phone="(555) 444-5555",
                email="mary.smith@email.com",
                address="321 Health Blvd, Wellness City, WC 22222",
                emergency_contact="Bob Smith",
                emergency_phone="(555) 444-6666",
                medical_notes="ICD implanted 2019. History of arrhythmia.",
                clinic_id=1,
                is_active=True
            ),
            Patient(
                patient_id="P003",
                first_name="Robert",
                last_name="Johnson",
                date_of_birth=date(1958, 12, 3),
                gender="Male",
                phone="(555) 777-8888",
                email="robert.johnson@email.com",
                address="654 Recovery Rd, Healing Heights, HH 33333",
                emergency_contact="Susan Johnson",
                emergency_phone="(555) 777-9999",
                medical_notes="CRT device implanted 2021. Heart failure management.",
                clinic_id=2,
                is_active=True
            ),
        ]
        
        for patient in patients:
            db.add(patient)
        
        db.commit()
        
        # Create sample transmissions
        device_types = ["pacemaker", "icd", "crt", "loop"]
        alert_levels = ["normal", "warning", "critical"]
        transmission_types = ["scheduled", "emergency", "follow_up"]
        
        for i in range(50):
            transmission = Transmission(
                transmission_id=f"T{str(i+1).zfill(6)}",
                patient_id=random.choice([1, 2, 3]),
                device_type=random.choice(device_types),
                device_serial=f"DEV{random.randint(10000, 99999)}",
                transmission_type=random.choice(transmission_types),
                heart_rate_avg=random.uniform(60, 100),
                heart_rate_min=random.uniform(45, 65),
                heart_rate_max=random.uniform(95, 120),
                battery_level=random.uniform(70, 100),
                impedance=random.uniform(400, 800),
                arrhythmia_detected=random.choice([True, False]),
                alert_level=random.choice(alert_levels),
                raw_data={
                    "battery_voltage": round(random.uniform(2.5, 3.2), 2),
                    "lead_impedance": round(random.uniform(400, 800), 1),
                    "sensing_threshold": round(random.uniform(0.5, 2.0), 1),
                    "pacing_threshold": round(random.uniform(0.5, 1.5), 1)
                },
                notes=f"Automated transmission #{i+1}",
                processed=random.choice([True, False]),
                created_at=datetime.now() - timedelta(days=random.randint(0, 30))
            )
            db.add(transmission)
        
        db.commit()
        print("Sample data initialized successfully!")
        print("\nTest Users Created:")
        print("- Username: doctor1, Password: password123 (Doctor)")
        print("- Username: nurse1, Password: password123 (Nurse)")
        print("- Username: admin, Password: admin123 (Admin)")
        
    except Exception as e:
        print(f"Error initializing sample data: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    init_sample_data()