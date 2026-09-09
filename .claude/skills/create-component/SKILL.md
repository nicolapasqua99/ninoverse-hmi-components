---
name: create-component
description: Scaffold and ship one brand-new Lit element for the ninoverse-hmi-components library end to end — create the six element files under src/elements/<kebab>/ (element, styles, React wrapper, story, browser test, SSR test), wire it into the element and React barrels, vite entries and package exports, verify with lint + build + tests + manifest + storybook + screenshot, then commit and open a draft PR. Use when the user asks to "create / add / build a component" that does not exist yet (e.g. "add a Rating element", "/create-component badge"). For converting an existing React component use migrate-component instead.
---

# Create Component

End-to-end orchestrator for adding a **new** Lit element that has no React
predecessor. Runs the four focused sub-skills in sequence. To convert an
existing React component, use `migrate-component` instead.

Read `.claude/lit-migration.md` first. New components are Lit elements only;
never add a React component to `src/components/`.

## Inputs

- **Element name** (required): any form (`Rating`, `rating`). Derive the kebab
  name (folder, files, tag suffix `hmi-rating`, subpath `./wc/rating`), the
  class `HmiRating` and the React wrapper export `Rating`. Ask if not given.
- **Spec** (required): a paragraph describing purpose, props, slots, events.
  Turn it into the API mapping sheet (same table as `migrate-component`
  step 3) and get it approved before scaffolding.

## Execution order

Run each phase fully before starting the next. Never commit a partial element.

| Phase | Skill | What it does |
|-------|-------|--------------|
| 1 | `scaffold-component` | branch, collision check, create the six files from the templates |
| 2 | `wire-component` | barrels, vite entries, package exports, example page, story, tracker row |
| 3 | `verify-component` | format → lint → build → tests → manifest → storybook → screenshot → user approval |
| 4 | `ship-component` | commit `feat(ui): add <Name> element`, push, draft PR → stop |

## Rules

- `pnpm` only — never `npm` or `yarn` for project commands.
- Do not proceed past phase 3 until the user has approved the screenshot.
- After the draft PR is open, **stop** and wait for the user.
