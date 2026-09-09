/* @custom-elements-manifest/analyzer — `pnpm cem`. Reads the element classes
   only; styles, wrappers, stories, tests and the shared helpers carry no
   custom element declarations. Output: ./custom-elements.json (committed). */
export default {
    globs: ['src/elements/**/*.ts'],
    exclude: [
        '**/*.styles.ts',
        '**/*.react.ts',
        '**/*.stories.ts',
        '**/*.test.ts',
        'src/elements/shared/**',
        'src/elements/index.ts',
    ],
    outdir: '.',
    litelement: true,
    packagejson: false,
};
