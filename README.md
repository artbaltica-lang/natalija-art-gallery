# Natalija Art Gallery

## Project status

**First visual implementation — local development**

## Overview

Natalija Art Gallery is a personal artist portfolio website for presenting original artwork. The first visual version provides a multilingual, responsive portfolio experience in Russian (RU), Lithuanian (LT), and English (EN).

## Goals

- Present the artist and original artworks in a clear, refined way.
- Make the artwork collection easy to browse by category.
- Provide localized content and navigation in all three project languages.
- Deliver a comfortable experience on desktop, tablet, and mobile screens.

## Current features

- Home, Gallery, Artwork Details, About the Artist, and Contact views.
- Gallery categories for Painting, Batik, Icon Painting, and Graphic Art.
- Visible RU | LT | EN language switcher; the selected language is saved in the browser and remains selected while navigating.
- Localized navigation, page copy, categories, artwork titles, techniques, and descriptions.
- Editorial layouts, warm ivory background (`#F4F0E8`), graphite typography (`#292824`), beige and bronze details, and responsive asymmetric artwork grids.
- Clearly labeled demonstration artwork and placeholder artist/contact pages. No real biography or artist artwork information is included.

## Technology

- Native HTML, CSS, and JavaScript modules; no frontend framework or third-party runtime dependencies.
- Node.js built-in HTTP server for local development.
- Codex is used for development assistance. GitHub and Vercel remain planned tools; this project does not claim a connected repository or deployment.
- Supabase and authentication are not included.

## Future technology plan

GitHub remains the planned version-control platform and Vercel remains the planned deployment platform. Supabase is still an optional future database and image-storage service. None of these services is configured or connected in this implementation.

## Run locally

Requirements: Node.js 20 or later and npm. No package installation is needed.

```sh
npm run dev
```

Open `http://localhost:4173` in a browser. On Windows PowerShell where script execution blocks the `npm` shim, use `npm.cmd run dev`.

## Content and limitations

Demonstration artwork records are kept in `src/content.js` and are separate from artist biography and real portfolio data. Their images use temporary external Unsplash URLs, and the selected typefaces load from Google Fonts; both require an internet connection. Replace all sample records and images with artist-approved content before presenting the site as the real portfolio. The About and Contact views intentionally contain no invented personal details or contact information.

The detailed requirements and remaining decisions are in [docs/TECHNICAL_SPECIFICATION.md](docs/TECHNICAL_SPECIFICATION.md). See [TASKS.md](TASKS.md), [DECISIONS.md](DECISIONS.md), and [BUGS.md](BUGS.md) for current work, technical decisions, and known problems.
