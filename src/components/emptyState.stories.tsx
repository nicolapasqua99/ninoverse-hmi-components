import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { EmptyState } from './emptyState';

const InboxIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>Empty inbox</title>
        <path d="M3 13l3-7h12l3 7v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
        <path d="M3 13h5l1 2h6l1-2h5" />
    </svg>
);

const SearchIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>No results</title>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4.5 4.5" />
    </svg>
);

const meta = {
    title: 'Components/Feedback/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    args: { title: 'Inbox zero' },
    render: (args) => (
        <div style={{ maxWidth: '55rem' }}>
            <EmptyState {...args} />
        </div>
    ),
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `title` is the only required prop. */
export const TitleOnly: Story = {};

export const WithIcon: Story = {
    args: {
        icon: <InboxIcon />,
        description:
            'No new messages. When something arrives, it will show up here automatically.',
    },
};

/** The `action` slot takes one button or several. */
export const WithActions: Story = {
    args: {
        icon: <SearchIcon />,
        title: 'No matches',
        description:
            "We couldn't find anything matching that search. Try a different keyword or clear all filters.",
        action: (
            <>
                <Button variant="secondary">Clear filters</Button>
                <Button>New search</Button>
            </>
        ),
    },
};
