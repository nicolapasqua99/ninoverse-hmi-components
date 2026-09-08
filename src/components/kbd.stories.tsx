import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './kbd';

const meta = {
    title: 'Components/Data display/Kbd',
    component: Kbd,
    tags: ['autodocs'],
    args: { children: '⌘' },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Kbd {...args} size="small">
                Ctrl
            </Kbd>
            <Kbd {...args}>Ctrl</Kbd>
        </div>
    ),
};

/** Combine caps to spell out a shortcut. */
export const Shortcut: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Kbd {...args}>⌘</Kbd>
            <span>+</span>
            <Kbd {...args}>⇧</Kbd>
            <span>+</span>
            <Kbd {...args}>P</Kbd>
        </div>
    ),
};

export const ArrowKeys: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Kbd {...args}>←</Kbd>
            <Kbd {...args}>↑</Kbd>
            <Kbd {...args}>↓</Kbd>
            <Kbd {...args}>→</Kbd>
        </div>
    ),
};
