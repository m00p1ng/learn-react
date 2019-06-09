import uuid

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

items = [
    {"id": str(uuid.uuid4()), "item": "Learn about PWAs"},
    {"id": str(uuid.uuid4()), "item": "Make an awesome app"},
]


@app.route("/items", methods=["GET", "POST", "DELETE"])
def item():
    global items
    if request.method == "GET":
        return jsonify(items)
    elif request.method == "POST":
        new_item = {"id": str(uuid.uuid4()), "item": request.json["item"]}
        items.append(new_item)
        return jsonify(items)
    elif request.method == "DELETE":
        items = [item for item in items if item["id"] != request.json["id"]]
        return jsonify(items)


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
