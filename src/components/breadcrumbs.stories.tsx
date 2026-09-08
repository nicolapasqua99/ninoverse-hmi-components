import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './breadcrumbs';

const meta = {
    title: 'Components/Navigation/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    args: {
        items: [
            { label: 'Docs', href: '#' },
            { label: 'Guides', href: '#' },
            { label: 'Getting started' },
        ],
    },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The last item is rendered as the current page — its `href` is ignored. */
export const Default: Story = {};

export const CustomSeparator: Story = { args: { separator: '›' } };

/** `onClick` takes precedence over `href` and suppresses default navigation. */
export const ClickHandlers: Story = {
    args: {
        items: [
            { label: 'Home', onClick: () => {} },
            { label: 'Library', onClick: () => {} },
            { label: 'Components' },
        ],
    },
};
