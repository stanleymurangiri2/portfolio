// Screenshots of KopaAlert's public landing page (no customer data) for the
// portfolio. Usage: NODE_PATH=<project>/node_modules node shoot-kopaalert.cjs <outDir>
const path = require('path');
const { chromium } = require('@playwright/test');

(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  for (const [name, viewport, scale] of [
    ['kopaalert-desktop', { width: 1440, height: 900 }, 1],
    ['kopaalert-mobile', { width: 390, height: 844 }, 2],
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: scale, colorScheme: 'light' });
    await page.goto('https://www.kopaalert.shop/', { waitUntil: 'networkidle' });
    // Hide the cookie banner and install bar for a clean shot (not clicked, not accepted).
    await page.addStyleTag({ content: '[role="dialog"], .fixed.bottom-0, .fixed.inset-x-0.bottom-0 { display: none !important; }' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(out, `${name}.png`) });
    await page.close();
  }
  await browser.close();
})();
