import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from './code';
import { Text } from './text';

const meta = {
    title: 'Components/Typography/Code',
    component: Code,
    tags: ['autodocs'],
    args: { children: 'pnpm add @ninoverse/hmi-components' },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
    render: (args) => (
        <Text>
            Install with <Code {...args} /> then import the <Code>Code</Code>{' '}
            component.
        </Text>
    ),
};

/** `block` renders `<pre><code>` for multi-line snippets. */
export const Block: Story = {
    args: {
        block: true,
        children: `import { Code } from '@ninoverse/hmi-components';

export function Example() {
    return <Code block>{'const x = 42;'}</Code>;
}`,
    },
};
