# Round Table Arts — Studio Website

Minimalist website for [Round Table Arts](https://github.com/roundtablearts), an indie game development studio. Features dark/light mode, a hero trailer section, grid-based game showcases, news feed, team info, and community links.

Inspired by clean studio sites like [Pomsky Games](https://pomsky.games/).

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | HTML, CSS, JavaScript | UI, theme toggle, dynamic content |
| Backend | Python (Flask) | Serves site, contact form, API proxy |
| API | Java 17 | Games and news REST endpoints |

## Project Structure

```
round-table-arts/
├── frontend/
│   ├── index.html          # Main page
│   ├── css/styles.css      # Styles (dark/light themes)
│   ├── js/main.js          # Theme, nav, API fetching, contact form
│   └── assets/             # Images and logo
├── backend-python/
│   ├── app.py              # Flask server (port 5000)
│   └── requirements.txt
├── backend-java/
│   ├── src/main/java/...   # Games & news API (port 8080)
│   ├── pom.xml             # Optional Spring Boot reference
│   └── run.bat             # Compile & run Java API
├── start.bat               # Launch both servers (Windows)
├── LICENSE
└── README.md
```

## Requirements

- **Java 17+** (JDK with `javac` and `java`)
- **Python 3.10+**
- **pip**

## Quick Start (Windows)

### Option 1 — One-click

Double-click `start.bat`. This opens two terminals (Java API + Python server).

### Option 2 — Manual

**Terminal 1 — Java API**

```bat
cd backend-java
run.bat
```

**Terminal 2 — Python server**

```bat
cd backend-python
pip install -r requirements.txt
python app.py
```

Open **http://localhost:5000** in your browser.

## API Endpoints

| Endpoint | Server | Description |
|----------|--------|-------------|
| `GET /api/games` | Java (8080) / Flask proxy (5000) | Game portfolio JSON |
| `GET /api/news` | Java (8080) / Flask proxy (5000) | News articles JSON |
| `POST /api/contact` | Flask (5000) | Contact form submission |

Contact messages are appended to `backend-python/contact_messages.jsonl` (gitignored).

## Customization

- **Discord / Steam / itch.io links** — edit `frontend/index.html`
- **Games & news data** — edit `backend-java/src/main/java/com/roundtablearts/api/ApiServer.java`
- **Hero trailer** — replace the `<video>` source URL in `frontend/index.html`
- **Images** — swap files in `frontend/assets/`

## Deploying to GitHub

Upload the entire `round-table-arts` folder as your repository root. The `.gitignore` excludes build artifacts, Python caches, and contact form logs.

```bash
cd round-table-arts
git init
git add .
git commit -m "Initial commit: Round Table Arts studio website"
git remote add origin https://github.com/YOUR_USERNAME/round-table-arts.git
git push -u origin main
```

## License

MIT License — see [LICENSE](LICENSE). Copyright (c) 2026 Round Table Arts.