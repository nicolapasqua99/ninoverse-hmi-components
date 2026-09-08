import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './select';

const options = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'team', label: 'Team' },
];

const meta = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    args: { options, placeholder: 'Choose a plan…' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {};

export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState('pro');
        return <Select {...args} value={value} onChange={setValue} />;
    },
};

export const Disabled: Story = { args: { disabled: true } };
