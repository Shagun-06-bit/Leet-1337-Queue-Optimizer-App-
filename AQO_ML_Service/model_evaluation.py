from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

def evaluate_model(model, X_test, y_test):
    preds = model.predict(X_test)
    mae = mean_absolute_error(y_test, preds)
    rmse = np.sqrt(mean_squared_error(y_test, preds))

    print(f"MAE: {mae:.2f} minutes")
    print(f"RMSE: {rmse:.2f} minutes")

import joblib

def save_artifacts(model, scaler):
    joblib.dump(model, "queue_model.pkl")
    joblib.dump(scaler, "scaler.pkl")
    print("Model and scaler saved!")
