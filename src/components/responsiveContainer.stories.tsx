import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart } from './lineChart';
import { ResponsiveContainer } from './responsiveContainer';

/* `children` is a required render prop, so it cannot come from args — the
   stories are typed against the component to keep args partial.

   The container measures its parent and renders nothing until width > 0, so
   each story gives it a block parent with a resolvable width. The demo page
   prints the measured size, which says nothing at a fixed canvas; feeding a
   real chart shows what the measurement is actually for. */
const meta = {
    title: 'Charts/ResponsiveContainer',
    component: ResponsiveContainer,
    tags: ['autodocs'],
} satisfies Meta<typeof ResponsiveContainer>;

export default meta;
type Story = StoryObj<typeof ResponsiveContainer>;

const series = [{ name: 'Sessions', data: [12, 18, 15, 24, 30, 27, 33] }];
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** `height` fixes the height and derives the width from the parent. */
export const FixedHeight: Story = {
    render: (args) => (
        <div style={{ maxWidth: '70rem' }}>
            <ResponsiveContainer {...args} height={260}>
                {({ width, height }) => (
                    <LineChart
                        height={height}
                        labels={labels}
                        series={series}
                        width={width}
                    />
                )}
            </ResponsiveContainer>
        </div>
    ),
};

/** `aspect` derives the height from the measured width instead. */
export const AspectRatio: Story = {
    render: (args) => (
        <div style={{ maxWidth: '55rem' }}>
            <ResponsiveContainer {...args} aspect={16 / 9}>
                {({ width, height }) => (
                    <LineChart
                        height={height}
                        labels={labels}
                        series={series}
                        width={width}
                    />
                )}
            </ResponsiveContainer>
        </div>
    ),
};

/** A narrower parent yields a narrower chart from the same markup. */
export const NarrowParent: Story = {
    render: (args) => (
        <div style={{ maxWidth: '30rem' }}>
            <ResponsiveContainer {...args} height={200}>
                {({ width, height }) => (
                    <LineChart
                        height={height}
                        labels={labels}
                        series={series}
                        width={width}
                    />
                )}
            </ResponsiveContainer>
        </div>
    ),
};
