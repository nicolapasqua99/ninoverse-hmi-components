import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip } from './chip';

const meta = {
    title: 'Components/Data display/Chip',
    component: Chip,
    tags: ['autodocs'],
    args: { children: 'react' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { selected: true, onSelect: () => {} } };

/* Chip holds no state — `selected` only reflects what it is given, so a
   filter row has to own the set. */
export const SelectableFilters: Story = {
    render: (args) => {
        const [filters, setFilters] = useState(
            new Set(['react', 'typescript']),
        );
        const toggle = (key: string) =>
            setFilters((prev) => {
                const next = new Set(prev);
                if (next.has(key)) next.delete(key);
                else next.add(key);
                return next;
            });
        return (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['react', 'typescript', 'vite', 'biome', 'storybook'].map(
                    (key) => (
                        <Chip
                            {...args}
                            key={key}
                            onSelect={() => toggle(key)}
                            selected={filters.has(key)}
                        >
                            {key}
                        </Chip>
                    ),
                )}
            </div>
        );
    },
};

/** `onClose` renders a trailing remove button. */
export const Removable: Story = {
    render: (args) => {
        const [tags, setTags] = useState(['design', 'tokens', 'a11y', 'docs']);
        return (
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    minHeight: '4rem',
                }}
            >
                {tags.map((tag) => (
                    <Chip
                        {...args}
                        key={tag}
                        onClose={() =>
                            setTags((prev) => prev.filter((t) => t !== tag))
                        }
                    >
                        {tag}
                    </Chip>
                ))}
            </div>
        );
    },
};
