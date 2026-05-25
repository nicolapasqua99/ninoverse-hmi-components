# ninoverse-hmi-components

A React component library providing Human-Machine Interface (HMI) UI components for the Ninoverse application.

## Tech Stack

- **Framework:** React + Vite (TypeScript)
- **Styling:** Material Design 3 color tokens + Google Fonts
- **Linter / Formatter:** Biome
- **Package Manager:** pnpm (required — do not use npm or yarn)

## Getting Started

```bash
pnpm install   # install dependencies
pnpm dev       # start Vite dev server
pnpm build     # production build (outputs to /dist)
pnpm preview   # serve production build locally
pnpm lint      # lint and format check
pnpm format    # auto-fix formatting
```

## Project Structure

```
src/
├── components/         # React components (.tsx)
│   └── styled/         # Styled Component definitions
├── configs/            # Color tokens and static config
├── models/             # TypeScript interfaces and types
└── lib/                # Shared utilities

public/
└── css/themes/         # Material Design 3 theme CSS variables
```

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Component | `camelCase.tsx` | `unorderedList.tsx` |
| Styled Component | `[name].styled.tsx` | `button.styled.tsx` |
| Config | `camelCase.ts` | `colorsConfig.ts` |
| Model | `[name].model.ts` | `button.model.ts` |
| Utility | `[name].utility.ts` | `button.utility.ts` |

## Design System

Tokens follow Material Design 3 naming (`--primary`, `--surface-variant`, etc.) and are defined as CSS custom properties in `public/css/themes/`. Import `src/configs/colors.ts` to use them in JS/TS.

**Typography:** base font size is `8px` (all `rem` units scale from this). Available font families: `--font-quicksand`, `--font-oxanium`, `--rubik-glitch`, `--font-press-start-2p`, `--font-pixelify-sans`.

## Contributing

- Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(ui): add button component`
- Run `pnpm lint` before opening a PR
- See `.claude/` for detailed conventions on commits, branches, file naming, and code review
