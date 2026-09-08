import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heatmap } from './heatmap';

const meta = {
    title: 'Charts/Heatmap',
    component: Heatmap,
    tags: ['autodocs'],
    args: {
        xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        yLabels: ['Morning', 'Midday', 'Evening'],
        data: [
            [4, 8, 6, 12, 9],
            [14, 18, 22, 20, 16],
            [7, 11, 9, 15, 24],
        ],
    },
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Intensity maps to the cell colour's opacity across the data range. */
export const Default: Story = {};

export const WithValues: Story = { args: { showValues: true } };

/** A fixed `min`/`max` keeps the scale stable across separate heatmaps. */
export const FixedScale: Story = {
    args: { showValues: true, min: 0, max: 30 },
};

export const LargeCells: Story = {
    args: { cellSize: 64, gap: 6, showValues: true },
};
