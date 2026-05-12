import os
from celery import Celery
from datetime import datetime, timezone
from sqlmodel import Session, select
from app.core.config import settings
from app.models.base import engine
from app.models.domain import User, Subscription, SubscriptionStatus, PaymentStatus, ActionType, ActivationLog

celery_app = Celery(
    "omnitrade",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task
def revoke_expired_access():
    """
    Checks for active users whose subscription has expired,
    revokes their access, and logs the action.
    """
    with Session(engine) as session:
        now = datetime.now(timezone.utc)
        
        # Find users who are active but their subscription_expires_at is in the past
        stmt = select(User).where(
            User.is_activated == True,
            User.subscription_expires_at != None,
            User.subscription_expires_at < now
        )
        
        expired_users = session.exec(stmt).all()
        
        for user in expired_users:
            user.is_activated = False
            user.subscription_status = SubscriptionStatus.inactive
            
            # Log action
            log = ActivationLog(
                user_id=user.id,
                action=ActionType.deactivated,
                reason="Subscription expired"
            )
            session.add(log)
            session.add(user)
            
            print(f"Revoked access for user {user.email}")
            
        session.commit()
