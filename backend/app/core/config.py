from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Omni-Trade"
    DATABASE_URL: str = "postgresql://omnitrade:password@localhost:5432/omnitrade_dev"
    REDIS_URL: str = "redis://localhost:6379"
    SECRET_KEY: str = "your-super-secret-key-change-it-in-production"
    REFRESH_SECRET_KEY: str = "your-refresh-secret-key-change-it-in-production"
    
    # Provider Secrets
    FEDAPAY_SECRET_KEY: Optional[str] = None
    FEDAPAY_WEBHOOK_SECRET: Optional[str] = None
    KIAPAY_PRIVATE_KEY: Optional[str] = None
    KIAPAY_WEBHOOK_SECRET: Optional[str] = None
    
    # Optional
    RESEND_API_KEY: Optional[str] = None
    EMAIL_FROM: str = "noreply@omnitrade.com"
    TELEGRAM_BOT_LINK: str = "https://t.me/OmniTradeBot"
    FRONTEND_URL: str = "http://localhost:3000"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding='utf-8')

settings = Settings()
