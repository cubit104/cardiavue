from sqlalchemy.orm import Session
from typing import Optional, List
from ..models.clinic import Clinic
from ..schemas.clinic import ClinicCreate, ClinicUpdate


def get_clinic(db: Session, clinic_id: int) -> Optional[Clinic]:
    """Get clinic by ID."""
    return db.query(Clinic).filter(Clinic.id == clinic_id).first()


def get_clinics(db: Session, skip: int = 0, limit: int = 100) -> List[Clinic]:
    """Get list of clinics."""
    return db.query(Clinic).offset(skip).limit(limit).all()


def create_clinic(db: Session, clinic: ClinicCreate) -> Clinic:
    """Create new clinic."""
    db_clinic = Clinic(**clinic.model_dump())
    db.add(db_clinic)
    db.commit()
    db.refresh(db_clinic)
    return db_clinic


def update_clinic(db: Session, clinic_id: int, clinic_update: ClinicUpdate) -> Optional[Clinic]:
    """Update clinic."""
    db_clinic = get_clinic(db, clinic_id)
    if not db_clinic:
        return None
    
    update_data = clinic_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_clinic, key, value)
    
    db.commit()
    db.refresh(db_clinic)
    return db_clinic


def delete_clinic(db: Session, clinic_id: int) -> Optional[Clinic]:
    """Delete clinic (soft delete by setting is_active to False)."""
    db_clinic = get_clinic(db, clinic_id)
    if not db_clinic:
        return None
    
    db_clinic.is_active = False
    db.commit()
    db.refresh(db_clinic)
    return db_clinic