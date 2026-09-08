import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

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
    component: Badge,
    tags: ['autodocs'],
    args: { children: 'Badge' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {variants.map((variant) => (
                <Badge {...args} key={variant} variant={variant}>
                    {variant}
                </Badge>
            ))}
        </div>
    ),
};

/** `dot` prefixes a small status dot in the badge's own tone. */
export const WithDot: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {variants.map((variant) => (
                <Badge {...args} dot key={variant} variant={variant}>
                    {variant}
                </Badge>
            ))}
        </div>
    ),
};
