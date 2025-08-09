from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from ..db.session import get_db
from ..schemas.patient import Patient, PatientCreate, PatientUpdate
from ..schemas.user import User
from ..models.patient import Patient as PatientModel
from .auth import get_current_user

router = APIRouter()


def get_patient(db: Session, patient_id: int) -> Optional[PatientModel]:
    """Get patient by ID."""
    return db.query(PatientModel).filter(PatientModel.id == patient_id).first()


def get_patients(db: Session, skip: int = 0, limit: int = 100) -> List[PatientModel]:
    """Get list of patients."""
    return db.query(PatientModel).offset(skip).limit(limit).all()


def create_patient(db: Session, patient: PatientCreate) -> PatientModel:
    """Create new patient."""
    db_patient = PatientModel(**patient.model_dump())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def update_patient(db: Session, patient_id: int, patient_update: PatientUpdate) -> Optional[PatientModel]:
    """Update patient."""
    db_patient = get_patient(db, patient_id)
    if not db_patient:
        return None
    
    update_data = patient_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_patient, key, value)
    
    db.commit()
    db.refresh(db_patient)
    return db_patient


@router.get("/", response_model=List[Patient])
def read_patients(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of patients."""
    patients = get_patients(db, skip=skip, limit=limit)
    return patients


@router.get("/{patient_id}", response_model=Patient)
def read_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get patient by ID."""
    patient = get_patient(db, patient_id=patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.post("/", response_model=Patient)
def create_patient_endpoint(
    patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create new patient."""
    return create_patient(db=db, patient=patient)


@router.put("/{patient_id}", response_model=Patient)
def update_patient_endpoint(
    patient_id: int,
    patient_update: PatientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update patient."""
    patient = update_patient(db, patient_id, patient_update)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.delete("/{patient_id}", response_model=Patient)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete patient (soft delete)."""
    if current_user.role not in ["admin", "doctor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    patient = get_patient(db, patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient.is_active = False
    db.commit()
    db.refresh(patient)
    return patient