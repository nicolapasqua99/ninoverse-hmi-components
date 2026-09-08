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

/* TypeDoc's {@link Foo} syntax is meaningful to `pnpm docs`, but Storybook has
   no resolver for it and prints the braces verbatim. Unwrap to the bare symbol
   name for the docs page and leave the source comments alone. */
type Docgen = { __docgenInfo?: { description?: string } };

function unwrapLinks(component: unknown): string | null {
    const raw = (component as Docgen | null)?.__docgenInfo?.description;
    if (!raw) return null;
    return raw.replace(/\{@link\s+([^}|]+?)\s*\}/g, '$1');
}

const preview: Preview = {
    parameters: {
        controls: { matchers: { color: /(background|color)$/i } },
        options: { storySort: { order: ['Overview', 'Components', 'Charts'] } },
        docs: { extractComponentDescription: unwrapLinks },
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
