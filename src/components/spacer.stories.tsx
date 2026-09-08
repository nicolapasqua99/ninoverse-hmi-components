import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';
import { Flex } from './flex';
import { Spacer } from './spacer';

/* Spacer renders an empty, aria-hidden <span> — it is never visible on its own.
   Every story frames it between siblings so the space it adds is what you see. */
const meta = {
    title: 'Components/Layout/Spacer',
    component: Spacer,
    tags: ['autodocs'],
    args: { size: 'large' },
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
    render: (args) => (
        <Box background="surface-variant" padding="medium" radius="medium">
            Above
            <Spacer {...args} />
            Below (vertical large spacer between)
        </Box>
    ),
};

export const Horizontal: Story = {
    args: { axis: 'horizontal' },
    render: (args) => (
        <Flex align="center">
            <Box
                background="surface-container-high"
                padding="small"
                radius="small"
            >
                Left
            </Box>
            <Spacer {...args} />
            <Box
                background="surface-container-high"
                padding="small"
                radius="small"
            >
                Right (horizontal spacer)
            </Box>
        </Flex>
    ),
};

/** `grow` is `flex: 1 1 0` — a no-op unless the parent is a flex container. */
export const Grow: Story = {
    args: { grow: true },
    render: (args) => (
        <Flex
            align="center"
            style={{
                background: 'var(--surface-container)',
                borderRadius: 'var(--corner-medium)',
                padding: '1rem 2rem',
            }}
        >
            <span>Start</span>
            <Spacer {...args} />
            <span>End (pushed by grow spacer)</span>
        </Flex>
    ),
};
