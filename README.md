# Unlist — Frontend

> Know what's wrong before you buy.

Unlist is a used car audit tool that surfaces every inspection fault from Spinny and Cars24 listings, ranks them by ML severity, and gives buyers a plain-English AI summary and test drive checklist before visiting the showroom.

🔗 **Live site:** https://unlist-frontend.vercel.app

---

## What it does

- **Analyse** — paste a Spinny or Cars24 listing URL and get back every fault ranked by severity (1–5), grouped into critical, non-critical, restored, and replaced categories, with an AI-generated plain-English summary and red flag score
- **Compare** — paste 2–4 listings side by side with a Gemini AI verdict on which car has lower fault risk
- **Test drive checklist** — a mobile-friendly checklist generated from the faults, designed to be pulled up at the showroom
- **Share report** — generate a shareable permalink valid for 7 days, no account needed
- **Saved reports** — authenticated users can save, view, and delete reports across sessions
- **Auth** — Google OAuth 2.0 + email/password login with a popup modal UI

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React (Vite) |
| Styling | Plain CSS with custom properties |
| State management | useState / useEffect (no router, manual view switching) |
| Auth | JWT via Bearer token, persisted in localStorage |
| API calls | Custom fetch wrapper (src/api/client.js) |
| Deployment | Vercel |
| Backend | FastAPI (Python) — deployed separately on Render |

---

## Project structure
src/
api/
client.js # fetch wrapper with JWT auth header support
components/
Navbar.jsx # top nav, auth state, Saved link
Home.jsx # landing page, Analyse/Compare toggle + How it works
AnalyseResult.jsx # single listing fault report + save button
CompareResult.jsx # side-by-side comparison + save button
FaultCard.jsx # individual fault with severity dot
ChecklistCard.jsx # test drive checklist with copy + share
CompareCard.jsx # single car card in compare view
SharedReport.jsx # report link created screen
AuthModal.jsx # Google + email/password login popup
SavedReports.jsx # saved reports list with view + delete
App.jsx # root, view switching, auth state, shared link handling
main.jsx # entry point
index.css # global styles, design tokens, all reusable classes
public/
car.png # hero car illustration
bg.webp # tiled background pattern
vercel.json # API proxy rewrite rules

---

## Running locally

**Prerequisites:** Node.js v18+

```bash
# Clone the repo
git clone https://github.com/RitishaSinha/unlist-frontend.git
cd unlist-frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE=/api" > .env

# Start dev server
npm run dev
```

Open http://localhost:5173

The Vite dev server proxies `/api/*` to the live backend automatically via `vite.config.js`.

---

## Environment variables

| Variable | Value | Purpose |
|---|---|---|
| `VITE_API_BASE` | `/api` | Base path for all API calls |

---

## API proxy — how CORS is handled

On Vercel, `vercel.json` rewrites all `/api/*` requests server-side to the backend before they reach the browser, so no cross-origin request is ever made:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://unlist-backend-s280.onrender.com/:path*"
    }
  ]
}
```

Locally, `vite.config.js` does the same via the `server.proxy` config.

---

## Design decisions

**No React Router** — navigation uses a single `view` state in App.jsx. Shared report deep links are handled by reading `?report=id` from `window.location.search` on load.

**No UI library** — all styling is hand-written CSS with `:root` custom properties. Reusable classes (`.card`, `.btn-amber`, `.btn-outline`, `.tab-btn`) keep components clean.

**Performance** — background pattern uses a CSS `::before` pseudo-element with `position: fixed` and `will-change: transform` to put it on a separate GPU layer, preventing repaints on every scroll and interaction.

**CORS** — handled entirely via proxy rewrite without touching backend code.

---

## Auth flow

**Email/password:** credentials → `POST /auth/login` or `/auth/register` → JWT returned → stored in localStorage → attached as `Authorization: Bearer <token>` on protected requests.

**Google OAuth:** frontend redirects to `backend/auth/login` → Google consent → `backend/auth/callback` → backend redirects to frontend with token as query param → frontend reads param, stores token, clears URL.

---

## Backend (built separately)

| Component | Detail |
|---|---|
| Framework | FastAPI, Python |
| Spinny data | Unauthenticated internal REST endpoints via car ID |
| Cars24 data | APK reverse engineered, SSL pinning bypassed, internal API replicated server-side |
| ML scoring | Random Forest, 1,900 manually labelled faults, 10 categories, severity 1–5 |
| LLM | Gemini Flash Lite — summaries + compare verdicts |
| Cache | Redis — 30-day analyse cache, 7-day share TTL |
| Database | PostgreSQL (Neon) — users + saved reports |
| Auth | Google OAuth 2.0 + bcrypt email/password, 30-day JWTs |
| Hosting | Render |

---

## Author

**Ritisha Sinha** — Frontend Development  
Backend by: *(backend dev name + GitHub link)*
