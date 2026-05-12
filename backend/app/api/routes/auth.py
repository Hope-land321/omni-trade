from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.api.deps import get_session, get_current_user
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.models.domain import User, UserRole
from app.models.schemas import RegisterResponse, Token, UserCreate

router = APIRouter()

@router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == user_in.email)).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="Cet email est déjà utilisé.",
        )

    if len(user_in.password) < 8 or not any(character.isupper() for character in user_in.password) or not any(character.isdigit() for character in user_in.password):
        raise HTTPException(
            status_code=400,
            detail="Le mot de passe doit contenir 8 caractères, une majuscule et un chiffre.",
        )

    user_data = user_in.model_dump(exclude={"password"})
    user_data["hashed_password"] = get_password_hash(user_in.password)
    db_user = User(**user_data)

    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    return {
        "user": db_user,
        "access_token": create_access_token(db_user.id),
        "refresh_token": create_refresh_token(db_user.id),
        "token_type": "bearer",
    }

@router.post("/login", response_model=Token)
def login(
    session: Session = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email ou mot de passe incorrect",
        )

    return {
        "access_token": create_access_token(user.id),
        "refresh_token": create_refresh_token(user.id),
        "token_type": "bearer",
    }
