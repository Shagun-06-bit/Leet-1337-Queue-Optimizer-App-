from fastapi import FastAPI
from pydantic import BaseModel
from inference.wait_time_predictor import predict_wait_time
from inference.overload_detector import detect_overload
from analytics.peak_hour_analysis import find_peak_hours

app = FastAPI(title="Adaptive Queue Optimizer – ML Service")

class QueueInput(BaseModel):
    queue_length: int
    active_counters: int
    service_time: float
    time_of_day: int

@app.post("/predict-wait-time")
def wait_time_prediction(data: QueueInput):
    return predict_wait_time(
        data.queue_length,
        data.active_counters,
        data.service_time,
        data.time_of_day
    )

@app.post("/detect-overload")
def overload(data: QueueInput):
    return detect_overload(
        data.queue_length,
        data.service_time
    )

@app.get("/peak-hours")
def peak_hours():
    return {"peak_hours": find_peak_hours()}
