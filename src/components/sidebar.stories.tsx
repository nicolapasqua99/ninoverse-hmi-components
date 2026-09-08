import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Sidebar } from './sidebar';

/* The demo page inlines six multi-path SVGs here; these compact single-path
   equivalents keep the story about the component rather than the icon markup. */
const icon = (title: string, d: string) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>{title}</title>
        <path d={d} />
    </svg>
);

const InboxIcon = () =>
    icon('Inbox', 'M3 13l3-7h12l3 7v6H3v-6zM3 13h6l1 2h4l1-2h6');
const StarIcon = () =>
    icon(
        'Starred',
        'M12 3l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z',
    );
const SendIcon = () =>
    icon('Sent', 'M21 3L10.5 13.5M21 3l-6.5 18-4-8-8-4L21 3z');
const GearIcon = () =>
    icon(
        'Settings',
        'M12 15a3 3 0 100-6 3 3 0 000 6zM12 2v3M12 19v3M2 12h3M19 12h3',
    );

const groups = [
    {
        label: 'Mail',
        items: [
            { value: 'inbox', label: 'Inbox', icon: <InboxIcon />, badge: 12 },
            { value: 'starred', label: 'Starred', icon: <StarIcon /> },
            { value: 'sent', label: 'Sent', icon: <SendIcon /> },
        ],
    },
    {
        label: 'Workspace',
        items: [
            {
                value: 'settings',
                label: 'Settings',
                icon: <GearIcon />,
                badge: 'New',
                badgeVariant: 'success' as const,
            },
        ],
    },
];

const meta = {
    title: 'Components/Navigation/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    args: { groups },
    render: (args) => (
        <div style={{ width: '32rem' }}>
            <Sidebar {...args} />
        </div>
    ),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `badge` takes a number or a string, styled by `badgeVariant`. */
export const Default: Story = { args: { current: 'inbox' } };

/** A group's `label` is optional — omit it for an ungrouped list. */
export const Ungrouped: Story = {
    args: {
        current: 'inbox',
        groups: [{ items: groups[0]?.items ?? [] }],
    },
};

/* Like Navbar, current/onNav have no internal fallback — the active item only
   moves when the consumer owns the state. */
export const Controlled: Story = {
    render: (args) => {
        const [current, setCurrent] = useState('inbox');
        return (
            <div style={{ width: '32rem' }}>
                <Sidebar {...args} current={current} onNav={setCurrent} />
            </div>
        );
    },
};
