import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

/* Two projects:
   - browser: `*.test.ts` under src/elements run in real Chromium (Playwright).
   - ssr: `*.ssr.test.ts` run in Node against @lit-labs/ssr.
   `pnpm test` / `pnpm test:ssr` select one project each. */
export default defineConfig({
    test: {
        passWithNoTests: true,
        projects: [
            {
                test: {
                    name: 'browser',
                    include: ['src/elements/**/*.test.ts'],
                    exclude: ['**/*.ssr.test.ts'],
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }],
                        screenshotFailures: false,
                    },
                },
            },
            {
                test: {
                    name: 'ssr',
                    include: ['src/elements/**/*.ssr.test.ts'],
                    environment: 'node',
                },
            },
        ],
    },
});
