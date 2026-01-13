import streamlit as st # type: ignore
import pickle
import numpy as np
import os

# -----------------------------
# Page Config
# -----------------------------
st.set_page_config(
    page_title="Adaptive Queue Optimizer",
    page_icon="📊",
    layout="centered"
)

st.title("📊 Adaptive Queue Optimizer – ML Pipeline")
st.write("Predict customer waiting time based on queue conditions using Machine Learning.")

# -----------------------------
# Load Model
# -----------------------------
MODEL_PATH = "queue_model.pkl"

@st.cache_resource
def load_model():
    if not os.path.exists(MODEL_PATH):
        st.error("Model file not found! Please make sure 'model.pkl' exists in the ml/ folder.")
        st.stop()
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    return model

model = load_model()

# -----------------------------
# Sidebar
# -----------------------------
st.sidebar.header("Project Info")
st.sidebar.markdown("""
**Project:** Adaptive Queue Optimizer  
**Type:** ML-based Waiting Time Prediction  
**Deployment:** Streamlit Cloud  
**Tech:** Python, Scikit-learn, Streamlit  
""")

# -----------------------------
# Input Section
# -----------------------------
st.subheader("Enter Queue Details")

col1, col2 = st.columns(2)

with col1:
    queue_size = st.number_input(
        "Queue Size (number of people)",
        min_value=1,
        max_value=200,
        value=20,
        step=1
    )

with col2:
    counters = st.number_input(
        "Number of Active Counters",
        min_value=1,
        max_value=20,
        value=3,
        step=1
    )

arrival_rate = st.slider(
    "Arrival Rate (people per minute)",
    min_value=0.1,
    max_value=20.0,
    value=4.0,
    step=0.1
)

service_rate = st.slider(
    "Service Rate (people served per minute)",
    min_value=0.1,
    max_value=20.0,
    value=5.0,
    step=0.1
)

# -----------------------------
# Prediction
# -----------------------------
if st.button("🔮 Predict Waiting Time"):
    try:
        # Feature array must match training order
        features = np.array([[queue_size, counters, arrival_rate, service_rate]])
        prediction = model.predict(features)

        st.success(
            f"⏳ Predicted Waiting Time: **{round(float(prediction[0]), 2)} minutes**"
        )

        st.info("""
        This prediction helps administrators optimize:
        - Counter allocation  
        - Staff scheduling  
        - Queue balancing  
        - Customer satisfaction  
        """)

    except Exception as e:
        st.error(f"Prediction failed: {e}")

# -----------------------------
# Footer
# -----------------------------
st.markdown("---")
st.markdown(
    "<center>🚀 Built with Streamlit | Adaptive Queue Optimizer Project</center>",
    unsafe_allow_html=True
)
