import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ColorPicker } from './colorPicker';

/* The swatch button is the trigger — the panel portals to document.body, so it
   floats over the docs page when open. */
const meta = {
    title: 'Components/Forms/ColorPicker',
    component: ColorPicker,
    tags: ['autodocs'],
    args: { 'aria-label': 'Brand color' },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { defaultValue: '#e87a5d' } };

/** `showInput={false}` reduces the panel to preset swatches only. */
export const SwatchesOnly: Story = {
    args: { defaultValue: '#5c9a6a', showInput: false },
};

export const Disabled: Story = {
    args: { defaultValue: '#6b86b3', disabled: true },
};

export const Controlled: Story = {
    render: (args) => {
        const [color, setColor] = useState('#e87a5d');
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <ColorPicker {...args} onChange={setColor} value={color} />
                <span style={{ color: 'var(--on-surface-variant)' }}>
                    {color}
                </span>
            </div>
        );
    },
};
