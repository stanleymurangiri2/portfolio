// Builds the CV PDF and the link-preview image from the HTML sources.
// Usage (from any folder that has @playwright/test in node_modules):
//   NODE_PATH=<dir>/node_modules node tools/render.cjs [portfolio URL]
// Pass the live portfolio URL once it exists; it is printed on the CV.
const path = require('path');
const { chromium } = require('@playwright/test');

const root = path.resolve(__dirname, '..');
const portfolioUrl = process.argv[2] || '';

(async () => {
  const browser = await chromium.launch();

  // CV (A4, selectable text for hiring systems)
  const cv = await browser.newPage();
  await cv.goto('file://' + path.join(root, 'tools/cv.html'), { waitUntil: 'networkidle' });
  if (portfolioUrl) {
    await cv.evaluate((url) => {
      const el = document.getElementById('portfolio-link');
      el.innerHTML = `<a href="${url}">${url.replace(/^https?:\/\//, '')}</a>`;
    }, portfolioUrl);
  }
  await cv.evaluate(() => document.fonts.ready);
  await cv.pdf({ path: path.join(root, 'cv/Stanley-Murangiri-CV.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  const pages = await cv.evaluate(() => Math.ceil(document.body.scrollHeight / 1050));
  console.log('CV rendered, approx pages:', pages);

  // Link preview image (WhatsApp, LinkedIn, X): 1200x630
  const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto('file://' + path.join(root, 'tools/og.html'), { waitUntil: 'networkidle' });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: path.join(root, 'assets/og-image.png') });

  await browser.close();
})();
