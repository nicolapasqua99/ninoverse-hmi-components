import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './searchInput';

const meta = {
    title: 'Components/Forms/SearchInput',
    component: SearchInput,
    tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Placeholder defaults to "Search…" and the leading icon is built in. */
export const Default: Story = {};

export const CustomPlaceholder: Story = {
    args: { placeholder: 'Find a component…' },
};

export const Disabled: Story = { args: { disabled: true } };
