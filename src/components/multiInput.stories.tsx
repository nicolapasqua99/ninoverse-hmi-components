import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MultiInput } from './multiInput';

const meta = {
    title: 'Components/Forms/MultiInput',
    component: MultiInput,
    tags: ['autodocs'],
    args: { 'aria-label': 'Verification code' },
} satisfies Meta<typeof MultiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerificationCode: Story = {
    args: { length: 6, autoComplete: 'one-time-code' },
};

/** `pattern` overrides `type` for per-character validation; `groupSize` inserts separators. */
export const LicenseKey: Story = {
    args: {
        'aria-label': 'License key',
        length: 12,
        groupSize: 4,
        type: 'text',
        pattern: /^[A-Za-z0-9]$/,
        defaultValue: 'ABCD1234WXYZ',
    },
};

export const MaskedPin: Story = {
    args: { 'aria-label': 'PIN', length: 4, mask: true, defaultValue: '1234' },
};

export const Controlled: Story = {
    render: (args) => {
        const [code, setCode] = useState('');
        return (
            <MultiInput {...args} length={6} onChange={setCode} value={code} />
        );
    },
};
