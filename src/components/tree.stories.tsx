import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tree, type TreeNode } from './tree';

const nodes: TreeNode[] = [
    {
        value: 'src',
        label: 'src',
        children: [
            {
                value: 'src/components',
                label: 'components',
                children: [
                    { value: 'button.tsx', label: 'button.tsx' },
                    { value: 'tree.tsx', label: 'tree.tsx' },
                ],
            },
            { value: 'src/index.ts', label: 'index.ts' },
        ],
    },
    {
        value: 'public',
        label: 'public',
        children: [
            {
                value: 'public/themes',
                label: 'themes',
                children: [{ value: 'default.css', label: 'default.css' }],
            },
        ],
    },
    { value: 'README.md', label: 'README.md' },
    {
        value: 'node_modules',
        label: 'node_modules',
        disabled: true,
        children: [{ value: 'react', label: 'react' }],
    },
];

const meta = {
    title: 'Components/Navigation/Tree',
    component: Tree,
    tags: ['autodocs'],
    args: { nodes, 'aria-label': 'Project files' },
    render: (args) => (
        <div style={{ width: '44rem' }}>
            <Tree {...args} />
        </div>
    ),
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Expansion and selection are independent axes, each with a `default*` sibling. */
export const Uncontrolled: Story = {
    args: {
        defaultExpanded: ['src', 'src/components'],
        defaultSelected: 'button.tsx',
    },
};

/** A `disabled` node cannot be selected or focused, but still expands. */
export const Collapsed: Story = {};

export const Controlled: Story = {
    render: (args) => {
        const [expanded, setExpanded] = useState<string[]>(['src']);
        const [selected, setSelected] = useState('src/index.ts');
        return (
            <div style={{ width: '44rem' }}>
                <Tree
                    {...args}
                    expanded={expanded}
                    onExpandedChange={setExpanded}
                    onSelect={setSelected}
                    selected={selected}
                />
            </div>
        );
    },
};
