from enum import Enum
from typing import Optional, List
from uuid import UUID, uuid4
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Relationship

class UserRole(str, Enum):
    user = "user"
    admin = "admin"

class SubscriptionStatus(str, Enum):
    pending = "pending"
    active = "active"
    inactive = "inactive"
    suspended = "suspended"

class PaymentProvider(str, Enum):
    kiapay = "kiapay"
    fedapay = "fedapay"

class PaymentStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"
    refunded = "refunded"

class ActionType(str, Enum):
    activated = "activated"
    deactivated = "deactivated"
    renewed = "renewed"
    suspended = "suspended"

def utc_now():
    return datetime.now(timezone.utc)

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    full_name: str = Field(max_length=100)
    email: str = Field(max_length=255, unique=True, index=True)
    hashed_password: str = Field(max_length=255)
    role: UserRole = Field(default=UserRole.user)
    
    subscription_status: SubscriptionStatus = Field(default=SubscriptionStatus.pending)
    subscription_expires_at: Optional[datetime] = None
    
    activation_code: Optional[str] = Field(default=None, max_length=6)
    activation_code_exp: Optional[datetime] = None
    is_activated: bool = Field(default=False)
    
    telegram_chat_id: Optional[str] = Field(default=None, max_length=50)
    two_fa_secret: Optional[str] = Field(default=None, max_length=100)
    two_fa_enabled: bool = Field(default=False)
    
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)

class Subscription(SQLModel, table=True):
    __tablename__ = "subscriptions"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    plan: str = Field(max_length=50)
    amount: int
    currency: str = Field(default="XOF", max_length=3)
    payment_provider: PaymentProvider
    payment_ref: str = Field(max_length=100)
    status: PaymentStatus = Field(default=PaymentStatus.pending)
    
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=utc_now)

class ActivationLog(SQLModel, table=True):
    __tablename__ = "activation_logs"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id")
    action: ActionType
    reason: str
    performed_at: datetime = Field(default_factory=utc_now)
