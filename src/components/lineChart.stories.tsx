import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart } from './lineChart';

const meta = {
    title: 'Charts/LineChart',
    component: LineChart,
    tags: ['autodocs'],
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
            { name: 'Throughput', data: [12, 18, 15, 24, 30, 27, 33] },
            { name: 'Errors', data: [4, 6, 3, 9, 5, 7, 2] },
        ],
    },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDots: Story = { args: { showDots: true, yTicks: 6 } };
