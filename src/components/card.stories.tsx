import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './card';
import { Heading } from './heading';
import { Text } from './text';

const meta = {
    title: 'Components/Layout/Card',
    component: Card,
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The ink variant inverts the surface, so both children inherit the card's
   colour rather than picking their own tone. */
const Body = ({ title, children }: { title: string; children: string }) => (
    <>
        <Heading level={3} size="small" tone="inherit">
            {title}
        </Heading>
        <Text size="small" tone="inherit">
            {children}
        </Text>
    </>
);

export const Default: Story = {
    render: (args) => (
        <div style={{ maxWidth: '45rem' }}>
            <Card {...args}>
                <Body title="Default">
                    Elevated warm surface with the asymmetric leaf corner shape.
                </Body>
            </Card>
        </div>
    ),
};

export const Variants: Story = {
    render: (args) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 45rem))',
                gap: '2.5rem',
            }}
        >
            <Card {...args}>
                <Body title="Default">
                    Elevated warm surface with the leaf corner shape.
                </Body>
            </Card>
            <Card {...args} variant="flat">
                <Body title="Flat">
                    No elevation — reads as part of the page.
                </Body>
            </Card>
            <Card {...args} variant="ink">
                <Body title="Ink">
                    Inverted surface for high-contrast emphasis.
                </Body>
            </Card>
            <Card {...args} variant="accent">
                <Body title="Accent">
                    Primary-tinted surface for a highlighted item.
                </Body>
            </Card>
        </div>
    ),
};

/** `active` lifts the card to mark it selected. */
export const Active: Story = {
    args: { active: true },
    render: (args) => (
        <div style={{ maxWidth: '45rem' }}>
            <Card {...args}>
                <Body title="Active">
                    Lifted off the page to mark the current selection.
                </Body>
            </Card>
        </div>
    ),
};
