import os, shutil, uuid, random, string
from datetime import datetime, timedelta
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.medecin          import Medecin
from app.models.document_medecin import DocumentMedecin
from app.models.otp              import OTPCode
from app.schemas.auth            import (LoginRequest, OTPVerifyRequest,
                                          TokenResponse, MessageResponse)
from app.core.security           import (hash_password, verify_password,
                                          create_access_token,
                                          generate_activation_token,
                                          generate_otp)
from app.services.email_service  import send_otp_email
from app.services.sms_service    import notify_admin_new_medecin
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])

# ── Constantes ────────────────────────────────────────────────
UPLOAD_DIR          = Path(settings.UPLOAD_DIR)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

PHOTO_MAX_SIZE      = 2 * 1024 * 1024          # 2 Mo
DOCUMENT_MAX_SIZE   = 5 * 1024 * 1024          # 5 Mo
PHOTO_TYPES_AUTORISES  = {"image/jpeg", "image/png", "image/webp"}
DOC_TYPES_AUTORISES    = {
    "application/pdf",
    "image/jpeg", "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

def generate_doc_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))

def valider_photo(photo: UploadFile):
    """Vérifie type et taille de la photo de profil."""
    if photo.content_type not in PHOTO_TYPES_AUTORISES:
        raise HTTPException(
            400,
            f"Format photo non accepté : {photo.content_type}. "
            f"Acceptés : JPG, PNG, WEBP"
        )
    # Lire pour vérifier la taille
    contenu = photo.file.read()
    if len(contenu) > PHOTO_MAX_SIZE:
        raise HTTPException(
            400,
            f"Photo trop lourde ({len(contenu)//1024} Ko). Maximum : 2 Mo"
        )
    # Remettre le curseur au début pour la sauvegarde
    photo.file.seek(0)
    return contenu

def valider_document(fichier: UploadFile, nom_doc: str):
    """Vérifie type et taille d'un document."""
    if fichier.content_type not in DOC_TYPES_AUTORISES:
        raise HTTPException(
            400,
            f"Format non accepté pour '{nom_doc}' : {fichier.content_type}. "
            f"Acceptés : PDF, JPG, PNG, DOCX"
        )
    contenu = fichier.file.read()
    if len(contenu) > DOCUMENT_MAX_SIZE:
        raise HTTPException(
            400,
            f"Fichier '{nom_doc}' trop lourd ({len(contenu)//1024} Ko). Maximum : 5 Mo"
        )
    fichier.file.seek(0)
    return contenu


# ─────────────────────────────────────────────────────────────
#  POST /api/v1/auth/register
# ─────────────────────────────────────────────────────────────
@router.post("/register", response_model=MessageResponse, status_code=201)
async def register(
    # ── Champs texte ──
    civilite:      str = Form(...),
    nom:           str = Form(...),
    prenom:        str = Form(...),
    specialite:    str = Form(...),
    numero_rpps:   str = Form(...),
    etablissement: str = Form(""),
    email:         str = Form(...),
    password:      str = Form(...),
    # ── Photo de profil (obligatoire) ──
    photo_profil:           UploadFile = File(...),
    # ── 6 documents obligatoires ──
    diplome_specialisation: UploadFile = File(...),
    diplome_medecine:       UploadFile = File(...),
    inscription_ordre:      UploadFile = File(...),
    autorisation_exercice:  UploadFile = File(...),
    carte_professionnelle:  UploadFile = File(...),
    cni:                    UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    # ── 1. Vérifications unicité ──────────────────────────────
    existing_email = await db.execute(
        select(Medecin).where(Medecin.email == email)
    )
    if existing_email.scalar_one_or_none():
        raise HTTPException(400, "Cet email est déjà utilisé")

    existing_rpps = await db.execute(
        select(Medecin).where(Medecin.numero_rpps == numero_rpps)
    )
    if existing_rpps.scalar_one_or_none():
        raise HTTPException(400, "Ce numéro RPPS est déjà enregistré")

    # ── 2. Validation photo + documents (taille & type) ───────
    valider_photo(photo_profil)

    documents_a_sauvegarder = {
        "diplome_specialisation": diplome_specialisation,
        "diplome_medecine":       diplome_medecine,
        "inscription_ordre":      inscription_ordre,
        "autorisation_exercice":  autorisation_exercice,
        "carte_professionnelle":  carte_professionnelle,
        "cni":                    cni,
    }
    for nom_doc, fichier in documents_a_sauvegarder.items():
        valider_document(fichier, nom_doc)

    # ── 3. Créer le médecin (flush pour obtenir l'ID PNEU-) ───
    medecin = Medecin(
        civilite=civilite,
        nom=nom,
        prenom=prenom,
        email=email,
        password_hash=hash_password(password),
        specialite=specialite,
        numero_rpps=numero_rpps,
        etablissement=etablissement,
        statut="en_attente",
    )
    db.add(medecin)
    await db.flush()  # génère l'ID PNEU-XXXXXXX

    # ── 4. Sauvegarder la photo de profil ─────────────────────
    dossier_medecin = UPLOAD_DIR / medecin.id
    dossier_medecin.mkdir(parents=True, exist_ok=True)

    ext_photo   = Path(photo_profil.filename).suffix.lower()
    nom_photo   = f"photo_profil{ext_photo}"
    chemin_photo = dossier_medecin / nom_photo

    with open(chemin_photo, "wb") as f:
        shutil.copyfileobj(photo_profil.file, f)

    # Mettre à jour photo_url sur le médecin
    medecin.photo_url = str(chemin_photo)

    # ── 5. Sauvegarder les 6 documents ────────────────────────
    dossier_docs = dossier_medecin / "documents"
    dossier_docs.mkdir(parents=True, exist_ok=True)

    for type_doc, fichier in documents_a_sauvegarder.items():
        extension   = Path(fichier.filename).suffix.lower()
        nom_fichier = f"{type_doc}{extension}"
        chemin      = dossier_docs / nom_fichier

        with open(chemin, "wb") as f:
            shutil.copyfileobj(fichier.file, f)

        doc = DocumentMedecin(
            id=generate_doc_id(),
            medecin_id=medecin.id,
            type_document=type_doc,
            url_fichier=str(chemin),
            nom_fichier=fichier.filename,
            taille_octets=fichier.size,
            mime_type=fichier.content_type,
        )
        db.add(doc)

    # ── 6. Commit tout en BD ───────────────────────────────────
    await db.commit()

    # ── 7. SMS à l'admin ───────────────────────────────────────
    try:
        notify_admin_new_medecin(nom, prenom, specialite)
    except Exception as e:
        print(f"⚠️ SMS non envoyé : {e}")

    return {
        "message": (
            f"Dossier de Dr {prenom} {nom} soumis avec succès. "
            f"Votre identifiant est {medecin.id}. "
            f"Vous serez notifié par email sous 24-48h."
        )
    }


# ─────────────────────────────────────────────────────────────
#  POST /api/v1/auth/login  (étape 1)
# ─────────────────────────────────────────────────────────────
@router.post("/login", response_model=MessageResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    result  = await db.execute(select(Medecin).where(Medecin.email == body.email))
    medecin = result.scalar_one_or_none()

    if not medecin or not verify_password(body.password, medecin.password_hash):
        raise HTTPException(401, "Email ou mot de passe incorrect")

    if medecin.statut == "en_attente":
        raise HTTPException(403, "Votre compte est en attente de validation par l'administrateur")
    if medecin.statut == "rejete":
        raise HTTPException(403, "Votre inscription a été refusée. Vérifiez votre email.")
    if medecin.statut == "suspendu":
        raise HTTPException(403, "Votre compte est suspendu. Contactez l'administrateur.")

    # Générer OTP
    otp    = generate_otp()
    expiry = datetime.utcnow() + timedelta(minutes=5)

    otp_entry = OTPCode(
        id=generate_doc_id(),
        medecin_id=medecin.id,
        code=otp,
        expires_at=expiry,
        used=False,
    )
    db.add(otp_entry)
    await db.commit()

    try:
        send_otp_email(medecin.email, medecin.nom, otp)
    except Exception as e:
        print(f"⚠️ Email OTP non envoyé : {e}")
        raise HTTPException(500, "Erreur lors de l'envoi du code OTP. Réessayez.")

    return {
        "message":    "Code OTP envoyé à votre email. Valable 5 minutes.",
        "medecin_id": str(medecin.id)
    }


# ─────────────────────────────────────────────────────────────
#  POST /api/v1/auth/verify-otp  (étape 2)
# ─────────────────────────────────────────────────────────────
@router.post("/verify-otp", response_model=TokenResponse)
async def verify_otp(body: OTPVerifyRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(OTPCode)
        .where(OTPCode.medecin_id == body.medecin_id)
        .where(OTPCode.code       == body.code)
        .where(OTPCode.used       == False)
        .order_by(OTPCode.created_at.desc())
        .limit(1)
    )
    otp_entry = result.scalar_one_or_none()

    if not otp_entry:
        raise HTTPException(401, "Code OTP incorrect")
    if datetime.utcnow() > otp_entry.expires_at:
        raise HTTPException(401, "Code OTP expiré. Reconnectez-vous pour en recevoir un nouveau.")

    otp_entry.used = True
    await db.commit()

    token = create_access_token({"sub": str(body.medecin_id), "role": "medecin"})
    return {"access_token": token, "token_type": "bearer"}


# ─────────────────────────────────────────────────────────────
#  GET /api/v1/auth/activate?token=xxx
# ─────────────────────────────────────────────────────────────
@router.get("/activate", response_model=MessageResponse)
async def activate_account(token: str, db: AsyncSession = Depends(get_db)):
    result  = await db.execute(
        select(Medecin).where(Medecin.activation_token == token)
    )
    medecin = result.scalar_one_or_none()

    if not medecin:
        raise HTTPException(400, "Lien invalide ou déjà utilisé")
    if medecin.statut != "valide":
        raise HTTPException(403, "Compte non validé par l'administrateur")
    if datetime.utcnow() > medecin.activation_expires:
        raise HTTPException(400, "Ce lien a expiré (7 jours). Contactez l'administrateur.")

    return {"message": "Compte activé. Vous pouvez maintenant vous connecter."}