---
name: scaffold-component
description: Pre-flight checks and file creation for a Lit element of ninoverse-hmi-components — collision check, branch setup, create the six files under src/elements/<kebab>/ from the shared templates (element, styles, React wrapper, story, browser test, SSR test). First phase of the element workflow; run before wire-component.
---

# Scaffold Component

Creates the six source files for one element under `src/elements/<kebab>/`.
Performs pre-flight checks first. This is **phase 1 of 4** — run
`wire-component` next. Rules: `.claude/lit-migration.md`.

## Inputs

- **Element name** (required), any form. Derive: kebab `<kebab>`, PascalCase
  `<Pascal>`, class `Hmi<Pascal>`, tag `hmi-<kebab>`.
- **Mode**: `migration` (an approved API mapping sheet from
  `migrate-component` exists) or `new` (an approved sheet from
  `create-component`). The sheet drives every placeholder below.
- If no name was given, ask before doing anything else.

## Pre-flight

1. **Confirm scope.** State the element you are about to scaffold. If the
   skill was invoked with a name and an approved sheet, proceed.

2. **Collision check:**
   ```bash
   ls src/elements/<kebab>/ 2>/dev/null && echo EXISTS || echo MISSING
   ```
   If EXISTS → stop and ask: skip / overwrite / modify. Never silently overwrite.

3. **Branch setup** (unless the caller specifies a branch). Branches are always
   cut from a merged `main`, never from another open branch:
   ```bash
   git fetch origin main --quiet
   git checkout -b migrate/<kebab> origin/main     # migration mode
   git checkout -b feat/<kebab> origin/main        # new element
   ```

## Files to create

All six files, from the templates in `docs/migration/translation-guide.md`
§18, with placeholders replaced from the mapping sheet. Biome style: 4-space
indent, single quotes, semicolons, trailing commas.

### 1. `src/elements/<kebab>/<kebab>.ts`

- `class Hmi<Pascal> extends LitElement`, `@customElement('hmi-<kebab>')`,
  `HTMLElementTagNameMap` augmentation.
- Imports only from `lit`, `lit/decorators.js`, `lit/directives/*.js`,
  `../shared/*`. Standard decorators with `accessor`.
- One `@property` per row of the sheet (R2): reflect what CSS selects on,
  `attribute: false` for arrays/objects, explicit `attribute` for multi-word
  names, JSDoc with `@default`.
- Named slots for every singular rich-content prop; `label-<value>` slots
  inside rendered arrays (R6).
- Every callback → `emit(this, 'hmi-<name>', detail)` with an exported
  `<Pascal><Event>Detail` interface (R5). Text inputs: `hmi-input` +
  `hmi-change`.
- `part="base"` on the root interactive node; `part="panel"` and
  `renderLiquidFilter()` when panel-like (R4).
- Form-associated block (R7) when the sheet says form kind ≠ none.
- Dialog/popover skeleton (R8) for overlays.
- `connectedCallback` guarded by `isServer`; listeners on an
  `AbortController`; no light-DOM mutation (R3).
- Class JSDoc with `@tag`, `@slot`, `@csspart`, `@fires` lines — the manifest
  and Storybook read them.

### 2. `src/elements/<kebab>/<kebab>.styles.ts`

- `export const styles = css\`…\``; `:host { display: … }` first.
- Port the legacy `.styled.css` rule by rule (migration mode): block → `:host`
  / inner root, `--modifier` → `:host([attr='v'])`, `__element` → class +
  `part`, author children → `::slotted()`, every `rem` → `calc(var(--_base) * N)`,
  theme-attribute selectors → tokens, overlay `z-index` removed, keyframes and
  reduced-motion verbatim.
- No `:root`, `html`, `body`, `[data-*]`, `:host-context(`, `rem`.

### 3. `src/elements/<kebab>/<kebab>.react.ts`

`createComponent({ tagName, elementClass, react, displayName, events })`;
`events` maps every `hmi-*` event to its React name with
`EventName<CustomEvent<Detail>>`; re-export detail and value types. No logic.

### 4. `src/elements/<kebab>/<kebab>.stories.ts`

`@storybook/web-components-vite`; `title: 'Components/<Category>/<Pascal>'`
(categories in `.claude/component-workflow.md`; charts under `Charts/`);
`component: 'hmi-<kebab>'`; `tags: ['autodocs']`; one story per prop axis;
React usage snippet in `parameters.docs.description.component`.

### 5. `src/elements/<kebab>/<kebab>.test.ts`

Vitest browser mode. `it` blocks in this order: `registers`, `renders`,
`reflects <prop>` (one per reflected prop), `boolean attribute presence`,
`dispatches hmi-<x> with detail` (one per event), `projects <slot> slot`
(default + each named slot), `submits its value and resets` (form-associated
only), `exposes roles`, `mounts through the React wrapper`.

### 6. `src/elements/<kebab>/<kebab>.ssr.test.ts`

`// @vitest-environment node`; `@lit-labs/ssr` `render()` output contains
`<template shadowroot`, `part="base"` and the slotted text.

## Done

After all six files exist, tell the user scaffolding is complete and prompt
them to run `wire-component`.
