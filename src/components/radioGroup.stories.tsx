import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup } from './radioGroup';

const options = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'team', label: 'Team (disabled)', disabled: true },
];

const meta = {
    title: 'Components/Forms/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    args: { name: 'plan', options },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = { args: { defaultValue: 'pro' } };

export const Controlled: Story = {
    render: (args) => {
        const [plan, setPlan] = useState('pro');
        return <RadioGroup {...args} onChange={setPlan} value={plan} />;
    },
};
