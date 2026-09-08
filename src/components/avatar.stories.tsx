import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar';

const meta = {
    title: 'Components/Data display/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    args: { name: 'Ada Lovelace' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Without `src`, initials are shown over a colour hashed from the name. */
export const Default: Story = {};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Avatar {...args} size="small" />
            <Avatar {...args} />
            <Avatar {...args} size="large" />
            <Avatar {...args} size="xlarge" />
        </div>
    ),
};

export const Status: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Avatar
                {...args}
                name="Ada Lovelace"
                size="large"
                status="online"
            />
            <Avatar {...args} name="Alan Turing" size="large" status="away" />
            <Avatar
                {...args}
                name="Grace Hopper"
                size="large"
                status="offline"
            />
        </div>
    ),
};

/** The colour is derived from the name, so each person is consistently tinted. */
export const ColourHashing: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
                'Ada Lovelace',
                'Alan Turing',
                'Grace Hopper',
                'Linus Torvalds',
            ].map((name) => (
                <Avatar {...args} key={name} name={name} />
            ))}
        </div>
    ),
};
