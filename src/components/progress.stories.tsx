import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './progress';

const meta = {
    title: 'Components/Feedback/Progress',
    component: Progress,
    tags: ['autodocs'],
    render: (args) => (
        <div style={{ maxWidth: '50rem' }}>
            <Progress {...args} />
        </div>
    ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 35, label: 'Uploading' } };

export const Values: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                maxWidth: '50rem',
            }}
        >
            <Progress {...args} label="0%" value={0} />
            <Progress {...args} label="35%" value={35} />
            <Progress {...args} label="80%" value={80} />
            <Progress {...args} label="100%" value={100} />
        </div>
    ),
};

/** `indeterminate` loops for unknown duration and ignores `value` entirely. */
export const Indeterminate: Story = {
    args: { indeterminate: true, label: 'Syncing' },
};
