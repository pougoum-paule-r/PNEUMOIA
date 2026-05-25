import secrets, random, string, bcrypt
from datetime import datetime, timedelta
from jose import jwt
from app.config import settings

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(data: dict, expires_minutes: int = None) -> str:
    payload = data.copy()
    expire  = datetime.utcnow() + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    payload["exp"] = expire
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

def generate_activation_token() -> str:
    return secrets.token_urlsafe(32)

def generate_otp() -> str:
    return ''.join(random.choices(string.digits, k=6))