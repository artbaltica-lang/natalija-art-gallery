# Natalija Art Gallery

## Project status

**React + Vite application with Supabase Auth and inquiry workflow**

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
- Clearly labeled demonstration artwork and a placeholder artist page. No real biography or artist artwork information is included.
- Supabase email/password authentication with email confirmation and locally persisted browser sessions.
- Public Supabase artwork loading for the inquiry form's optional artwork selector. Existing demonstration artwork remains in the gallery and is not used as a database reference.
- Authenticated visitors can submit inquiries and see their own inquiry history, including urgency, creation time, and any linked database artwork.
- Supabase Row Level Security remains responsible for public artwork reads and per-user inquiry access.

## Technology

- React and Vite, with the existing `@supabase/supabase-js` client.
- Local development and production builds use the configured Vite scripts.
- Supabase URL and publishable key are supplied through `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`; do not use a service-role or secret key in the browser.
- Codex is used for development assistance. GitHub and Vercel remain planned tools; this project does not claim a connected repository or deployment.

## Future technology plan

GitHub and Vercel remain planned for version control and deployment. Supabase Auth and the existing `artworks` and `inquiries` tables are connected through the browser client. Supabase Storage and database-backed gallery display or editing are not part of this feature.

## Run locally

Requirements: Node.js 20 or later and npm. No package installation is needed.

```sh
npm run dev
```

Open `http://localhost:4173` in a browser. On Windows PowerShell where script execution blocks the `npm` shim, use `npm.cmd run dev`.

## Content and limitations

Demonstration artwork records remain in `src/content.js` and are used by the existing Home and Gallery pages. They are not inserted into Supabase and their local IDs are never used as inquiry foreign keys. The Contact page uses public Supabase artwork UUIDs only for optional inquiry association. Inquiries require authentication; the browser supplies the current user's ID and RLS restricts inserts and reads to that user. The About page intentionally contains no invented biography. Temporary demonstration images use external Unsplash URLs, and the selected typefaces load from Google Fonts; both require an internet connection.

The detailed requirements and remaining decisions are in [docs/TECHNICAL_SPECIFICATION.md](docs/TECHNICAL_SPECIFICATION.md). See [TASKS.md](TASKS.md), [DECISIONS.md](DECISIONS.md), and [BUGS.md](BUGS.md) for current work, technical decisions, and known problems.
