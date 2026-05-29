# Execution Order & Branching Strategy

Defines the priority order for building components and the branch / PR
structure that maps onto it.

---

## Branching and PR strategy

See `.claude/branch-naming.md` for the branch name format.

| Work type | Branch prefix | One PR per |
|-----------|--------------|-----------|
| Foundation scaffold | `chore/` | whole scaffold |
| Token update / re-theme | `chore/` | one PR |
| Component group (Phase N) | `feat/` | group (e.g. `feat/phase1-layout`) |
| Single isolated component | `feat/` | component |
| Rename / refactor | `refactor/` | logical rename unit |
| Docs / rules | `docs/` | one PR |

**Draft PR rule:** open a draft PR at the group's **first commit**. Push every
subsequent component commit to that same PR. Mark ready for review only when
`pnpm lint` and `pnpm build` both pass cleanly.

---

## Phase execution order

Build phases in ascending order. Do not start a later phase until all earlier
phases are merged to `main`.

| Phase | Category | Components | Dependency |
|-------|----------|-----------|------------|
| 0 | Reconciliation | Renames, moves, structural fixes | Do first — before any new builds |
| 1 | Layout + Typography + Utilities | `box`, `flex`, `grid`, `spacer`, `aspectRatio`, `text`, `heading`, `link`, `blockquote`, `code`, `visuallyHidden`, `scrollArea` | Foundational — visual testing of all later phases depends on these |
| 2 | Form primitives | `meter` | After Phase 1 |
| 3 | Advanced inputs | `pinInput`, `rating`, `colorPicker` | After Phase 2 |
| 4 | Overlays | `hoverCard`, `contextMenu` | After Phase 3 |
| 5 | Navigation / structure | `tree` | After Phase 4 |
| 6 | Content / media | `image`, `carousel`, `timeline`, `stat` | After Phase 5 |
| 7 | Data visualisation | `lineChart`, `barChart`, `areaChart`, `donutChart`, `sparkline`, `bulletChart`, `gauge`, `scatterPlot`, `heatmap`, `funnelChart`, `radarChart`, `chartTooltip`, `legend`, `cartesianGrid`, `responsiveContainer` | Last — most complex; split across multiple PRs |

### Within each phase

- Build **one component at a time**.
- Follow the 9-step checklist in `.claude/component-workflow.md` for each.
- Stop and confirm with the user after each component before starting the next.
- Existing components in a phase get an **audit-pass** (review + screenshot);
  only commit if a real defect is found.

### Audit-pass checklist (existing components)

1. Open the `.tsx` file — check for hardcoded colors, radii, or shadows.
2. Confirm the component is imported and rendered in `src/App.tsx`.
3. Take a screenshot (`pnpm dev` + screenshot method in `component-workflow.md`).
4. Surface anything broken. Only commit if a fix is needed; use an isolated commit.

---

## Current gap list

Components still to build as of the last audit:

**Phase 1:** `box`, `flex`, `grid`, `spacer`, `aspectRatio`, `text`, `heading`,
`link`, `blockquote`, `code`, `visuallyHidden`, `scrollArea`.
(`kbd`, `divider` exist → audit-pass only.)

**Phase 2:** `meter`.

**Phase 3:** `pinInput`, `rating`, `colorPicker`.

**Phase 4:** `hoverCard`, `contextMenu`.

**Phase 5:** `tree`.

**Phase 6:** `image`, `carousel`, `timeline`, `stat`.

**Phase 7:** `lineChart`, `barChart`, `areaChart`, `donutChart`, `sparkline`,
`bulletChart`, `gauge`, `scatterPlot`, `heatmap`, `funnelChart`, `radarChart`,
`chartTooltip`, `legend`, `cartesianGrid`, `responsiveContainer`.

Update this list as components land and phases merge.
