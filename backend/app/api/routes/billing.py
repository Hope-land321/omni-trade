import random
import string
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlmodel import Session, select
from typing import Any

from app.api.deps import get_current_user, get_session
from app.models.domain import User, Subscription, SubscriptionStatus, PaymentProvider, PaymentStatus, ActionType, ActivationLog
from app.models.schemas import ActivateRequest, CheckoutRequest, CheckoutResponse, MessageResponse, SubscriptionRead
from app.services.payment import generate_checkout_link, verify_fedapay_webhook, verify_kiapay_webhook
from app.services.email import send_activation_email

router = APIRouter()

PLAN_PRICES = {
    "starter": 4900,
    "pro": 9900,
    "elite": 19900,
}

def generate_activation_code() -> str:
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

@router.post("/checkout", response_model=CheckoutResponse)
def checkout(
    request: CheckoutRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
) -> Any:
    """
    Generate a checkout link for a selected plan.
    """
    plan = request.plan.lower()
    if plan not in PLAN_PRICES:
        raise HTTPException(status_code=400, detail="Invalid plan selected")
        
    try:
        provider = PaymentProvider(request.payment_provider.lower())
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payment provider")
        
    amount = PLAN_PRICES[plan]
    
    checkout_url, payment_ref = generate_checkout_link(
        plan=plan, 
        amount=amount, 
        provider=provider, 
        user_id=current_user.id
    )
    
    subscription = Subscription(
        user_id=current_user.id,
        plan=plan,
        amount=amount,
        payment_provider=provider,
        payment_ref=payment_ref,
        status=PaymentStatus.pending
    )
    session.add(subscription)
    session.commit()
    
    return CheckoutResponse(checkout_url=checkout_url, payment_ref=payment_ref)


def process_successful_payment(payment_ref: str, session: Session):
    stmt = select(Subscription).where(Subscription.payment_ref == payment_ref)
    subscription = session.exec(stmt).first()

    if not subscription:
        return

    if subscription.status == PaymentStatus.completed:
        return

    subscription.status = PaymentStatus.completed
    subscription.starts_at = datetime.now(timezone.utc)
    subscription.expires_at = datetime.now(timezone.utc) + timedelta(days=30)
    session.add(subscription)

    user = session.get(User, subscription.user_id)
    if user:
        code = generate_activation_code()
        user.activation_code = code
        user.activation_code_exp = datetime.now(timezone.utc) + timedelta(hours=24)
        session.add(user)

        log = ActivationLog(
            user_id=user.id,
            action=ActionType.renewed if user.is_activated else ActionType.activated,
            reason=f"payment_received:{payment_ref}"
        )
        session.add(log)

        send_activation_email(user.email, code)

    session.commit()


@router.post("/webhook/fedapay")
async def fedapay_webhook(request: Request, session: Session = Depends(get_session)):
    """
    Webhook for FedaPay.
    """
    payload = await request.body()
    signature = request.headers.get("x-fedapay-signature", "")
    
    if not verify_fedapay_webhook(payload, signature):
        raise HTTPException(status_code=400, detail="Invalid signature")
        
    data = await request.json()
    
    event_type = data.get("name")
    if event_type == "transaction.approved":
        transaction = data.get("entity", {})
        custom_metadata = transaction.get("custom_metadata", {})
        payment_ref = custom_metadata.get("payment_ref")

        if payment_ref:
            process_successful_payment(payment_ref, session)

    return {"status": "success"}

@router.post("/webhook/kiapay")
async def kiapay_webhook(request: Request, session: Session = Depends(get_session)):
    """
    Webhook for KiaPay.
    """
    payload = await request.body()
    signature = request.headers.get("x-kiapay-signature", "")
    
    if not verify_kiapay_webhook(payload, signature):
        raise HTTPException(status_code=400, detail="Invalid signature")
        
    data = await request.json()
    
    payment_status = data.get("status")
    if payment_status == "success":
        payment_ref = data.get("transaction_id")
        if payment_ref:
            process_successful_payment(payment_ref, session)

    return {"status": "success"}


@router.post("/activate")
def activate_account(
    request: ActivateRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
) -> Any:
    if not current_user.activation_code:
        raise HTTPException(status_code=400, detail="No pending activation")

    if current_user.activation_code != request.activation_code:
        raise HTTPException(status_code=400, detail="Invalid activation code")

    if current_user.activation_code_exp and current_user.activation_code_exp < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Activation code expired")

    current_user.is_activated = True
    current_user.subscription_status = SubscriptionStatus.active

    stmt = select(Subscription).where(
        Subscription.user_id == current_user.id,
        Subscription.status == PaymentStatus.completed
    ).order_by(Subscription.expires_at.desc())

    latest_sub = session.exec(stmt).first()
    if latest_sub:
        current_user.subscription_expires_at = latest_sub.expires_at

    current_user.activation_code = None
    current_user.activation_code_exp = None
    current_user.updated_at = datetime.now(timezone.utc)

    session.add(current_user)
    session.add(
        ActivationLog(
            user_id=current_user.id,
            action=ActionType.activated,
            reason="activation_code_validated",
        )
    )
    session.commit()

    return {"message": "Account successfully activated", "subscription_status": current_user.subscription_status}


@router.post("/resend-code", response_model=MessageResponse)
def resend_activation_code(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> MessageResponse:
    latest_subscription = session.exec(
        select(Subscription)
        .where(
            Subscription.user_id == current_user.id,
            Subscription.status == PaymentStatus.completed,
        )
        .order_by(Subscription.expires_at.desc())
    ).first()

    if not latest_subscription:
        raise HTTPException(status_code=400, detail="Aucun abonnement payé trouvé.")

    current_user.activation_code = generate_activation_code()
    current_user.activation_code_exp = datetime.now(timezone.utc) + timedelta(hours=24)
    current_user.updated_at = datetime.now(timezone.utc)
    session.add(current_user)
    session.commit()

    send_activation_email(current_user.email, current_user.activation_code)
    return MessageResponse(message="Un nouveau code d'activation a été envoyé.")


@router.get("/subscriptions", response_model=list[SubscriptionRead])
def list_subscriptions(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> list[Subscription]:
    return session.exec(
        select(Subscription)
        .where(Subscription.user_id == current_user.id)
        .order_by(Subscription.created_at.desc())
    ).all()
