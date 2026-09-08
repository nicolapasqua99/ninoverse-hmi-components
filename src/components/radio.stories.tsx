import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './radio';

const meta = {
    title: 'Components/Forms/Radio',
    component: Radio,
    tags: ['autodocs'],
    args: { name: 'size', label: 'Small' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* Mutual exclusion is the browser's, via a shared `name` — for a managed group
   with a single value, use RadioGroup instead. */
export const SharedName: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
            <Radio {...args} defaultChecked label="Small" value="sm" />
            <Radio {...args} label="Medium" value="md" />
            <Radio {...args} label="Large" value="lg" />
            <Radio
                {...args}
                disabled
                label="Extra large (disabled)"
                value="xl"
            />
        </div>
    ),
};

export const Disabled: Story = {
    args: { disabled: true, label: 'Unavailable' },
};
