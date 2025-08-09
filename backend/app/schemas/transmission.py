from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime


class TransmissionBase(BaseModel):
    transmission_id: str
    patient_id: int
    device_type: str
    device_serial: Optional[str] = None
    transmission_type: str = "scheduled"
    heart_rate_avg: Optional[float] = None
    heart_rate_min: Optional[float] = None
    heart_rate_max: Optional[float] = None
    battery_level: Optional[float] = None
    impedance: Optional[float] = None
    arrhythmia_detected: bool = False
    alert_level: str = "normal"
    raw_data: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None


class TransmissionCreate(TransmissionBase):
    pass


class TransmissionUpdate(BaseModel):
    transmission_id: Optional[str] = None
    patient_id: Optional[int] = None
    device_type: Optional[str] = None
    device_serial: Optional[str] = None
    transmission_type: Optional[str] = None
    heart_rate_avg: Optional[float] = None
    heart_rate_min: Optional[float] = None
    heart_rate_max: Optional[float] = None
    battery_level: Optional[float] = None
    impedance: Optional[float] = None
    arrhythmia_detected: Optional[bool] = None
    alert_level: Optional[str] = None
    raw_data: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None
    processed: Optional[bool] = None


class Transmission(TransmissionBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    processed: bool
    created_at: datetime
    updated_at: Optional[datetime] = None