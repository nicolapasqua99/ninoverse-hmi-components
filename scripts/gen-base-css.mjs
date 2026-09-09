/* Regenerates the pre-upgrade block of public/css/base.css from
   custom-elements.json: every declared tag gets a `:not(:defined)` rule so
   server-rendered or not-yet-upgraded markup does not flash unstyled.
   Run through `pnpm cem` (after `cem analyze`). Idempotent. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const manifestPath = resolve(root, 'custom-elements.json');
const cssPath = resolve(root, 'public/css/base.css');

const START = '/* @generated not-defined start */';
const END = '/* @generated not-defined end */';

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const tags = new Set();
for (const module of manifest.modules ?? []) {
    for (const declaration of module.declarations ?? []) {
        if (declaration.customElement && declaration.tagName) {
            tags.add(declaration.tagName);
        }
    }
}

const sorted = [...tags].sort();
const body =
    sorted.length === 0
        ? '/* no elements declared yet */'
        : `${sorted.map((tag) => `${tag}:not(:defined)`).join(',\n')} {\n    visibility: hidden;\n}`;

const css = readFileSync(cssPath, 'utf8');
const start = css.indexOf(START);
const end = css.indexOf(END);
if (start === -1 || end === -1 || end < start) {
    throw new Error(`${cssPath}: missing the generated block markers`);
}

const next = `${css.slice(0, start + START.length)}\n${body}\n${css.slice(end)}`;
if (next !== css) {
    writeFileSync(cssPath, next);
    console.log(`base.css: ${sorted.length} :not(:defined) rule(s) written`);
}
