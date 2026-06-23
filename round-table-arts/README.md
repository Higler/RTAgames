# Round Table Arts — Website

The official site for Round Table Arts. One page, dark/light mode, game portfolio, news section, team info, and a contact form. Built to stay out of the way and let the games do the talking.

## What's in here

The frontend is plain HTML, CSS, and JavaScript — no frameworks, no build step. Games and news load from a small Java API. Flask handles serving the site locally, proxies those API calls, and catches contact form submissions.

```
round-table-arts/
├── index.html              ← use this for GitHub Pages
├── frontend/
│   ├── index.html          ← use this when running Flask locally
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/
├── backend-python/
│   ├── app.py
│   └── requirements.txt
├── backend-java/
│   ├── src/.../ApiServer.java
│   └── run.bat
└── start.bat
```

You'll notice there are two `index.html` files. The one in `frontend/` is what Flask serves at `localhost:5000`. The one at the repo root points at `frontend/` for assets and is what GitHub Pages looks for.

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

If you just want the static site up without running any servers, push the repo and turn on GitHub Pages from the root branch. The root `index.html` will work — games and news fall back to hardcoded data in `main.js` since there's no backend on Pages.

The contact form won't actually send anywhere on Pages either. Discord link works fine though.

## Changing stuff

**Links** (Discord, Steam, itch.io) — `frontend/index.html` and the root `index.html`. Keep them in sync or you'll forget one.

**Games and news** — `backend-java/src/main/java/com/roundtablearts/api/ApiServer.java`. Also update the fallbacks in `frontend/js/main.js` if you want GitHub Pages to match.

**Hero video** — swap the `<source>` URL in whichever `index.html` you're using.

**Images** — drop replacements into `frontend/assets/`.

Contact form messages get written to `backend-python/contact_messages.jsonl` when Flask is running. That file is gitignored on purpose.

## API (local only)

| Route | What it does |
|-------|--------------|
| `GET /api/games` | Game list |
| `GET /api/news` | News posts |
| `POST /api/contact` | Contact form |

Flask on 5000 proxies the first two from Java on 8080. If Java isn't running, Flask serves its own fallback data.

## License

MIT — see [LICENSE](LICENSE). © 2026 Round Table Arts.