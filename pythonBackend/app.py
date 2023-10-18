from flask import Flask, request, jsonify
from flask_cors import CORS

# Import your functions here
from main import fullProcess

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    input_str = data.get("input_str", "")

    result = fullProcess(input_str)

    return jsonify(result)


if __name__ == "__main__":
    app.run()
