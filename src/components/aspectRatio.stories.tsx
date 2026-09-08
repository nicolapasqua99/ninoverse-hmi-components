import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './aspectRatio';
import { Box } from './box';

/* The first child is stretched to fill the box, so each story passes exactly
   one element — bare text would not fill the ratio. */
const meta = {
    title: 'Components/Layout/AspectRatio',
    component: AspectRatio,
    tags: ['autodocs'],
    args: { style: { borderRadius: 'var(--corner-medium)' } },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
    args: { ratio: 16 / 9 },
    render: (args) => (
        <div style={{ maxWidth: '40rem' }}>
            <AspectRatio {...args}>
                <Box background="surface-container-high" padding="medium">
                    16 / 9
                </Box>
            </AspectRatio>
        </div>
    ),
};

export const Square: Story = {
    args: { ratio: 1 },
    render: (args) => (
        <div style={{ maxWidth: '30rem' }}>
            <AspectRatio {...args}>
                <Box background="surface-variant" padding="medium">
                    1 / 1
                </Box>
            </AspectRatio>
        </div>
    ),
};

export const Ratios: Story = {
    render: (args) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
            }}
        >
            <AspectRatio {...args} ratio={16 / 9}>
                <Box background="surface-container-high" padding="medium">
                    16 / 9
                </Box>
            </AspectRatio>
            <AspectRatio {...args} ratio={1}>
                <Box background="surface-variant" padding="medium">
                    1 / 1
                </Box>
            </AspectRatio>
            <AspectRatio {...args} ratio={4 / 3}>
                <Box background="surface-container" padding="medium">
                    4 / 3
                </Box>
            </AspectRatio>
        </div>
    ),
};
