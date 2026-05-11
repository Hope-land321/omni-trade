from sqlmodel import SQLModel, create_engine
from app.core.config import settings
from app.models.domain import User, Subscription, ActivationLog

# Replace postgresql:// with postgresql+psycopg2:// for SQLAlchemy engine or asyncpg for async
engine_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
# Actually, since we are doing standard create_all, let's just use sync for migrations if needed or async.
# For simplicity in create_all, we can use a sync engine here. Let's assume standard postgresql:// works with psycopg2
sync_engine_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://")

engine = create_engine(sync_engine_url, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)
