import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box } from './box';
import { Carousel } from './carousel';

const Slide = ({
    label,
    background,
}: {
    label: string;
    background: string;
}) => (
    <Box
        padding="large"
        radius="medium"
        style={{
            background,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '22rem',
            fontSize: '2.5rem',
        }}
    >
        {label}
    </Box>
);

const slides = [
    <Slide background="var(--primary)" key="one" label="Slide one" />,
    <Slide background="var(--tertiary)" key="two" label="Slide two" />,
    <Slide background="var(--secondary)" key="three" label="Slide three" />,
];

const meta = {
    title: 'Components/Data display/Carousel',
    component: Carousel,
    tags: ['autodocs'],
    args: { slides, 'aria-label': 'Highlights' },
    render: (args) => (
        <div style={{ maxWidth: '50rem' }}>
            <Carousel {...args} />
        </div>
    ),
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `loop={false}` disables the arrows at each end instead of wrapping. */
export const NoLoop: Story = { args: { loop: false } };

export const DotsOnly: Story = { args: { showArrows: false } };

/** `autoPlay` is an interval in ms; it pauses on hover and focus. */
export const AutoPlay: Story = { args: { autoPlay: 2500 } };

export const Controlled: Story = {
    render: (args) => {
        const [index, setIndex] = useState(1);
        return (
            <div style={{ maxWidth: '50rem' }}>
                <Carousel {...args} index={index} onIndexChange={setIndex} />
            </div>
        );
    },
};
