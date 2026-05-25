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
| `feat/` | New feature |
| `fix/` | Bug fix |
| `refactor/` | Refactor with no behaviour change |
| `chore/` | Tooling, deps, CI, config |
| `docs/` | Documentation only |
| `wip/` | Exploratory / work-in-progress (not for PRs) |

## Examples

```
feat/dnd-spell-slot-reset
fix/auth-session-cookie-expiry
refactor/vacation-hours-utils
chore/upgrade-biome
docs/update-firebase-setup
wip/mack-iteration-7
```

## Rules

- Branch off `main` unless working on a dependent feature; in that case branch off the parent feature branch.
- Delete branches after merging.
- Never commit directly to `main`.
