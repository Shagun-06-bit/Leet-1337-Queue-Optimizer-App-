import pandas as pd
def feature_engineering(df):
    # Time features
    df['hour'] = df['timestamp'].dt.hour
    df['day_num'] = df['timestamp'].dt.dayofweek  # Monday=0
    
    # Encode day of week
    df = pd.get_dummies(df, columns=['day_of_week'], drop_first=True)

    X = df.drop(['timestamp', 'actual_wait_time'], axis=1)
    y = df['actual_wait_time']

    return X, y
