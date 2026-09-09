# Directories and File Naming

## Source directories (`src/`)

| Path | Contents |
|------|----------|
| `src/elements/<kebab>/` | One Lit element: `<kebab>.ts`, `<kebab>.styles.ts`, `<kebab>.react.ts`, `<kebab>.stories.ts`, `<kebab>.test.ts`, `<kebab>.ssr.test.ts` |
| `src/elements/shared/` | Element infrastructure: `base.styles.ts`, `events.ts`, `dom.ts`, `form.ts`, `format.ts`, `panel.ts`, `chart.ts`, `positioning.ts`, `toast.ts`, `theme.ts` |
| `src/elements/index.ts` | Barrel that registers every migrated element |
| `src/react/` | `index.ts` barrel of React wrappers, `use-theme.ts` |
| `src/components/` | **Legacy** React components (frozen; deleted at v6). Never add to it. |
| `src/components/styled/` | **Legacy** plain CSS for the React components (`*.styled.css`) |
| `src/configs/` | Global static config (color tokens, fonts, theme lists) |
| `src/lib/` | Legacy React utilities (`*.utility.ts`) |

There is no `src/models/`; types live next to the element that owns them and
are re-exported through the barrels.

## Naming rules for `src/elements/`

Everything derives from one kebab-case name:

| Artifact | Form | Example |
|----------|------|---------|
| Folder and files | kebab | `src/elements/area-chart/area-chart.ts` |
| Class | `Hmi` + PascalCase | `HmiAreaChart` |
| Tag | `hmi-` + kebab | `hmi-area-chart` |
| Package subpaths | `./wc/<kebab>`, `./react/<kebab>` | `./wc/area-chart` |
| Dist files | `dist/wc/<kebab>.js`, `dist/react/<kebab>.js` | `dist/wc/area-chart.js` |
| React wrapper export | PascalCase (the v5 name) | `AreaChart` |
| Event detail types | `<Pascal><Event>Detail` | `AreaChartResizeDetail` |
| Events | `hmi-` + kebab | `hmi-open-change` |
| Slots | kebab | `left-icon` |
| Parts | kebab | `base`, `panel` |
| Attributes | kebab, declared explicitly for multi-word props | `as-icon` |

## File suffixes

| Suffix | Purpose |
|--------|---------|
| `.ts` | the element |
| `.styles.ts` | `export const styles = css\`…\`` |
| `.react.ts` | `createComponent` wrapper |
| `.stories.ts` | Storybook (`@storybook/web-components-vite`) |
| `.test.ts` | Vitest browser tests |
| `.ssr.test.ts` | Vitest node SSR smoke test |

Legacy React files keep their `camelCase.tsx` / `[name].styled.css` names
until deletion.

## CSS

Elements never import CSS files. All styles live in `<kebab>.styles.ts` and
are attached through `static override styles = [baseStyles, styles]`. Theme
tokens (`var(--primary)`, `var(--corner-tl)`, …) are the only way colours,
radii, shadows and spacing enter an element; no hardcoded values, no `rem`.
