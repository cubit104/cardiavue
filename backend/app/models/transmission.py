from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, Float, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db.session import Base


class Transmission(Base):
    __tablename__ = "transmissions"

    id = Column(Integer, primary_key=True, index=True)
    transmission_id = Column(String, unique=True, index=True, nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    device_type = Column(String, nullable=False)  # pacemaker, icd, crt, loop
    device_serial = Column(String)
    transmission_type = Column(String, default="scheduled")  # scheduled, emergency, follow_up
    heart_rate_avg = Column(Float)
    heart_rate_min = Column(Float)
    heart_rate_max = Column(Float)
    battery_level = Column(Float)
    impedance = Column(Float)
    arrhythmia_detected = Column(Boolean, default=False)
    alert_level = Column(String, default="normal")  # normal, warning, critical
    raw_data = Column(JSON)  # Store detailed transmission data
    notes = Column(Text)
    processed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    patient = relationship("Patient", back_populates="transmissions")