from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("ai_credit_score_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        
        features = np.array([
            data["total_events_attended"],
            data["total_events_hosted"],
            data["years_since_joining"],
            data["events_organized"]
        ]).reshape(1, -1)  

        
        scaled_features = scaler.transform(features)

        score = model.predict(scaled_features)[0]


        return jsonify({"AI Credit Score": round(score, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5002, debug=True)
