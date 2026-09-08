import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { Menu, MenuItem, MenuLabel, MenuSeparator } from './menu';
import { Popover } from './popover';

/* Menu is the content an overlay holds, not an overlay itself — on its own it
   is an empty panel, so every story composes MenuLabel / MenuItem /
   MenuSeparator children. */
const meta = {
    title: 'Components/Overlays/Menu',
    component: Menu,
    tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Items = () => (
    <>
        <MenuLabel>Workspace</MenuLabel>
        <MenuItem shortcut="⌘N">New file</MenuItem>
        <MenuItem shortcut="⌘O">Open…</MenuItem>
        <MenuItem shortcut="⌘S">Save</MenuItem>
        <MenuSeparator />
        <MenuLabel>Danger zone</MenuLabel>
        <MenuItem danger shortcut="⌫">
            Delete file
        </MenuItem>
    </>
);

/** The panel on its own, so the item, label and separator styling is visible without hovering. */
export const Standalone: Story = {
    render: (args) => (
        <div style={{ width: '26rem' }}>
            <Menu {...args}>
                <Items />
            </Menu>
        </div>
    ),
};

/** The usual pairing — a Popover supplies the trigger and positioning. */
export const InPopover: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <Popover
                onOpenChange={setOpen}
                open={open}
                trigger={<Button variant="secondary">Actions ▾</Button>}
                width={260}
            >
                <Menu {...args}>
                    <MenuLabel>Workspace</MenuLabel>
                    <MenuItem onClick={() => setOpen(false)} shortcut="⌘N">
                        New file
                    </MenuItem>
                    <MenuItem onClick={() => setOpen(false)} shortcut="⌘O">
                        Open…
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                        danger
                        onClick={() => setOpen(false)}
                        shortcut="⌫"
                    >
                        Delete file
                    </MenuItem>
                </Menu>
            </Popover>
        );
    },
};
