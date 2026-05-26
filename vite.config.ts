import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: './tsconfig.app.json',
            include: ['src'],
            exclude: ['src/App.tsx', 'src/main.tsx'],
            entryRoot: 'src',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(dirname, 'src'),
        },
    },
    build: {
        copyPublicDir: false,
        lib: {
            entry: {
                index: resolve(dirname, 'src/index.ts'),
                accordion: resolve(dirname, 'src/components/accordion.tsx'),
                alert: resolve(dirname, 'src/components/alert.tsx'),
                badge: resolve(dirname, 'src/components/badge.tsx'),
                breadcrumbs: resolve(dirname, 'src/components/breadcrumbs.tsx'),
                button: resolve(dirname, 'src/components/button.tsx'),
                card: resolve(dirname, 'src/components/card.tsx'),
                checkbox: resolve(dirname, 'src/components/checkbox.tsx'),
                chip: resolve(dirname, 'src/components/chip.tsx'),
                field: resolve(dirname, 'src/components/field.tsx'),
                input: resolve(dirname, 'src/components/input.tsx'),
                menu: resolve(dirname, 'src/components/menu.tsx'),
                modal: resolve(dirname, 'src/components/modal.tsx'),
                passwordInput: resolve(
                    dirname,
                    'src/components/passwordInput.tsx',
                ),
                popover: resolve(dirname, 'src/components/popover.tsx'),
                progress: resolve(dirname, 'src/components/progress.tsx'),
                radio: resolve(dirname, 'src/components/radio.tsx'),
                radioGroup: resolve(dirname, 'src/components/radioGroup.tsx'),
                searchInput: resolve(dirname, 'src/components/searchInput.tsx'),
                select: resolve(dirname, 'src/components/select.tsx'),
                spinner: resolve(dirname, 'src/components/spinner.tsx'),
                switch: resolve(dirname, 'src/components/switch.tsx'),
                tabs: resolve(dirname, 'src/components/tabs.tsx'),
                textarea: resolve(dirname, 'src/components/textarea.tsx'),
                toast: resolve(dirname, 'src/components/toast.tsx'),
                tooltip: resolve(dirname, 'src/components/tooltip.tsx'),
            },
            formats: ['es'],
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                preserveModules: false,
                entryFileNames: '[name].js',
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.names?.[0] ?? '';
                    return name.endsWith('.css')
                        ? '[name][extname]'
                        : 'assets/[name]-[hash][extname]';
                },
            },
        },
        sourcemap: true,
        minify: 'esbuild',
        cssCodeSplit: false,
    },
});
