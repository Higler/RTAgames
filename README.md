# Round Table Arts — Website

The official site for Round Table Arts. One page, dark/light mode, game portfolio, news section, team info, and a contact form.

## What's in here

Plain HTML, CSS, and JavaScript — no frameworks, no build step, no subfolders for the frontend. Everything the site needs sits in the repo root next to `index.html`. Games and news load from a small Java API when you're running locally. Flask serves the site, proxies those API calls, and catches contact form submissions.

```
round-table-arts/
├── index.html
├── styles.css
├── main.js
├── logo.svg
├── war-hero.png
├── jester.jpg
├── team-placeholder.jpg
├── backend-python/
├── backend-java/
└── start.bat
```

## Running it locally

You need Java 17+ and Python 3.10+.

Easiest way on Windows: double-click `start.bat`. That boots the Java API on port 8080 and Flask on port 5000.

Or do it yourself:

```bat
cd backend-java
run.bat
```

```bat
cd backend-python
pip install -r requirements.txt
python app.py
```

Then hit http://localhost:5000

## GitHub Pages

Push the repo and turn on GitHub Pages from the root branch. All the frontend files are already at the root — `index.html`, `styles.css`, `main.js`, and the images. GitHub will serve them as-is.

The site auto-detects the GitHub Pages repo path so CSS, JS, and images load correctly on mobile. `404.html` and `.nojekyll` are included for the same reason.

Games and news will use the hardcoded fallbacks in `main.js` since there's no backend on Pages. Contact form won't send anywhere either — Discord link still works.

## Changing stuff

**Links** (Discord, Steam, itch.io) — `index.html`

**Games and news** — `backend-java/src/main/java/com/roundtablearts/api/ApiServer.java`. Update the fallbacks in `main.js` too if you want GitHub Pages to match.

**Hero video** — swap the `<source>` URL in `index.html`

**Images** — drop replacements into the repo root (same folder as `index.html`)

Contact form messages get written to `backend-python/contact_messages.jsonl` when Flask is running. That file is gitignored.

## API (local only)

| Route | What it does |
|-------|--------------|
| `GET /api/games` | Game list |
| `GET /api/news` | News posts |
| `POST /api/contact` | Contact form |

Flask on 5000 proxies the first two from Java on 8080. If Java isn't running, Flask serves its own fallback data.

## License

MIT — see [LICENSE](LICENSE). © 2026 Round Table Arts.