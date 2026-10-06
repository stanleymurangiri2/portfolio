# Stanley Murangiri: portfolio

A single static page (`index.html`), no framework and no build step. Deploys as-is on Vercel, Netlify or GitHub Pages.

- `index.html`: the site
- `assets/`: screenshots (demo/public data only), favicon, link-preview image
- `cv/Stanley-Murangiri-CV.pdf`: the CV the site links to
- `tools/cv.html`, `tools/og.html`: sources for the CV and the link-preview image
- `tools/render.cjs`: rebuilds both

## Updating the CV or preview image

Edit `tools/cv.html` (or `tools/og.html`), then run, from this folder:

    NODE_PATH=$HOME/Projects/kopa-alert/node_modules node tools/render.cjs https://stanleymurangiri.vercel.app

The URL is optional; when given, it's printed on the CV next to GitHub.

## After the first deploy

Link previews (WhatsApp, LinkedIn) need an absolute image URL: change
`<meta property="og:image" content="assets/og-image.png">` in `index.html` to the full
`https://…/assets/og-image.png`.
