# Commit Conventions

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <description>

[optional body]
```

- Subject line: max 72 characters, lowercase, no trailing period
- Use imperative mood: "add feature" not "added feature"
- Body: wrap at 72 characters, explain *why* not *what*

## Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or user-visible behaviour |
| `fix` | Bug fix |
| `refactor` | Code change with no behaviour change |
| `style` | Formatting, whitespace — no logic change |
| `docs` | Documentation only |
| `chore` | Build scripts, deps, tooling, CI |
| `perf` | Performance improvement |
| `revert` | Reverts a previous commit |

Append `!` after the type for breaking changes: `feat!: drop Node 16 support`.

## Scopes (optional but recommended)

Use the route or layer being changed: `auth`, `dnd`, `work`, `nini`, `mack`, `portfolio`, `firebase`, `api`, `ui`.

## Examples

```
feat(dnd): add spell slot reset on long rest
fix(auth): redirect loop when session cookie is expired
refactor(work): extract vacation hours logic into utility
chore: upgrade biome to 2.4.9
docs: update CLAUDE.md with auth flow detail
feat!: replace __session cookie with JWT-only flow
```

## What to avoid

- Vague messages: `fix stuff`, `update`, `wip`
- Mixing unrelated changes in one commit
- Committing `firebase-service-account.json` (it is gitignored for a reason)
