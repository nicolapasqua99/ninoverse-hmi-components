import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Spinner } from './spinner';

const meta = {
    title: 'Components/Feedback/Spinner',
    component: Spinner,
    tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <Spinner {...args} size="small" />
            <Spinner {...args} />
            <Spinner {...args} size="large" />
        </div>
    ),
};

/** Small is the size that fits a button's icon slot. */
export const InButton: Story = {
    render: (args) => (
        <Button disabled leftIcon={<Spinner {...args} size="small" />}>
            Loading
        </Button>
    ),
};
