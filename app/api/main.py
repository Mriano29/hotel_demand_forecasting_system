from fastapi import FastAPI, UploadFile, File
import pandas as pd

from services.preprocessing import build_features
from services.predictions import predict

app = FastAPI()


@app.post("/predict/cancellations")
async def predict_csv(file: UploadFile = File(...)):

    # 1. leer CSV
    df = pd.read_csv(file.file)

    # 2. features
    X = build_features(df)

    # 3. predicción (0 = no cancel, 1 = cancel)
    preds = predict(X)

    # -------------------------
    # KPIs base
    # -------------------------
    total_rows = len(df)
    total_cancelled = int(preds.sum())
    total_confirmed = total_rows - total_cancelled

    cancellation_rate = float(preds.mean())
    occupancy_rate = float(1 - cancellation_rate)

    # -------------------------
    # OUTPUT KPI DASHBOARD
    # -------------------------
    return {
        "summary": {
            "total_rows": total_rows,
            "total_cancelled": total_cancelled,
            "total_confirmed": total_confirmed,

            "cancellation_rate": cancellation_rate,
            "occupancy_rate": occupancy_rate,
        }
    }