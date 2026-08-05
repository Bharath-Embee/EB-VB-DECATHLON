# EMBEE — Merchandising Planning

A Vite + React project version of the EMBEE ERP app.

**Sidebar structure:**
- **Overview** — Dashboard
- **Season Preparation** — Season Names (click a season to open its own workspace with tabs
  for Selection File, Yarn Requirement, Fabric Requirement, and Accessories Requirement —
  each season's data stays separate from every other season)
- **Demands** — Forecast, Firm Orders, Forecast vs Firm, **Order Management** (the delivery-wise
  priority planning grid + PO tracking, with colour-coded columns and a Demand Analysis
  report grouped by Style/Model/Colour/Season/Supplier/Factory)
- **Shipment** — Shipment Management, Shipment Performance
- **Document Editors** — PO PDF Editor
- **Admin** — Users (module access control, password management)

**Not yet built:** Yarn Requirement and the real (weekly, buyer-commitment-driven)
Accessories Requirement are placeholders inside the Season workspace — Fabric Requirement
was built first, grounded in a real EMBEE Fabric Ordering workbook's exact formulas.

## ⚠️ Important — test locally before you push

This project was converted from a single self-contained HTML file (which ran React via
CDN + an in-browser Babel/JSX transform) into a proper Vite project structure, so it can
be built and deployed the standard way on Vercel. **The conversion itself was verified
line-for-line against the working original — every line of application logic is
byte-for-byte identical, only the module wrapping changed** (a `const {...} = React`
destructure became a proper `import`, and the render call moved into `main.jsx`).

What was **not** possible to verify here: this environment has no network access, so
`npm install` and an actual `vite build` could not be run. Please do this first, before
pushing to GitHub or deploying:

```bash
npm install
npm run dev
```

Open the local dev URL it prints and click through the app (login, a couple of pages,
an upload) to confirm everything renders and works exactly as before. If anything
errors, copy the exact error message — that pinpoints the fix immediately, versus
guessing blind.

## ⚠️ Important — shared data will NOT work the same way

The original file used Claude's built-in artifact storage (`window.storage`) so every
user who opened the same published link shared one login list and one dataset. **That
API only exists inside Claude's artifact environment — it will not exist here.**

Once deployed on Vercel (or anywhere outside Claude), the app automatically falls back
to each visitor's own browser `localStorage`. That means:

- Every person who opens your Vercel URL gets their own separate, empty copy.
- Admin accounts and users you create only exist in your own browser.
- Nobody's login, uploaded POs, or data will sync between teammates.

This is fine if each person is meant to use their **own personal copy** of the tool.
It is **not** a shared multi-user ERP system as deployed here — for that, a real backend
(a server + database, e.g. Supabase, Firebase, or a custom API) needs to be added so
accounts and data live in one central place instead of per-browser. That's a genuine
development task, not a config change — happy to help with it if/when you want to go
that route.

## Login accounts (edit before you deploy)

Because every visitor's browser starts empty, `src/App.jsx` seeds a fixed list of
login accounts (`DEFAULT_USERS_SEED`, near the bottom of the file, just above
`export default function App(){`) so everyone sees a normal login screen instead of
"Set up the first admin account" every time. **Edit that list with your real
username(s)/password(s) before you deploy**, then commit + push — Vercel rebuilds
automatically. The live "Add user" button on the Users page still works, but only
for the browser that used it — to add a teammate for real, add them to this list
instead and redeploy.

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Outputs to `dist/`.

## Deploy to Vercel

1. Push this folder to a GitHub repository (see below).
2. Go to https://vercel.com → **Add New... → Project** → import that repository.
3. Vercel auto-detects the Vite framework preset — leave the defaults
   (Build Command: `vite build`, Output Directory: `dist`) and click **Deploy**.

### Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Project structure

```
index.html          Vite entry HTML — loads CDN libraries (xlsx, jsPDF, pdf.js, pdf-lib,
                     JSZip, Jspreadsheet CE + jSuites, Tailwind) and mounts the app
src/main.jsx         Mounts <App /> into #root
src/App.jsx          The entire application (all pages, components, and logic)
src/index.css        All app styling (design tokens, layout, components)
public/login-bg-*.jpg Login screen background photos (randomly picked per visit)
vite.config.js        Vite + @vitejs/plugin-react config
package.json          Dependencies and scripts
```

**Jspreadsheet CE** (the Excel-style grid used for pasting Selection File data) is loaded
via CDN in `index.html`, not npm — it's MIT-licensed and free for commercial use, unlike
Handsontable (which requires a paid licence for any business deployment since 2019).
