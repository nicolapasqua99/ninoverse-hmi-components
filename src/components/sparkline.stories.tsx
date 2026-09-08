import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkline } from './sparkline';

const meta = {
    title: 'Charts/Sparkline',
    component: Sparkline,
    tags: ['autodocs'],
    args: { data: [4, 8, 5, 10, 7, 12, 9, 14] },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sized for inline use — no axes, labels or grid. */
export const Default: Story = {};

/** `area` fills beneath the line; `showDot` marks the latest value. */
export const AreaWithDot: Story = {
    args: {
        data: [14, 9, 11, 6, 8, 4, 5, 2],
        area: true,
        showDot: true,
        color: 'var(--error)',
    },
};

export const Larger: Story = {
    args: { width: 240, height: 64, strokeWidth: 3 },
};

/** A fixed range keeps several sparklines comparable. */
export const FixedRange: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Sparkline
                {...args}
                data={[4, 8, 5, 10, 7, 12, 9, 14]}
                max={20}
                min={0}
            />
            <Sparkline
                {...args}
                data={[14, 9, 11, 6, 8, 4, 5, 2]}
                max={20}
                min={0}
            />
            <Sparkline
                {...args}
                data={[6, 6, 7, 6, 8, 6, 7, 6]}
                max={20}
                min={0}
            />
        </div>
    ),
};
