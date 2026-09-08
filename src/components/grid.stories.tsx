import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';
import { Grid } from './grid';

const meta = {
    title: 'Components/Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    args: { gap: 'medium' },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EqualColumns: Story = {
    args: { columns: 3 },
    render: (args) => (
        <Grid {...args}>
            {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((label) => (
                <Box
                    background="surface-variant"
                    key={label}
                    padding="medium"
                    radius="medium"
                >
                    {label}
                </Box>
            ))}
        </Grid>
    ),
};

/** A string `columns` is passed through as a raw `grid-template-columns` value. */
export const Template: Story = {
    args: { columns: '2fr 1fr' },
    render: (args) => (
        <Grid {...args}>
            <Box
                background="surface-container-high"
                padding="large"
                radius="small"
            >
                2fr (main)
            </Box>
            <Box
                background="surface-container-high"
                padding="large"
                radius="small"
            >
                1fr (aside)
            </Box>
        </Grid>
    ),
};
