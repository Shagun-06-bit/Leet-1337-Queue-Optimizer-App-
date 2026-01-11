from fastapi import FastAPI
from pydantic import BaseModel

from inference.wait_time_predictor import predict_wait_time # type: ignore

app = FastAPI()

class QueueInput(BaseModel):
    timestamp: str
    queue_length: int
    active_counters: int
    avg_service_time: float
    day_of_week: str

@app.post("/predict")
def predict(input: QueueInput):
    data = input.dict()
    wait_time = predict_wait_time(data)
    return {"predicted_wait_time": wait_time}
