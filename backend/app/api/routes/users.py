from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.api.deps import get_current_user, get_session
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.models.domain import (
    ActionType,
    ActivationLog,
    PaymentStatus,
    Subscription,
    SubscriptionStatus,
    User,
)
from app.models.schemas import (
    BotAccessResponse,
    MessageResponse,
    PasswordUpdate,
    UserRead,
    UserUpdate,
)

router = APIRouter()


def sync_user_subscription_state(user: User, session: Session) -> User:
    now = datetime.now(timezone.utc)

    latest_subscription = session.exec(
        select(Subscription)
        .where(
            Subscription.user_id == user.id,
            Subscription.status == PaymentStatus.completed,
        )
        .order_by(Subscription.expires_at.desc())
    ).first()

    if latest_subscription:
        user.subscription_expires_at = latest_subscription.expires_at

        if latest_subscription.expires_at and latest_subscription.expires_at < now:
            if user.subscription_status != SubscriptionStatus.inactive:
                user.subscription_status = SubscriptionStatus.inactive
                user.is_activated = False
                session.add(
                    ActivationLog(
                        user_id=user.id,
                        action=ActionType.deactivated,
                        reason="expired_runtime_check",
                    )
                )
        elif user.is_activated and user.subscription_status != SubscriptionStatus.suspended:
            user.subscription_status = SubscriptionStatus.active

    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/me", response_model=UserRead)
def read_me(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> User:
    return sync_user_subscription_state(current_user, session)


@router.patch("/me", response_model=UserRead)
def update_me(
    payload: UserUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> User:
    updates = payload.model_dump(exclude_unset=True)

    if "email" in updates and updates["email"] != current_user.email:
        existing = session.exec(select(User).where(User.email == updates["email"])).first()
        if existing:
            raise HTTPException(status_code=400, detail="Cet email est déjà utilisé.")

    for field, value in updates.items():
        setattr(current_user, field, value)

    current_user.updated_at = datetime.now(timezone.utc)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user


@router.patch("/me/password", response_model=MessageResponse)
def update_password(
    payload: PasswordUpdate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> MessageResponse:
    if not verify_password(payload.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Mot de passe actuel incorrect.")

    current_user.hashed_password = get_password_hash(payload.new_password)
    current_user.updated_at = datetime.now(timezone.utc)
    session.add(current_user)
    session.commit()

    return MessageResponse(message="Mot de passe mis à jour.")


@router.get("/me/bot-access", response_model=BotAccessResponse)
def get_bot_access(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> BotAccessResponse:
    current_user = sync_user_subscription_state(current_user, session)

    if (
        not current_user.is_activated
        or current_user.subscription_status != SubscriptionStatus.active
        or not current_user.subscription_expires_at
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Abonnement inactif ou expiré.",
        )

    return BotAccessResponse(
        bot_link=settings.TELEGRAM_BOT_LINK,
        expires_at=current_user.subscription_expires_at,
    )
