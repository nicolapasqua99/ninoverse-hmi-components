import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';

const meta = {
    title: 'Components/Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    args: { label: 'Notifications' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = { args: { defaultChecked: true } };

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
            <Switch {...args} defaultChecked label="Notifications" />
            <Switch {...args} label="Email digest" />
            <Switch {...args} disabled label="Beta features (disabled)" />
            <Switch
                {...args}
                defaultChecked
                disabled
                label="Auto-save (disabled, on)"
            />
        </div>
    ),
};
