import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { ToastHost, toast } from './toast';

/* Toast has no rendered subject: the `toast` object pushes onto a module-level
   queue and <ToastHost /> portals the result. Every story mounts the host and
   drives it from buttons.

   The queue is module-global, so toasts raised here outlive a move to another
   story — durations are kept short for that reason. */
const meta = {
    title: 'Components/Feedback/Toast',
    component: ToastHost,
    tags: ['autodocs'],
} satisfies Meta<typeof ToastHost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
    render: () => (
        <>
            <ToastHost />
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <Button
                    onClick={() =>
                        toast.info(
                            'New version available',
                            'Reload to pick up the latest build.',
                        )
                    }
                    variant="soft"
                >
                    Info
                </Button>
                <Button
                    onClick={() =>
                        toast.success('Saved', 'Changes synced to the cloud.')
                    }
                    variant="primary"
                >
                    Success
                </Button>
                <Button
                    onClick={() =>
                        toast.warning(
                            'Low storage',
                            '1.2 GB free on this device.',
                        )
                    }
                    variant="secondary"
                >
                    Warning
                </Button>
                <Button
                    onClick={() =>
                        toast.danger(
                            'Upload failed',
                            'Could not reach the server.',
                        )
                    }
                    variant="danger"
                >
                    Danger
                </Button>
            </div>
        </>
    ),
};

/** `duration: 0` disables auto-dismiss — the toast's own close button clears it. */
export const Sticky: Story = {
    render: () => (
        <>
            <ToastHost />
            <Button
                onClick={() =>
                    toast.info('Sticky toast', 'Stays until dismissed.', {
                        duration: 0,
                    })
                }
                variant="ghost"
            >
                Show sticky toast
            </Button>
        </>
    ),
};

/** `duration` is in milliseconds and defaults to 4000. */
export const ShortDuration: Story = {
    render: () => (
        <>
            <ToastHost />
            <Button
                onClick={() =>
                    toast.success('Gone in a flash', undefined, {
                        duration: 1500,
                    })
                }
                variant="primary"
            >
                Show 1.5s toast
            </Button>
        </>
    ),
};
