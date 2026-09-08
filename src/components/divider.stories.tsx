import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './divider';

const meta = {
    title: 'Components/Layout/Divider',
    component: Divider,
    tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

export const Labelled: Story = {
    args: { children: 'OR' },
};

/** `align` only applies to a labelled horizontal divider. */
export const LabelAlignment: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Divider {...args} align="start">
                Recent
            </Divider>
            <Divider {...args}>Centred</Divider>
            <Divider {...args} align="end">
                2 of 4
            </Divider>
        </div>
    ),
};

/* A vertical divider stretches to its flex parent, so it needs a row with
   height to separate anything. */
export const Vertical: Story = {
    args: { orientation: 'vertical' },
    render: (args) => (
        <div
            style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                height: '4rem',
            }}
        >
            <span style={{ fontSize: '1.625rem' }}>Left</span>
            <Divider {...args} />
            <span style={{ fontSize: '1.625rem' }}>Middle</span>
            <Divider {...args} />
            <span style={{ fontSize: '1.625rem' }}>Right</span>
        </div>
    ),
};
