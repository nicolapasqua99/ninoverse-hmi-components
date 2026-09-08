import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';

const meta = {
    title: 'Components/Forms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    args: { label: 'Accept terms' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const States: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                alignItems: 'center',
            }}
        >
            <Checkbox {...args} defaultChecked label="Accept terms" />
            <Checkbox {...args} label="Subscribe to updates" />
            <Checkbox {...args} disabled label="Disabled" />
            <Checkbox
                {...args}
                defaultChecked
                disabled
                label="Disabled checked"
            />
        </div>
    ),
};
