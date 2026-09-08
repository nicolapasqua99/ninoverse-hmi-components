import type { Meta, StoryObj } from '@storybook/react-vite';
import { AreaChart } from './areaChart';
import { Legend } from './legend';

const meta = {
    title: 'Charts/AreaChart',
    component: AreaChart,
    tags: ['autodocs'],
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                name: 'Pro',
                data: [20, 28, 26, 35, 40, 52],
                color: 'var(--primary)',
            },
            {
                name: 'Free',
                data: [12, 15, 18, 16, 22, 25],
                color: 'var(--tertiary)',
            },
        ],
    },
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Series are overlaid, each filled beneath its own line. */
export const Default: Story = {};

export const SingleSeries: Story = {
    args: { series: [{ name: 'Signups', data: [20, 28, 26, 35, 40, 52] }] },
};

export const WithLegend: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AreaChart {...args} />
            <Legend
                align="start"
                items={[
                    { label: 'Pro', color: 'var(--primary)' },
                    { label: 'Free', color: 'var(--tertiary)' },
                ]}
            />
        </div>
    ),
};

export const Larger: Story = { args: { width: 720, height: 320, yTicks: 6 } };
