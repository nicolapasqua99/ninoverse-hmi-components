import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from './badge';
import { List, type ListItem } from './list';

const people: ListItem[] = [
    {
        id: 'ada',
        avatar: 'Ada Lovelace',
        title: 'Ada Lovelace',
        subtitle: 'Computing pioneer',
    },
    {
        id: 'alan',
        avatar: 'Alan Turing',
        title: 'Alan Turing',
        subtitle: 'Theoretical foundation',
    },
    {
        id: 'grace',
        avatar: 'Grace Hopper',
        title: 'Grace Hopper',
        subtitle: 'Compiler genealogy',
    },
    {
        id: 'linus',
        avatar: 'Linus Torvalds',
        title: 'Linus Torvalds',
        subtitle: 'Kernel maintainer',
    },
];

const meta = {
    title: 'Components/Data display/List',
    component: List,
    tags: ['autodocs'],
    args: { items: people },
    render: (args) => (
        <div style={{ maxWidth: '50rem' }}>
            <List {...args} />
        </div>
    ),
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `avatar` names a person; the default row renders an Avatar from it. */
export const Default: Story = {};

/** The `right` slot takes any node — here a status Badge. */
export const WithTrailingSlot: Story = {
    args: {
        items: people.slice(0, 3).map((item, index) => ({
            ...item,
            right: (
                <Badge variant={index === 0 ? 'success' : 'default'}>
                    {index === 0 ? 'Online' : 'Away'}
                </Badge>
            ),
        })),
    },
};

/* Dropping only fires onReorder — List does not hold the order itself, so the
   story has to feed the reordered items back in. */
export const Draggable: Story = {
    render: (args) => {
        const [items, setItems] = useState(people);
        return (
            <div style={{ maxWidth: '50rem' }}>
                <List {...args} draggable items={items} onReorder={setItems} />
            </div>
        );
    },
};

/** `renderItem` replaces the default row layout entirely. */
export const CustomRows: Story = {
    args: {
        renderItem: (item) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                }}
            >
                <strong>{item.title}</strong>
                <span style={{ color: 'var(--on-surface-variant)' }}>
                    {item.subtitle}
                </span>
            </div>
        ),
    },
};
