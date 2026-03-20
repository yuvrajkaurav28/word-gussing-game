from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
import random
import hashlib
import os
from words import get_words_for_level, get_missing_count

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
app.secret_key = "wordquest-secret-key-2024"
CORS(app, supports_credentials=True)

users = {}
user_progress = {}

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/favicon.ico")
def favicon():
    return "", 204

@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")

@app.route("/home")
def home():
    return send_from_directory(FRONTEND_DIR, "home.html")

@app.route("/game")
def game():
    return send_from_directory(FRONTEND_DIR, "game.html")

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username", "").strip().lower()
    password = data.get("password", "")
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    if username in users:
        return jsonify({"error": "Username already exists"}), 409
    users[username] = hash_password(password)
    user_progress[username] = {"level": 1, "score": 0, "streak": 0}
    return jsonify({"message": "Registered successfully"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username", "").strip().lower()
    password = data.get("password", "")
    if users.get(username) == hash_password(password):
        session["user"] = username
        progress = user_progress.get(username, {"level": 1, "score": 0, "streak": 0})
        return jsonify({"message": "Login successful", "username": username, "progress": progress})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out"})

@app.route("/api/word", methods=["GET"])
def get_word():
    level = int(request.args.get("level", 1))
    level = max(1, min(100, level))

    pool = get_words_for_level(level)
    word = random.choice(pool).upper()
    missing_count = get_missing_count(level)

    indices = random.sample(range(len(word)), min(missing_count, len(word)))
    indices.sort()

    masked = list(word)
    missing_chars = []
    for i in indices:
        missing_chars.append({"index": i, "char": word[i]})
        masked[i] = "_"

    correct_chars = [m["char"] for m in missing_chars]
    all_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    distractors = [c for c in all_letters if c not in correct_chars]
    random.shuffle(distractors)

    options = correct_chars + distractors[:6 - len(correct_chars)]
    random.shuffle(options)

    return jsonify({
        "word": word,
        "masked": "".join(masked),
        "missing": missing_chars,
        "options": options,
        "level": level
    })

@app.route("/api/progress", methods=["POST"])
def update_progress():
    data = request.json
    username = data.get("user")
    correct = data.get("correct", False)
    level = data.get("level", 1)

    if username not in user_progress:
        user_progress[username] = {"level": 1, "score": 0, "streak": 0}

    p = user_progress[username]
    if correct:
        p["score"] += level * 10
        p["streak"] += 1
        if p["streak"] % 3 == 0 and p["level"] < 100:
            p["level"] = min(100, p["level"] + 1)
    else:
        p["streak"] = 0

    return jsonify(p)

@app.route("/api/progress", methods=["GET"])
def get_progress():
    username = request.args.get("user")
    if not username or username not in user_progress:
        return jsonify({"level": 1, "score": 0, "streak": 0})
    return jsonify(user_progress[username])

if __name__ == "__main__":
    print("\n  WordQuest running at: http://127.0.0.1:5000\n")
    app.run(debug=True, port=5000)
