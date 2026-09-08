import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';

const meta = {
    title: 'Components/Feedback/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: 'text', width: '80%' } };

export const Variants: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                maxWidth: '40rem',
            }}
        >
            <Skeleton {...args} variant="text" width="80%" />
            <Skeleton {...args} height="1.5rem" variant="rect" />
            <Skeleton {...args} height="6rem" variant="circle" width="6rem" />
        </div>
    ),
};

/** Stack text lines at varying widths to stand in for a paragraph. */
export const TextBlock: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '40rem',
            }}
        >
            <Skeleton {...args} variant="text" width="80%" />
            <Skeleton {...args} variant="text" width="100%" />
            <Skeleton {...args} variant="text" width="60%" />
        </div>
    ),
};

/** A circle plus lines reads as an avatar row while content loads. */
export const AvatarRow: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                maxWidth: '40rem',
            }}
        >
            <Skeleton {...args} height="6rem" variant="circle" width="6rem" />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    flex: 1,
                }}
            >
                <Skeleton {...args} variant="text" width="50%" />
                <Skeleton {...args} height="1.5rem" variant="rect" />
                <Skeleton
                    {...args}
                    height="1.5rem"
                    variant="rect"
                    width="80%"
                />
            </div>
        </div>
    ),
};
