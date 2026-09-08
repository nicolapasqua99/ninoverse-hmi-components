import type { Meta, StoryObj } from '@storybook/react-vite';
import { Legend } from './legend';

/* Legend is a plain <ul> — it needs no chart around it, and the charts do not
   render one themselves, so it is always paired explicitly. */
const meta = {
    title: 'Charts/Legend',
    component: Legend,
    tags: ['autodocs'],
    args: {
        items: [
            { label: 'Product A', color: 'var(--primary)' },
            { label: 'Product B', color: 'var(--tertiary)' },
            { label: 'Product C', color: 'var(--secondary)' },
        ],
    },
} satisfies Meta<typeof Legend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Alignment: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                width: '40rem',
            }}
        >
            <Legend {...args} align="start" />
            <Legend {...args} />
            <Legend {...args} align="end" />
        </div>
    ),
};

/** `inactive` draws the swatch as a hollow ring, for a hidden series. */
export const InactiveSeries: Story = {
    args: {
        items: [
            { label: 'Product A', color: 'var(--primary)' },
            { label: 'Product B', color: 'var(--tertiary)', inactive: true },
            { label: 'Product C', color: 'var(--secondary)' },
        ],
    },
};
