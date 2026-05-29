# Session State & Restart Handoff

> Snapshot of the component-implementation effort so a future session can resume
> without re-deriving context. Delete this file once the work is complete.

_Last updated: 2026-05-29._

---

## TL;DR — where we are

- **Goal:** Implement the remaining components of `@ninoverse/hmi-components` per
  the plan below, following a strict per-component / per-group workflow.
- **Audit done:** ~50 components already exist on `main`. The real gaps are
  **Phase 1 (layout/typography foundations)** and **Phase 7 (data-viz)**, plus a
  scattering of singletons. Full gap list below.
- **Group 0 (rename `Field` → `FormControl`) is DONE** and open as **draft
  PR #47** (`refactor/form-control-rename`). Awaiting review/merge.
- **Blocked on screenshots:** the environment's network policy blocks
  Playwright's browser CDN, so per-component screenshots can't be captured yet.
  Decision: **widen the network policy**, then resume. See the bottom section for
  how to change it.

## Next actions on restart
1. Confirm the network policy now allows `cdn.playwright.dev` (see last section),
   then reinstall Playwright + Chromium (it was installed in `/tmp`, which is
   wiped between containers — not in the repo).
2. Review & merge **PR #47** (`Field` → `FormControl`).
3. Start **Group 1 — Phase 1 Foundations** on a new branch `feat/phase1-layout`.
   Open a draft PR at the first commit; one commit per component; stop for review
   after each.

---

## Decisions locked in this session
- **Existing components:** do **not** rebuild — do an audit-pass (review +
  screenshot) per phase, then move on.
- **First gap to build:** Phase 1 foundations.
- **Naming:** rename `field` → `formControl` (done, PR #47). **Keep `input`** as
  an accepted base primitive the plan omitted. **Keep `ToastHost` bundled** in
  `toast.tsx` (no split — per user).
- **Workflow tweak:** open + push a **draft PR at the group's FIRST commit** so it
  can be reviewed incrementally; keep pushing each component commit to that PR.
- **Screenshots:** use Playwright (blocked by network policy — pending widen).
- **Correction:** commit #43's message claimed "Rating, OTPInput" but those files
  do **not** exist. `rating` and `pinInput` are genuinely still to be built.

---

## Current gap list (what remains to BUILD)
- **Phase 1 (Layout/Typography/Utilities):** `box`, `flex`, `grid`, `spacer`,
  `aspectRatio`, `text`, `heading`, `link`, `blockquote`, `code`,
  `visuallyHidden`, `scrollArea`. (`kbd`, `divider` already exist → audit-pass.)
- **Phase 2:** `meter`.
- **Phase 3:** `pinInput`, `rating`, `colorPicker`.
- **Phase 4:** `hoverCard`, `contextMenu`.
- **Phase 5:** `tree`.
- **Phase 6:** `image`, `carousel`, `timeline`, `stat`.
- **Phase 7 (Data Viz, none built):** `lineChart`, `barChart`, `areaChart`,
  `donutChart`, `sparkline`, `bulletChart`, `gauge`, `scatterPlot`, `heatmap`,
  `funnelChart`, `radarChart`, `chartTooltip`, `legend`, `cartesianGrid`,
  `responsiveContainer`.
- **Minor:** `avatarStack`, `confirmDialog`, `radioGroup`, `searchInput` reuse a
  sibling's `.styled.css` — note during audit-pass; only split if strict
  one-CSS-per-component is wanted.

---

## Governance rules (from `.claude/` — must follow)
- **Package manager:** `pnpm` only. Never `npm`/`yarn`.
- **Verify before done:** `pnpm lint` (Biome) and `pnpm build` (`tsc -b && vite
  build`) must both pass.
- **Branches:** `<type>/<short-description>`, lowercase-hyphen, branch off `main`,
  never commit to `main`, delete after merge. Types: `feat/ fix/ refactor/
  chore/ docs/ wip/`.
- **Commits:** Conventional Commits, imperative, ≤72-char subject, `!` for
  breaking. Scope `ui` for components.
- **PRs:** title = commit format; body = What / Why / How / Testing; draft until
  lint+build pass; one logical change per PR.
- **File naming:** components `camelCase.tsx`; styles
  `src/components/styled/[name].styled.css`.
- **No test suite** exists; manual verification only (`pnpm build` is the gate).

---

## The Plan (reconciled, approved)

### Strict Workflow (applies to every BUILT component)
1. **One branch & PR per group.** New branch per group (e.g. `feat/phase1-layout`).
   Open + push a **draft PR at the group's FIRST commit**, then keep pushing each
   subsequent component commit to that same PR. Wait for the PR to merge before
   starting the next group's branch.
2. **One Conventional Commit per component.**
3. **Ask before starting** each component; state which one.
4. **Pre-flight check** the filesystem first; if it exists, report and ask
   skip/overwrite/modify.
5. **Wait for review** after each component — stop, do not start the next.

### Per-Component Checklist (build)
1. `src/components/[name].tsx` (camelCase).
2. `src/components/styled/[name].styled.css` + import into the `.tsx`; use MD3
   vars (`--primary`, `--corner-tl`, …).
3. Re-export in `src/index.ts` (keep alphabetical).
4. Add to `input` map in `vite.config.ts` (keep alphabetical).
5. Add entry to `"exports"` in `package.json` (kebab-case subpath, alphabetical).
6. Import + render variants in `src/App.tsx`.
7. `pnpm dev`, screenshot the variants, present for visual MD3 verification.
8. Commit (Conventional Commits) after approval.
9. Push. If group's first commit, open the draft PR now; else push to existing PR.
   Stop; ask to proceed to the next component.

### Audit-Pass Checklist (existing components, per phase)
Skim each existing component for defects, confirm it renders in `App.tsx`,
screenshot it, surface anything broken. No commits unless a real fix is needed
(then an isolated commit).

### Execution order
- **Group 0 — Reconciliation:** `field` → `formControl`. **DONE → PR #47.**
- **Group 1 — Phase 1 Foundations** (`feat/phase1-layout`, after #47 merges):
  build in order — `box`, `flex`, `grid`, `spacer`, `aspectRatio` (layout) →
  `text`, `heading`, `link`, `blockquote`, `code` (typography) →
  `visuallyHidden`, `scrollArea` (utilities). Audit-pass `divider`, `kbd`.
- **Groups 2+ — remaining gaps**, one branch + PR per group, in plan-phase order:
  - Phase 2: build `meter`; audit-pass rest.
  - Phase 3: build `pinInput`, `rating`, `colorPicker`; audit-pass `formControl`,
    `input`, other inputs.
  - Phase 4: build `hoverCard`, `contextMenu`; audit-pass rest.
  - Phase 5: build `tree`; audit-pass rest (incl. `ToastHost` in `toast.tsx`).
  - Phase 6: build `image`, `carousel`, `timeline`, `stat`; audit-pass rest.
  - Phase 7: build all 15 charts; likely subdivide into multiple PRs.

### Verification per group (before opening/marking PR ready)
- `pnpm lint` and `pnpm build` pass (build catches missing/mismatched
  `vite.config.ts` inputs and `package.json` exports + generates dts).
- `pnpm dev` renders new + touched components in `App.tsx`; screenshot variants.

---

## Open branches / PRs
- `refactor/form-control-rename` → **draft PR #47** (`Field` → `FormControl`).
  Verified: lint clean, build OK (`dist/formControl.*` emitted, no stale `field`),
  dev server boots 200, grep clean.
- `docs/session-handoff` → this file.

## Reference paths
- Approved plan (ephemeral, not in repo):
  `/root/.claude/plans/the-initial-scaffolding-plan-fluffy-ullman.md` — fully
  embedded above so it survives container resets.
- Components: `src/components/*.tsx`; styles `src/components/styled/*.styled.css`.
- Wiring: `src/index.ts`, `vite.config.ts` (`build.lib.entry`), `package.json`
  (`exports`), demos `src/App.tsx`.

---

## How to change the network policy (to unblock Playwright)
The screenshot step needs Playwright's browser binary from `cdn.playwright.dev`,
which the current egress policy blocks. Outbound access is set **per environment**
when it's created/configured. Docs:
https://code.claude.com/docs/en/claude-code-on-the-web

To widen it:
1. In the Claude Code web app, open the **environment** used for this repo
   (Settings → Environments, or the environment picker for the session).
2. Edit its **network / egress policy**. Either:
   - switch to a more permissive policy (e.g. full outbound access), **or**
   - if a custom allowlist is supported, add the hosts:
     `cdn.playwright.dev` (Playwright browser builds CDN).
3. Save, then **start a fresh session** on this repo (network policy is fixed at
   environment/session creation, so existing containers won't pick up the change).
4. In the new session, tell me to resume; I'll reinstall Playwright + Chromium and
   continue with screenshot-backed verification.

If you'd rather not widen egress, the fallback is to skip screenshots and review
visuals yourself from `pnpm dev` / the PR diffs — verification then relies on
`pnpm lint` + `pnpm build` + a dev-server smoke test.
