def calculate_kpis(preds):
    return {
        "cancellation_rate": float(preds.mean())
    }