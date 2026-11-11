# Technical Specification — Natalija Art Gallery

**Project status:** React + Vite application with Supabase Auth and inquiry workflow
**Specification date:** 2026-11-11

## 1. Purpose

Define requirements for a personal artist portfolio website that presents original artworks and artist information in Russian (RU), Lithuanian (LT), and English (EN). The initial visual implementation is now in place; this specification distinguishes the demo experience from real artist content that has not yet been supplied.

## Implementation snapshot

- The application uses React and Vite with the existing `@supabase/supabase-js` browser client.
- Hash routes provide Home, Gallery, Artwork Details, About, and Contact views. The selected language is retained in browser `localStorage` while navigating and after reload.
- `src/content.js` contains translated demonstration artwork. The Home and Gallery pages continue to use this local demo data; demo records are not inserted into Supabase.
- Demonstration images use temporary external Unsplash URLs and the selected typefaces load from Google Fonts; both require an internet connection.
- Supabase Auth and the inquiry workflow use the configured browser client. Supabase artworks are fetched for inquiry associations; they do not replace the existing gallery data.

## 2. Goals

- Present the artist and original artworks in an elegant, easy-to-understand portfolio.
- Let visitors browse the collection and view individual artworks.
- Make site and artwork content available in all three supported languages.
- Provide a responsive experience for desktop and mobile users.

## 3. Scope

### In scope

- Home page
- Gallery
- Artwork detail pages or views
- About the artist page
- Contact page
- Four artwork categories: Painting, Batik, Icon painting, and Graphic art
- Localized artwork fields and user-facing content for RU, LT, and EN
- Responsive desktop and mobile layouts
- Neutral background, refined typography, and large artwork imagery

### Not included in the first implementation

- Database-backed gallery display or content management
- Supabase Storage integration
- Populating the site with actual artist biographies, contact information, artwork records, or images
- Production deployment or GitHub repository setup

## 4. Pages and functional requirements

### 4.1 Home page

- Introduce the artist and the portfolio.
- Provide clear navigation to the Gallery, About the Artist, and Contact pages.
- May feature selected artworks; the selection and presentation rules are to be defined during design.
- Present localized text in the active language.

### 4.2 Gallery

- Display a browsable collection of artworks.
- Identify each artwork with its image and localized title when available.
- Provide access to the four categories: Painting, Batik, Icon painting, and Graphic art.
- Category labels and any accompanying interface text must be localized.
- Filtering, sorting, pagination, and search behavior are not specified yet and should be decided before implementation if needed.

### 4.3 Artwork details

- Show a large image of the selected artwork.
- Support the following artwork fields: title, image, technique, year, and description.
- Localize title, technique, and description for RU, LT, and EN. A year is a language-independent value unless a later requirement says otherwise.
- Allow a field to be absent where artwork information has not been supplied; do not fabricate metadata.
- Provide a way to return to the Gallery and, where appropriate, navigate to another artwork. Exact navigation behavior remains to be designed.

### 4.4 About the artist

- Present artist information and background supplied by the artist.
- Support localized content in RU, LT, and EN.
- The biography content and any portrait or supporting imagery have not yet been provided.

### 4.5 Contact and inquiries

- Reuse the Contact hash route for an authenticated inquiry form and the signed-in user's inquiry history.
- Require name, email, and message; prefill email from the authenticated user. Artwork association is optional, and choices must come from public Supabase artwork UUIDs.
- Allow `normal` and `high` urgency. A general inquiry without an artwork is valid.
- Insert the current authenticated user's ID from the Supabase Auth user object; never accept a user ID from form input.
- Display only the current user's inquiries, including linked artwork when available, urgency, and creation date.
- Anonymous visitors see localized sign-in guidance rather than the form or private inquiry list.
- Provide localized loading, retryable error, empty, validation, and success states in EN, LT, and RU.
- Inquiry submissions are stored in the database. Email delivery or automation is not implemented by the browser workflow.

## 5. Content model

Each artwork belongs to one of the listed categories and may contain the following information:

| Field | Description | Localization |
|---|---|---|
| Category | Painting, Batik, Icon painting, or Graphic art | Category labels in the interface are localized |
| Title | Artwork name | RU, LT, and EN |
| Image | Artwork image asset or its eventual reference | Image itself is not translated |
| Technique | Materials or technique description | RU, LT, and EN |
| Year | Artwork year | Language-independent value |
| Description | Artwork description | RU, LT, and EN |

The demo uses a JavaScript data array in `src/content.js`, with localized text keyed by language code. This is demonstration content, not a final content-management approach. The production storage format, image formats and dimensions, required fields, and treatment of missing translations are not decided. The content model must preserve the association between each artwork and its localized text so that translations do not become detached from the artwork.

## 6. Localization requirements

- Supported language codes: `ru`, `lt`, and `en`.
- Provide a visible RU | LT | EN language switcher; the first implementation saves the selected language in browser `localStorage`.
- Localize navigation, page headings, category labels, contact copy, and other interface text.
- Localize artwork title, technique, and description content in each supported language.
- Localize artist information for each supported language.
- Define behavior for unavailable translations before implementation; do not silently present untranslated content as if it were localized.
- The first implementation defaults to English and uses hash routes without language-specific URL prefixes. Whether to change this behavior remains open.

## 7. Design and responsive requirements

- Use an elegant, minimalist art-gallery style.
- Use a neutral background and refined typography.
- Give artwork imagery a prominent, large presentation.
- Keep layouts usable and visually balanced on desktop and mobile screens.
- Preserve readable text, clear navigation, and artwork visibility at narrow viewport sizes.
- The initial design uses a warm ivory background (`#F4F0E8`), graphite typography (`#292824`), beige and muted bronze accents, DM Sans and Playfair Display typefaces, and responsive asymmetric grids. Further spacing, breakpoints, image cropping, and motion refinements remain open.

## 8. Technology and operations plan

- Codex is planned as a development-assistance tool.
- GitHub is planned for version control.
- Vercel is planned for deployment.
- Supabase Auth and database-backed inquiries are implemented using the existing client. Gallery content management and image storage remain future choices.
- The frontend uses React and Vite. Local development and production builds use the configured Vite scripts.
- Hosting configuration and the content editing workflow remain undecided. No deployment is configured.

## 9. Quality attributes

- **Responsive usability:** Core pages and artwork viewing should work on desktop and mobile layouts.
- **Visual focus:** Artwork images should remain prominent within the minimalist design.
- **Localization completeness:** Each supported language must be considered across page interface and artwork content.
- **Accessibility:** Implementation should provide semantic page structure, keyboard-operable navigation, and text alternatives for meaningful artwork images. Detailed accessibility targets and review criteria remain to be selected.
- **Performance:** Large images should be handled in a way that supports a responsive browsing experience. Specific image optimization and performance targets remain open.

## 10. Open questions for later planning

- Should a framework or more structured routing approach be adopted as the site grows?
- Should language-specific URLs or a different default language be introduced?
- What should happen when a translation is missing?
- Will the gallery need filtering, sorting, search, or pagination?
- How will artist-approved artwork content be authored and updated?
- What content-management and image-storage workflow should be used?
- Which contact method should the Contact page use?
- What are the artist-approved biography, contact details, initial artwork inventory, and image assets?
- What visual tokens, accessibility targets, and performance targets should implementation meet?

## 11. Authentication (approved feature)

- Any visitor may register with an email address and password.
- Email confirmation is required. Registration links return to the current application origin; the origin must be allowed in Supabase Auth redirect URL settings.
- Use the PKCE browser flow so the email-confirmation callback uses a query parameter and does not conflict with the site's hash-based page routes.
- The application must not treat registration as an authenticated session unless Supabase returns a session. When confirmation is required and no session is created, show a localized instruction to check the user's email.
- Existing users can sign in with email and password and sign out.
- Show the authenticated user's email and a sign-out action in the existing site header.
- Authentication forms appear in an accessible modal over the existing site. Authentication does not add or change hash routes or replace gallery pages.
- Persist the browser session across reloads using the existing Supabase JavaScript client defaults. Sign-out ends only the current local session.
- Localize every authentication label, validation message, status, and error in English (EN), Lithuanian (LT), and Russian (RU).
- Authentication must use the existing Supabase client and publishable key. Never expose a service-role or secret key in the browser.
- This feature does not add database tables, alter RLS policies, or change the public gallery behavior.

## 12. Supabase inquiry data (implemented)

- The `artworks` table has `id` (UUID primary key), `user_id` (required UUID referencing `auth.users` with cascade delete), `title` (required text), `type` (required text constrained to `painting`, `batik`, `icon`, or `graphic`), nullable integer `year`, nullable text `description` and `image_url`, and required `created_at` with a `now()` default.
- The application performs public artwork SELECTs. It does not create, edit, or delete artwork rows. Current demonstration gallery data remains separate in `src/content.js`.
- The `inquiries` table has `id` (UUID primary key), nullable `artwork_id` (UUID referencing `artworks.id` with set-null on delete), required `user_id` (UUID referencing `auth.users` with cascade delete), required `name`, `email`, and `message` text, required `urgency` text defaulting to `normal` and constrained to `normal` or `high`, and required `created_at` with a `now()` default.
- The client submits inquiries with the current authenticated user's ID. It filters inquiry SELECTs by that user; RLS independently restricts authenticated INSERT and SELECT to rows where `auth.uid() = user_id`.
- Public artwork SELECT is available to anon and authenticated roles. Authenticated artwork mutations remain restricted to the owning `user_id` by the existing policies; this application does not expose those operations.
- Schema, constraints, foreign keys, and RLS policies are not modified by the inquiry feature.
