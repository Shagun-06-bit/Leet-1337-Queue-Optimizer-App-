import joblib
import numpy as np
import pandas as pd
from datetime import datetime

model = joblib.load("queue_model.pkl")
scaler = joblib.load("scaler.pkl")

def prepare_features(input_data):
    df = pd.DataFrame([input_data])
    
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['hour'] = df['timestamp'].dt.hour
    df['day_num'] = df['timestamp'].dt.dayofweek
    
    df = df.drop(['timestamp'], axis=1)

    return df

def predict_wait_time(input_data):
    df = prepare_features(input_data)
    scaled = scaler.transform(df)
    prediction = model.predict(scaled)[0]
    return round(prediction, 2)
