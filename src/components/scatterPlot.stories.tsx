import type { Meta, StoryObj } from '@storybook/react-vite';
import { Legend } from './legend';
import { ScatterPlot } from './scatterPlot';

const meta = {
    title: 'Charts/ScatterPlot',
    component: ScatterPlot,
    tags: ['autodocs'],
    args: {
        series: [
            {
                name: 'Group A',
                color: 'var(--primary)',
                data: [
                    { x: 12, y: 22 },
                    { x: 20, y: 35 },
                    { x: 28, y: 30 },
                    { x: 35, y: 48 },
                    { x: 42, y: 44 },
                    { x: 50, y: 60 },
                ],
            },
            {
                name: 'Group B',
                color: 'var(--tertiary)',
                data: [
                    { x: 15, y: 12 },
                    { x: 24, y: 18 },
                    { x: 30, y: 16 },
                    { x: 38, y: 26 },
                    { x: 46, y: 22 },
                    { x: 55, y: 33 },
                ],
            },
        ],
    },
} satisfies Meta<typeof ScatterPlot>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Both axes default to the data extent. */
export const Default: Story = {};

export const FixedRange: Story = {
    args: { xMin: 0, xMax: 60, yMin: 0, yMax: 70 },
};

export const WithLegend: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ScatterPlot {...args} />
            <Legend
                align="start"
                items={[
                    { label: 'Group A', color: 'var(--primary)' },
                    { label: 'Group B', color: 'var(--tertiary)' },
                ]}
            />
        </div>
    ),
};
