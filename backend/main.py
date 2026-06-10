from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/outages")
def get_outages():
    return [
        {"id": 1, "region": "Texas",      "severity": "high",   "customers": 5000, "lat": 31.9686, "lng": -99.9018},
        {"id": 2, "region": "Florida",    "severity": "medium", "customers": 1200, "lat": 27.9944, "lng": -81.7603},
        {"id": 3, "region": "California", "severity": "low",    "customers": 800,  "lat": 36.7783, "lng": -119.4179},
        {"id": 4, "region": "New York",   "severity": "high",   "customers": 9200, "lat": 42.1657, "lng": -74.9481},
        {"id": 5, "region": "Ohio",       "severity": "medium", "customers": 3100, "lat": 40.4173, "lng": -82.9071},
    ]