import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
import os

df = pd.read_csv("data/queue_logs.csv")

X = df[["time_of_day", "queue_length"]]
y = df["service_time"]

model = LinearRegression()
model.fit(X, y)

os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/service_time_model.pkl")

print("✅ Service time model trained")
