import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Tooltip } from './tooltip';

/* Tooltip takes the trigger as `children` and the text as the `label` prop —
   the reverse of Popover/HoverCard. It opens itself on hover/focus after
   `delay` and portals the bubble to document.body. */
const meta = {
    title: 'Components/Overlays/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    args: { label: 'On top' },
    render: (args) => (
        <Tooltip {...args}>
            <Button variant="secondary">Hover me</Button>
        </Tooltip>
    ),
} satisfies Meta<typeof Tooltip>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (Tooltip needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const Sides: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 2rem',
            }}
        >
            <Tooltip {...args} label="On top" side="top">
                <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip {...args} label="Below" side="bottom">
                <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip {...args} label="To the left" side="left">
                <Button variant="secondary">Left</Button>
            </Tooltip>
            <Tooltip {...args} label="To the right" side="right">
                <Button variant="secondary">Right</Button>
            </Tooltip>
        </div>
    ),
};

/** `delay` is the hover dwell before showing, in ms. */
export const NoDelay: Story = {
    args: { label: 'Snappy (0ms delay)', delay: 0 },
    render: (args) => (
        <Tooltip {...args}>
            <Button>Instant</Button>
        </Tooltip>
    ),
};
