# Migrating `@ninoverse/hmi-components` from React to Lit

This is the human playbook for turning the library into native Web Components
built on [Lit](https://lit.dev), one element per pull request, without breaking
React consumers until a single, announced major release (v6).

Companion documents:

- `.claude/lit-migration.md` — the strict rules every element must follow (R1–R12).
- `translation-guide.md` — pattern-by-pattern React → Lit mapping, event catalog, templates, Button worked example.
- `adr-0001-lit-web-components.md` — why each decision was taken and what was rejected.
- `tracker.md` — status of every element, grouped by phase.

## 1. Goals

1. **Framework-agnostic.** One implementation that runs in plain HTML, React, Angular, Vue and Dioxus with the same tags, attributes, properties, slots and events.
2. **Encapsulated.** Every element owns its styles in a shadow root. Host-page CSS cannot leak in; theming happens through CSS custom properties and `::part()`.
3. **Native contracts.** Custom events instead of callback props, `<slot>` instead of `ReactNode` props, `ElementInternals` for forms, `<dialog>` and the Popover API for overlays.
4. **React stays first-class** through `@lit/react` wrappers with typed event props.
5. **Server rendering** works for Next.js, Angular SSR and Dioxus fullstack.
6. **One runtime dependency**: Lit. Everything else stays hand-rolled.

## 2. Architecture before and after

| | v5 (today) | v6 (target) |
|---|---|---|
| Implementation | 85 React function components, BEM CSS in `src/components/styled/*.styled.css` | 85 Lit elements in `src/elements/<kebab>/`, CSS in `css\`\`` tagged templates inside the shadow root |
| Non-React hosts | `@r2wc/react-to-web-component` IIFE with React bundled, light DOM, one global stylesheet | Lit elements (ESM per element + one IIFE), Shadow DOM, no React |
| React hosts | direct components | `@lit/react` `createComponent` wrappers under `./react` |
| Rich content | `ReactNode` props | named slots; strings + per-item slots inside data arrays |
| Callbacks | function props with raw values | `hmi-*` `CustomEvent`s with object `detail` |
| Forms | native inputs inside light DOM | form-associated elements (`ElementInternals`) |
| Overlays | `createPortal` to `document.body`, hand-rolled dismiss and z-index | `<dialog>.showModal()` and `popover` (top layer, native dismiss) |
| Theming | 147 tokens on `html[data-theme|structure|material]`; two material themes style component classes globally | same tokens, theme files are token-only; panel look via `--panel-*`; `part="panel"` escape hatch |
| Sizing | `rem` against `html { font-size: 8px }` | `--hmi-base` (8px) on the host chain; no root font-size requirement |
| Global CSS | `dist/style.css` (React), `dist/hmi-components.css` (WC) | `dist/base.css` + `dist/themes/*` |
| Docs | react-docgen prop tables | `custom-elements.json` (attributes, properties, events, slots, parts) |
| Tests | none | Vitest browser mode + Node SSR smoke per element |

## 3. Package layout

### During the migration (5.x, additive)

Existing exports do not change. Each migrated element adds two subpaths.

```jsonc
{
  "sideEffects": ["**/*.css", "./dist/wc/*.js", "./dist/hmi-elements.iife.js", "./dist/hmi-components.iife.js"],
  "customElements": "custom-elements.json",
  "files": ["dist", "custom-elements.json"],
  "exports": {
    ".":                 { "types": "./dist/index.d.ts", "import": "./dist/index.js" },           // React, unchanged
    "./<kebab>":         { "types": "./dist/components/<camel>.d.ts", "import": "./dist/<camel>.js" }, // React, unchanged
    "./theme":           { "types": "./dist/theme.d.ts", "import": "./dist/theme.js" },           // unchanged
    "./wc":              { "types": "./dist/wc/index.d.ts", "import": "./dist/wc/index.js" },      // registers all migrated elements
    "./wc/<kebab>":      { "types": "./dist/wc/<kebab>.d.ts", "import": "./dist/wc/<kebab>.js" },
    "./react":           { "types": "./dist/react/index.d.ts", "import": "./dist/react/index.js" },
    "./react/<kebab>":   { "types": "./dist/react/<kebab>.d.ts", "import": "./dist/react/<kebab>.js" },
    "./elements":        { "default": "./dist/hmi-elements.iife.js" },                             // Lit drop-in bundle
    "./base.css":        "./dist/base.css",
    "./themes/*":        "./dist/themes/*",                                                        // unchanged
    "./style.css":       "./dist/style.css",                                                       // React CSS, until v6
    "./web-components":  { "import": "./dist/hmi-components.iife.js" },                            // r2wc bundle, until v6
    "./web-components.css": "./dist/hmi-components.css"                                            // until v6
  },
  "dependencies": { "lit": "^3.3.3" },
  "peerDependencies": { "react": "^19.0.0", "react-dom": "^19.0.0" },
  "peerDependenciesMeta": { "react": { "optional": true }, "react-dom": { "optional": true } }
}
```

`sideEffects` must list `./dist/wc/*.js`: element modules register themselves
in `@customElement`, and a bundler would otherwise tree-shake
`import '@ninoverse/hmi-components/wc/badge'`.

Never load `hmi-elements.iife.js` and `hmi-components.iife.js` on the same
page. Both define the same tags; the second `customElements.define` throws.

### After the v6 flip

`dist/wc/` and `dist/react/` do not move; only the `exports` keys change.

```jsonc
{
  "exports": {
    ".":               { "types": "./dist/wc/index.d.ts", "import": "./dist/wc/index.js" },
    "./<kebab>":       { "types": "./dist/wc/<kebab>.d.ts", "import": "./dist/wc/<kebab>.js" },
    "./wc":            "./dist/wc/index.js",          // deprecated alias, one major
    "./wc/<kebab>":    "./dist/wc/<kebab>.js",        // deprecated alias, one major
    "./react":         { "types": "./dist/react/index.d.ts", "import": "./dist/react/index.js" },
    "./react/<kebab>": { "types": "./dist/react/<kebab>.d.ts", "import": "./dist/react/<kebab>.js" },
    "./theme":         { "types": "./dist/wc/theme.d.ts", "import": "./dist/wc/theme.js" },
    "./web-components": { "default": "./dist/hmi-components.iife.js" },   // now the Lit bundle
    "./base.css":      "./dist/base.css",
    "./style.css":     "./dist/base.css",             // transition alias, removed at v7
    "./web-components.css": "./dist/base.css",        // transition alias, removed at v7
    "./themes/*":      "./dist/themes/*"
  }
}
```

## 4. Source layout

```
src/
├── elements/                 # Lit elements (kebab-case everywhere)
│   ├── <kebab>/
│   │   ├── <kebab>.ts            # class Hmi<Pascal>, @customElement('hmi-<kebab>')
│   │   ├── <kebab>.styles.ts     # export const styles = css`…`
│   │   ├── <kebab>.react.ts      # createComponent wrapper
│   │   ├── <kebab>.stories.ts    # Storybook (web-components-vite)
│   │   ├── <kebab>.test.ts       # Vitest browser mode
│   │   └── <kebab>.ssr.test.ts   # Vitest node, @lit-labs/ssr
│   ├── shared/
│   │   ├── base.styles.ts        # :host box-sizing, --_base, hidden, focus ring
│   │   ├── events.ts             # emit()
│   │   ├── dom.ts                # activeElementDeep(), supportsPopover()
│   │   ├── form.ts               # FormKind, coerceFormValue()        (phase 4)
│   │   ├── format.ts             # applyTemplate()                    (phase 4)
│   │   ├── panel.ts              # renderLiquidFilter()               (phase 2)
│   │   ├── chart.ts              # scales, renderCartesianGrid()      (phase 8)
│   │   ├── positioning.ts        # PositionController                 (phase 9)
│   │   ├── toast.ts              # toast store                        (phase 11)
│   │   └── theme.ts              # setTheme/getTheme/subscribe        (phase 11)
│   └── index.ts                  # registers every migrated element
├── react/
│   ├── index.ts                  # re-exports every wrapper + useTheme
│   └── use-theme.ts                                                   (phase 11)
├── components/               # legacy React (frozen; deleted at v6)
├── configs/, lib/            # unchanged
└── web-components.ts         # legacy r2wc bundle entry (deleted at v6)
```

Naming: folder, files, tag suffix, subpath and dist file share one kebab-case
name (`area-chart`); the class is `HmiAreaChart`; the React wrapper keeps the
v5 PascalCase export (`AreaChart`).

## 5. Global CSS

- **`dist/themes/*`** — unchanged. Theme files may only define custom
  properties. The material files (`glass.css`, `liquid.css`) currently style
  `.card`, `.modal`, … directly; PR 2 turns those rules into `--panel-*` tokens
  and removes the class selectors.
- **`dist/base.css`** (new, PR 2) — the only stylesheet a host page must load
  besides themes:
  - `:root { --hmi-base: 8px; }` and `color-scheme: light dark`
  - `body` defaults (background, colour, `font-family: var(--font-default)`, line height) and `::selection`
  - the `[data-material='glass'] body` / `[data-material='liquid'] body` gradients
  - pre-upgrade rules `hmi-badge:not(:defined), hmi-button:not(:defined), … { visibility: hidden }` generated from `custom-elements.json`
- **Fonts** stay `<link>` tags in the document (`@font-face` cannot load from
  inside a shadow root). Include `Caveat` (used by the `journal` structure).
- `dist/style.css` and `dist/hmi-components.css` remain until v6 for the
  React tree, then become aliases of `base.css` for one major.

## 6. Phases

| Phase | Scope | Starts when |
|-------|-------|-------------|
| 0 | PR 1 (this docs PR); PR 2 tooling scaffold (see §10) | — |
| 1 | `badge` — the pilot that freezes the templates and the definition of done | PR 2 merged |
| 2 | presentational leaves: alert, avatar, avatar-stack, banner, blockquote, card, chip, code, empty-state, kbd, meter, progress, skeleton, spinner, stat | phase 1 merged |
| 3 | layout + typography: aspect-ratio, box, divider, flex, grid, heading, link, scroll-area, spacer, text, visually-hidden | phase 2 merged |
| 4 | button + text inputs (introduces `shared/form.ts`): button, form-control, input, textarea, number-input, password-input, search-input, multi-input, file-upload | phase 3 merged |
| 5 | selection controls: checkbox, radio, radio-group, switch, slider, segmented-control, value-scale-selector | phase 4 merged |
| 6 | data display: accordion, carousel, image, list, table, timeline | phase 5 merged |
| 7 | navigation: breadcrumbs, navbar, pagination, sidebar, stepper, tabs, tree | phase 6 merged |
| 8 | charts: cartesian-grid, chart-tooltip, legend, responsive-container first; then the ten chart elements | phase 7 merged |
| 9 | overlay infrastructure (`shared/positioning.ts`) + modal, confirm-dialog, drawer, popover, tooltip, hover-card, context-menu, menu | phase 8 merged |
| 10 | select, combobox, date-picker, color-picker, command-palette | phase 9 merged |
| 11 | toast, theme module + `useTheme`, the v6 flip | phase 10 merged |

Rules: one element per commit; batches of up to five leaves per PR in phases
2, 3 and 8; every branch is cut from `main` after the previous PR merged
(never stacked); no new React components during the migration.

## 7. Running one migration end to end

The `migrate-component` skill (`.claude/skills/migrate-component/SKILL.md`)
automates this. By hand:

1. Read `.claude/lit-migration.md`. Check `tracker.md`: the element's phase gate must be met.
2. `git fetch origin main && git checkout -b migrate/<kebab> origin/main`.
3. Read `src/components/<camel>.tsx`, `src/components/styled/<camel>.styled.css`, `src/components/<camel>.stories.tsx`, the `define('<kebab>', …)` block in `src/web-components.ts`, and `docs/api/components/<camel>.md`.
4. Write the **API mapping sheet** (React prop → property/attribute, slot, event + detail, part) and the hazard list (portals, document listeners, `activeElement`, `useId`, `className` passthrough, `as`, cross-boundary CSS, `rem` count). Get it approved.
5. Scaffold the six files from the templates in `translation-guide.md` §18.
6. Wire: `src/elements/index.ts`, `src/react/index.ts`, `vite.config.ts` entries `wc/<kebab>` and `react/<kebab>`, `package.json` exports, the Lit section of `examples/web-components.html`, the story. Set the tracker row to *In progress*.
7. Verify:
   ```bash
   pnpm format && pnpm lint
   pnpm build
   ls dist/wc/<kebab>.js dist/wc/<kebab>.d.ts dist/react/<kebab>.js dist/react/<kebab>.d.ts
   pnpm test -- src/elements/<kebab>
   pnpm test:ssr -- src/elements/<kebab>
   pnpm cem && git diff --stat custom-elements.json
   pnpm build:storybook
   ```
   Then produce the side-by-side screenshot (React section of `src/App.tsx` vs the Lit story in Storybook) and get it approved.
8. Commit `feat(ui): migrate <Name> to lit`, push, open a draft PR with the mapping sheet, screenshots and the R12 checklist. Set the tracker row to *In review*.

## 8. Host verification matrix

An element is done only when it has been exercised in each host below.

| Host | How to load | What to check |
|------|-------------|---------------|
| Plain HTML | `<script src="…/dist/hmi-elements.iife.js">` + `base.css` + `themes/*` (`examples/web-components.html`) | attributes, slots, `addEventListener('hmi-change', e => e.detail)`, theme switching by attribute |
| React 19 | `import { Badge } from '@ninoverse/hmi-components/react/badge'` | props set as properties, `onChange` receives `CustomEvent` (`e.detail.value`), children and `slot="…"` project, SSR via `@lit-labs/ssr-react` / `@lit-labs/nextjs` |
| Dioxus web / desktop | IIFE in the HTML shell; `rsx! { hmi-badge { "variant": "success", "Live" } }` | attributes from strings, boolean presence (omit the attribute or set the property in `onmounted`), slotted children, events via `web_sys::EventTarget::add_event_listener_with_callback` |
| Angular | `CUSTOM_ELEMENTS_SCHEMA`; `<hmi-tabs [options]="tabs" (hmi-change)="onTab($event.detail.value)">` | property binding of arrays, event typing from `custom-elements.json`, Angular SSR renders the tag and the element upgrades on the client |
| Vue | `compilerOptions.isCustomElement = tag => tag.startsWith('hmi-')`; `<hmi-tabs :options="tabs" @hmi-change="onTab">` | Vue sets properties when they exist on the element; kebab event names bind directly |

## 9. Server-side rendering

Supported paths:

| Host | Mechanism | Output |
|------|-----------|--------|
| Next.js | `@lit-labs/ssr-react` (or the `@lit-labs/nextjs` plugin) renders elements to Declarative Shadow DOM inside the React tree | full markup, no flash |
| Angular SSR | Angular emits the `<hmi-*>` tags with attributes; the element upgrades on the client | light-DOM markup + `:not(:defined)` styling until upgrade |
| Dioxus fullstack | same as Angular | same |

Element rules that make this possible (R3): no `window`/`document` at import
or constructor time (`isServer` guard), deterministic `render()` from
properties, no light-DOM mutation, reflected attributes for CSS state, and a
`<kebab>.ssr.test.ts` per element proving `@lit-labs/ssr` can render it.

## 10. Tooling added by PR 2

PR 2 is the only infrastructure PR. It adds no elements. Its checklist:

- `lit`, `@lit/react` (dependencies); `@lit-labs/ssr`, `@custom-elements-manifest/analyzer`, `vitest`, `@vitest/browser`, `playwright`, `@storybook/web-components-vite` (dev).
- `src/elements/shared/{base.styles,events,dom}.ts`, `src/elements/index.ts`, `src/react/index.ts`.
- `public/css/base.css` and a `scripts/gen-base-css.mjs` that appends the `:not(:defined)` list from `custom-elements.json`.
- Theme token rebase: every `rem` in `public/css/themes/constants.css` and `structure/*.css` becomes `calc(var(--hmi-base, 8px) * N)`; `--panel-*` tokens defined in `constants.css` and overridden in `material/glass.css`, `material/liquid.css`, `structure/journal.css`; the class selectors in the material files are deleted.
- `vite.config.ts` entries `wc/<kebab>` and `react/<kebab>` (dts remapped to `dist/wc`, `dist/react`); `vite.elements.config.ts` for `dist/hmi-elements.iife.js`; the `copy-theme-css` plugin extracted to one module.
- `custom-elements-manifest.config.mjs`; `pnpm cem` script; `custom-elements.json` committed.
- `vitest.config.ts` with a browser project (Chromium via Playwright) and a node project for `*.ssr.test.ts`; `pnpm test`, `pnpm test:ssr`.
- `.storybook/main.ts` framework → `@storybook/web-components-vite`; `setCustomElementsManifest` in `preview.ts`; decide whether React stories keep a second config during the migration.
- `.github/workflows/ci-gate.yml` runs `lint`, `build`, `test`, `test:ssr`.
- `tsconfig.node.json` includes every config file (`vite.*.config.ts`, `vitest.config.ts`, `.storybook/*.ts`).
- Known risks to settle in PR 2: Biome formatting of `accessor` decorators; `vite-plugin-dts` output paths; `sideEffects` tree-shaking check with a consumer smoke bundle; `attachInternals()` under the SSR DOM shim; top-layer stacking order between toasts and modals.

## 11. Theme rules during the migration

- Theme files define **only** custom properties. Never a component class, never an element selector.
- Panel look: `--panel-bg`, `--panel-border`, `--panel-blur`, `--panel-shadow`, `--panel-filter`, `--panel-ink-bg`, `--panel-accent-bg` (defaults in `constants.css`; `glass`/`liquid`/`journal` override them). Panel-like elements expose `part="panel"` for anything a theme cannot express as a token.
- Journal-specific looks that today live in component CSS become tokens: `--list-marker`, `--progress-track`, `--stat-rule`, `--switch-thumb`.
- `--hmi-base` (default `8px`) is the sizing base. Elements never use `rem`. A host may scale the whole library with `hmi-*, :root { --hmi-base: 10px }`.
- The liquid refraction filter is embedded by each panel-like element (`renderLiquidFilter()`), so `url('#liquid-glass')` resolves inside the root.
- Light/dark keeps following `prefers-color-scheme` inside each colour theme file.

## 12. FAQ

- **Why not `:host-context([data-structure='journal'])`?** Not supported in Firefox and Safari. Tokens work everywhere.
- **Why is `hmi-change` detail an object, not the bare value?** Fields can be added later (`{ value, previous }`) without breaking listeners, and `e.detail.value` reads the same in every host.
- **Why do booleans ignore `"false"`?** That is HTML. `<hmi-button disabled="false">` is disabled, exactly like `<button disabled="false">`. String hosts set the property instead.
- **Why one package instead of a separate React package?** The wrappers are a few lines each and share the element types; a second package would double the release pipeline for no consumer benefit. React is an optional peer.
- **Why `hmi-input` and `hmi-change` on text inputs?** Native semantics that Angular, Vue and plain HTML consumers expect; v5's per-keystroke `onChange` was a React-ism.
- **What happens to `ThemeProvider`?** Replaced by `setTheme`/`getTheme`/`subscribe` in `./theme` and a `useTheme` hook in `./react`; same attributes and `localStorage` keys, no provider wrapper.
