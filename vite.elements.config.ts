import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const dirname = fileURLToPath(new URL('.', import.meta.url));

/* Drop-in <script> bundle of the Lit elements: one self-contained IIFE (Lit
   bundled) that registers every migrated <hmi-*> element on load. Written
   next to the ESM library (emptyOutDir: false). Never load it on the same
   page as the r2wc bundle hmi-components.iife.js — both define the same tags. */
export default defineConfig({
    // Standard decorators with `accessor` (the Lit elements) must be lowered by
    // esbuild before Rollup parses the output: at the default `esnext` target
    // esbuild passes them through and Rollup rejects the syntax.
    esbuild: { target: 'es2022' },
    build: {
        copyPublicDir: false,
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
            entry: resolve(dirname, 'src/elements/index.ts'),
            formats: ['iife'],
            name: 'HmiElements',
            fileName: () => 'hmi-elements.iife.js',
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
        sourcemap: true,
        minify: 'esbuild',
    },
});
