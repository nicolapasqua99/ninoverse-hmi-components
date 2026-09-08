import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ValueScaleSelector } from './valueScaleSelector';

const meta = {
    title: 'Components/Forms/ValueScaleSelector',
    component: ValueScaleSelector,
    tags: ['autodocs'],
    args: { 'aria-label': 'Product rating' },
} satisfies Meta<typeof ValueScaleSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <title>Heart</title>
        <path d="M12 21s-7-4.35-9.3-9.3C1.1 8 3 4 7 4c2.1 0 3.5 1.1 5 3 1.5-1.9 2.9-3 5-3 4 0 5.9 4 4.3 7.7C19 16.65 12 21 12 21z" />
    </svg>
);

export const Default: Story = { args: { defaultValue: 3 } };

/** A custom `icon` replaces the default star; `allowHalf` enables half steps. */
export const CustomIconHalfSteps: Story = {
    args: {
        'aria-label': 'Affinity',
        defaultValue: 3.5,
        allowHalf: true,
        size: 'large',
        icon: <HeartIcon />,
    },
};

/** `valueText` takes a function, or a `{value}`/`{max}` template string. */
export const ReadOnly: Story = {
    args: {
        'aria-label': 'Read-only rating',
        value: 4.5,
        allowHalf: true,
        readOnly: true,
        size: 'small',
        valueText: 'Rated {value} out of {max} stars',
    },
};

export const Controlled: Story = {
    render: (args) => {
        const [rating, setRating] = useState(3);
        return (
            <ValueScaleSelector {...args} onChange={setRating} value={rating} />
        );
    },
};
