# Code Review Guidelines

## What to check

### Styling
- Plain CSS files (`src/components/styled/[name].styled.css`) used for component styles, not inline `style={}`
- New color values use CSS custom properties (`var(--primary)`) rather than hardcoded values
- Shape: `var(--corner-tl)`, `var(--corner-tr)`, `var(--corner-br)`, `var(--corner-bl)` — never hardcoded radii
- Elevation: `var(--elevation-N)` — never hardcoded box-shadows
- `rem` units relative to the 8px base font (e.g. `2rem` = 16px)

### Code quality
- No `any` unless genuinely unavoidable; prefer narrowing the type
- Biome passes without suppression comments: `pnpm lint`
- No console.log left in production paths (API routes, layout guards)