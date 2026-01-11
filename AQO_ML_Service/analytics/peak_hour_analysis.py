import pandas as pd

def find_peak_hours(csv_path="data/queue_logs.csv"):
    df = pd.read_csv(csv_path)

    peak = (
        df.groupby("time_of_day")
        .size()
        .sort_values(ascending=False)
        .head(3)
    )

    return list(peak.index)
