import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox } from './combobox';

const cityOptions = [
    { value: 'amsterdam', label: 'Amsterdam', description: 'Netherlands' },
    { value: 'berlin', label: 'Berlin', description: 'Germany' },
    { value: 'lisbon', label: 'Lisbon', description: 'Portugal' },
    { value: 'london', label: 'London', description: 'United Kingdom' },
    { value: 'madrid', label: 'Madrid', description: 'Spain' },
    { value: 'milan', label: 'Milan', description: 'Italy' },
    { value: 'paris', label: 'Paris', description: 'France' },
    { value: 'rome', label: 'Rome', description: 'Italy' },
    { value: 'vienna', label: 'Vienna', description: 'Austria' },
    { value: 'warsaw', label: 'Warsaw', description: 'Poland' },
];

/* The input is its own trigger — the listbox opens on focus and portals to
   document.body. For a short fixed list without type-ahead, use Select. */
const meta = {
    title: 'Components/Forms/Combobox',
    component: Combobox,
    tags: ['autodocs'],
    args: {
        'aria-label': 'City',
        options: cityOptions,
        placeholder: 'Search cities…',
    },
    render: (args) => (
        <div style={{ width: '36rem' }}>
            <Combobox {...args} />
        </div>
    ),
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = { args: { defaultValue: 'paris' } };

export const Disabled: Story = {
    args: { defaultValue: 'paris', disabled: true },
};

export const Controlled: Story = {
    render: (args) => {
        const [city, setCity] = useState<string | null>('paris');
        return (
            <div style={{ width: '36rem' }}>
                <Combobox {...args} onChange={setCity} value={city} />
            </div>
        );
    },
};
