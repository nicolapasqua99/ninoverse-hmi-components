import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './accordion';

const items = [
    {
        title: 'What is this library?',
        body: 'A React HMI component library built on Material Design 3 tokens with a warm, asymmetric styling system.',
    },
    {
        title: 'How do I theme it?',
        body: 'Three independent axes on the <html> element: data-theme, data-structure and data-material.',
    },
    {
        title: 'Does it ship runtime dependencies?',
        body: 'No — react and react-dom are peer dependencies and nothing else is bundled.',
    },
    {
        title: 'Disabled section',
        body: 'This panel cannot be opened.',
        disabled: true,
    },
];

const meta = {
    title: 'Components/Data display/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    args: { items },
    render: (args) => (
        <div style={{ maxWidth: '60rem' }}>
            <Accordion {...args} />
        </div>
    ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One panel at a time — opening a section closes the previous one. */
export const Single: Story = { args: { defaultOpen: [0] } };

/** `multiple` lets any number of panels stay open. */
export const Multiple: Story = {
    args: { multiple: true, defaultOpen: [0, 1] },
};

export const AllClosed: Story = {};
