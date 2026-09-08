import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { type FileDescriptor, FileUpload } from './fileUpload';

/* Selection is entirely internal — there is no `value` prop, so a story cannot
   seed files. onChange emits serializable FileDescriptors, not File objects. */
const meta = {
    title: 'Components/Forms/FileUpload',
    component: FileUpload,
    tags: ['autodocs'],
    args: { 'aria-label': 'Project attachments' },
    render: (args) => (
        <div style={{ maxWidth: '55rem' }}>
            <FileUpload {...args} />
        </div>
    ),
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
    args: { multiple: true, hint: 'PNG, JPG, or PDF up to 10 MB each' },
};

/** `accept` is forwarded to the underlying file input. */
export const AcceptImages: Story = {
    args: { accept: 'image/*', hint: 'Images only' },
};

export const Disabled: Story = { args: { disabled: true } };

export const WithSelectionReadout: Story = {
    render: (args) => {
        const [files, setFiles] = useState<FileDescriptor[]>([]);
        return (
            <div style={{ maxWidth: '55rem' }}>
                <FileUpload {...args} multiple onChange={setFiles} />
                {files.length > 0 && (
                    <p style={{ color: 'var(--on-surface-variant)' }}>
                        {files.length} file{files.length === 1 ? '' : 's'}{' '}
                        selected
                    </p>
                )}
            </div>
        );
    },
};
