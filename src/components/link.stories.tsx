import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './link';
import { Text } from './text';

const meta = {
    title: 'Components/Typography/Link',
    component: Link,
    tags: ['autodocs'],
    args: { href: '#docs', children: 'documentation' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Underline: Story = {
    render: (args) => (
        <Text>
            Read the <Link {...args}>documentation</Link> for more, or{' '}
            <Link {...args} underline="hover">
                hover to underline
            </Link>
            , or a{' '}
            <Link {...args} underline="none">
                plain link
            </Link>
            .
        </Text>
    ),
};

/** `target="_blank"` gets `rel="noopener noreferrer"` automatically. */
export const TonesAndExternal: Story = {
    render: (args) => (
        <Text tone="muted">
            A{' '}
            <Link {...args} tone="muted">
                muted secondary link
            </Link>{' '}
            and an{' '}
            <Link {...args} href="https://example.com" target="_blank">
                external link
            </Link>{' '}
            (auto rel).
        </Text>
    ),
};
