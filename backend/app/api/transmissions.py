from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime

from ..db.session import get_db
from ..schemas.transmission import Transmission, TransmissionCreate, TransmissionUpdate
from ..schemas.user import User
from ..models.transmission import Transmission as TransmissionModel
from .auth import get_current_user

router = APIRouter()


def get_transmission(db: Session, transmission_id: int) -> Optional[TransmissionModel]:
    """Get transmission by ID."""
    return db.query(TransmissionModel).filter(TransmissionModel.id == transmission_id).first()


def get_transmissions(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    patient_id: Optional[int] = None,
    alert_level: Optional[str] = None
) -> List[TransmissionModel]:
    """Get list of transmissions with filters."""
    query = db.query(TransmissionModel)
    
    if patient_id:
        query = query.filter(TransmissionModel.patient_id == patient_id)
    
    if alert_level:
        query = query.filter(TransmissionModel.alert_level == alert_level)
    
    return query.order_by(TransmissionModel.created_at.desc()).offset(skip).limit(limit).all()


def create_transmission(db: Session, transmission: TransmissionCreate) -> TransmissionModel:
    """Create new transmission."""
    db_transmission = TransmissionModel(**transmission.model_dump())
    db.add(db_transmission)
    db.commit()
    db.refresh(db_transmission)
    return db_transmission


def update_transmission(db: Session, transmission_id: int, transmission_update: TransmissionUpdate) -> Optional[TransmissionModel]:
    """Update transmission."""
    db_transmission = get_transmission(db, transmission_id)
    if not db_transmission:
        return None
    
    update_data = transmission_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_transmission, key, value)
    
    db.commit()
    db.refresh(db_transmission)
    return db_transmission


@router.get("/", response_model=List[Transmission])
def read_transmissions(
    skip: int = 0,
    limit: int = 100,
    patient_id: Optional[int] = Query(None),
    alert_level: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of transmissions with optional filters."""
    transmissions = get_transmissions(
        db, skip=skip, limit=limit, 
        patient_id=patient_id, alert_level=alert_level
    )
    return transmissions


@router.get("/{transmission_id}", response_model=Transmission)
def read_transmission(
    transmission_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get transmission by ID."""
    transmission = get_transmission(db, transmission_id=transmission_id)
    if transmission is None:
        raise HTTPException(status_code=404, detail="Transmission not found")
    return transmission


@router.post("/", response_model=Transmission)
def create_transmission_endpoint(
    transmission: TransmissionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create new transmission."""
    return create_transmission(db=db, transmission=transmission)


@router.put("/{transmission_id}", response_model=Transmission)
def update_transmission_endpoint(
    transmission_id: int,
    transmission_update: TransmissionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update transmission."""
    transmission = update_transmission(db, transmission_id, transmission_update)
    if transmission is None:
        raise HTTPException(status_code=404, detail="Transmission not found")
    return transmission


@router.get("/stats/dashboard")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get dashboard statistics for frontend."""
    # Get transmission counts by alert level
    critical_alerts = db.query(TransmissionModel).filter(
        TransmissionModel.alert_level == "critical"
    ).count()
    
    # Get today's transmissions
    today = datetime.now().date()
    transmissions_today = db.query(TransmissionModel).filter(
        TransmissionModel.created_at >= today
    ).count()
    
    # Get alerts today (warning + critical)
    alerts_today = db.query(TransmissionModel).filter(
        TransmissionModel.created_at >= today,
        TransmissionModel.alert_level.in_(["warning", "critical"])
    ).count()
    
    # Get device type distribution
    device_stats = db.query(
        TransmissionModel.device_type,
        func.count(TransmissionModel.id)
    ).group_by(TransmissionModel.device_type).all()
    
    device_types = {
        "pacemaker": 0,
        "icd": 0,
        "crt": 0,
        "loop": 0
    }
    
    for device_type, count in device_stats:
        if device_type in device_types:
            device_types[device_type] = count
    
    # Get total patients and active devices from database
    from ..models.patient import Patient
    total_patients = db.query(Patient).filter(Patient.is_active == True).count()
    active_devices = db.query(TransmissionModel).distinct(TransmissionModel.device_serial).count()
    
    return {
        "totalPatients": total_patients,
        "activeDevices": active_devices,
        "alertsToday": alerts_today,
        "transmissionsToday": transmissions_today,
        "criticalAlerts": critical_alerts,
        "deviceTypes": device_types
    }