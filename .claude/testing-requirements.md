# Testing Requirements

There is currently no test suite configured in this repository. Until one is added, the following manual verification steps apply.

## Before merging any change

- [ ] `pnpm build` succeeds (catches import boundary violations at compile time)

## If/when a test framework is added

Recommended stack: **Vitest** (unit) + **Playwright** (e2e).

- Unit tests belong in a `__tests__/` sibling to the file under test, or colocated as `*.test.ts`
- E2e tests go in `e2e/`
- Auth flows should be tested with a dedicated Firebase Auth emulator project
