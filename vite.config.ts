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
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                preserveModules: false,
                entryFileNames: '[name].js',
                assetFileNames: (assetInfo) =>
                    assetInfo.name === 'style.css'
                        ? 'style.css'
                        : 'assets/[name]-[hash][extname]',
            },
        },
        sourcemap: true,
        minify: 'esbuild',
        cssCodeSplit: false,
    },
});
