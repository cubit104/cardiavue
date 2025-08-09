from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime, date


class PatientBase(BaseModel):
    patient_id: str
    first_name: str
    last_name: str
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    medical_notes: Optional[str] = None
    clinic_id: Optional[int] = None


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    patient_id: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    medical_notes: Optional[str] = None
    clinic_id: Optional[int] = None
    is_active: Optional[bool] = None


class Patient(PatientBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None