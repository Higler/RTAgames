const IS_GITHUB_PAGES = location.hostname.endsWith("github.io");
const API_BASE = (document.querySelector("base")?.href || location.origin + "/").replace(/\/$/, "");

const FALLBACK_GAMES = [
  {
    id: "riftbreaker",
    title: "Riftbreaker: Fractured Timelines",
    description: "Time-travel action shooter. Alter history across eras as super-soldier Thorne Kane.",
    status: "In Development",
    image: "war-hero.png",
    steamUrl: "https://store.steampowered.com",
    itchUrl: "https://roundtablearts.itch.io/riftbreaker",
  },
  {
    id: "jester",
    title: "Jester Assistant",
    description: "A cross-platform AI companion bridging desktop and mobile workflows.",
    status: "Available",
    image: "jester.jpg",
    steamUrl: null,
    itchUrl: "https://roundtablearts.itch.io/jester-assistant",
  },
  {
    id: "chronos-horde",
    title: "Chronos Horde: The Failed",
    description: "Co-op endless survival against mutated serum experiments. 1–4 players.",
    status: "Coming Soon",
    image: "war-hero.png",
    steamUrl: "https://store.steampowered.com",
    itchUrl: null,
  },
];

const FALLBACK_NEWS = [
  {
    id: 1,
    title: "W.A.R. Campaign Structure Revealed",
    summary: "Four chapters spanning 2003–2015 Middle East conflicts, with branching paths and multiple endings.",
    date: "2026-05-23",
    tag: "Dev Log",
  },
  {
    id: 2,
    title: "Horde Mode Playtest on Discord",
    summary: "Join our next community playtest for Chronos Horde — sign up in the #playtests channel.",
    date: "2026-06-10",
    tag: "Community",
  },
  {
    id: 3,
    title: "Jester Assistant Android Release",
    summary: "The mobile companion app is now available on Google Play, paired with the desktop bridge.",
    date: "2026-06-01",
    tag: "Release",
  },
];

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("rta-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  toggle?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("rta-theme", next);
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function renderGames(games) {
  const grid = document.getElementById("games-grid");
  if (!grid) return;

  grid.innerHTML = games
    .map(
      (game) => `
    <article class="game-card">
      <div class="game-card-media">
        <img src="${game.image}" alt="${game.title}" loading="lazy">
      </div>
      <div class="game-card-body">
        <p class="game-card-status">${game.status}</p>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <div class="game-card-links">
          ${game.steamUrl ? `<a href="${game.steamUrl}" target="_blank" rel="noopener">Steam</a>` : ""}
          ${game.itchUrl ? `<a href="${game.itchUrl}" target="_blank" rel="noopener">itch.io</a>` : ""}
        </div>
      </div>
    </article>`
    )
    .join("");
}

function renderNews(articles) {
  const grid = document.getElementById("news-grid");
  if (!grid) return;

  grid.innerHTML = articles
    .map((article) => {
      const date = new Date(article.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `
    <article class="news-card">
      <time class="news-date" datetime="${article.date}">${date}</time>
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <span class="news-tag">${article.tag}</span>
    </article>`;
    })
    .join("");
}

async function fetchJson(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return fallback;
  }
}

async function loadContent() {
  if (IS_GITHUB_PAGES) {
    renderGames(FALLBACK_GAMES);
    renderNews(FALLBACK_NEWS);
    return;
  }
  const [games, news] = await Promise.all([
    fetchJson("/api/games", FALLBACK_GAMES),
    fetchJson("/api/news", FALLBACK_NEWS),
  ]);
  renderGames(games);
  renderNews(news);
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (IS_GITHUB_PAGES) {
      status.textContent = "Contact form isn't live here — reach us on Discord.";
      status.classList.add("error");
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    if (!data.name || !data.email || !data.message) {
      status.textContent = "Please fill in all fields.";
      status.classList.add("error");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        status.textContent = result.message || "Message sent! We'll be in touch.";
        status.classList.add("success");
        form.reset();
      } else {
        throw new Error(result.error || "Failed to send");
      }
    } catch {
      status.textContent = "Could not send message. Try Discord instead.";
      status.classList.add("error");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  loadContent();
  initContactForm();
});