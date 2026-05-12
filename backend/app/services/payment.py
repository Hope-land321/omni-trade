import hashlib
import hmac
import uuid
from app.core.config import settings
from app.models.domain import PaymentProvider

def generate_checkout_link(plan: str, amount: int, provider: PaymentProvider, user_id: uuid.UUID) -> tuple[str, str]:
    """
    Generates a checkout link for the given provider.
    Returns a tuple of (checkout_url, payment_ref).
    """
    # Generate a unique payment reference
    payment_ref = f"OMNI-{uuid.uuid4().hex[:12].upper()}"
    
    # Mock checkout generation
    # In a real app, you would call FedaPay / KiaPay API here to get the URL
    if provider == PaymentProvider.fedapay:
        checkout_url = f"https://sandbox.fedapay.com/checkout/{payment_ref}"
    elif provider == PaymentProvider.kiapay:
        checkout_url = f"https://sandbox.kiapay.com/checkout/{payment_ref}"
    else:
        checkout_url = f"https://omni-trade.local/mock-checkout/{payment_ref}"
        
    return checkout_url, payment_ref

def verify_fedapay_webhook(payload: bytes, signature: str) -> bool:
    """
    Verify FedaPay webhook signature.
    """
    if not settings.FEDAPAY_WEBHOOK_SECRET:
        return True # Mock return for dev
    
    expected_signature = hmac.new(
        settings.FEDAPAY_WEBHOOK_SECRET.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, signature)

def verify_kiapay_webhook(payload: bytes, signature: str) -> bool:
    """
    Verify KiaPay webhook signature.
    """
    if not settings.KIAPAY_WEBHOOK_SECRET:
        return True # Mock return for dev
    
    expected_signature = hmac.new(
        settings.KIAPAY_WEBHOOK_SECRET.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, signature)
