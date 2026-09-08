import type { Meta, StoryObj } from '@storybook/react-vite';
import { Legend } from './legend';
import { RadarChart } from './radarChart';

/* A radar needs at least three axes to enclose an area — fewer renders nothing. */
const meta = {
    title: 'Charts/RadarChart',
    component: RadarChart,
    tags: ['autodocs'],
    args: {
        'aria-label': 'Skill assessment by candidate',
        size: 340,
        axes: ['Speed', 'Power', 'Range', 'Defense', 'Control', 'Stamina'],
        series: [
            {
                name: 'Alpha',
                data: [80, 65, 70, 55, 90, 60],
                color: 'var(--primary)',
            },
            {
                name: 'Beta',
                data: [55, 80, 45, 75, 60, 85],
                color: 'var(--tertiary)',
            },
        ],
    },
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSeries: Story = {
    args: { series: [{ name: 'Alpha', data: [80, 65, 70, 55, 90, 60] }] },
};

/** Three axes is the minimum that still encloses an area. */
export const ThreeAxes: Story = {
    args: {
        axes: ['Cost', 'Speed', 'Quality'],
        series: [{ name: 'Current', data: [70, 45, 88] }],
        size: 260,
    },
};

export const WithLegend: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <RadarChart {...args} />
            <Legend
                align="start"
                items={[
                    { label: 'Alpha', color: 'var(--primary)' },
                    { label: 'Beta', color: 'var(--tertiary)' },
                ]}
            />
        </div>
    ),
};
