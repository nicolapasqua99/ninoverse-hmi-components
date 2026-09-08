import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './passwordInput';

const meta = {
    title: 'Components/Forms/PasswordInput',
    component: PasswordInput,
    tags: ['autodocs'],
    args: { placeholder: '••••••••' },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The trailing eye button toggles between `type="password"` and `type="text"`. */
export const Default: Story = { args: { defaultValue: 'super-secret' } };

export const ErrorState: Story = {
    args: { defaultValue: 'letters-only', error: true },
};

export const Disabled: Story = {
    args: { defaultValue: 'super-secret', disabled: true },
};
