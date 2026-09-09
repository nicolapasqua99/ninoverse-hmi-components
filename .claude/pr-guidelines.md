# PR Guidelines

## Title

Follow the same format as commit messages: `<type>(<scope>): <description>`.
Keep it under 72 characters.

## Description template

```markdown
## What
<!-- One-paragraph summary of the change -->

## Why
<!-- Motivation: bug, feature request, refactor reason -->

## How
<!-- Non-obvious implementation decisions -->

## Testing
<!-- How was this verified? Commands run, screenshots for UI changes. -->
```

## Migration PR additions

Element migration PRs (`migrate/<kebab>`) append these sections:

```markdown
## API mapping
| React prop | Element property / attribute | Slot | Event (detail) | Part |
|------------|------------------------------|------|----------------|------|

## Behaviour differences
<!-- One line each, e.g. text input fires hmi-input per keystroke and hmi-change on commit -->

## Screenshots
<!-- React (App.tsx section) | Lit (Storybook story), same viewport and theme axes;
     plus journal + glass for panel-like elements -->

## Tracker
<!-- link to the row in docs/migration/tracker.md -->

## Definition of done
<!-- the R12 checklist from .claude/lit-migration.md, every box ticked -->
```

## Rules

- One logical change per PR; split unrelated work into separate PRs
- **Never stack PRs.** Cut every branch from `main` after the previous PR
  has merged; never base a PR on another open PR
- Rebase onto `main` before requesting review (no unnecessary merge commits)
- All Biome checks must pass: `pnpm lint`
- `pnpm build`, `pnpm test` and `pnpm test:ssr` must succeed before marking
  the PR ready for review
- Link to the relevant section in CLAUDE.md or a `.claude/` rule file if the
  PR establishes a new pattern

## Size guidance

| Lines changed | Action |
|--------------|--------|
| < 200 | Normal review |
| 200 – 600 | Add context in the description about where to start reading |
| > 600 | Consider splitting — or at minimum call it out and justify it |

Element migrations routinely exceed 600 lines (six files plus wiring); that is
expected, say so in the description and point reviewers at the mapping sheet.

## Draft PRs

Use draft status for work-in-progress or when feedback is needed before the
implementation is complete. Convert to ready only when the full gate passes
and, for elements, the screenshot pair has been approved.
