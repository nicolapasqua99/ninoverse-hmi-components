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
| `feat` | New feature or user-visible behaviour (including a migrated element: it adds public subpaths) |
| `fix` | Bug fix |
| `refactor` | Code change with no behaviour change |
| `style` | Formatting, whitespace — no logic change |
| `docs` | Documentation only |
| `chore` | Build scripts, deps, tooling, CI |
| `perf` | Performance improvement |
| `revert` | Reverts a previous commit |

Append `!` after the type for breaking changes: `feat(ui)!: flip root exports to lit elements`.

The bump workflow reads the first line: `feat` → minor, `!` or
`BREAKING CHANGE` → major, everything else → patch.

## Scopes

| Scope | Covers |
|-------|--------|
| `ui` | elements and legacy components |
| `react` | React wrappers, `useTheme` |
| `theme` | tokens and theme files |
| `build` | vite, tsconfig, package exports, manifest |
| `ci` | workflows |
| `docs` | documentation and rules |

## Examples

```
feat(ui): migrate badge to lit
feat(ui): add rating element
feat(theme): add --panel-* tokens
chore(build): add hmi-elements iife bundle
docs(ui): update tracker for phase 2
fix(ui): honour preventDefault on hmi-close in modal
feat(ui)!: flip root exports to lit elements
```

## What to avoid

- Vague messages: `fix stuff`, `update`, `wip`
- Mixing unrelated changes in one commit
- Batching two elements in one commit
