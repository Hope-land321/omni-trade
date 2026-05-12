import smtplib
from email.message import EmailMessage
from app.core.config import settings

def send_activation_email(to_email: str, code: str):
    # This is a mock implementation. For production, integrate with Resend or SMTP.
    # We will just print the code in local dev if no real SMTP is configured.
    print(f"========== EMAIL MOCK ==========")
    print(f"To: {to_email}")
    print(f"Subject: Your Omni-Trade Activation Code")
    print(f"Code: {code}")
    print(f"================================")
    
    if settings.RESEND_API_KEY:
        # TODO: Implement Resend API call here
        pass
    
    # Optional SMTP implementation placeholder
    pass
