"""Round Table Arts — Python web server (static files + contact API)."""

import json
import os
from datetime import datetime, timezone
from pathlib import Path

import requests
from flask import Flask, abort, jsonify, request, send_from_directory

SITE_ROOT = Path(__file__).resolve().parent.parent
JAVA_API = os.environ.get("JAVA_API_URL", "http://localhost:8080")
CONTACT_LOG = Path(__file__).resolve().parent / "contact_messages.jsonl"

STATIC_FILES = {
    "styles.css",
    "main.js",
    "logo.svg",
    "war-hero.png",
    "jester.jpg",
    "mask.jpg",
}

app = Flask(__name__)


@app.route("/")
def index():
    return send_from_directory(SITE_ROOT, "index.html")


@app.route("/<filename>")
def static_file(filename):
    if filename in STATIC_FILES:
        return send_from_directory(SITE_ROOT, filename)
    abort(404)


@app.route("/api/games")
def games():
    try:
        res = requests.get(f"{JAVA_API}/api/games", timeout=2)
        res.raise_for_status()
        return jsonify(res.json())
    except requests.RequestException:
        return jsonify(_fallback_games())


@app.route("/api/news")
def news():
    try:
        res = requests.get(f"{JAVA_API}/api/news", timeout=2)
        res.raise_for_status()
        return jsonify(res.json())
    except requests.RequestException:
        return jsonify(_fallback_news())


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"error": "All fields are required."}), 400

    if "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"error": "Invalid email address."}), 400

    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "name": name,
        "email": email,
        "message": message,
    }
    with CONTACT_LOG.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")

    return jsonify({"message": "Thanks for reaching out! We'll get back to you soon."})


def _fallback_games():
    return [
        {
            "id": "riftbreaker",
            "title": "Riftbreaker: Fractured Timelines",
            "description": "Time-travel action shooter. Alter history across eras as super-soldier Thorne Kane.",
            "status": "In Development",
            "image": "war-hero.png",
            "steamUrl": "https://store.steampowered.com",
            "itchUrl": "https://roundtablearts.itch.io/riftbreaker",
        },
        {
            "id": "jester",
            "title": "Jester Assistant",
            "description": "A cross-platform AI companion bridging desktop and mobile workflows.",
            "status": "Available",
            "image": "jester.jpg",
            "steamUrl": None,
            "itchUrl": "https://roundtablearts.itch.io/jester-assistant",
        },
    ]


def _fallback_news():
    return [
        {
            "id": 1,
            "title": "W.A.R. Campaign Structure Revealed",
            "summary": "Four chapters spanning 2003–2015 Middle East conflicts, with branching paths and multiple endings.",
            "date": "2026-05-23",
            "tag": "Dev Log",
        },
    ]


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)