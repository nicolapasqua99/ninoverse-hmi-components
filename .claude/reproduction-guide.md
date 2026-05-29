# Library Reproduction Guide

How to rebuild `@ninoverse/hmi-components` from scratch when a new design file
or style guidance is provided. Follow every section in order; each step has an
explicit verification gate before moving on.

---

## Prerequisites

| Tool | Required version |
|------|-----------------|
| Node | ≥ 20 LTS |
| pnpm | ≥ 9 |
| Biome VSCode extension | recommended for in-editor feedback |

Never use `npm` or `yarn`. All commands in this guide assume `pnpm`.

---

## Step 0 — Parse the design file

**Input forms accepted:**

| Form | What to extract |
|------|----------------|
| Figma file / Figma URL | Use the Figma MCP (`get_design_context`, `get_variable_defs`) to pull color tokens, shape radii, elevation, spacing, and motion values. |
| Zip containing `tokens.css` | Unzip; read the CSS file for `--md-sys-color-*`, `--md-sys-shape-*`, etc. |
| Free-form style guidance | Enumerate: primary color, surface, error, shape radius style (symmetric / asymmetric notch), elevation style (shadow / tint), font choices. |

**Token inventory checklist — collect before writing any code:**

- [ ] All color roles: `primary`, `on-primary`, `primary-container`, `on-primary-container`, and the same pattern for `secondary`, `tertiary`, `error`, `background`, `surface`, `surface-variant`, `outline`.
- [ ] Surface container tier: `surface-container-lowest` … `surface-container-highest`.
- [ ] Extended roles if present: `success`, `warning` (and their on/container pairs).
- [ ] Shape tokens: global corner radius + per-corner overrides (`tl`, `tr`, `br`, `bl`) if the design uses asymmetric notches.
- [ ] Elevation: shadow definitions for levels 0–5.
- [ ] Motion: easing curves + duration steps.
- [ ] Spacing scale: any explicit spacing values.
- [ ] Reference palette: tonal source swatches (`--ref-primary-40`, etc.) for use in hover/press states.
- [ ] Font stack: which fonts to use (CLAUDE.md specifies the five project fonts — override the design's fonts with these unless explicitly told otherwise).

---

## Step 1 — Token translation

Map every token from the design's naming convention to the project's short MD3 names.

| Design long-form | Project short-form |
|------------------|--------------------|
| `--md-sys-color-X` | `--X` (e.g. `--primary`, `--on-primary`) |
| `--md-sys-shape-corner-X` | `--corner-X` |
| `--md-sys-shape-corner-{tl,tr,br,bl}` | `--corner-{tl,tr,br,bl}` (preserve asymmetric splits) |
| `--md-sys-elevation-levelN` | `--elevation-N` |
| `--md-sys-motion-easing-X` | `--easing-X` |
| `--md-sys-motion-duration-X` | `--duration-X` |
| `--md-sys-spacing-N` | `--spacing-N` |
| `--md-ref-palette-XN` | `--ref-X-N` (e.g. `--ref-primary-40`) |
| `--md-sys-state-X-opacity` | `--state-X-opacity` |
| `--md-sys-typescale-*` | Drop — replaced by CLAUDE.md font stack. |

**Drop** all design-local aliases (`--bg`, `--ink`, `--accent`, `--r-leaf`, …).
The short-name layer replaces them entirely.

---

## Step 2 — Foundation scaffolding

Create these files in the order listed. Run `pnpm install` once after `package.json`
is in place; do not run it multiple times.

### 2.1 `package.json`

```jsonc
{
    "name": "@ninoverse/hmi-components",
    "version": "0.0.1",
    "private": true,           // flip to false + publishConfig when publishing
    "license": "MIT",
    "type": "module",
    "sideEffects": ["**/*.css"],
    "peerDependencies": {
        "react": "^19",
        "react-dom": "^19"
    },
    "exports": {
        ".": {
            "types": "./dist/index.d.ts",
            "import": "./dist/index.js"
        },
        "./style.css": "./dist/style.css"
        // per-component entries added as components land (see Step 4)
    },
    "browserslist": ["defaults", "not IE 11"]
}
```

Key deps (install as `devDependencies`):
`react@^19`, `react-dom@^19`, `typescript@^5`, `vite@^7`,
`@vitejs/plugin-react`, `vite-plugin-dts`, `@biomejs/biome@^2`,
`postcss`, `autoprefixer`.

### 2.2 `tsconfig.json` + `tsconfig.node.json` + `tsconfig.app.json`

Maximum strictness flags:

```jsonc
// tsconfig.app.json
{
    "compilerOptions": {
        "target": "ES2022",
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "moduleResolution": "bundler",
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedIndexedAccess": true,
        "exactOptionalPropertyTypes": true,
        "noImplicitOverride": true,
        "paths": { "@/*": ["src/*"] }
    }
}
```

### 2.3 `vite.config.ts`

```ts
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: './tsconfig.app.json',
            include: ['src'],
            exclude: ['src/App.tsx', 'src/main.tsx'],
            entryRoot: 'src',
        }),
    ],
    resolve: { alias: { '@': resolve(dirname, 'src') } },
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                index: resolve(dirname, 'src/index.ts'),
                // one entry per component — added in Step 4
            },
            formats: ['es'],
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                preserveModules: false,
                entryFileNames: '[name].js',
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.names?.[0] ?? '';
                    return name.endsWith('.css')
                        ? '[name][extname]'
                        : 'assets/[name]-[hash][extname]';
                },
            },
        },
        sourcemap: true,
        minify: 'esbuild',
        cssCodeSplit: false,
    },
});
```

### 2.4 `biome.json`

```json
{
    "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
    "extends": ["//recommended"],
    "formatter": {
        "indentStyle": "space",
        "indentWidth": 4
    }
}
```

### 2.5 `postcss.config.js`

```js
export default { plugins: { autoprefixer: {} } };
```

### 2.6 `index.html`

Link theme CSS and all five Google Fonts. Mount `#root`.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Oxanium:wght@200..800&family=Rubik+Glitch&family=Press+Start+2P&family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/css/themes/default.css" />
    <title>ninoverse-hmi-components</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### 2.7 `src/globals.css`

```css
html { font-size: 8px; }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
    --font-quicksand: 'Quicksand', sans-serif;
    --font-oxanium: 'Oxanium', sans-serif;
    --font-rubik-glitch: 'Rubik Glitch', sans-serif;
    --font-press-start-2p: 'Press Start 2P', monospace;
    --font-pixelify-sans: 'Pixelify Sans', sans-serif;
}

body {
    font-family: var(--font-quicksand);
    background-color: var(--background);
    color: var(--on-background);
}
```

### 2.8 `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
```

### 2.9 `src/App.tsx`

```tsx
// Placeholder — import and render every component as it lands.
export default function App() {
    return <main />;
}
```

### 2.10 `src/index.ts`

```ts
// Library barrel — re-export all public components in alphabetical order.
```

### 2.11 `public/css/themes/default.css`

Populate with all translated tokens from Step 1. Structure:

```css
/* Ninoverse default theme — Material Design 3 token system with short names. */
:root {
    /* Reference palette */
    --ref-primary-40: …;

    /* System color roles */
    --primary: …;
    --on-primary: …;
    /* … all roles … */

    /* Shape */
    --corner-tl: …;
    --corner-tr: …;
    --corner-br: …;
    --corner-bl: …;

    /* Elevation */
    --elevation-0: none;
    --elevation-1: …;
    /* … */

    /* Motion */
    --easing-standard: …;
    --duration-short: …;
    /* … */

    /* Spacing */
    --spacing-1: …;
    /* … */

    /* State layer opacities */
    --state-hover-opacity: 0.08;
    --state-pressed-opacity: 0.12;
    --state-focused-opacity: 0.12;
    --state-dragged-opacity: 0.16;
}
```

### 2.12 `src/configs/colors.ts`

Mirror every CSS custom property name from `default.css` as a TS constant:

```ts
export const colors = {
    primary: '--primary',
    onPrimary: '--on-primary',
    // … all roles in camelCase keys, kebab-case values …
} as const;

export type ColorToken = keyof typeof colors;
```

### 2.13 `src/configs/fonts.ts`

```ts
export const fonts = {
    quicksand: '--font-quicksand',
    oxanium: '--font-oxanium',
    rubikGlitch: '--font-rubik-glitch',
    pressStart2p: '--font-press-start-2p',
    pixelifySans: '--font-pixelify-sans',
} as const;

export type FontToken = keyof typeof fonts;

export const googleFontsHref = 'https://fonts.googleapis.com/css2?family=…&display=swap';
```

---

## Step 3 — Foundation verification gate

Run these before writing any component:

```bash
pnpm install          # lock file generated; no warnings
pnpm lint             # Biome passes on tsconfig + vite.config + src/*.ts(x)
pnpm build            # dist/ contains index.js, index.d.ts, style.css
pnpm dev              # dev server starts; browser shows blank page
```

Verify token loading in the browser DevTools console:
```js
getComputedStyle(document.documentElement).getPropertyValue('--primary')
// → '#e87a5d'  (or the new design's primary value)
```

Do not proceed to Step 4 until all four commands pass cleanly.

---

## Step 4 — Per-component build (repeat for each component)

### 4.1 Pre-flight

Before writing any code, ask: "Should I build `<ComponentName>` next?" State
which component and wait for confirmation.

Check whether the file already exists:

```bash
ls src/components/<name>.tsx 2>/dev/null && echo EXISTS || echo MISSING
```

If it exists, report and ask: skip / overwrite / modify. Do not silently overwrite.

### 4.2 Component checklist (9 steps, in order)

1. **`src/components/<name>.tsx`** (camelCase filename).
   - Export a named function component (PascalCase).
   - Props type in the same file or `src/models/<name>.model.ts` if reused.
   - Import side-effect CSS at the top: `import './styled/<name>.styled.css';`
   - Use only `var(--token)` references — no hardcoded colors, radii, or shadows.
   - Use `rem` units; remember `1rem = 8px` at the project base.

2. **`src/components/styled/<name>.styled.css`**.
   - Use MD3 short-name tokens exclusively.
   - Use `--corner-{tl,tr,br,bl}` for asymmetric radii; `--elevation-N` for shadows.
   - Class names: BEM-style, scoped to the component (`.<name>`, `.<name>__part`, `.<name>--modifier`).

3. **`src/index.ts`** — add a named re-export, keeping alphabetical order.

4. **`vite.config.ts`** — add the component to the `build.lib.entry` map (alphabetical):
   ```ts
   <name>: resolve(dirname, 'src/components/<name>.tsx'),
   ```

5. **`package.json` `"exports"`** — add a subpath entry (kebab-case, alphabetical):
   ```json
   "./<kebab-name>": {
       "types": "./dist/<name>.d.ts",
       "import": "./dist/<name>.js"
   }
   ```

6. **`src/App.tsx`** — import the component and render at least one variant per
   prop combination. Example:
   ```tsx
   import { Button } from './index';
   // inside App return:
   <Button variant="primary">Primary</Button>
   <Button variant="ghost" size="small">Ghost SM</Button>
   ```

7. **`pnpm dev` + visual check** — start the dev server, open the browser, confirm
   the component renders correctly in `App.tsx`. Take a screenshot if possible
   (see screenshot method below).

8. **Commit** using Conventional Commits:
   ```
   feat(ui): add <ComponentName> component
   ```
   One commit per component. Never batch multiple components in one commit.

9. **Push**. If this is the group's first component, open a draft PR immediately.
   Otherwise push to the existing group PR. Then stop and ask before the next
   component.

### 4.3 Screenshot method (no egress restriction needed)

```bash
mkdir -p /tmp/shot && cd /tmp/shot && npm init -y
npm i @sparticuz/chromium puppeteer-core
```

Driver script `/tmp/shot/shot.js`:

```js
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch({
        args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
        executablePath: await chromium.executablePath(),
        headless: true,
        defaultViewport: { width: 1400, height: 1000, deviceScaleFactor: 2 },
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'out.png', fullPage: true });
    await browser.close();
})();
```

Start `pnpm dev`, then `node /tmp/shot/shot.js`.

> Note: `/tmp` is wiped on container reset — re-run the install each session.

---

## Step 5 — Component group verification gate

After every group of components (a branch / PR):

```bash
pnpm lint    # zero warnings, zero errors
pnpm build   # dist/ emits all new entries; no stale references
```

Check `dist/` for each new component:
```bash
ls dist/<name>.js dist/<name>.d.ts
```

Verify `src/index.ts` re-exports and `package.json` exports are alphabetically sorted
and consistent with `vite.config.ts` entries.

---

## Step 6 — Design token update (re-theming an existing build)

When a new design file is provided for a **different theme** (not a full rebuild):

1. Run Step 0 (token inventory) against the new file.
2. Run Step 1 (token translation) for the new values.
3. Edit **only** `public/css/themes/default.css` — replace the `:root` block.
4. Update `src/configs/colors.ts` if any new roles were added.
5. Run `pnpm dev` and visually verify all components in `App.tsx` pick up the new palette.
6. Run `pnpm lint && pnpm build`.
7. Commit: `chore(ui): update theme tokens from <design-file-name>`.

Do **not** touch component `.tsx` or `.styled.css` files during a re-theme unless a
component hardcoded a color (which it should never do — if found, fix it).

---

## Branching and PR strategy

See `.claude/branch-naming.md` for branch format rules.

| Work | Branch prefix | One PR per |
|------|--------------|-----------|
| Foundation scaffold | `chore/` | whole scaffold |
| Token update / re-theme | `chore/` | one PR |
| Component group (Phase N) | `feat/` | group (e.g. `feat/phase1-layout`) |
| Single isolated component | `feat/` | component |
| Rename / refactor | `refactor/` | logical rename unit |

**Draft PR rule:** open a draft PR at the group's first commit. Push each subsequent
component commit to the same PR. Mark ready only when `pnpm lint` + `pnpm build` pass.

---

## Execution order (current project)

Components are built in phase order. Phases map to component categories:

| Phase | Category | Priority |
|-------|----------|----------|
| 0 | Reconciliation / renaming | Do first, before any new builds |
| 1 | Layout + Typography + Utilities | Foundational — blocks visual testing of all others |
| 2 | Form primitives (meter, etc.) | After Phase 1 |
| 3 | Inputs (pinInput, rating, colorPicker) | After Phase 2 |
| 4 | Overlays (hoverCard, contextMenu) | After Phase 3 |
| 5 | Navigation (tree) | After Phase 4 |
| 6 | Content (image, carousel, timeline, stat) | After Phase 5 |
| 7 | Data viz (charts) | Last — most complex; split across multiple PRs |

Within each phase, build one component at a time, confirm with the user between each.
