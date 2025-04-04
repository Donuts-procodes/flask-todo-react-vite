import firebase_admin
from firebase_admin import credentials, auth
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Load Firebase Admin SDK
cred = credentials.Certificate("firebase-admin-sdk.json")  # Replace with your Firebase service account key
firebase_admin.initialize_app(cred)

# Function to verify Firebase ID Token
def verify_firebase_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return None
    try:
        token = auth_header.split(" ")[1]
        decoded_token = auth.verify_id_token(token)
        return decoded_token["uid"]  # Unique user ID from Firebase
    except Exception as e:
        return None

# To-Do List Database Initialization
def init_todo_db(uid):
    db_path = f"todo_{uid}.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT, completed BOOLEAN DEFAULT 0)")
    conn.commit()
    conn.close()

# Add To-Do Item (Authenticated)
@app.route("/todo", methods=["POST"])
def add_todo():
    uid = verify_firebase_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    task = data["task"]

    db_path = f"todo_{uid}.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO todos (task) VALUES (?)", (task,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Task added successfully"}), 201

# Get All To-Do Items (Authenticated)
@app.route("/todos", methods=["GET"])
def get_todos():
    uid = verify_firebase_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401

    db_path = f"todo_{uid}.db"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos")
    todos = [{"id": row[0], "task": row[1], "completed": row[2]} for row in cursor.fetchall()]
    conn.close()

    return jsonify(todos), 200

if __name__ == "__main__":
    app.run(debug=True)
