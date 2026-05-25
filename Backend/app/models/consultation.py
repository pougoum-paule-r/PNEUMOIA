import random, string
from datetime import datetime

from sqlalchemy import Column, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from app.database import Base


def generate_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))


class Consultation(Base):
    __tablename__ = "consultations"

    id              = Column(String(15), primary_key=True, default=generate_id)
    patient_id      = Column(String(15), ForeignKey("patients.id",  ondelete="RESTRICT"), nullable=False)
    medecin_id      = Column(String(15), ForeignKey("medecins.id",  ondelete="RESTRICT"), nullable=False)
    symptomes       = Column(JSONB,      nullable=False)
    # Exemple: {toux: true, fievre: 3, dyspnee: "moderee", saturation: 94, ...}
    statut          = Column(
        Enum("en_attente", "terminee", name="statut_consultation"),
        nullable=False,
        default="en_attente",
    )
    avis_medecin    = Column(Text,     nullable=True)
    prescriptions   = Column(JSONB,    nullable=False, default=list)   # [{medicament, dose, duree}, ...]
    recommandations = Column(Text,     nullable=True)
    prochain_rdv    = Column(DateTime, nullable=True)
    partage         = Column(JSONB,    nullable=False, default=dict)
    # Exemple: {actif: true, communaute_id: "...", public: false}
    created_at      = Column(DateTime, nullable=False, default=lambda: datetime.utcnow)
    updated_at      = Column(DateTime, nullable=True,  onupdate=lambda: datetime.utcnow)

    # Relations
    patient      = relationship("Patient",      back_populates="consultations")
    medecin      = relationship("Medecin",      back_populates="consultations", foreign_keys=[medecin_id])
    diagnostic   = relationship("DiagnosticIA", back_populates="consultation",  uselist=False, cascade="all, delete-orphan")
    publications = relationship("Publication",  back_populates="consultation")

    def __repr__(self):
        return f"<Consultation {self.id} statut={self.statut}>"
