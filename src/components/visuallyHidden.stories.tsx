import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Text } from './text';
import { VisuallyHidden } from './visuallyHidden';

/* VisuallyHidden is clipped to 1x1px, so a bare story is a blank canvas.
   Both stories pair it with something visible to show what it is doing. */
const meta = {
    title: 'Components/Layout/VisuallyHidden',
    component: VisuallyHidden,
    tags: ['autodocs'],
    args: { children: 'Search' },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        style={{ width: '2rem', height: '2rem' }}
    >
        <title>Search</title>
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5L13.5 13.5" />
    </svg>
);

/** The icon-only button has no visible text; the hidden label names it for screen readers. */
export const IconButtonLabel: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <Text tone="muted">
                Renders nothing visible — content stays available to screen
                readers. The icon-only button below carries a hidden label.
            </Text>
            <Button asIcon variant="secondary">
                <SearchIcon />
                <VisuallyHidden {...args} />
            </Button>
        </div>
    ),
};

/** Inline, mid-sentence: the hidden word is read aloud but never rendered. */
export const InlineText: Story = {
    args: { children: ' (opens in a new tab)' },
    render: (args) => (
        <Text>
            Continue to the dashboard
            <VisuallyHidden {...args} />.
        </Text>
    ),
};
