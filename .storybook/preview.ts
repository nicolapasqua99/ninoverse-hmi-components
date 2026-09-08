import type { Preview } from '@storybook/react-vite';
import { colorThemes, materials, structures } from '../src/configs/themes';
import '../src/globals.css';

/* The library themes off three independent <html> attributes (see src/theme.tsx).
   addon-themes only tracks one axis, so drive all three from our own globals. */
const AXES = [
    { global: 'theme', attribute: 'data-theme', values: colorThemes },
    { global: 'structure', attribute: 'data-structure', values: structures },
    { global: 'material', attribute: 'data-material', values: materials },
] as const;

const preview: Preview = {
    parameters: {
        controls: { matchers: { color: /(background|color)$/i } },
        options: { storySort: { order: ['Overview', 'Components', 'Charts'] } },
    },
    globalTypes: Object.fromEntries(
        AXES.map(({ global, values }) => [
            global,
            {
                description: `Active ${global}`,
                toolbar: {
                    title: global,
                    items: values as unknown as string[],
                    dynamicTitle: true,
                },
            },
        ]),
    ),
    initialGlobals: {
        theme: 'default',
        structure: 'default',
        material: 'solid',
    },
    decorators: [
        (Story, context) => {
            for (const { global, attribute } of AXES) {
                const value = context.globals[global];
                if (value)
                    document.documentElement.setAttribute(attribute, value);
            }
            return Story();
        },
    ],
};

export default preview;
