# Directories and File Naming

## Source directories (`src/`)

| Path | Contents |
|------|----------|
| `src/components/` | Generated components  |
| `src/components/styled/` | Shared Styled Component definitions |
| `src/configs/` | Global static config (color tokens, etc.) |
| `src/models/` | Shared TypeScript interfaces/types |
| `src/lib/` | Shared Utilities |
| 

## Within each `src/<component>/` directory

| Folder | Contents |
|--------|----------|
| `src/components/styled/` | Styled Component definitions |
| `src/configs/` | Static config (color tokens, etc.) |
| `src/models/` | TypeScript interfaces/types |
| `src/lib/` | Utilities |

## File naming conventions

| File type | Convention | Example |
|-----------|-----------|---------|
| Components | `camelCase.tsx` | `unorderedList.tsx` |
| Styled Component (single file) | `[name].styled.tsx` | `button.styled.tsx` |
| Config objects | `camelCase.ts` | `socialIconsParallaxConfiguration.ts` |
| TypeScript models | `[name].model.ts` / `[name].model.tsx` | `button.model.ts`, `button.model.tsx` |
| Utilities | `[name].utility.ts` / `[name].utility.tsx` | `button.utility.ts`, `button.utility.tsx` |