import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SegmentedControl } from './segmentedControl';

const meta = {
    title: 'Components/Forms/SegmentedControl',
    component: SegmentedControl,
    tags: ['autodocs'],
    args: {
        'aria-label': 'View',
        options: [
            { value: 'list', label: 'List' },
            { value: 'board', label: 'Board' },
            { value: 'calendar', label: 'Calendar' },
        ],
    },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 'list' } };

export const Controlled: Story = {
    render: (args) => {
        const [view, setView] = useState('board');
        return <SegmentedControl {...args} onChange={setView} value={view} />;
    },
};

export const FullWidthSmall: Story = {
    args: {
        'aria-label': 'Density',
        size: 'small',
        fullWidth: true,
        defaultValue: 'cozy',
        options: [
            { value: 'compact', label: 'Compact' },
            { value: 'cozy', label: 'Cozy' },
            { value: 'spacious', label: 'Spacious', disabled: true },
        ],
    },
};
