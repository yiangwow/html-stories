# HTML Stories

## Purpose

Public anthology of self-contained browser stories. The repository preserves
the canonical folder copy of each work; duplicate Downloads exports are not
tracked.

## Architecture

- `index.html` + `anthology.css` — collection entrance.
- `stories/<slug>/index.html` — canonical entry point for each work.
- `stories/sovereign/` — four-page work with shared files under `assets/`.
- `scripts/validate.py` — dependency-free local-reference and document checks.
- `.github/workflows/validate.yml` — runs the same validator on pushes and PRs.

There is no backend, package manager, database, build step, or runtime
configuration. Individual stories use only browser-native HTML, CSS, and
JavaScript.

## Local operation

No environment variables are required.

```sh
python3 -m http.server 8000
python3 scripts/validate.py
```

Open `http://localhost:8000`.

## Delivery

GitHub is the source host. GitHub Pages is not configured. Delivery changes use
a feature branch and pull request; never push directly to `main`.

Before delivery:

1. Run `python3 scripts/validate.py`.
2. Exercise the anthology entrance and changed stories in a browser.
3. Confirm no unintended external requests or console errors.
4. Verify the pushed PR contains every intended commit and inspect its checks.

## Adding a work

Copy one canonical, self-contained project into `stories/<slug>/`, add it to
the root entrance and README, and keep its original visual system intact.
Do not import duplicate standalone exports or media without redistribution
rights.
