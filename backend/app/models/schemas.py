from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict, EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    full_name: str
    email: str
    role: str
    is_activated: bool
    subscription_status: str
    subscription_expires_at: Optional[datetime] = None
    two_fa_enabled: bool = False

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str

class RegisterResponse(BaseModel):
    user: UserRead
    access_token: str
    refresh_token: str
    token_type: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class CheckoutRequest(BaseModel):
    plan: str
    payment_provider: str

class CheckoutResponse(BaseModel):
    checkout_url: str
    payment_ref: str

class ActivateRequest(BaseModel):
    activation_code: str

class SubscriptionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    plan: str
    amount: int
    currency: str
    payment_provider: str
    payment_ref: str
    status: str
    starts_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    created_at: datetime

class MessageResponse(BaseModel):
    message: str

class BotAccessResponse(BaseModel):
    bot_link: str
    expires_at: Optional[datetime] = None
