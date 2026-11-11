# Technical Specification — Natalija Art Gallery

**Project status:** First visual implementation — local development  
**Specification date:** 2026-11-10

## 1. Purpose

Define requirements for a personal artist portfolio website that presents original artworks and artist information in Russian (RU), Lithuanian (LT), and English (EN). The initial visual implementation is now in place; this specification distinguishes the demo experience from real artist content that has not yet been supplied.

## Implementation snapshot

- The first local version uses native HTML, CSS, and JavaScript modules and a small Node.js built-in HTTP server; there are no installed frontend dependencies.
- Hash routes provide Home, Gallery, Artwork Details, About, and Contact views. The selected language is retained in browser `localStorage` while navigating and after reload.
- `src/content.js` contains translated demonstration artwork. The About and Contact views are placeholders and do not contain actual biography or contact details.
- Demonstration images use temporary external Unsplash URLs and the selected typefaces load from Google Fonts; both require an internet connection.
- Deployment, GitHub connection, Supabase, and authentication are not configured or included.

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

- Database, authentication, and content-management backend
- Selecting or initializing a frontend framework
- Package installation and third-party runtime dependencies
- Supabase integration
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

### 4.5 Contact

- Provide a clear contact method to be selected and supplied by the artist.
- Localize page text and instructions in RU, LT, and EN.
- The current implementation displays translated placeholder copy only. The actual contact method and whether the page uses a form or direct contact links remain undecided. Do not assume a form backend.

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
- Supabase is an optional future choice for database and image storage; adoption depends on later content-management and storage needs.
- The first version uses native HTML, CSS, and JavaScript modules, served locally by Node.js without installed dependencies.
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
- Is Supabase needed, or is another content and image workflow sufficient?
- Which contact method should the Contact page use?
- What are the artist-approved biography, contact details, initial artwork inventory, and image assets?
- What visual tokens, accessibility targets, and performance targets should implementation meet?
