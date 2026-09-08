import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './alert';
import { Button } from './button';

const meta = {
    title: 'Components/Feedback/Alert',
    component: Alert,
    tags: ['autodocs'],
    args: { children: 'A new theme is available. Reload to pick it up.' },
    render: (args) => (
        <div style={{ maxWidth: '70rem' }}>
            <Alert {...args} />
        </div>
    ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'info', title: 'Heads up' } };

export const Variants: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                maxWidth: '70rem',
            }}
        >
            <Alert {...args} title="Heads up" variant="info">
                A new theme is available. Reload to pick it up.
            </Alert>
            <Alert {...args} title="Saved" variant="success">
                Your changes have been written to the cloud.
            </Alert>
            <Alert {...args} title="Low storage" variant="warning">
                You have 1.2 GB free on this device.
            </Alert>
            <Alert {...args} title="Sync failed" variant="danger">
                Could not reach the server. Will retry in 30 seconds.
            </Alert>
        </div>
    ),
};

/** The `action` slot sits after the message. */
export const WithAction: Story = {
    args: {
        variant: 'warning',
        title: 'Low storage',
        children: 'You have 1.2 GB free on this device.',
        action: (
            <Button size="small" variant="soft">
                Manage
            </Button>
        ),
    },
};

/** `title` is optional — a body-only alert works too. */
export const BodyOnly: Story = {
    args: {
        variant: 'info',
        children: 'Body-only alert with no title — works too.',
    },
};
