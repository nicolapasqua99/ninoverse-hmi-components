import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';
import { Table } from './table';

const rows = [
    {
        id: 'ada',
        name: 'Ada Lovelace',
        role: 'Analyst',
        commits: 142,
        status: 'active',
    },
    {
        id: 'alan',
        name: 'Alan Turing',
        role: 'Theoretician',
        commits: 87,
        status: 'pending',
    },
    {
        id: 'grace',
        name: 'Grace Hopper',
        role: 'Compiler',
        commits: 231,
        status: 'active',
    },
    {
        id: 'linus',
        name: 'Linus Torvalds',
        role: 'Maintainer',
        commits: 64,
        status: 'idle',
    },
];

/* Table is generic over the row shape (`key` is `keyof T & string`), and plain
   `satisfies Meta<typeof Table>` infers it from `rows` — `row` is typed inside
   `render` and `getRowKey` without any annotation. */
const meta = {
    title: 'Components/Data display/Table',
    component: Table,
    tags: ['autodocs'],
    args: {
        rows,
        getRowKey: (row) => String(row.id),
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'commits', label: 'Commits', style: { textAlign: 'right' } },
        ],
    },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Headers sort on click by default; `getRowKey` gives rows a stable identity. */
export const Default: Story = {};

/** A column `render` returns arbitrary nodes; `sortable: false` opts one column out. */
export const CustomCells: Story = {
    args: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'commits', label: 'Commits', style: { textAlign: 'right' } },
            {
                key: 'status',
                label: 'Status',
                sortable: false,
                render: (row) => (
                    <Badge
                        dot
                        variant={
                            row.status === 'active'
                                ? 'success'
                                : row.status === 'pending'
                                  ? 'warning'
                                  : 'default'
                        }
                    >
                        {String(row.status)}
                    </Badge>
                ),
            },
        ],
    },
};

/* `format` is the serializable counterpart to `render` — a {token} template
   resolved against the row, for consumers that cannot pass a function. */
export const FormattedCells: Story = {
    args: {
        columns: [
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role', format: '{value} ({name})' },
            { key: 'commits', label: 'Commits', format: '{value} commits' },
        ],
    },
};

export const NotSortable: Story = { args: { sortable: false } };
