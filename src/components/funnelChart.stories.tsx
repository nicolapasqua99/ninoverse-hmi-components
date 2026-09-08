import type { Meta, StoryObj } from '@storybook/react-vite';
import { FunnelChart } from './funnelChart';

const meta = {
    title: 'Charts/FunnelChart',
    component: FunnelChart,
    tags: ['autodocs'],
    args: {
        stages: [
            { label: 'Visited', value: 1200 },
            { label: 'Signed up', value: 820 },
            { label: 'Activated', value: 540 },
            { label: 'Subscribed', value: 210 },
        ],
    },
} satisfies Meta<typeof FunnelChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Band widths are relative to the first (widest) stage. */
export const Default: Story = {};

/** `showValues` appends each stage's value and its share of the first stage. */
export const WithValues: Story = { args: { showValues: true } };

export const Compact: Story = {
    args: { width: 380, height: 220, labelWidth: 120 },
};
