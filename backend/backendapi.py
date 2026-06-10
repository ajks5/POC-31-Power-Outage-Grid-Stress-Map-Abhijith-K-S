from dotenv import load_dotenv
import os
import requests

load_dotenv()

OWM_KEY = os.getenv("OWM_API_KEY")
EIA_KEY = os.getenv("EIA_API_KEY")

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

@app.get("/api/weather/{lat}/{lng}")
def get_weather(lat: float, lng: float):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={OWM_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
    return {
        "temp": data["main"]["temp"],
        "condition": data["weather"][0]["main"],
        "description": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"]
    }

@app.get("/api/debug")
def debug():
    return {
        "owm_key": OWM_KEY,
        "eia_key": EIA_KEY
    }

@app.get("/api/outages")
def get_outages():
    return [
        {"id": 1,  "region": "Texas",       "severity": "high",   "customers": 5000, "lat": 31.9686, "lng": -99.9018},
        {"id": 2,  "region": "Florida",     "severity": "medium", "customers": 1200, "lat": 27.9944, "lng": -81.7603},
        {"id": 3,  "region": "California",  "severity": "low",    "customers": 800,  "lat": 36.7783, "lng": -119.4179},
        {"id": 4,  "region": "New York",    "severity": "high",   "customers": 9200, "lat": 42.1657, "lng": -74.9481},
        {"id": 5,  "region": "Ohio",        "severity": "medium", "customers": 3100, "lat": 40.4173, "lng": -82.9071},
        {"id": 6,  "region": "Illinois",    "severity": "high",   "customers": 7800, "lat": 40.6331, "lng": -89.3985},
        {"id": 7,  "region": "Texas 2",     "severity": "medium", "customers": 2100, "lat": 29.7604, "lng": -95.3698},
        {"id": 8,  "region": "Georgia",     "severity": "low",    "customers": 950,  "lat": 32.1656, "lng": -82.9001},
        {"id": 9,  "region": "Arizona",     "severity": "high",   "customers": 6200, "lat": 34.0489, "lng": -111.0937},
        {"id": 10, "region": "Washington",  "severity": "medium", "customers": 3400, "lat": 47.7511, "lng": -120.7401},
        {"id": 11, "region": "Colorado",    "severity": "low",    "customers": 1100, "lat": 39.5501, "lng": -105.7821},
        {"id": 12, "region": "Michigan",    "severity": "high",   "customers": 8900, "lat": 44.3148, "lng": -85.6024},
        {"id": 13, "region": "Nevada",      "severity": "medium", "customers": 2700, "lat": 38.8026, "lng": -116.4194},
        {"id": 14, "region": "Oregon",      "severity": "low",    "customers": 780,  "lat": 43.8041, "lng": -120.5542},
        {"id": 15, "region": "Louisiana",   "severity": "high",   "customers": 5500, "lat": 30.9843, "lng": -91.9623},
    ]