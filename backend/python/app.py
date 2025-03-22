from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import re
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)
nlp = spacy.load("en_core_web_sm")


def extract_details(text):
    doc = nlp(text)


    date_pattern = r"(\b\d{1,2}(?:st|nd|rd|th)?\s(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4})|(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}(?:st|nd|rd|th)?,?\s\d{4})"
    date_range_pattern = r"(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}(?:st|nd|rd|th)?\s-\s\d{1,2}(?:st|nd|rd|th)?,?\s\d{4})|(\b\d{1,2}/\d{1,2}/\d{4})"

    dates = re.findall(date_pattern, text) + re.findall(date_range_pattern, text)


    dates = [date for match in dates for date in match if date]

    time_pattern = r"\b\d{1,2}:\d{2}\s?(?:AM|PM|am|pm)?\b"
    times = re.findall(time_pattern, text)


    locations = [ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC", "FAC"]]


    organizations = [ent.text for ent in doc.ents if ent.label_ == "ORG"]


    people = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]


    topics = [ent.text for ent in doc.ents if ent.label_ in ["EVENT", "PRODUCT", "WORK_OF_ART"]]

    email_pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
    phone_pattern = r"\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b"
    emails = re.findall(email_pattern, text)
    phone_numbers = re.findall(phone_pattern, text)

    return {
        "dates": dates,
        "times": times,
        "locations": locations,
        "organizations": organizations,
        "people": people,
        "topics": topics,
        "emails": emails,
        "phone_numbers": phone_numbers
    }

@app.route("/extract", methods=["POST"])
def extract():
    data = request.json
    print("Received in Python API:", data)  

    text = data.get("text", "")
    if not text:
        print("⚠️ No text received in Python API!")
        return jsonify({"error": "No text provided"}), 400

    extracted_info = extract_details(text)

    return jsonify(extracted_info)

model = joblib.load("ai_credit_score_model.pkl")
scaler = joblib.load("scaler.pkl")


if __name__ == "__main__":
    app.run(port=5001, debug=True)
