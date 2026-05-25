# Code Review Guidelines

## What to check

### Styling
- Styled Components used for custom styles, not inline `style={}`
- New color values use CSS custom properties (`var(--primary)`) rather than hardcoded values
- `rem` units relative to the 8px base font (e.g. `2rem` = 16px)

### Code quality
- No `any` unless genuinely unavoidable; prefer narrowing the type
- Biome passes without suppression comments: `pnpm lint`
- No console.log left in production paths (API routes, layout guards)