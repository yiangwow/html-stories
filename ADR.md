# Architecture decisions

## 0001 — Canonical public anthology

**Date:** 2026-07-25

**Status:** Accepted

### Context

Downloads contained five browser stories in two byte-identical forms: a
top-level standalone HTML file and a folder containing the same `index.html`.
A sixth, multi-page story, SOVEREIGN, was created separately. Downloads also
contains `Visualizer/`, a distinct audio-visual experiment with embedded audio
and a source entry point that references a missing `/src/main.js`.

The stories need one safe local home and one public GitHub repository without
publishing duplicate exports or media of uncertain redistribution status.

### Decision

- Keep one canonical folder per story under `stories/<slug>/`.
- Publish exactly six works: SOVEREIGN, ROOM NULL, BITE THE SUN,
  A MESSAGE FOR NO ONE — WIRED, A MESSAGE FOR NO ONE, and THE BUTTON IS LYING.
- Exclude `Visualizer/` until its source and audio redistribution status are
  handled as a separate project.
- Provide a static root entrance and dependency-free reference validation.
- Keep the repository public but do not configure GitHub Pages.
- Grant no reuse license by default.

### Consequences

- Each work has a stable, relative URL and remains directly openable.
- Duplicate Downloads exports are preserved only in the dated local archive,
  not in Git history.
- The repository requires no build system or package maintenance.
- `Visualizer/` remains in Downloads and is not represented by this anthology.
- Reversing the local move means restoring the explicit archived paths;
  reversing publication before merge means closing the PR and removing its
  feature branch or changing repository visibility.
