import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner } from './banner';
import { Button } from './button';

const meta = {
    title: 'Components/Feedback/Banner',
    component: Banner,
    tags: ['autodocs'],
    args: {
        children:
            'v0.49 ships Banner and ConfirmDialog. Read the changelog for the full list.',
    },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { variant: 'info', title: 'New release' },
};

export const Variants: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Banner {...args} title="New release" variant="info">
                v0.49 ships Banner and ConfirmDialog.
            </Banner>
            <Banner {...args} title="Backup completed" variant="success">
                Last snapshot finished 3 minutes ago — 1.2 GB synced.
            </Banner>
            <Banner {...args} title="Scheduled maintenance" variant="warning">
                Database upgrades on Saturday, 02:00–04:00 UTC.
            </Banner>
            <Banner
                {...args}
                action={<Button variant="danger">Retry</Button>}
                title="Payment failed"
                variant="danger"
            >
                Your card was declined. Please verify your billing details.
            </Banner>
        </div>
    ),
};

/* Banner owns no visibility state — onDismiss only fires the callback, so the
   story has to remove it and offer a way back, or the canvas stays empty. */
export const Dismissible: Story = {
    render: (args) => {
        const [visible, setVisible] = useState(true);
        return visible ? (
            <Banner
                {...args}
                action={<Button variant="secondary">View status</Button>}
                onDismiss={() => setVisible(false)}
                title="Scheduled maintenance"
                variant="warning"
            >
                We'll be applying database upgrades on Saturday from 02:00 to
                04:00 UTC.
            </Banner>
        ) : (
            <Button onClick={() => setVisible(true)} variant="secondary">
                Show banner again
            </Button>
        );
    },
};
