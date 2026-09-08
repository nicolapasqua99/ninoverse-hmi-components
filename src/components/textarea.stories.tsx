import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

const meta = {
    title: 'Components/Forms/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    args: { placeholder: 'Tell us a bit about yourself…' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = { args: { error: true, defaultValue: '' } };

export const Disabled: Story = {
    args: { disabled: true, defaultValue: 'This field cannot be edited.' },
};
