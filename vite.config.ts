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
                button: resolve(dirname, 'src/components/button.tsx'),
                checkbox: resolve(dirname, 'src/components/checkbox.tsx'),
                field: resolve(dirname, 'src/components/field.tsx'),
                input: resolve(dirname, 'src/components/input.tsx'),
                radio: resolve(dirname, 'src/components/radio.tsx'),
                radioGroup: resolve(dirname, 'src/components/radioGroup.tsx'),
                textarea: resolve(dirname, 'src/components/textarea.tsx'),
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
