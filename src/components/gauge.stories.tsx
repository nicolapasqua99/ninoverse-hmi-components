import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gauge } from './gauge';

const meta = {
    title: 'Charts/Gauge',
    component: Gauge,
    tags: ['autodocs'],
    args: { value: 72 },
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `label` defaults to the value; pass a node to format or annotate it. */
export const Default: Story = { args: { label: '72%' } };

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end' }}>
            <Gauge {...args} size={140} />
            <Gauge {...args} />
            <Gauge {...args} size={260} />
        </div>
    ),
};

/** `thickness` is a fraction of the radius. */
export const Thick: Story = { args: { value: 88, thickness: 0.34, size: 200 } };

export const CustomRange: Story = {
    args: {
        value: 6.4,
        min: 0,
        max: 10,
        label: '6.4 / 10',
        color: 'var(--success)',
    },
};
