import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-docs'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: [resolve(dirname, '../public')],
    // The root vite.config.ts is the library build (dts emit + 86 lib entries).
    // Storybook merges it by default, so drop the parts that don't belong here.
    viteFinal: async (viteConfig) => ({
        ...viteConfig,
        plugins: (viteConfig.plugins ?? []).filter(
            (plugin) =>
                !(
                    plugin &&
                    typeof plugin === 'object' &&
                    'name' in plugin &&
                    (plugin.name === 'vite:dts' ||
                        plugin.name === 'copy-theme-css')
                ),
        ),
    }),
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            tsconfigPath: resolve(dirname, '../tsconfig.app.json'),
            shouldExtractLiteralValuesFromEnum: true,
            // Native DOM props come from @types/react — keep tables to our own props.
            propFilter: (prop) =>
                !prop.parent || !/node_modules/.test(prop.parent.fileName),
        },
    },
};

export default config;
