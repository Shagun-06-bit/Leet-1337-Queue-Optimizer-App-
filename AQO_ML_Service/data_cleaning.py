import pandas as pd
#loading the dataset

def load_data(path="queue_data.csv"):
    df = pd.read_csv(path)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    return df

#cleaning the dataset
def clean_data(df):
    df = df.dropna()
    df = df[df['actual_wait_time'] >= 0]
    df = df[df['queue_length'] >= 0]
    return df
