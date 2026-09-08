import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormControl } from './formControl';
import { Input } from './input';

/* FormControl is the label/hint/error wrapper the other form controls sit in.
   It has no section on the demo page — these examples are written for it. */
const meta = {
    title: 'Components/Forms/FormControl',
    component: FormControl,
    tags: ['autodocs'],
    args: { label: 'Full name' },
    render: (args) => (
        <div style={{ maxWidth: '40rem' }}>
            <FormControl {...args}>
                <Input placeholder="Alex Morgan" />
            </FormControl>
        </div>
    ),
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelOnly: Story = {};

export const WithHint: Story = {
    args: { hint: 'As it appears on documents' },
};

/** `error` takes precedence over `hint` — the hint is hidden while an error is set. */
export const WithError: Story = {
    args: {
        hint: 'As it appears on documents',
        error: "Hmm, that doesn't look right.",
    },
};
