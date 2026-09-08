import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { Drawer } from './drawer';

/* Like Modal: no trigger, returns null while closed, so each story owns a
   Button and the open state. */
const meta = {
    title: 'Components/Overlays/Drawer',
    component: Drawer,
    tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (Drawer needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open right</Button>
                <Drawer
                    {...args}
                    actions={
                        <>
                            <Button
                                onClick={() => setOpen(false)}
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setOpen(false)}>
                                Apply
                            </Button>
                        </>
                    }
                    description="Tune the result set on the fly."
                    onClose={() => setOpen(false)}
                    open={open}
                    side="right"
                    title="Filters"
                >
                    <p
                        style={{
                            margin: 0,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Right-side drawer — Escape or a scrim click closes it.
                    </p>
                </Drawer>
            </>
        );
    },
};

export const Left: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)} variant="secondary">
                    Open left
                </Button>
                <Drawer
                    {...args}
                    description="Sample left drawer for navigation context."
                    onClose={() => setOpen(false)}
                    open={open}
                    side="left"
                    title="Workspace"
                >
                    <p
                        style={{
                            margin: 0,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Slides in from the left edge.
                    </p>
                </Drawer>
            </>
        );
    },
};

/** For `top`/`bottom`, `size` is the panel height rather than its width. */
export const Bottom: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)} variant="soft">
                    Open bottom
                </Button>
                <Drawer
                    {...args}
                    onClose={() => setOpen(false)}
                    open={open}
                    side="bottom"
                    size="32rem"
                    title="Quick actions"
                >
                    <p
                        style={{
                            margin: 0,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Bottom sheet — `size` sets the height on this axis.
                    </p>
                </Drawer>
            </>
        );
    },
};
