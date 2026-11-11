# Decisions

This log separates confirmed project and implementation decisions from choices that remain open.

## 2026-11-10 — Project requirements and planning baseline

- **Confirmed:** The portfolio is intended to present original artworks and artist information in Russian, Lithuanian, and English.
- **Confirmed:** The planned page set is Home, Gallery, Artwork Details, About the Artist, and Contact; gallery categories are Painting, Batik, Icon Painting, and Graphic Art.
- **Confirmed:** The visual direction is an elegant art-gallery presentation with prominent imagery and responsive desktop and mobile layouts.
- **Reason:** These requirements come from the project brief.

## 2026-11-10 — First visual implementation uses native web technologies

- **Confirmed:** Use native HTML, CSS, and JavaScript modules for the first version, with Node.js's built-in HTTP server for local development.
- **Reason:** This keeps the initial app maintainable and runnable without adding framework or server dependencies.
- **Status:** Implemented locally; no deployment is configured.

## 2026-11-10 — Use browser hash routes and local language preference

- **Confirmed:** The five page views use hash-based routes, and the selected language (`en`, `lt`, or `ru`) is saved in browser `localStorage` so it persists while navigating and after reload.
- **Reason:** This provides simple client-side navigation and language retention without a routing dependency or backend.
- **Status:** Implemented.

## 2026-11-10 — Keep demonstration content separate from artist information

- **Confirmed:** Sample artwork records and translations live in `src/content.js`. The About and Contact pages explicitly indicate that real information has not been supplied.
- **Reason:** The visual version needs sample content, while personal details and real artwork information must come from the artist.
- **Status:** Implemented. Replace samples with approved content before public use.

## 2026-11-10 — Temporary images are externally hosted

- **Confirmed:** Demonstration artwork uses temporary Unsplash image URLs.
- **Reason:** It allows the first visual version to show large artwork imagery without adding image packages or making local claims about real works.
- **Status:** Implemented; image delivery requires an internet connection. Local, artist-approved image assets remain future work.

## Open decisions

- Whether Supabase or another content and image workflow is needed.
- Whether to adopt a framework as the application grows.
- The artist-approved biography, contact method, artwork inventory, and image assets.
- Detailed accessibility and performance targets.
- GitHub repository setup and deployment configuration; neither is currently configured.
