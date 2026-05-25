import resend
from datetime import datetime, timedelta
from app.config import settings

resend.api_key = settings.RESEND_API_KEY

def send_activation_email(to_email: str, nom: str, token: str):
    lien = f"{settings.FRONTEND_URL}/activation?token={token}"
    expiry = (datetime.utcnow() + timedelta(days=7)).strftime('%d/%m/%Y')
    resend.Emails.send({
        "from":    settings.RESEND_FROM_EMAIL,
        "to":      to_email,
        "subject": " PneumoIA — Votre compte a été validé",
        "html": f"""
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#1d4ed8">Bonjour Dr {nom},</h2>
          <p>Votre dossier a été examiné et <strong>validé</strong> par notre équipe.</p>
          <p>Cliquez sur le bouton ci-dessous pour accéder à votre espace :</p>
          <a href="{lien}" style="display:inline-block;background:#2563eb;color:white;
             padding:12px 28px;border-radius:8px;text-decoration:none;
             font-weight:bold;margin:16px 0">
            Accéder à mon espace médecin
          </a>
          <p style="color:#6b7280;font-size:13px">
            ⚠️ Ce lien est valable jusqu'au <strong>{expiry}</strong>.<br>
            Après cette date, contactez l'administrateur.
          </p>
        </div>
        """
    })

def send_rejection_email(to_email: str, nom: str, motif: str):
    resend.Emails.send({
        "from":    settings.RESEND_FROM_EMAIL,
        "to":      to_email,
        "subject": " PneumoIA — Demande d'inscription refusée",
        "html": f"""
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#dc2626">Bonjour Dr {nom},</h2>
          <p>Après examen de votre dossier, votre demande d'inscription
             n'a pas pu être validée.</p>
          <div style="background:#fef2f2;border-left:4px solid #dc2626;
                      padding:12px 16px;border-radius:4px;margin:16px 0">
            <strong>Motif :</strong> {motif}
          </div>
          <p>Vous pouvez soumettre une nouvelle demande avec des documents corrigés.</p>
        </div>
        """
    })

def send_otp_email(to_email: str, nom: str, otp: str):
    resend.Emails.send({
        "from":    settings.RESEND_FROM_EMAIL,
        "to":      to_email,
        "subject": " PneumoIA — Votre code de connexion",
        "html": f"""
        <div style="font-family:sans-serif;max-width:500px;margin:auto">
          <h2 style="color:#1d4ed8">Bonjour Dr {nom},</h2>
          <p>Votre code de connexion à usage unique :</p>
          <div style="font-size:42px;font-weight:bold;color:#2563eb;
                      letter-spacing:10px;margin:24px 0;text-align:center">
            {otp}
          </div>
          <p style="color:#6b7280;font-size:13px">
             Ce code expire dans <strong>5 minutes</strong>.<br>
            Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
          </p>
        </div>
        """
    })