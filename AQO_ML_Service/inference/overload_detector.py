def detect_overload(queue_length, avg_service_time, threshold=30):
    expected_wait = queue_length * avg_service_time

    if expected_wait > threshold:
        return {
            "overload": True,
            "message": "⚠ High waiting time detected"
        }

    return {
        "overload": False,
        "message": "Queue operating normally"
    }
