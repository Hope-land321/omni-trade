from fastapi import FastAPI

app = FastAPI(
    title="Omni-Trade API",
    description="API for Omni-Trade SaaS Platform",
    version="1.0.0",
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Omni-Trade API is running"}
