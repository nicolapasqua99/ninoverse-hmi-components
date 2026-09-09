# Element Workflow

The exact procedure for building or migrating a single Lit element. Follow
every step in order; do not skip or reorder. The rules behind each step are in
`.claude/lit-migration.md` (R1–R12); the pattern mappings are in
`docs/migration/translation-guide.md`.

The four phases are automated by the skills in `.claude/skills/`:
`migrate-component` (existing React component) or `create-component` (new
element) orchestrate `scaffold-component` → `wire-component` →
`verify-component` → `ship-component`.

---

## Pre-flight

Before writing any code:

1. **Read the rules.** `.claude/lit-migration.md` in full.

2. **Confirm scope.** State which element you are about to build or migrate
   and wait for explicit approval. Do not start on your own initiative.

3. **Gate check** (migration only). In `docs/migration/tracker.md` the
   element's phase may start only when every PR of the previous phase is
   merged (`.claude/execution-order.md`).

4. **Collision check:**
   ```bash
   ls src/elements/<kebab>/ 2>/dev/null && echo EXISTS || echo MISSING
   ```
   If it exists, report the finding and ask: skip / overwrite / modify.
   Never silently overwrite.

5. **Read the sources** (migration only): `src/components/<camel>.tsx`,
   `src/components/styled/<camel>.styled.css`, `src/components/<camel>.stories.tsx`,
   the `define('<kebab>', …)` block in `src/web-components.ts`,
   `docs/api/components/<camel>.md`.

6. **API mapping sheet.** Produce the table (React prop → element
   property/attribute → slot → event + detail → part) plus the hazard list
   (portals, document listeners, `activeElement`, `useId`, `className`
   passthrough, `as`, cross-boundary CSS, `rem` count) and the behaviour
   differences. **Wait for approval.**

7. **Branch** from a merged `main`, never from another open branch:
   ```bash
   git fetch origin main --quiet
   git checkout -b migrate/<kebab> origin/main   # or feat/<kebab> for a new element
   ```

---

## Phase 1 — Scaffold (`scaffold-component`)

Create all six files in `src/elements/<kebab>/` from the templates in
`docs/migration/translation-guide.md` §18:

| File | Content |
|------|---------|
| `<kebab>.ts` | `class Hmi<Pascal> extends LitElement`, `@customElement('hmi-<kebab>')`, properties, slots, events, parts, lifecycle |
| `<kebab>.styles.ts` | `export const styles = css\`…\`` — the ported CSS |
| `<kebab>.react.ts` | `createComponent` wrapper with typed `events` |
| `<kebab>.stories.ts` | Storybook (`@storybook/web-components-vite`) |
| `<kebab>.test.ts` | Vitest browser tests |
| `<kebab>.ssr.test.ts` | Vitest node SSR smoke test |

Naming: everything kebab-case (`area-chart`), class `HmiAreaChart`, tag
`hmi-area-chart`, wrapper export `AreaChart`.

Sizing: never `rem`; `calc(var(--_base) * N)` where `1 unit = var(--hmi-base)`
(8px by default).

## Phase 2 — Wire (`wire-component`)

All lists alphabetical by kebab name:

1. `src/elements/index.ts` — `export * from './<kebab>/<kebab>.js';`
2. `src/react/index.ts` — `export { <Pascal> } from '../elements/<kebab>/<kebab>.react.js';` (+ types)
3. `vite.config.ts` — entries `wc/<kebab>` and `react/<kebab>`
4. `package.json` `exports` — `./wc/<kebab>` and `./react/<kebab>`
5. `examples/web-components.html` — a section in the "Lit elements" block
6. Story reviewed: category, one story per prop axis
7. `docs/migration/tracker.md` — row → `In progress`

Storybook categories under `Components/`:

| Category | Covers |
|----------|--------|
| `Layout` | Structure and spacing: Box, Flex, Grid, Card, Divider, Spacer, ScrollArea, AspectRatio, VisuallyHidden |
| `Typography` | Text, Heading, Link, Blockquote, Code |
| `Forms` | Anything the user types into or picks from, plus Button |
| `Feedback` | Status and progress: Alert, Banner, Progress, Skeleton, Spinner, Toast, Stat, Meter, EmptyState |
| `Overlays` | Anything in the top layer: Modal, Drawer, Popover, Tooltip, Menu, HoverCard, ContextMenu, CommandPalette, ConfirmDialog |
| `Navigation` | Breadcrumbs, Navbar, Pagination, Sidebar, Stepper, Tabs, Tree |
| `Data display` | Presenting existing data: Table, List, Avatar, Badge, Chip, Timeline, Accordion, Carousel, Image, Kbd |

Charts sit at the **top level** under `Charts/`.

## Phase 3 — Verify (`verify-component`)

```bash
pnpm format && pnpm lint
pnpm build
ls dist/wc/<kebab>.js dist/wc/<kebab>.d.ts dist/react/<kebab>.js dist/react/<kebab>.d.ts
pnpm test -- src/elements/<kebab>
pnpm test:ssr -- src/elements/<kebab>
pnpm cem && git diff --stat custom-elements.json
pnpm build:storybook
```

Then the **screenshot pair**: the React section of `src/App.tsx` (matched by
its `<h2>` text) and the Lit story in Storybook, same viewport, default theme
axes; plus a journal + glass shot for panel-like elements. Present both and
wait for approval. The single driver script lives in the `verify-component`
skill.

## Phase 4 — Ship (`ship-component`)

```
feat(ui): migrate <Pascal> to lit     # migration
feat(ui): add <Pascal> element        # new element
```

One commit per element. Stage only the element folder, the two barrels,
`vite.config.ts`, `package.json`, `custom-elements.json`,
`examples/web-components.html` and the tracker. Push, open a **draft** PR
with the mapping sheet, screenshots and the R12 checklist, set the tracker row
to `In review`, and **stop**.

---

## Batch PRs

Phases 2, 3 and 8 allow up to five leaf elements per PR: one commit per
element, the draft PR opened at the first commit, every element verified and
approved individually. Mark ready for review only when every command above is
green for every element in the batch.
