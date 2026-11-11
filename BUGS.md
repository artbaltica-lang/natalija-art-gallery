# Bug Log

Project status: **First visual implementation — local development**

## 2026-11-10 — Artwork links opened the home view instead of artwork details

- **Cause:** Artwork links correctly generated `#/artwork/<id>` and the detail renderer looked up artwork IDs correctly. The route parser removed the `#/` prefix, then destructured the remaining segments as if the removed prefix still left an empty first segment. It therefore treated the artwork ID as the page name and left the detail ID undefined, so the detail view was never selected.
- **Fix:** Parse the first remaining segment as the page and the second as the artwork ID, decoding the ID before lookup. The detail view already provided translated title, technique, year, description, larger image, and a back-to-gallery link.
- **Verification:** Checked all four generated artwork routes against the parser and confirmed that every artwork has title, technique, and description values in EN, LT, and RU. `src/main.js` passes Node's syntax check; the local server serves it successfully.
- **Status:** Resolved.

## Environment note

The `npm` PowerShell shim is blocked by the machine's script-execution policy; use `npm.cmd run dev` on this machine. This is an environment limitation, not an application bug.
