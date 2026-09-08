import type { Meta, StoryObj } from '@storybook/react-vite';
import { BulletChart } from './bulletChart';

const meta = {
    title: 'Charts/BulletChart',
    component: BulletChart,
    tags: ['autodocs'],
    args: { value: 78, target: 85, ranges: [50, 75], label: 'Revenue' },
} satisfies Meta<typeof BulletChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `ranges` are ascending thresholds shading the track behind the measure bar. */
export const Default: Story = {};

export const Comparison: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <BulletChart
                {...args}
                label="Revenue"
                ranges={[50, 75]}
                target={85}
                value={78}
            />
            <BulletChart
                {...args}
                color="var(--success)"
                label="Retention"
                ranges={[40, 70]}
                target={55}
                value={62}
            />
            <BulletChart
                {...args}
                color="var(--error)"
                label="Latency"
                ranges={[60, 80]}
                target={70}
                value={92}
            />
        </div>
    ),
};

/** Without `ranges` the track is a plain scale. */
export const NoRanges: Story = { args: { ranges: [], max: 100 } };
