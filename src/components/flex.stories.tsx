import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './box';
import { Flex } from './flex';

const meta = {
    title: 'Components/Layout/Flex',
    component: Flex,
    tags: ['autodocs'],
    args: { gap: 'medium' },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: string }) => (
    <Box background="surface-variant" padding="medium" radius="medium">
        {children}
    </Box>
);

export const Row: Story = {
    args: { wrap: true },
    render: (args) => (
        <Flex {...args}>
            <Item>Row</Item>
            <Item>with</Item>
            <Item>gap</Item>
        </Flex>
    ),
};

export const Justify: Story = {
    args: { align: 'center', justify: 'between' },
    render: (args) => (
        <Flex {...args}>
            <Item>space-between</Item>
            <Item>align-center</Item>
            <Item>end</Item>
        </Flex>
    ),
};

export const Column: Story = {
    args: { direction: 'column', gap: 'small' },
    render: (args) => (
        <Flex {...args}>
            <Item>column</Item>
            <Item>direction</Item>
        </Flex>
    ),
};
