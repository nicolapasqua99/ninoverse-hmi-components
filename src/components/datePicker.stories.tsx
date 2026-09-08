import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker, type DateRangeISO } from './datePicker';

const meta = {
    title: 'Components/Forms/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    args: { 'aria-label': 'Pick a date' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
    args: { defaultValue: new Date(2026, 4, 15).toISOString() },
    render: (args) => (
        <div style={{ width: '32rem' }}>
            <DatePicker {...args} />
        </div>
    ),
};

/** `mode="range"` swaps both `value` and `onChange` to the range shape. */
export const Range: Story = {
    args: {
        mode: 'range',
        'aria-label': 'Pick a date range',
        placeholder: 'Pick a range',
    },
    render: (args) => (
        <div style={{ width: '40rem' }}>
            <DatePicker {...args} />
        </div>
    ),
};

export const Disabled: Story = {
    args: { defaultValue: new Date(2026, 4, 15).toISOString(), disabled: true },
    render: (args) => (
        <div style={{ width: '32rem' }}>
            <DatePicker {...args} />
        </div>
    ),
};

export const ControlledRange: Story = {
    render: () => {
        const [range, setRange] = useState<DateRangeISO | null>(null);
        return (
            <div style={{ width: '40rem' }}>
                <DatePicker
                    aria-label="Pick a date range"
                    mode="range"
                    onChange={setRange}
                    placeholder="Pick a range"
                    value={range}
                />
            </div>
        );
    },
};
