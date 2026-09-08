import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './image';

/* public/ holds only theme CSS, so a real path would just demo the error
   fallback — these are the same inline SVG data URIs the demo page uses. */
const wide =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='360'%3E%3Crect width='480' height='360' fill='%23e87a5d'/%3E%3Ctext x='240' y='195' font-size='44' text-anchor='middle' fill='white' font-family='sans-serif'%3ENinoverse%3C/text%3E%3C/svg%3E";
const tall =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='420'%3E%3Crect width='300' height='420' fill='%231f5b58'/%3E%3Ctext x='150' y='220' font-size='40' text-anchor='middle' fill='white' font-family='sans-serif'%3EHMI%3C/text%3E%3C/svg%3E";

const meta = {
    title: 'Components/Data display/Image',
    component: Image,
    tags: ['autodocs'],
    args: { src: wide, alt: 'Cover artwork', ratio: 16 / 9 },
    render: (args) => (
        <div style={{ maxWidth: '40rem' }}>
            <Image {...args} />
        </div>
    ),
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `ratio` reserves space while loading so the layout doesn't shift. */
export const Default: Story = {};

export const Fit: Story = {
    render: (args) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 24rem)',
                gap: '2rem',
            }}
        >
            <Image {...args} fit="cover" src={tall} />
            <Image {...args} fit="contain" src={tall} />
        </div>
    ),
};

export const Radius: Story = {
    render: (args) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 16rem)',
                gap: '2rem',
            }}
        >
            <Image {...args} radius="small" ratio={1} />
            <Image {...args} radius="large" ratio={1} />
            <Image {...args} radius="full" ratio={1} />
        </div>
    ),
};

/** A source that fails renders `fallback`, or a broken-image icon by default. */
export const BrokenSource: Story = {
    args: { src: '/does-not-exist.png', alt: 'Missing artwork' },
};

/** `position` moves the visible crop when the image overflows its box. */
export const PositionTop: Story = {
    args: { src: tall, position: 'top', ratio: 16 / 9 },
};
