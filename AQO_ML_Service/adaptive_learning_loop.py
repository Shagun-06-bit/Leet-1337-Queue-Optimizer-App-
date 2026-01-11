import pandas as pd


def log_actual_wait(input_data, actual_wait):
    record = input_data.copy()
    record["actual_wait_time"] = actual_wait
    df = pd.DataFrame([record])
    df.to_csv("queue_data.csv", mode='a', header=False, index=False)
