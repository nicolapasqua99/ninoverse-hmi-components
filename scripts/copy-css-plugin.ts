import { cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));

/* Ships the hand-written global CSS next to the built library:
   public/css/themes/** → dist/themes/** and public/css/base.css → dist/base.css.
   Shared by the ESM and the r2wc IIFE builds (both write into dist/). */
export function copyCss(): Plugin {
    return {
        name: 'copy-css',
        closeBundle() {
            mkdirSync(resolve(root, 'dist'), { recursive: true });
            cpSync(
                resolve(root, 'public/css/themes'),
                resolve(root, 'dist/themes'),
                { recursive: true },
            );
            cpSync(
                resolve(root, 'public/css/base.css'),
                resolve(root, 'dist/base.css'),
            );
        },
    };
}
