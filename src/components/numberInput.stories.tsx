import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NumberInput } from './numberInput';

const meta = {
    title: 'Components/Forms/NumberInput',
    component: NumberInput,
    tags: ['autodocs'],
    args: { 'aria-label': 'Quantity' },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `min`/`max` clamp on blur and disable the stepper at each bound. */
export const Default: Story = { args: { defaultValue: 1, min: 1, max: 99 } };

export const Stepped: Story = {
    args: { 'aria-label': 'Age', defaultValue: 28, min: 0, max: 120, step: 1 },
};

/** Clearing the field emits `null`, not `0`. */
export const Controlled: Story = {
    render: (args) => {
        const [quantity, setQuantity] = useState<number | null>(1);
        return (
            <NumberInput
                {...args}
                max={99}
                min={1}
                onChange={setQuantity}
                value={quantity}
            />
        );
    },
};

export const Disabled: Story = { args: { defaultValue: 5, disabled: true } };
