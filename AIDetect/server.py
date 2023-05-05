import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from detect import detect, detection_results

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def detect_on_route():
    # Start detection in a new thread
    detection_thread = threading.Thread(target=detect)
    detection_thread.start()
    return "Detection started!"

@app.route("/detect", methods=["GET"])
def get_detections():
    return jsonify(detection_results)

@app.route("/detecttab", methods=["GET"])
def get_tab_detections():
    detection_results.append("Tab Switch")
    return jsonify(detection_results)

@app.route("/clear", methods=["GET"])
def clear_detections():
    detection_results.clear()
    return "Detection Cleared"

if __name__ == "__main__":
    app.run(debug=True, port=5002)
