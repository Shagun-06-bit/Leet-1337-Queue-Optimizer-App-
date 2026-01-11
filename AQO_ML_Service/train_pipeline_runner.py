from data_cleaning import clean_data, load_data
from feature_engineering import feature_engineering
from model_evaluation import evaluate_model, save_artifacts
from model_training import train_model
from train_test_split import split_and_scale


def train_pipeline():
    df = load_data("queue_data.csv")
    df = clean_data(df)
    X, y = feature_engineering(df)
    X_train, X_test, y_train, y_test, scaler = split_and_scale(X, y)
    model = train_model(X_train, y_train)
    evaluate_model(model, X_test, y_test)
    save_artifacts(model, scaler)

if __name__ == "__main__":
    train_pipeline()
