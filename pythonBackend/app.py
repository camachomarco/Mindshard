from flask import Flask, request, jsonify
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy

# Import your functions here
from main import fullProcess


app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "sqlite:///site.db"  # site.db will be the SQLite file
db = SQLAlchemy(app)


# Define the Output model
class Output(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    overview = db.Column(db.String(500))
    summary = db.Column(db.String(500))


with app.app_context():
    try:
        db.create_all()
        print("Database and tables created")
    except Exception as e:
        print(f"Error occurred: {e}")


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    input_str = data.get("input_str", "")

    print(
        input_str, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    )
    result = fullProcess(input_str)

    # Save the result to the database
    new_output = Output(
        overview=result["overview"],
        summary=result["summary"],
    )
    db.session.add(new_output)
    db.session.commit()

    return jsonify({"status": "Data saved"})


@app.route("/get_output", methods=["GET"])
def get_output():
    # Retrieve the latest record from the database
    last_output = Output.query.order_by(Output.id.desc()).first()
    if last_output:
        return jsonify(
            {
                "overview": last_output.overview,
                "summary": last_output.summary,
            }
        )
    else:
        return jsonify({"status": "No data found"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
