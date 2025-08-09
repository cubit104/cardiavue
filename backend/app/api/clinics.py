from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..db.session import get_db
from ..schemas.clinic import Clinic, ClinicCreate, ClinicUpdate
from ..schemas.user import User
from ..services import clinic as clinic_service
from .auth import get_current_user

router = APIRouter()


@router.get("/", response_model=List[Clinic])
def read_clinics(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of clinics."""
    clinics = clinic_service.get_clinics(db, skip=skip, limit=limit)
    return clinics


@router.get("/{clinic_id}", response_model=Clinic)
def read_clinic(
    clinic_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get clinic by ID."""
    clinic = clinic_service.get_clinic(db, clinic_id=clinic_id)
    if clinic is None:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return clinic


@router.post("/", response_model=Clinic)
def create_clinic(
    clinic: ClinicCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create new clinic. Requires admin role."""
    if current_user.role not in ["admin", "doctor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return clinic_service.create_clinic(db=db, clinic=clinic)


@router.put("/{clinic_id}", response_model=Clinic)
def update_clinic(
    clinic_id: int,
    clinic_update: ClinicUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update clinic. Requires admin role."""
    if current_user.role not in ["admin", "doctor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    clinic = clinic_service.update_clinic(db, clinic_id, clinic_update)
    if clinic is None:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return clinic


@router.delete("/{clinic_id}", response_model=Clinic)
def delete_clinic(
    clinic_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete clinic. Requires admin role."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    clinic = clinic_service.delete_clinic(db, clinic_id)
    if clinic is None:
        raise HTTPException(status_code=404, detail="Clinic not found")
    return clinic