import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';

const meta = {
    title: 'Components/Layout/Box',
    component: Box,
    tags: ['autodocs'],
    args: { children: 'Box content' },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        background: 'surface-variant',
        padding: 'medium',
        radius: 'medium',
    },
};

export const Backgrounds: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Box {...args} background="surface" bordered padding="medium">
                surface
            </Box>
            <Box {...args} background="surface-variant" padding="medium">
                surface-variant
            </Box>
            <Box {...args} background="surface-container" padding="medium">
                surface-container
            </Box>
            <Box {...args} background="surface-container-high" padding="medium">
                surface-container-high
            </Box>
        </div>
    ),
};

export const Radii: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Box
                {...args}
                background="surface-variant"
                padding="medium"
                radius="small"
            >
                small
            </Box>
            <Box
                {...args}
                background="surface-variant"
                padding="medium"
                radius="medium"
            >
                medium
            </Box>
            <Box
                {...args}
                background="surface-container-high"
                padding="large"
                radius="leaf"
            >
                leaf
            </Box>
            <Box
                {...args}
                background="surface-container"
                bordered
                padding="large"
                radius="full"
            >
                full
            </Box>
        </div>
    ),
};

/** `as` swaps the rendered element while keeping the surface tokens. */
export const AsSection: Story = {
    args: {
        as: 'section',
        background: 'surface',
        bordered: true,
        padding: 'small',
        radius: 'small',
        children: 'as="section"',
    },
};
