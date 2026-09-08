import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from './contextMenu';
import { Menu, MenuItem, MenuLabel, MenuSeparator } from './menu';

/* ContextMenu takes the trigger as `children` and the menu as the `menu` prop.
   It opens itself on right-click, positioned at the cursor and clamped to the
   viewport. */
const meta = {
    title: 'Components/Overlays/ContextMenu',
    component: ContextMenu,
    tags: ['autodocs'],
    args: {
        menu: (
            <Menu>
                <MenuLabel>Edit</MenuLabel>
                <MenuItem shortcut="⌘C">Copy</MenuItem>
                <MenuItem shortcut="⌘V">Paste</MenuItem>
                <MenuItem shortcut="⌘D">Duplicate</MenuItem>
                <MenuSeparator />
                <MenuItem danger shortcut="⌫">
                    Delete
                </MenuItem>
            </Menu>
        ),
    },
} satisfies Meta<typeof ContextMenu>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (ContextMenu needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
    render: (args) => (
        <ContextMenu {...args}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48rem',
                    height: '20rem',
                    border: '0.25rem dashed var(--outline-variant)',
                    borderRadius: 'var(--corner-large)',
                    background: 'var(--surface-container-low)',
                    color: 'var(--on-surface-variant)',
                    userSelect: 'none',
                }}
            >
                Right-click anywhere in this area
            </div>
        </ContextMenu>
    ),
};

/** Any element works as the trigger, not just a drop zone. */
export const OnAListRow: Story = {
    render: (args) => (
        <ContextMenu {...args}>
            <div
                style={{
                    padding: '1.5rem 2rem',
                    borderRadius: 'var(--corner-medium)',
                    background: 'var(--surface-container-high)',
                    userSelect: 'none',
                    maxWidth: '40rem',
                }}
            >
                report-q3.pdf — right-click for actions
            </div>
        </ContextMenu>
    ),
};
