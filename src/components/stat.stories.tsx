import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './stat';

const meta = {
    title: 'Components/Feedback/Stat',
    component: Stat,
    tags: ['autodocs'],
    args: { label: 'Revenue', value: '$48.2k' },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `label` and `value` alone are enough. */
export const Default: Story = { args: { label: 'Open tickets', value: '37' } };

/** `delta` needs `trend` — the arrow and its colour come from the trend. */
export const Trends: Story = {
    render: (args) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(24rem, 1fr))',
                gap: '2rem',
            }}
        >
            <Stat
                {...args}
                delta="12.5%"
                helpText="vs last month"
                label="Revenue"
                trend="up"
                value="$48.2k"
            />
            <Stat
                {...args}
                delta="0.8%"
                helpText="vs last month"
                label="Churn"
                trend="down"
                value="2.4%"
            />
            <Stat
                {...args}
                delta="0.0%"
                helpText="flat week over week"
                label="Active users"
                trend="neutral"
                value="1,284"
            />
        </div>
    ),
};

export const WithHelpText: Story = {
    args: { delta: '12.5%', helpText: 'vs last month', trend: 'up' },
};
