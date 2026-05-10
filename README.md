# Jian Lv Academic Homepage

This repository contains a small static academic homepage. It is designed to be easy to manage: profile data lives in `data/profile.json`, while `index.html`, `styles.css`, and `script.js` handle presentation.

## Edit the profile

Update `data/profile.json` when you want to change:

- Google Scholar metrics
- research interests
- selected publications
- academic links
- contact details
- last updated date

The current profile is seeded from the public Google Scholar reference:

https://scholar.google.com/citations?user=L3fXIPsAAAAJ&hl=en

Some publication entries are intentionally marked as selected placeholders. Replace them with the exact papers you want to feature.

## Preview locally

Because the page fetches `data/profile.json`, serve the folder with a local static server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Publish with GitHub Pages

This repository is already structured for GitHub Pages from the repository root:

- branch: `main`
- folder: `/root`
- entry file: `index.html`
- expected URL: `https://lvjian8596.github.io/my_profile/`

To publish:

1. Commit and push these files to `origin/main`.
2. Open `https://github.com/lvjian8596/my_profile/settings/pages`.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select branch `main` and folder `/root`.
5. Click **Save**.

GitHub Pages will serve the homepage as a static site.
