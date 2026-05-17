from fastapi import FastAPI
from schemas import CancellationInput, OccupancyInput
from models_loader import cancellation_model, occupancy_model

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict/cancellations")
def predict_cancellations(data: CancellationInput):

    features = [[data.lead_time, data.price, data.hotel_id]]
    prob = cancellation_model.predict_proba(features)[0][1]

    return {"cancellation_probability": float(prob)}


@app.post("/predict/occupancy")
def predict_occupancy(data: OccupancyInput):

    features = [[data.hotel_id]]
    pred = occupancy_model.predict(features)[0]

    return {"occupancy": float(pred)}