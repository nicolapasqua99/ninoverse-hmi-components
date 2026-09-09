# Code Review Guidelines

Rule numbers refer to `.claude/lit-migration.md`.

## Element shape (R1, R2)

- Folder `src/elements/<kebab>/` has all six files; class `Hmi<Pascal>`, tag `hmi-<kebab>`, `HTMLElementTagNameMap` augmented
- Only `lit`, `lit/decorators.js`, `lit/directives/*.js`, `../shared/*` imported at runtime; no `src/components` imports
- Standard decorators with `accessor`; `override` on every lifecycle method
- Every attribute CSS selects on is reflected; data props are `attribute: false`; multi-word props declare their attribute
- Booleans use presence semantics — no converter parsing `"false"`
- No function-typed props except a tier-3 render property (`attribute: false`)
- `src/components/<camel>.tsx` untouched

## Styles (R4)

- No `rem` anywhere in `src/elements/`; sizes use `calc(var(--_base) * N)` or theme tokens
- No `:root`, `html`, `body`, `[data-theme|structure|material]`, `:host-context(`, or descendant selectors across element boundaries
- `:host { display: … }` present
- `part="base"` on the root interactive node; `part="panel"` + `--panel-*` + `renderLiquidFilter()` on panel-like elements
- Colours, radii, shadows, spacing only through `var(--token)`; per-component hooks are `var(--<element>-<prop>, fallback)`
- No overlay `z-index`
- Author children reached only through `::slotted()`

## Behaviour (R3, R5, R6, R7, R8)

- Every event goes through `emit()` with an object `detail`; names are `hmi-*`; close/dismiss/cancel are cancelable and honoured
- Text inputs fire `hmi-input` per keystroke and `hmi-change` on commit
- `connectedCallback` guarded by `isServer`; document/window listeners on an `AbortController` aborted in `disconnectedCallback`
- Outside-click uses `composedPath()`, never `event.target`; focus restore uses `activeElementDeep()`
- No light-DOM mutation; `render()` deterministic from properties
- Singular rich content is slotted; array items are strings with `label-<value>` slot overrides; render functions offer the three tiers
- Form-associated where R7 lists the element: `formAssociated`, `ElementInternals`, `label`/`hint`/`error`/`required`, reset and disabled callbacks, `delegatesFocus`
- Overlays use `<dialog>` or `popover`; no portals, no body mutation

## Wrapper, docs, tests (R10, R12)

- `<kebab>.react.ts` is `createComponent` only; `events` covers every `@fires` in the class JSDoc; detail and value types re-exported
- Class JSDoc has `@tag`, `@slot`, `@csspart`, `@fires`; each property has a description and `@default`
- `custom-elements.json` regenerated and shows the element
- Story covers every prop axis; React snippet in docs
- Tests cover the blocks listed in `.claude/testing-requirements.md`
- `examples/elements.html` exercises the element
- Tracker row updated; PR body carries the mapping sheet, behaviour differences, screenshots and the R12 checklist

## Code quality

- No `any` unless genuinely unavoidable; prefer narrowing the type
- Biome passes without suppression comments: `pnpm lint`
- No `console.log` left in element code
