---
name: ship-component
description: Commit a verified Lit element of ninoverse-hmi-components, update the migration tracker, and open a draft PR carrying the API mapping sheet and the definition-of-done checklist — final phase of the element workflow. Run after verify-component has passed and the user has approved the screenshot pair.
---

# Ship Component

Commits the finished element and opens a draft PR. This is **phase 4 of 4**.
Only run this after `verify-component` has passed and the user has approved
the screenshot pair.

## Inputs

- **Element name** (required): `<Pascal>` for the commit message, `<kebab>`
  for the branch. Ask if not provided.
- **Mode**: `migration` or `new` (decides the commit message).

## Guardrails

- Never commit if `pnpm lint`, `pnpm build`, `pnpm test` or `pnpm test:ssr`
  would fail. Re-run `verify-component` if there is any doubt.
- One commit per element — never batch two elements in one commit.
- `src/components/<camel>.tsx` and its CSS are never touched.
- Stage only these files:
  - `src/elements/<kebab>/*` (six files)
  - `src/elements/index.ts`, `src/react/index.ts`
  - `vite.config.ts`, `package.json`
  - `custom-elements.json`
  - `examples/web-components.html`
  - `docs/migration/tracker.md`
  - `docs/migration/README.md` only if a rule changed (say so in the PR)

## Step 1 — Commit

```
feat(ui): migrate <Pascal> to lit        # migration mode
feat(ui): add <Pascal> element           # new element
```

Body: the behaviour differences from the React version (for example
`hmi-input`/`hmi-change`), one line each.

## Step 2 — Tracker

Set the element's row in `docs/migration/tracker.md` to `In review` with the
PR number once it exists (amend the commit or add a `docs(ui): update tracker`
commit).

## Step 3 — Push + draft PR

```bash
git push -u origin migrate/<kebab>       # or feat/<kebab>
```

Open a **draft** PR targeting `main` via the GitHub MCP tools. Title
`feat(ui): migrate <Pascal> to lit`. Body follows `.claude/pr-guidelines.md`
(migration template): What / Why / How / Testing, then:

- `## API mapping` — the approved sheet.
- `## Behaviour differences` — the list from the commit body.
- `## Screenshots` — React (App.tsx section) and Lit (Storybook story) side by side; add the journal + glass shot for panel-like elements.
- `## Tracker` — link to the row.
- `## Definition of done` — the R12 checklist from `.claude/lit-migration.md`, every box ticked.

## Done

After the PR is open, post the PR URL and **stop**. Wait for the user before
starting any new element. Never stack the next branch on this one; the next
element starts from `main` after this PR merges.
