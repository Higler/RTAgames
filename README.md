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
├── mask.jpg
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

## Live site — rtagames.com

The site is hosted on GitHub Pages with a custom domain. The `CNAME` file in the repo root points to `rtagames.com`.

In your domain registrar's DNS settings, add:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR-USERNAME.github.io` |

(Replace `YOUR-USERNAME` with your actual GitHub username.)

Then in the repo on GitHub: **Settings → Pages → Custom domain** → enter `rtagames.com`.

Push the repo from the root branch. All frontend files sit beside `index.html` — no subfolders. `404.html` and `.nojekyll` are there for routing and mobile compatibility.

Games and news use the hardcoded fallbacks in `main.js` on the live site. Contact form only works when running Flask locally — Discord link works everywhere.

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