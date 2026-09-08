import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';
import { Flex } from './flex';
import { ScrollArea } from './scrollArea';
import { Text } from './text';

/* ScrollArea has no intrinsic size — it only reads as a scroll area when the
   content overflows a capped axis, so each story supplies both. */
const meta = {
    title: 'Components/Layout/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
    args: { maxHeight: '18rem' },
    render: (args) => (
        <div style={{ maxWidth: '40rem' }}>
            <ScrollArea {...args}>
                <Box
                    background="surface-container"
                    padding="medium"
                    radius="medium"
                >
                    {Array.from(
                        { length: 12 },
                        (_, i) => `Vertical scroll row ${i + 1}`,
                    ).map((label) => (
                        <Text key={label}>{label}</Text>
                    ))}
                </Box>
            </ScrollArea>
        </div>
    ),
};

export const Horizontal: Story = {
    args: { orientation: 'horizontal' },
    render: (args) => (
        <div style={{ maxWidth: '50rem' }}>
            <ScrollArea {...args}>
                <Flex
                    gap="medium"
                    style={{ width: 'max-content', paddingBottom: '1rem' }}
                >
                    {Array.from({ length: 10 }, (_, i) => `Card ${i + 1}`).map(
                        (label) => (
                            <Box
                                background="surface-container-high"
                                key={label}
                                padding="large"
                                radius="medium"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {label}
                            </Box>
                        ),
                    )}
                </Flex>
            </ScrollArea>
        </div>
    ),
};
