import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    // Storybook owns the site root; the demo page is deployed under /demo/.
    base: '/demo/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(dirname, 'src'),
        },
    },
    build: {
        outDir: 'dist-site/demo',
        emptyOutDir: true,
    },
});
