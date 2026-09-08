import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: { children: 'Launch' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

export const Variants: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button {...args} variant="primary">
                Primary
            </Button>
            <Button {...args} variant="secondary">
                Secondary
            </Button>
            <Button {...args} variant="ghost">
                Ghost
            </Button>
            <Button {...args} variant="soft">
                Soft
            </Button>
            <Button {...args} variant="danger">
                Danger
            </Button>
            <Button {...args} variant="link">
                Link
            </Button>
        </div>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button {...args} size="small">
                Small
            </Button>
            <Button {...args} size="medium">
                Medium
            </Button>
            <Button {...args} size="large">
                Large
            </Button>
        </div>
    ),
};
