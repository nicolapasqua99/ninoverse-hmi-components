import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './timeline';

const meta = {
    title: 'Components/Data display/Timeline',
    component: Timeline,
    tags: ['autodocs'],
    args: {
        items: [
            {
                title: 'Deploy succeeded',
                description: 'v5.6.0 is live on production.',
                time: '09:24',
                color: 'success',
            },
            {
                title: 'Build finished',
                description: 'All checks passed in 2m 14s.',
                time: '09:21',
                color: 'primary',
            },
            {
                title: 'Slow test detected',
                description: 'table.spec took 8.2s.',
                time: '09:19',
                color: 'warning',
            },
            {
                title: 'Lint failed',
                description: 'Two formatting errors, since fixed.',
                time: '09:12',
                color: 'error',
            },
            { title: 'Pipeline queued', time: '09:10' },
        ],
    },
    render: (args) => (
        <div style={{ maxWidth: '55rem' }}>
            <Timeline {...args} />
        </div>
    ),
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `color` tints each marker; omitting it gives the default tone. */
export const Default: Story = {};

/** `description` and `time` are both optional — titles alone read as a plain log. */
export const TitlesOnly: Story = {
    args: {
        items: [
            { title: 'Created' },
            { title: 'In review' },
            { title: 'Merged', color: 'success' },
        ],
    },
};
