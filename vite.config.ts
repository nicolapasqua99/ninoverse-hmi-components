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
                aspectRatio: resolve(dirname, 'src/components/aspectRatio.tsx'),
                avatar: resolve(dirname, 'src/components/avatar.tsx'),
                avatarStack: resolve(dirname, 'src/components/avatarStack.tsx'),
                badge: resolve(dirname, 'src/components/badge.tsx'),
                banner: resolve(dirname, 'src/components/banner.tsx'),
                box: resolve(dirname, 'src/components/box.tsx'),
                breadcrumbs: resolve(dirname, 'src/components/breadcrumbs.tsx'),
                button: resolve(dirname, 'src/components/button.tsx'),
                card: resolve(dirname, 'src/components/card.tsx'),
                checkbox: resolve(dirname, 'src/components/checkbox.tsx'),
                chip: resolve(dirname, 'src/components/chip.tsx'),
                combobox: resolve(dirname, 'src/components/combobox.tsx'),
                commandPalette: resolve(
                    dirname,
                    'src/components/commandPalette.tsx',
                ),
                confirmDialog: resolve(
                    dirname,
                    'src/components/confirmDialog.tsx',
                ),
                datePicker: resolve(dirname, 'src/components/datePicker.tsx'),
                divider: resolve(dirname, 'src/components/divider.tsx'),
                drawer: resolve(dirname, 'src/components/drawer.tsx'),
                emptyState: resolve(dirname, 'src/components/emptyState.tsx'),
                fileUpload: resolve(dirname, 'src/components/fileUpload.tsx'),
                flex: resolve(dirname, 'src/components/flex.tsx'),
                formControl: resolve(dirname, 'src/components/formControl.tsx'),
                grid: resolve(dirname, 'src/components/grid.tsx'),
                heading: resolve(dirname, 'src/components/heading.tsx'),
                input: resolve(dirname, 'src/components/input.tsx'),
                kbd: resolve(dirname, 'src/components/kbd.tsx'),
                list: resolve(dirname, 'src/components/list.tsx'),
                menu: resolve(dirname, 'src/components/menu.tsx'),
                modal: resolve(dirname, 'src/components/modal.tsx'),
                multiInput: resolve(dirname, 'src/components/multiInput.tsx'),
                navbar: resolve(dirname, 'src/components/navbar.tsx'),
                numberInput: resolve(dirname, 'src/components/numberInput.tsx'),
                pagination: resolve(dirname, 'src/components/pagination.tsx'),
                passwordInput: resolve(
                    dirname,
                    'src/components/passwordInput.tsx',
                ),
                popover: resolve(dirname, 'src/components/popover.tsx'),
                progress: resolve(dirname, 'src/components/progress.tsx'),
                radio: resolve(dirname, 'src/components/radio.tsx'),
                radioGroup: resolve(dirname, 'src/components/radioGroup.tsx'),
                searchInput: resolve(dirname, 'src/components/searchInput.tsx'),
                segmentedControl: resolve(
                    dirname,
                    'src/components/segmentedControl.tsx',
                ),
                select: resolve(dirname, 'src/components/select.tsx'),
                sidebar: resolve(dirname, 'src/components/sidebar.tsx'),
                skeleton: resolve(dirname, 'src/components/skeleton.tsx'),
                slider: resolve(dirname, 'src/components/slider.tsx'),
                spacer: resolve(dirname, 'src/components/spacer.tsx'),
                spinner: resolve(dirname, 'src/components/spinner.tsx'),
                stepper: resolve(dirname, 'src/components/stepper.tsx'),
                switch: resolve(dirname, 'src/components/switch.tsx'),
                table: resolve(dirname, 'src/components/table.tsx'),
                tabs: resolve(dirname, 'src/components/tabs.tsx'),
                text: resolve(dirname, 'src/components/text.tsx'),
                textarea: resolve(dirname, 'src/components/textarea.tsx'),
                toast: resolve(dirname, 'src/components/toast.tsx'),
                tooltip: resolve(dirname, 'src/components/tooltip.tsx'),
                valueScaleSelector: resolve(
                    dirname,
                    'src/components/valueScaleSelector.tsx',
                ),
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
