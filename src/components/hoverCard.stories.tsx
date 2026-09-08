import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar';
import { Button } from './button';
import { HoverCard } from './hoverCard';
import { Link } from './link';

/* HoverCard drives itself on hover/focus — there is no `open` prop. The trigger
   is a prop and the card body is children, matching Popover. */
const meta = {
    title: 'Components/Overlays/HoverCard',
    component: HoverCard,
    tags: ['autodocs'],
    args: { trigger: <Button variant="ghost">Hover me</Button> },
    render: (args) => (
        <div style={{ padding: '4rem 2rem' }}>
            <HoverCard {...args} />
        </div>
    ),
} satisfies Meta<typeof HoverCard>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (HoverCard needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
    args: {
        children: <span>Anchored below the trigger and centred on it.</span>,
    },
};

/** Rich content works — the card stays open while the pointer moves into it. */
export const RichContent: Story = {
    args: {
        align: 'start',
        trigger: <Link href="#hovercard">@nino</Link>,
        children: (
            <div
                style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
            >
                <Avatar name="Nino Verse" size="large" />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    <strong>Nino Verse</strong>
                    <span style={{ color: 'var(--on-surface-variant)' }}>
                        Building the HMI component library. Hover and move in —
                        this card stays open so you can click inside.
                    </span>
                </div>
            </div>
        ),
    },
};

export const Sides: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                gap: '4rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6rem 2rem',
            }}
        >
            <HoverCard
                {...args}
                align="start"
                side="top"
                trigger={<Button variant="ghost">Top</Button>}
            >
                <span>Above the trigger, aligned to its left edge.</span>
            </HoverCard>
            <HoverCard
                {...args}
                side="right"
                trigger={<Button variant="ghost">Right</Button>}
                width={280}
            >
                <span>To the right, centred, with a fixed 280px width.</span>
            </HoverCard>
            <HoverCard
                {...args}
                align="end"
                side="left"
                trigger={<Button variant="ghost">Left</Button>}
            >
                <span>To the left, end-aligned.</span>
            </HoverCard>
        </div>
    ),
};

/** `openDelay` / `closeDelay` default to 300 ms / 150 ms. */
export const NoDelay: Story = {
    args: {
        closeDelay: 0,
        openDelay: 0,
        trigger: <Button variant="ghost">Snappy</Button>,
        children: <span>Zero open and close delay.</span>,
    },
};
