# Component Workflow

The exact procedure for building or modifying a single component.
Follow every step in order; do not skip or reorder.

---

## Pre-flight

Before writing any code:

1. **Ask for confirmation.** State which component you are about to build and wait
   for explicit approval. Do not start on your own initiative.

2. **Check if the file already exists:**
   ```bash
   ls src/components/<name>.tsx 2>/dev/null && echo EXISTS || echo MISSING
   ```
   If it exists, report the finding and ask: skip / overwrite / modify.
   Never silently overwrite.

---

## 9-step checklist (one component, one commit)

Complete all nine steps before committing. Never commit a partial component.

### 1. `src/components/<name>.tsx`

- Filename: `camelCase.tsx`.
- Export a **named** function component (PascalCase name).
- Props type: define in the same file; move to `src/models/<name>.model.ts` only
  if the type is shared across multiple components.
- First import: side-effect CSS — `import './styled/<name>.styled.css';`
- All values via tokens: `var(--token)` only — no hardcoded colors, radii, or shadows.
- Sizing: `rem` units. Remember `1rem = 8px` at the project base.

### 2. `src/components/styled/<name>.styled.css`

- Use only MD3 short-name custom properties (`var(--primary)`, `var(--corner-tl)`, …).
- Shape: `var(--corner-tl)`, `var(--corner-tr)`, `var(--corner-br)`, `var(--corner-bl)`.
- Elevation: `var(--elevation-N)`.
- Class names: BEM-style, scoped to the component:
  `.<name>`, `.<name>__part`, `.<name>--modifier`.

### 3. `src/index.ts`

Add a named re-export. Keep exports **alphabetical**.

### 4. `vite.config.ts`

Add the component to the `build.lib.entry` map. Keep entries **alphabetical**.

```ts
<name>: resolve(dirname, 'src/components/<name>.tsx'),
```

### 5. `package.json` — `"exports"`

Add a subpath entry. Key: kebab-case. Keep entries **alphabetical**.

```json
"./<kebab-name>": {
    "types": "./dist/<name>.d.ts",
    "import": "./dist/<name>.js"
}
```

### 6. `src/App.tsx`

Import the component from `'./index'` and render **at least one variant per
meaningful prop combination**. Every prop that changes visual output must be
exercised — type errors, missing CSS, and render failures surface here.

```tsx
import { Button } from './index';
// inside return:
<Button variant="primary">Primary</Button>
<Button variant="ghost" size="small">Ghost SM</Button>
```

### 7. Visual check

Start the dev server (`pnpm dev`) and confirm the component renders correctly in
the browser. Take a screenshot using the method below. Present it for review
before committing.

### 8. Commit

```
feat(ui): add <ComponentName> component
```

One commit per component. Never batch multiple components in one commit.

### 9. Push + PR

- Push the commit to the current group branch.
- If this is the **group's first commit**: open a draft PR immediately.
- If the draft PR already exists: just push to it.
- **Stop.** Ask before starting the next component.

---

## Group verification gate

Run before marking any group PR ready for review:

```bash
pnpm lint    # zero warnings, zero errors
pnpm build   # dist/ emits all new entries; no stale references
```

Spot-check `dist/` for every component added in the group:

```bash
ls dist/<name>.js dist/<name>.d.ts
```

Confirm that `src/index.ts` re-exports, `vite.config.ts` entries, and
`package.json` exports are all **alphabetically sorted and consistent** with each
other.

---

## Screenshot method

Works without widening the container's egress policy. `/tmp` is wiped on
container reset — re-run the install at the start of each session.

```bash
mkdir -p /tmp/shot && cd /tmp/shot && npm init -y
npm i @sparticuz/chromium puppeteer-core
```

Driver `/tmp/shot/shot.js`:

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

With `pnpm dev` running: `node /tmp/shot/shot.js`
