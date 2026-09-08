import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { ConfirmDialog } from './confirmDialog';

/* ConfirmDialog installs a document-level Enter listener while open, so two
   open at once would both fire on one keypress. Every story stays closed by
   default, which matters here because the autodocs page mounts them all. */
const meta = {
    title: 'Components/Overlays/ConfirmDialog',
    component: ConfirmDialog,
    tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (ConfirmDialog needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [result, setResult] = useState('none');
        return (
            <>
                <Button onClick={() => setOpen(true)} variant="secondary">
                    Leave without saving
                </Button>
                <p style={{ color: 'var(--on-surface-variant)' }}>
                    Last result: {result}
                </p>
                <ConfirmDialog
                    {...args}
                    confirmLabel="Leave"
                    description="Your unsaved changes will be discarded."
                    onCancel={() => {
                        setOpen(false);
                        setResult('Leave cancelled');
                    }}
                    onConfirm={() => {
                        setOpen(false);
                        setResult('Left without saving');
                    }}
                    open={open}
                    title="Leave without saving?"
                />
            </>
        );
    },
};

/** `variant="danger"` styles the confirm button as destructive. */
export const Danger: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)} variant="danger">
                    Delete project
                </Button>
                <ConfirmDialog
                    {...args}
                    confirmLabel="Delete project"
                    description="This will permanently remove the project, its files, and 14 collaborator invitations. This action cannot be undone."
                    onCancel={() => setOpen(false)}
                    onConfirm={() => setOpen(false)}
                    open={open}
                    title="Delete project?"
                    variant="danger"
                />
            </>
        );
    },
};

/** `loading` disables both buttons while the action is in flight. */
export const Loading: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        // Clear the pending timer if the story unmounts mid-flight.
        const timer = useRef<number | undefined>(undefined);
        useEffect(() => () => window.clearTimeout(timer.current), []);
        return (
            <>
                <Button onClick={() => setOpen(true)} variant="danger">
                    Delete with progress
                </Button>
                <ConfirmDialog
                    {...args}
                    confirmLabel={loading ? 'Deleting…' : 'Delete project'}
                    description="The confirm button stays disabled until the request settles."
                    loading={loading}
                    onCancel={() => setOpen(false)}
                    onConfirm={() => {
                        setLoading(true);
                        timer.current = window.setTimeout(() => {
                            setLoading(false);
                            setOpen(false);
                        }, 900);
                    }}
                    open={open}
                    title="Delete project?"
                    variant="danger"
                />
            </>
        );
    },
};
