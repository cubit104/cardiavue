from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Date
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.session import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, unique=True, index=True, nullable=False)  # Medical record number
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    date_of_birth = Column(Date)
    gender = Column(String)
    phone = Column(String)
    email = Column(String)
    address = Column(Text)
    emergency_contact = Column(String)
    emergency_phone = Column(String)
    medical_notes = Column(Text)
    clinic_id = Column(Integer, ForeignKey("clinics.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    clinic = relationship("Clinic")
    transmissions = relationship("Transmission", back_populates="patient")