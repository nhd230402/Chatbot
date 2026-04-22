from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth.security import create_access_token, hash_password, verify_password
from database import get_db
from schemas import AuthResponse, LoginRequest, RegisterRequest
from services.user_service import create_user, get_user_by_email

router = APIRouter(tags=["auth"])


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    password_hash = hash_password(payload.password)
    user = create_user(db, payload.email, password_hash)
    token = create_access_token(str(user.id), user.email)

    return AuthResponse(token=token, user_id=str(user.id), email=user.email)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(str(user.id), user.email)
    return AuthResponse(token=token, user_id=str(user.id), email=user.email)
