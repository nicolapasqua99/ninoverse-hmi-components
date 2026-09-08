import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from './barChart';
import { Legend } from './legend';

const meta = {
    title: 'Charts/BarChart',
    component: BarChart,
    tags: ['autodocs'],
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            {
                name: 'Product A',
                data: [42, 55, 48, 63],
                color: 'var(--primary)',
            },
            {
                name: 'Product B',
                data: [30, 38, 44, 40],
                color: 'var(--tertiary)',
            },
        ],
    },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Multiple series are grouped side by side within each category. */
export const Grouped: Story = {};

export const SingleSeries: Story = {
    args: { series: [{ name: 'Revenue', data: [42, 55, 48, 63] }] },
};

/** Charts carry no legend of their own — pair one when series need naming. */
export const WithLegend: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <BarChart {...args} />
            <Legend
                align="start"
                items={[
                    { label: 'Product A', color: 'var(--primary)' },
                    { label: 'Product B', color: 'var(--tertiary)' },
                ]}
            />
        </div>
    ),
};

export const FixedRange: Story = { args: { min: 0, max: 100, yTicks: 5 } };
