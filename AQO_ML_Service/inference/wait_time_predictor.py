import joblib
import numpy as np

WAIT_MODEL = "models/wait_time_model.pkl"

def predict_wait_time(queue_length, active_counters, service_time, time_of_day):
    try:
        model = joblib.load(WAIT_MODEL)

        X = np.array([[queue_length, active_counters, service_time, time_of_day]])
        prediction = model.predict(X)[0]

        confidence = "Based on recent service speed"

        return {
            "wait_time": round(max(prediction, 0), 2),
            "confidence": confidence
        }

    except Exception:
        # Fallback logic
        fallback_time = (queue_length / max(active_counters, 1)) * service_time
        return {
            "wait_time": round(fallback_time, 2),
            "confidence": "Estimated using live queue data"
        }
