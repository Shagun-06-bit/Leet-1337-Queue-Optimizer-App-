import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import os

df = pd.read_csv("data/queue_logs.csv")

X = df[["queue_length", "active_counters", "service_time", "time_of_day"]]
y = df["wait_time"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/wait_time_model.pkl")

print("✅ Wait time model trained")
