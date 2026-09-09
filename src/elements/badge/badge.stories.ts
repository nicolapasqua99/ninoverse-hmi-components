import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './badge.js';
import type { HmiBadge } from './badge.js';

type Args = Pick<HmiBadge, 'variant' | 'dot'>;

const variants = [
    'default',
    'primary',
    'success',
    'warning',
    'danger',
    'info',
] as const;

const meta = {
    title: 'Components/Data display/Badge',
    component: 'hmi-badge',
    tags: ['autodocs'],
    args: { variant: 'default', dot: false },
    argTypes: {
        variant: { control: 'select', options: variants },
        dot: { control: 'boolean' },
    },
    render: (args) => html`
        <hmi-badge variant=${args.variant} ?dot=${args.dot}>Badge</hmi-badge>
    `,
    parameters: {
        docs: {
            description: {
                component:
                    'React: `import { Badge } from \'@ninoverse/hmi-components/react/badge\'` — `<Badge variant="success" dot>Online</Badge>`.',
            },
        },
    },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
    render: () => html`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap">
            ${variants.map(
                (variant) =>
                    html`<hmi-badge variant=${variant}>${variant}</hmi-badge>`,
            )}
        </div>
    `,
};

/** `dot` prefixes a small status dot in the badge's own tone. */
export const WithDot: Story = {
    render: () => html`
        <div style="display: flex; gap: 1rem; flex-wrap: wrap">
            ${variants.map(
                (variant) =>
                    html`<hmi-badge variant=${variant} dot>${variant}</hmi-badge>`,
            )}
        </div>
    `,
};
