# Seoul Family Travel Site

Static GitHub Pages repo for a mobile-friendly Seoul family travel guide.

## Published entrypoint

- `index.html` is the page GitHub Pages should serve.
- `assets/css/app.css` and `assets/js/app.js` are the static assets used by the published site.
- Asset paths are relative, so the site works from GitHub Pages root publishing without a custom build step.

## Why `.nojekyll` is included

This repo currently contains both:

- `index.html` (the static SPA shell)
- `index.md` (long-form source/reference content)

Without `.nojekyll`, GitHub Pages would try to run Jekyll and may generate a second `index.html` from `index.md`, which creates an avoidable deployment conflict. Keeping `.nojekyll` in the repo makes Pages serve the site as plain static files instead.

Tradeoff: Jekyll-specific files such as `_config.yml` and `assets/css/style.scss` are not used while `.nojekyll` is present.

## Local preview

From the repository root:

```bash
python3 -m http.server 4000
```

Then open:

```text
http://127.0.0.1:4000/
```

Using a local server is recommended over opening `index.html` directly because the site loads JavaScript modules.

## GitHub Pages publishing

After GitHub authentication is fixed:

1. Commit and push the branch to GitHub.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select the default branch and **`/ (root)`** as the folder.
5. Save and wait for the Pages deployment to finish.

## Notes

- No build step is required for the current published site.
- The app uses hash-based navigation, so it does not need SPA rewrite support for subpaths.
- If the repo later moves back to a Jekyll-based site, remove `.nojekyll` and avoid keeping both `index.html` and `index.md` as competing root pages.
