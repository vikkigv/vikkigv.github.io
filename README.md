# Vignesh G — Portfolio

Single-page developer portfolio built with plain **HTML + CSS + JavaScript** — no frameworks, no build step. Dark developer theme, fully responsive, works on GitHub Pages / Netlify / Vercel out of the box.

## Preview locally

```bash
python3 -m http.server 8123
# open http://127.0.0.1:8123
```

(Any static server works — `npx serve`, VS Code Live Server, etc. Opening `index.html` directly in a browser also works.)

## Project structure

```
vignesh-portfolio/
├── index.html          ← all content lives here (edit this)
├── css/styles.css      ← theme: colors, spacing, responsive rules
├── js/main.js          ← typewriter, scroll reveals, stat count-up, mobile menu
├── assets/
│   └── Vignesh_G_Resume.pdf   ← served by the "Download résumé" buttons
└── README.md
```

## Before publishing — 2 things to update

Open `index.html` and search for `TODO(vignesh)`:

1. **LinkedIn URL** — replace `YOUR-LINKEDIN-USERNAME` in the contact section.
2. **GitHub URL** — replace `YOUR-GITHUB-USERNAME`, or delete that button if you don't want it.

## How to edit content

- **Text/projects/experience** — everything is plain HTML in `index.html`. Each section is marked with a comment banner (`<!-- ===== Experience ===== -->`). Copy a `<li class="timeline-item">` or `<article class="project-card">` block to add another entry.
- **Stats numbers** — the hero strip reads `data-value` / `data-suffix` attributes; update those.
- **Colors** — change the CSS variables at the top of `css/styles.css` (`--accent`, `--bg`, etc.).
- **Typewriter roles** — edit the `roles` array in `js/main.js`.

## Deploy (free)

**Option A — GitHub Pages**

```bash
cd vignesh-portfolio
git init && git add -A && git commit -m "portfolio"
# create a repo named vigneshg.github.io (or any name) on GitHub, then:
git remote add origin git@github.com:<your-username>/<repo>.git
git push -u origin main
# For a repo named vigneshg.github.io the site is live at https://<your-username>.github.io
# For any other repo: Settings → Pages → deploy from main branch
```

**Option B — Netlify (fastest)**

1. Go to https://app.netlify.com/drop
2. Drag the `vignesh-portfolio` folder onto the page — done, you get an instant URL.
3. Optionally connect it to a Git repo for auto-deploys, or add a custom domain.

**Option C — Vercel**

```bash
npm i -g vercel
cd vignesh-portfolio && vercel --prod
```

## Custom domain (optional)

Buy a domain (e.g. `vigneshg.dev`), then in Netlify/Vercel/GitHub Pages settings add the custom domain and point your DNS per their instructions. Takes ~10 minutes to propagate.
