import type { Meta, StoryObj } from '@storybook/react-vite';
import { DonutChart } from './donutChart';
import { Legend } from './legend';

const segments = [
    { label: 'Direct', value: 45 },
    { label: 'Search', value: 30 },
    { label: 'Social', value: 15 },
    { label: 'Referral', value: 10 },
];

/* The chart renders null when the segment total is 0, so every story supplies
   values — an empty-data story would read as a broken canvas. */
const meta = {
    title: 'Charts/DonutChart',
    component: DonutChart,
    tags: ['autodocs'],
    args: { segments },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `centerLabel` fills the hole — typically a total or headline figure. */
export const WithCenterLabel: Story = {
    args: {
        centerLabel: (
            <div style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '2.5rem' }}>100</strong>
                <div style={{ color: 'var(--on-surface-variant)' }}>
                    sessions
                </div>
            </div>
        ),
    },
};

/** `thickness` is a fraction of the radius; a low value reads as a ring. */
export const Thin: Story = { args: { thickness: 0.15, size: 260 } };

export const WithLegend: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '26rem',
            }}
        >
            <DonutChart {...args} />
            <Legend
                items={[
                    { label: 'Direct', color: 'var(--primary)' },
                    { label: 'Search', color: 'var(--tertiary)' },
                    { label: 'Social', color: 'var(--secondary)' },
                    { label: 'Referral', color: 'var(--success)' },
                ]}
            />
        </div>
    ),
};
