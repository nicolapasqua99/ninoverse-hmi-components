import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { copyCss } from './scripts/copy-css-plugin';

const dirname = fileURLToPath(new URL('.', import.meta.url));

/* Drop-in <script> bundle: a single self-contained IIFE with React bundled in
   that auto-registers every <hmi-*> custom element on load. Built alongside the
   main ESM library (emptyOutDir: false) so it sits next to dist/index.js. */
export default defineConfig({
    plugins: [react(), copyCss()],
    resolve: {
        alias: {
            '@': resolve(dirname, 'src'),
        },
    },
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    build: {
        copyPublicDir: false,
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
            entry: resolve(dirname, 'src/web-components.ts'),
            formats: ['iife'],
            name: 'HmiComponents',
            fileName: () => 'hmi-components.iife.js',
            cssFileName: 'hmi-components',
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
        sourcemap: true,
        minify: 'esbuild',
        cssCodeSplit: false,
    },
});
