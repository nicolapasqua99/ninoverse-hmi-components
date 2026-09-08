---
name: wire-component
description: Wire an already-scaffolded HMI component into the project's index.ts, vite.config.ts, package.json exports, App.tsx, and its Storybook story. Phase 2 of the component workflow; run after scaffold-component and before verify-component.
---

# Wire Component

Registers a scaffolded component in the project-level files so it is exported,
bundled, and documented. This is **phase 2 of 4** — run `verify-component`
next.

## Inputs

- **Component name** (required): camelCase stem or PascalCase. Derive:
  - camelCase: `rating`
  - PascalCase: `Rating`
  - kebab-case subpath key: `./rating` or `./radar-chart`
- Assumes `src/components/<name>.tsx` already exists (run `scaffold-component`
  first).

## Step 3 — `src/index.ts`

Add the named re-export. Keep the file **alphabetically sorted** by export
name:

```ts
export { Rating } from './components/rating';
```

## Step 4 — `vite.config.ts`

Add the component to the `build.lib.entry` map. Keep entries **alphabetically
sorted** by key:

```ts
rating: resolve(dirname, 'src/components/rating.tsx'),
```

## Step 5 — `package.json` → `"exports"`

Add a kebab-case subpath entry. Keep entries **alphabetically sorted**:

```json
"./rating": {
    "types": "./dist/components/rating.d.ts",
    "import": "./dist/rating.js"
}
```

## Step 6 — `src/App.tsx`

- Import from `'./components/<name>'` (match the convention already used in
  this file, **not** `'./index'`).
- Add a `<section>` with an `<h2>` matching the component name, following the
  surrounding markup style.
- Render **at least one variant per meaningful prop** so type errors, missing
  CSS, and render failures surface immediately.

## Step 7 — `src/components/<name>.stories.tsx`

Storybook is the root of the deployed docs site, so every component needs a
story file.

- Import the component from `'./<name>'`.
- Title: `Components/<Category>/<ComponentName>`, where category is one of
  `Layout`, `Typography`, `Forms`, `Feedback`, `Overlays`, `Navigation`,
  `Data display` — see the table in `.claude/component-workflow.md` step 7 for
  what each covers. Chart components are the exception: top-level `Charts/`.
- Tag `['autodocs']` so the props table is generated from the prop doc
  comments. No manual `argTypes` unless a prop needs a control the inferred
  type cannot express.
- One story per meaningful prop axis, mirroring the variants added to
  `App.tsx`. Stateful components need a `render` that owns the state.

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './rating';

const meta = {
    title: 'Components/Forms/Rating',
    component: Rating,
    tags: ['autodocs'],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

The docs page pulls its description from the JSDoc block **directly above the
exported function**. If that block sits above a local helper (an icon, a
constant), the page renders without a description — move it.

**Modifying an existing component:** update its existing story to cover the new
or changed props. Do not add a parallel story file.

## Done

After all five files are updated, tell the user wiring is complete and prompt
them to run `verify-component` to lint, build, and screenshot the result.
