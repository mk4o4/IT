# Archive — Study Materials Library

A clean, fast, searchable library for sharing study PDFs with students. No backend,
no database, no paid services — just static files hosted for free on GitHub Pages
or Netlify.

Live structure: a React + Vite site reads everything from **one JSON file**
(`public/data/resources.json`) and generates the entire UI — categories, cards,
search index, and recent uploads — automatically.

---

## ✨ What you get

- Dark mode by default, with a light mode toggle
- Instant client-side search (name, description, category — no server)
- Category pages with expand/collapse previews on the home page
- Favorites and "recently viewed" saved in the visitor's browser (localStorage)
- Copy-link button per resource, scroll-to-top, breadcrumbs, empty states
- One accent color variable to re-theme the whole site
- Fully responsive, keyboard-accessible, reduced-motion friendly

---

## 🗂 Folder structure

```
public/
  files/
    Computer-Networks/
      intro-to-networking.pdf
      routing-algorithms.pdf
    Operating-Systems/
      process-scheduling.pdf
    Programming/
    Mathematics/
  data/
    resources.json      ← the ONLY file you edit to add/remove resources
src/
  components/           ← reusable UI pieces (Navbar, Hero, Cards, etc.)
  pages/                ← Home, CategoryPage, SearchPage, FavoritesPage
  hooks/                ← useResources, useFavorites, useRecentlyViewed, useLocalStorage
  context/               ← ThemeContext (dark/light)
  utils/                ← icon map + file URL helper
```

---

## ➕ How to add a new PDF (the only workflow you need)

1. **Drop the PDF** into the right category folder inside `public/files/`.
   - If the category doesn't exist yet, create a new folder — name it anything,
     e.g. `public/files/Databases/`.
2. **Open `public/data/resources.json`** and add an entry.
   - If it's a new category, add a new object to the `categories` array.
   - If it's an existing category, add a new object to that category's `files` array.
3. **Commit and push.** GitHub Pages / Netlify rebuilds automatically and the
   new file appears on the site — no code changes required.

### Example: adding a file to an existing category

```json
{
  "title": "Subnetting Practice Problems",
  "description": "20 worked examples with answer key",
  "filename": "subnetting-practice.pdf",
  "size": "1.4 MB",
  "date": "2026-08-01"
}
```
Add this object inside the `"files": [ ... ]` array of the matching category,
and make sure `subnetting-practice.pdf` exists in that category's folder
under `public/files/`.

### Example: adding a brand-new category

```json
{
  "id": "databases",
  "name": "Databases",
  "icon": "database",
  "description": "SQL, normalization, and transactions.",
  "folder": "Databases",
  "files": []
}
```
- `id` — used in the URL (`/category/databases`), keep it lowercase with hyphens.
- `icon` — pick one of: `network`, `cpu`, `code`, `sigma`, `book`, `flask`,
  `database`, `globe`, `shapes`, `calculator`, `binary`, `layers`.
  (Add more mappings in `src/utils/categoryIcons.js` if you need a different one.)
- `folder` — must exactly match the folder name inside `public/files/`.

### Field reference

| Field         | Required | Notes                                            |
|---------------|----------|---------------------------------------------------|
| `title`       | yes      | Shown as the card heading                         |
| `description` | no       | Short subtitle, omit the key entirely to skip it   |
| `filename`    | yes      | Must match the actual file in `public/files/<folder>/` exactly |
| `size`        | yes      | Free text, e.g. `"2.3 MB"` — not calculated automatically |
| `date`        | yes      | `YYYY-MM-DD`, used for sorting "Recently added"    |

There's no build step that touches PDFs — they're served as-is from `public/`,
so file names are case-sensitive and must match the JSON exactly.

---

## 🎨 Changing the look

Almost the entire visual identity lives in `src/index.css` under
`:root { ... }`. To change the accent color site-wide, edit one line:

```css
--accent: #6C8CFF;   /* change this hex value */
--accent-hover: #86A2FF;  /* a slightly lighter shade for hover states */
```

Fonts, radii, and shadows are also defined there as CSS variables if you want
to adjust the overall feel.

---

## 🖥 Local development

```bash
npm install
npm run dev
```
Opens the site at `http://localhost:5173`.

```bash
npm run build     # outputs a production build to /dist
npm run preview   # preview the production build locally
```

---

## 🚀 Deploying

### Option A — GitHub Pages

1. Push this project to a GitHub repository.
2. Install the deploy helper (already in `devDependencies`):
   ```bash
   npm install
   ```
3. Run:
   ```bash
   npm run deploy
   ```
   This builds the site and pushes `/dist` to a `gh-pages` branch using the
   `gh-pages` package.
4. In your repo settings → **Pages**, set the source to the `gh-pages` branch.
5. Your site will be live at `https://<username>.github.io/<repo-name>/`.

> `vite.config.js` already sets `base: './'`, so the build works correctly
> from a subpath like `/repo-name/` without any extra configuration.

### Option B — Netlify

1. Push the project to GitHub (or any git provider Netlify supports).
2. In Netlify: **Add new site → Import an existing project**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. Every future push to your main branch auto-deploys.

### Option C — Drag-and-drop (no git needed)

1. Run `npm run build` locally.
2. Drag the generated `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🧠 How it all fits together

- `src/hooks/useResources.js` fetches `public/data/resources.json` once and
  derives everything else (flattened file list, total counts, most recent
  files) — every page reads from this single hook.
- `src/utils/paths.js` builds the actual download URL for a file from its
  category folder + filename, respecting the Vite `base` path.
- Favorites and recently-viewed resources are stored per-browser via
  `localStorage` (see `src/hooks/useFavorites.js` and
  `src/hooks/useRecentlyViewed.js`) — nothing is sent anywhere.
- Routing uses `HashRouter` (URLs look like `/#/category/programming`) so
  the site works correctly on static hosts without server-side rewrite rules.

---

## 📄 License

Use, modify, and redistribute freely for your own study material site.
