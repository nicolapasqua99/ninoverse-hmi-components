# Branch Naming

## Format

```
<type>/<short-description>
```

- All lowercase, words separated by hyphens
- Keep the description short (2–5 words)
- No ticket numbers unless a tracking system is in use

## Types

| Prefix | When to use |
|--------|-------------|
| `migrate/` | React → Lit migration of one element (`migrate/badge`) or a leaf batch (`migrate/phase-2-leaves`) |
| `feat/` | New element or feature |
| `fix/` | Bug fix |
| `refactor/` | Refactor with no behaviour change |
| `chore/` | Tooling, deps, CI, config |
| `docs/` | Documentation only |
| `wip/` | Exploratory / work-in-progress (not for PRs) |

## Examples

```
migrate/badge
migrate/phase-2-leaves
migrate/v6-flip
feat/rating
fix/modal-close-cancelable
chore/vitest-browser-mode
docs/lit-migration-playbook
```

## Rules

- **Always branch off a merged `main`.** Fetch first:
  `git fetch origin main && git checkout -b migrate/<kebab> origin/main`.
- **Never stack.** Do not branch off another open PR's branch; the next
  element starts only after the previous PR has merged.
- Delete branches after merging.
- Never commit directly to `main`.
