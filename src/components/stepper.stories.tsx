import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { Stepper } from './stepper';

/* App.tsx repeats this array once per orientation; defined once here. */
const steps = [
    { value: 'cart', label: 'Cart', description: '3 items' },
    { value: 'address', label: 'Address', description: 'Delivery details' },
    { value: 'payment', label: 'Payment', description: 'Choose method' },
    { value: 'review', label: 'Review' },
];

const meta = {
    title: 'Components/Navigation/Stepper',
    component: Stepper,
    tags: ['autodocs'],
    args: { steps, 'aria-label': 'Checkout progress' },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { args: { defaultCurrent: 'address' } };

export const Vertical: Story = {
    args: { defaultCurrent: 'payment', orientation: 'vertical' },
};

/** `spacing` widens the gap between steps; a number is read as rem. */
export const VerticalSpaced: Story = {
    args: { defaultCurrent: 'address', orientation: 'vertical', spacing: 4 },
};

/** Clicking a completed step fires `onChange` with its value; later steps are inert. */
export const Controlled: Story = {
    render: (args) => {
        const [current, setCurrent] = useState('address');
        const index = steps.findIndex((step) => step.value === current);
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <Stepper {...args} current={current} onChange={setCurrent} />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        disabled={index === 0}
                        onClick={() =>
                            setCurrent(steps[index - 1]?.value ?? current)
                        }
                        variant="secondary"
                    >
                        Back
                    </Button>
                    <Button
                        disabled={index === steps.length - 1}
                        onClick={() =>
                            setCurrent(steps[index + 1]?.value ?? current)
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    },
};
