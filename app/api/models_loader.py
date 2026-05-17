from pathlib import Path
import joblib

# raíz del proyecto (hotel_demand_forecasting_system)
BASE_DIR = Path(__file__).resolve().parents[2]

print("BASE_DIR:", BASE_DIR)

# carpeta real de modelos
MODEL_DIR = BASE_DIR / "ml" / "models" / "cancellations"

print("MODEL_DIR:", MODEL_DIR)

print("ARCHIVOS:", list(MODEL_DIR.iterdir()))

cancellation_model = joblib.load(
    MODEL_DIR / "xgboost_cancelation_model.pkl"
)

occupancy_model = joblib.load(
    BASE_DIR / "ml" / "models" / "occupancy" / "occupancy_model.pkl"
)