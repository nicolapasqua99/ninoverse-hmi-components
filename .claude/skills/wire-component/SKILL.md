---
name: wire-component
description: Wire an already-scaffolded Lit element of ninoverse-hmi-components into the element barrel, the React barrel, vite.config.ts entries, package.json exports (./wc/<kebab> and ./react/<kebab>), the Lit section of examples/web-components.html, and the migration tracker. Phase 2 of the element workflow; run after scaffold-component and before verify-component.
---

# Wire Component

Registers a scaffolded element in the project-level files so it is exported,
bundled, documented and tracked. This is **phase 2 of 4** — run
`verify-component` next.

## Inputs

- **Element name** (required): derive `<kebab>`, `<Pascal>`.
- Assumes `src/elements/<kebab>/` exists with all six files (run
  `scaffold-component` first).

Every list below is kept **alphabetically sorted** by kebab name.

## Step 1 — `src/elements/index.ts`

```ts
export * from './<kebab>/<kebab>.js';
```

Importing this barrel registers every migrated element (side effect).

## Step 2 — `src/react/index.ts`

```ts
export { <Pascal> } from '../elements/<kebab>/<kebab>.react.js';
export type { <Pascal>ChangeDetail, <Pascal>Variant } from '../elements/<kebab>/<kebab>.react.js';
```

## Step 3 — `vite.config.ts`

Add the two entries next to the existing `wc/badge` / `react/badge` pair
(shape fixed by PR 2):

```ts
'wc/<kebab>': resolve(dirname, 'src/elements/<kebab>/<kebab>.ts'),
'react/<kebab>': resolve(dirname, 'src/elements/<kebab>/<kebab>.react.ts'),
```

## Step 4 — `package.json` → `"exports"`

```json
"./wc/<kebab>": {
    "types": "./dist/wc/<kebab>.d.ts",
    "import": "./dist/wc/<kebab>.js"
},
"./react/<kebab>": {
    "types": "./dist/react/<kebab>.d.ts",
    "import": "./dist/react/<kebab>.js"
}
```

The root export and `./<kebab>` stay React until the v6 flip. `sideEffects`
already covers `./dist/wc/*.js`.

## Step 5 — `examples/web-components.html`

Add a `<section>` for the element inside the "Lit elements" block (the block
loads `../dist/hmi-elements.iife.js` + `base.css`; mirror the badge section).
Exercise attributes, at least one slot, and log one event with
`addEventListener('hmi-…', (e) => console.log(e.detail))`.

## Step 6 — Story

`src/elements/<kebab>/<kebab>.stories.ts` was scaffolded; confirm the title
category, that every prop axis has a story, and that the class JSDoc sits
directly above `export class` (the manifest reads it).

Categories: `Layout`, `Typography`, `Forms`, `Feedback`, `Overlays`,
`Navigation`, `Data display` under `Components/`; charts under top-level
`Charts/`. See `.claude/component-workflow.md`.

## Step 7 — Tracker

`docs/migration/tracker.md`: set the element's row to `In progress`.

## Done

After all files are updated, tell the user wiring is complete and prompt them
to run `verify-component`.
