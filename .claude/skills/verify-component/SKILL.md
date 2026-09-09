---
name: verify-component
description: Format, lint, build, test (browser + SSR), regenerate the custom-elements manifest, build Storybook, and take the side-by-side React-vs-Lit screenshot for a wired Lit element of ninoverse-hmi-components. Phase 3 of the element workflow; run after wire-component and before ship-component.
---

# Verify Component

Validates a wired element by running the full quality pipeline and capturing
the screenshot pair. This is **phase 3 of 4** — run `ship-component` next.

## Inputs

- **Element name** (required): `<kebab>` for artifacts and tests, `<Pascal>`
  for the React section heading in `src/App.tsx`. Ask if not provided.

## Verification sequence

Fix any failure before moving to the next command — never proceed with a
broken step.

```bash
pnpm format   # Biome auto-format; apply any changes
pnpm lint     # zero warnings AND zero errors, no new biome-ignore
pnpm build    # tsc -b + ESM lib + r2wc IIFE + Lit IIFE
```

Artifacts:

```bash
ls dist/wc/<kebab>.js dist/react/<kebab>.js dist/elements/<kebab>/<kebab>.d.ts dist/elements/<kebab>/<kebab>.react.d.ts
```

Tests:

```bash
pnpm test -- src/elements/<kebab>        # Vitest browser mode (Chromium)
pnpm test:ssr -- src/elements/<kebab>    # Vitest node, @lit-labs/ssr
```

Manifest (must show the element with every property, attribute, slot, part
and event):

```bash
pnpm cem && git diff --stat custom-elements.json
```

Consistency: `src/elements/index.ts`, `src/react/index.ts`, `vite.config.ts`
and `package.json` `exports` all list the element, alphabetically.

Storybook:

```bash
pnpm build:storybook
```

If the docs page has no description, the class JSDoc is not directly above
`export class` — move it.

## Screenshot pair

`/tmp` is wiped on container reset — install once per session:

```bash
mkdir -p /tmp/shot && cd /tmp/shot && npm init -y && npm i @sparticuz/chromium puppeteer-core
```

One driver for both sides (`/tmp/shot/shot.js`):

```js
const chromium = require('@sparticuz/chromium').default;
const puppeteer = require('puppeteer-core');
const [, , url, selector, out] = process.argv;
(async () => {
    const browser = await puppeteer.launch({
        args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
        executablePath: await chromium.executablePath(),
        headless: true,
        defaultViewport: { width: 1000, height: 700, deviceScaleFactor: 2 },
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const target = selector
        ? await page.evaluateHandle((s) =>
              [...document.querySelectorAll('h2')]
                  .find((e) => e.textContent.trim() === s)?.closest('section'), selector)
        : null;
    await (target?.asElement() ?? page).screenshot({ path: out });
    await browser.close();
})();
```

- **React side** (legacy): `pnpm dev` in the background, then
  `node /tmp/shot/shot.js http://localhost:5173/ "<Pascal>" /tmp/shot/react.png`
  (the heading text must match the `<h2>` in `src/App.tsx`; check the actual
  dev-server port).
- **Lit side**: `pnpm storybook` in the background, then
  `node /tmp/shot/shot.js "http://localhost:6006/iframe.html?id=<story-id>&viewMode=story" "" /tmp/shot/lit.png`
  (story id is the lower-cased title path, e.g.
  `components-forms-button--variants`).
- Both under the default theme axes. For panel-like elements take a second
  Lit shot with `data-structure="journal" data-material="glass"` set on
  `<html>` (Storybook toolbar globals `structure=journal&material=glass` in the
  URL `globals` param).
- Stop the servers: `kill "$(pgrep -f vite | head -1)"`.

Present both images side by side and wait for the user's approval before
proceeding to `ship-component`.

## Done

Once every command passes and the user approves the screenshots, tell them
verification is complete and prompt them to run `ship-component`.
