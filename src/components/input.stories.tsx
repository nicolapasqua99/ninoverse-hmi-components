import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
    title: 'Components/Forms/Input',
    component: Input,
    tags: ['autodocs'],
    args: { placeholder: 'Alex Morgan' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
    >
        <title>Search</title>
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5L13.5 13.5" />
    </svg>
);

export const Default: Story = {};

/** `error` styles the field only — the message belongs to the wrapping FormControl. */
export const ErrorState: Story = {
    args: {
        type: 'email',
        placeholder: 'you@studio.co',
        defaultValue: 'not-an-email',
        error: true,
    },
};

export const WithIcon: Story = {
    args: { placeholder: 'Search…', leftIcon: <SearchIcon /> },
};

export const Disabled: Story = {
    args: {
        placeholder: 'Read-only',
        defaultValue: 'Already filled',
        disabled: true,
    },
};
