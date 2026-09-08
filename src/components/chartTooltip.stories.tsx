import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartTooltip } from './chartTooltip';

/* Content only — the chart owns the positioning, so the tooltip renders
   standalone with no wrapper. */
const meta = {
    title: 'Charts/ChartTooltip',
    component: ChartTooltip,
    tags: ['autodocs'],
    args: {
        items: [
            { label: 'Pro', value: '2,480', color: 'var(--primary)' },
            { label: 'Free', value: '1,120', color: 'var(--tertiary)' },
        ],
    },
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'Jan 2026' } };

/** `title` is optional — omit it for a single hovered value. */
export const NoTitle: Story = {
    args: { items: [{ label: 'Sessions', value: 342 }] },
};

export const ManySeries: Story = {
    args: {
        title: 'Traffic sources',
        items: [
            { label: 'Direct', value: '45%', color: 'var(--primary)' },
            { label: 'Search', value: '30%', color: 'var(--tertiary)' },
            { label: 'Social', value: '15%', color: 'var(--secondary)' },
            { label: 'Referral', value: '10%', color: 'var(--success)' },
        ],
    },
};
