import pandas as pd
import random
from datetime import datetime, timedelta

def generate_dummy_queue_data(num_rows=200):
    data = []
    start_time = datetime(2026, 1, 1, 8, 0, 0)

    for i in range(num_rows):
        timestamp = start_time + timedelta(minutes=random.randint(1, 10) * i)

        queue_length = random.randint(1, 50)          # people in queue
        active_counters = random.randint(1, 5)        # service counters open
        avg_service_time = round(random.uniform(1.5, 5.0), 2)  # minutes per person
        
        day_of_week = timestamp.strftime("%A")
        
        # Simulated actual wait time logic
        base_wait = (queue_length / active_counters) * avg_service_time
        noise = random.uniform(-2, 3)  # real-world randomness
        actual_wait_time = max(1, round(base_wait + noise, 2))

        data.append({
            "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "queue_length": queue_length,
            "active_counters": active_counters,
            "avg_service_time": avg_service_time,
            "day_of_week": day_of_week,
            "actual_wait_time": actual_wait_time
        })

    df = pd.DataFrame(data)
    df.to_csv("queue_data.csv", index=False)
    print("queue_data.csv created with", num_rows, "rows!")

generate_dummy_queue_data(200)
