import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { Popover } from './popover';

/* Popover is fully controlled: `open` + `onOpenChange` are required, and the
   trigger is a prop rather than children. Every story owns the state and keeps
   the trigger in the canvas — the panel itself portals to document.body. */
const meta = {
    title: 'Components/Overlays/Popover',
    component: Popover,
    tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (Popover needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof Popover>;

const Body = ({ title, children }: { title: string; children: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <strong>{title}</strong>
        <span style={{ color: 'var(--on-surface-variant)' }}>{children}</span>
    </div>
);

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <Popover
                {...args}
                onOpenChange={setOpen}
                open={open}
                trigger={<Button variant="secondary">Open</Button>}
            >
                <Body title="Start aligned">
                    Anchored to the trigger's left edge. Click outside or press
                    Escape to dismiss.
                </Body>
            </Popover>
        );
    },
};

/** `align="end"` anchors to the trigger's right edge; `width` fixes the panel width. */
export const EndAlignedFixedWidth: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <Popover
                {...args}
                align="end"
                onOpenChange={setOpen}
                open={open}
                trigger={<Button variant="secondary">Open (end)</Button>}
                width={320}
            >
                <Body title="End aligned">
                    Anchored to the trigger's right edge, with a fixed width.
                </Body>
            </Popover>
        );
    },
};
