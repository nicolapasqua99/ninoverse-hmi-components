import type { Meta, StoryObj } from '@storybook/react-vite';
import { Blockquote } from './blockquote';

const meta = {
    title: 'Components/Typography/Blockquote',
    component: Blockquote,
    tags: ['autodocs'],
    args: {
        children:
            'What is essential is invisible to the eye. It is only with the heart that one can see rightly.',
    },
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCitation: Story = {
    args: { cite: '— Antoine de Saint-Exupéry, The Little Prince' },
};

/** Without `cite` the footer is omitted and only the quote body renders. */
export const WithoutCitation: Story = {
    args: {
        children:
            'A quotation without an attribution renders just the quote body.',
    },
};
