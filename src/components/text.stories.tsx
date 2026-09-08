import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './text';

const meta = {
    title: 'Components/Typography/Text',
    component: Text,
    tags: ['autodocs'],
    args: { children: 'The quick brown fox jumps over the lazy dog.' },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <Text {...args} size="xlarge" weight="bold">
                Extra-large bold body text
            </Text>
            <Text {...args} size="large" weight="semibold">
                Large semibold body text
            </Text>
            <Text {...args}>Default medium regular body text</Text>
            <Text {...args} size="small">
                Small body text
            </Text>
            <Text {...args} size="xsmall">
                Extra-small caption text
            </Text>
        </div>
    ),
};

export const Tones: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <Text {...args}>Default tone</Text>
            <Text {...args} size="small" tone="muted">
                Small muted helper text
            </Text>
            <Text {...args} tone="primary" weight="medium">
                Primary tone
            </Text>
            <Text {...args} tone="error">
                Error-tone message text
            </Text>
        </div>
    ),
};

export const Alignment: Story = {
    args: { align: 'center', children: 'Center-aligned text' },
};

export const Truncated: Story = {
    args: {
        truncate: true,
        style: { maxWidth: '32rem' },
        children:
            'Truncated single line that is far too long to fit within the constrained width and should end with an ellipsis',
    },
};
