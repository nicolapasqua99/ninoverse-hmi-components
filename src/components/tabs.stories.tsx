import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs } from './tabs';

const meta = {
    title: 'Components/Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    args: {
        options: [
            { value: 'inbox', label: 'Inbox', count: 12 },
            { value: 'sent', label: 'Sent' },
            { value: 'archive', label: 'Archive', count: 3 },
        ],
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `count` renders as a trailing Badge. */
export const Pill: Story = { args: { defaultValue: 'inbox' } };

export const Underline: Story = {
    args: {
        defaultValue: 'overview',
        variant: 'underline',
        options: [
            { value: 'overview', label: 'Overview' },
            { value: 'usage', label: 'Usage', count: 24 },
            { value: 'billing', label: 'Billing' },
        ],
    },
};

export const Controlled: Story = {
    render: (args) => {
        const [tab, setTab] = useState('sent');
        return <Tabs {...args} onChange={setTab} value={tab} />;
    },
};
