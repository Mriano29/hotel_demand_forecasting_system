import joblib
import os

# sube desde: app/api/models_loader.py → app → root
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../..")
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml/models/cancellations/xgboost_cancelation_model.pkl"
)

model = joblib.load(MODEL_PATH)