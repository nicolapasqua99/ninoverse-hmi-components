import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './heading';

const meta = {
    title: 'Components/Typography/Heading',
    component: Heading,
    tags: ['autodocs'],
    args: { children: 'Dashboard overview' },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <Heading {...args} level={1}>
                Heading level 1 (xlarge)
            </Heading>
            <Heading {...args} level={2}>
                Heading level 2 (large)
            </Heading>
            <Heading {...args} level={3}>
                Heading level 3 (medium)
            </Heading>
            <Heading {...args} level={4}>
                Heading level 4 (small)
            </Heading>
            <Heading {...args} level={6}>
                Heading level 6 (xsmall)
            </Heading>
        </div>
    ),
};

/** `size` decouples appearance from the semantic level. */
export const SizeOverride: Story = {
    args: { level: 2, size: 'medium', children: 'Level 2 styled as medium' },
};

export const Tones: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <Heading {...args} level={3}>
                Default tone
            </Heading>
            <Heading {...args} level={3} tone="primary">
                Primary tone
            </Heading>
            <Heading {...args} level={3} tone="muted">
                Muted tone
            </Heading>
        </div>
    ),
};
