import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './slider';

const meta = {
    title: 'Components/Forms/Slider',
    component: Slider,
    tags: ['autodocs'],
    args: { 'aria-label': 'Volume' },
    render: (args) => (
        <div style={{ maxWidth: '50rem' }}>
            <Slider {...args} />
        </div>
    ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: 64 } };

/** `formatValue` takes a function, or a `{value}` template string for the web-component boundary. */
export const WithValue: Story = {
    args: { defaultValue: 64, showValue: true, formatValue: '{value}%' },
};

export const Stepped: Story = {
    args: {
        'aria-label': 'Contrast',
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 5,
        showValue: true,
    },
};

export const Controlled: Story = {
    render: (args) => {
        const [volume, setVolume] = useState(64);
        return (
            <div style={{ maxWidth: '50rem' }}>
                <Slider
                    {...args}
                    formatValue={(v) => `${v}%`}
                    onChange={setVolume}
                    showValue
                    value={volume}
                />
            </div>
        );
    },
};

export const Disabled: Story = {
    args: { defaultValue: 30, disabled: true, showValue: true },
};
