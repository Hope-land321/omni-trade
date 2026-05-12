from fastapi import FastAPI
from app.api.routes import auth, billing, users

app = FastAPI(
    title="Omni-Trade API",
    description="API for Omni-Trade SaaS Platform",
    version="1.0.0",
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(billing.router, prefix="/api/v1/billing", tags=["billing"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Omni-Trade API is running"}
