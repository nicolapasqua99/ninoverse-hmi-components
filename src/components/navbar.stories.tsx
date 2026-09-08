import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { Navbar } from './navbar';

const links = [
    { value: 'overview', label: 'Overview' },
    { value: 'reports', label: 'Reports' },
    { value: 'people', label: 'People' },
    { value: 'settings', label: 'Settings' },
];

const meta = {
    title: 'Components/Navigation/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    args: { brand: 'Ninoverse' },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A string `brand` renders a generated monogram beside the label. */
export const Default: Story = { args: { current: 'overview', links } };

export const WithActions: Story = {
    args: {
        current: 'reports',
        links,
        right: (
            <>
                <Button size="small" variant="ghost">
                    Sign in
                </Button>
                <Button size="small" variant="primary">
                    Get started
                </Button>
            </>
        ),
    },
};

/* current/onNav have no internal fallback, so the active link only moves when
   the consumer owns the state. */
export const Controlled: Story = {
    render: (args) => {
        const [current, setCurrent] = useState('reports');
        return (
            <Navbar
                {...args}
                current={current}
                links={links}
                onNav={setCurrent}
            />
        );
    },
};

/** `links` is optional — the bar collapses to just the brand and trailing slot. */
export const BrandOnly: Story = {};
