import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './meter';

/* low/high/optimum pick the band colour: the closer the value sits to optimum,
   the better it reads. The bands live on each story rather than on meta so
   PlainRatio can omit them — exactOptionalPropertyTypes rejects an explicit
   `undefined` override. */
const DISK = { low: 50, high: 80, max: 100, optimum: 20 };

const meta = {
    title: 'Components/Feedback/Meter',
    component: Meter,
    tags: ['autodocs'],
    args: { showValue: true, value: 35 },
    render: (args) => (
        <div style={{ maxWidth: '50rem' }}>
            <Meter {...args} />
        </div>
    ),
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Optimal: Story = {
    args: { ...DISK, label: 'Disk usage', value: 35 },
};

export const Suboptimal: Story = {
    args: { ...DISK, label: 'Disk usage (suboptimal)', value: 65 },
};

export const Poor: Story = {
    args: { ...DISK, label: 'Disk usage (poor)', value: 92 },
};

/** With `optimum` at the top of the scale, a high value is the good one. */
export const OptimumHigh: Story = {
    args: {
        label: 'Battery',
        low: 20,
        high: 80,
        max: 100,
        optimum: 100,
        value: 90,
    },
};

/** Without `min`/`max` the scale is 0–1. */
export const PlainRatio: Story = {
    args: { label: 'Plain 0–1 ratio', value: 0.6 },
};
