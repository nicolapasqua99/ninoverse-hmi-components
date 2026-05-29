# TODO

## update-style-guide rule (`​.claude/update-style-guide.md`)

A dedicated rule for updating design tokens when a new design file or style
direction arrives — distinct from the full reproduction guide (build from scratch)
and from component-workflow (build a single component).

### Open questions to decide before writing the rule

**1. Scope classification — how granular?**
Update types have different risk profiles and different files to touch:
- Value-only (same token roles, new hex values)
- Schema change (new roles added or removed — e.g. adding `--warning`)
- Shape system change (corner radii — dangerous if any component has hardcoded fallbacks)
- Typography change (font stack or base font size)
- Full redesign (all of the above)

Decision needed: classify update type first and branch the procedure, or treat everything as a full update regardless?

**2. Audit-before-touch**
Should the guide mandate a grep pass for hardcoded values (colors, radii, shadows)
*before* editing tokens? Violations won't surface from a token change alone and
won't fail the build. Options: require pre-audit always, require it only for shape/
typography changes, or trust code review.

**3. Diff-first vs replace-first**
- Diff-first: produce a structured diff of old vs new tokens, review it, then apply. Auditable.
- Replace-first: edit `default.css` directly, verify with screenshots. Faster.

**4. Visual regression — before/after screenshots**
The screenshot method exists. Worth requiring a full `App.tsx` screenshot before
(baseline) and after (diff) to catch unintended side effects from shared tokens?

**5. Multi-theme**
Currently only `public/css/themes/default.css`. If `themes/dark.css` or
`themes/brand-b.css` are ever added, the guide needs to cover: which file to
create, how theme switching works, whether `colors.ts` needs changes.

**6. `colors.ts` sync contract**
When a new token role is added to `default.css`, is the check that `colors.ts`
stays in sync a manual checklist step or something enforceable (e.g. a lint rule)?
