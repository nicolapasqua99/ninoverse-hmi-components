import type { Meta, StoryObj } from '@storybook/react-vite';
import { CartesianGrid } from './cartesianGrid';

/* CartesianGrid returns a bare <g> of lines, so it is invalid outside an <svg>
   and every story supplies one. width/height have no defaults, and the stroke
   is var(--outline-variant) — invisible against a same-tone background, hence
   the explicit surface fill. */
const WIDTH = 520;
const HEIGHT = 260;

const meta = {
    title: 'Charts/CartesianGrid',
    component: CartesianGrid,
    tags: ['autodocs'],
    args: { width: WIDTH, height: HEIGHT, rows: 4, cols: 6, padding: 16 },
    render: (args) => (
        <svg
            width={WIDTH}
            height={HEIGHT}
            style={{
                background: 'var(--surface-container-low)',
                borderRadius: '1rem',
            }}
            role="img"
            aria-label="Cartesian grid example"
        >
            <title>Cartesian grid example</title>
            <CartesianGrid {...args} />
        </svg>
    ),
} satisfies Meta<typeof CartesianGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `horizontal` / `vertical` restrict the grid to one axis. */
export const HorizontalOnly: Story = { args: { vertical: false } };

export const VerticalOnly: Story = { args: { horizontal: false } };

export const Dense: Story = { args: { rows: 8, cols: 12 } };
