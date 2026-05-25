import random, string
from datetime import datetime

from sqlalchemy import Column, String, Date, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from app.database import Base


def generate_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))


class Patient(Base):
    __tablename__ = "patients"

    id             = Column(String(15), primary_key=True, default=generate_id)
    nom            = Column(String(100), nullable=False)
    prenom         = Column(String(100), nullable=False)
    date_naissance = Column(Date,        nullable=True)
    sexe           = Column(
        Enum("M", "F", "autre", name="sexe_patient"),
        nullable=True,
    )
    groupe_sanguin = Column(String(5),   nullable=True)
    allergies      = Column(JSONB,       nullable=False, default=list)   # ["pénicilline", ...]
    antecedents    = Column(JSONB,       nullable=False, default=list)   # antécédents médicaux
    religion       = Column(String(100), nullable=True)
    telephone      = Column(String(20),  nullable=True)
    email          = Column(String(150), nullable=True)
    created_by     = Column(String(15),  ForeignKey("medecins.id", ondelete="SET NULL"), nullable=True)
    created_at     = Column(DateTime,    nullable=False, default=lambda: datetime.utcnow)

    # Relations
    createur      = relationship("Medecin",      back_populates="patients_crees", foreign_keys=[created_by])
    consultations = relationship("Consultation", back_populates="patient")
    acces         = relationship("AccesPatient", back_populates="patient", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Patient {self.id} — {self.prenom} {self.nom}>"
