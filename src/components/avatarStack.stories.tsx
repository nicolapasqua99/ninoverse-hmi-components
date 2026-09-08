import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarStack } from './avatarStack';

const names = [
    'Ada Lovelace',
    'Alan Turing',
    'Grace Hopper',
    'Linus Torvalds',
    'Barbara Liskov',
    'Ken Thompson',
    'Margaret Hamilton',
];

const meta = {
    title: 'Components/Data display/AvatarStack',
    component: AvatarStack,
    tags: ['autodocs'],
    args: { names: names.slice(0, 4) },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Beyond `max` the remainder collapses into a `+N` chip. */
export const Overflow: Story = { args: { names, max: 4 } };

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <AvatarStack {...args} size="small" />
            <AvatarStack {...args} />
            <AvatarStack {...args} size="large" />
        </div>
    ),
};
