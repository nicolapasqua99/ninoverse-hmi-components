import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './pagination';

/* Pagination holds no internal state — page, total and onChange are all
   required — so every story owns the current page. */
const meta = {
    title: 'Components/Navigation/Pagination',
    component: Pagination,
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

/** Under the windowing threshold every page button is shown. */
export const Short: Story = {
    render: (args) => {
        const [page, setPage] = useState(3);
        return (
            <Pagination {...args} onChange={setPage} page={page} total={5} />
        );
    },
};

/** Past it the list is windowed around the current page with ellipses. */
export const Long: Story = {
    render: (args) => {
        const [page, setPage] = useState(8);
        return (
            <Pagination {...args} onChange={setPage} page={page} total={20} />
        );
    },
};

/** The previous control is disabled on the first page, next on the last. */
export const AtFirstPage: Story = {
    render: (args) => {
        const [page, setPage] = useState(1);
        return (
            <Pagination {...args} onChange={setPage} page={page} total={12} />
        );
    },
};
