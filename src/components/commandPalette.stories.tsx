import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { CommandPalette, type CommandPaletteCommand } from './commandPalette';

/* No trigger of its own, and a 310 ms exit animation keeps it mounted briefly
   after `open` flips false. Each story owns the open state and a Button. */
const meta = {
    title: 'Components/Overlays/CommandPalette',
    component: CommandPalette,
    tags: ['autodocs'],
} satisfies Meta<typeof CommandPalette>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (CommandPalette needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof CommandPalette>;

const commands: CommandPaletteCommand[] = [
    {
        id: 'new-doc',
        label: 'New document',
        description: 'Start a blank page',
        group: 'Create',
        keywords: ['create', 'blank'],
    },
    {
        id: 'new-folder',
        label: 'New folder',
        group: 'Create',
        keywords: ['directory'],
    },
    {
        id: 'open-recent',
        label: 'Open recent',
        description: 'Browse the last 20 files',
        group: 'Navigation',
    },
    {
        id: 'go-settings',
        label: 'Go to settings',
        group: 'Navigation',
        shortcut: '⌘,',
    },
    { id: 'export-pdf', label: 'Export as PDF', group: 'Share' },
];

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [chosen, setChosen] = useState('none');
        return (
            <>
                <Button onClick={() => setOpen(true)}>
                    Open command palette
                </Button>
                <p style={{ color: 'var(--on-surface-variant)' }}>
                    Last action: {chosen}
                </p>
                <CommandPalette
                    {...args}
                    commands={commands}
                    onAction={setChosen}
                    onOpenChange={setOpen}
                    open={open}
                />
            </>
        );
    },
};

/* Per-command onSelect and the palette-level onAction are alternatives: the
   handler is convenient in React, the id survives the Web Component boundary. */
export const PerCommandHandlers: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [chosen, setChosen] = useState('none');
        return (
            <>
                <Button onClick={() => setOpen(true)}>
                    Open command palette
                </Button>
                <p style={{ color: 'var(--on-surface-variant)' }}>
                    Last action: {chosen}
                </p>
                <CommandPalette
                    {...args}
                    commands={commands.map((command) => ({
                        ...command,
                        onSelect: () => setChosen(command.label),
                    }))}
                    onOpenChange={setOpen}
                    open={open}
                />
            </>
        );
    },
};

/** `emptyMessage` replaces the default "No matches". */
export const CustomEmptyMessage: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>
                    Open command palette
                </Button>
                <CommandPalette
                    {...args}
                    commands={commands}
                    emptyMessage="Nothing matches — try a shorter query."
                    onOpenChange={setOpen}
                    open={open}
                    placeholder="Search commands…"
                />
            </>
        );
    },
};
