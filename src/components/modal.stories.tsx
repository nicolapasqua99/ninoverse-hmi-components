import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './button';
import { FormControl } from './formControl';
import { Input } from './input';
import { Modal } from './modal';
import { Textarea } from './textarea';

/* Modal has no trigger of its own and returns null while closed, so each story
   owns a Button plus the open state. Keeping them closed by default also stops
   the autodocs page — which mounts every story at once — from stacking scrims. */
const meta = {
    title: 'Components/Overlays/Modal',
    component: Modal,
    tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
/* These stories drive the component from `render` rather than args, so the
   required props (Modal needs several) never appear in meta.args. Typing
   against the component instead of the meta keeps args partial. */
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal
                    {...args}
                    actions={
                        <>
                            <Button
                                onClick={() => setOpen(false)}
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => setOpen(false)}
                                variant="primary"
                            >
                                Publish
                            </Button>
                        </>
                    }
                    description="This will make the post visible to anyone with the link."
                    onClose={() => setOpen(false)}
                    open={open}
                    title="Confirm publish"
                >
                    <p
                        style={{
                            margin: 0,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        You can change visibility back to private at any time
                        from the post's settings menu.
                    </p>
                </Modal>
            </>
        );
    },
};

export const Large: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)} variant="secondary">
                    Open large modal
                </Button>
                <Modal
                    {...args}
                    actions={
                        <Button
                            onClick={() => setOpen(false)}
                            variant="primary"
                        >
                            Done
                        </Button>
                    }
                    description="Long-form content lives comfortably in the large variant."
                    onClose={() => setOpen(false)}
                    open={open}
                    size="large"
                    title="Workspace settings"
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                        }}
                    >
                        <FormControl label="Display name">
                            <Input defaultValue="Ninoverse" />
                        </FormControl>
                        <FormControl label="Notes">
                            <Textarea defaultValue="Anything you'd like to remember about this workspace." />
                        </FormControl>
                    </div>
                </Modal>
            </>
        );
    },
};

/* `actions` also accepts a serializable DialogAction[] paired with onAction —
   the form that survives the Web Component boundary, where a JSX node cannot. */
export const DeclarativeActions: Story = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [chosen, setChosen] = useState('none');
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <p style={{ color: 'var(--on-surface-variant)' }}>
                    Last action: {chosen}
                </p>
                <Modal
                    {...args}
                    actions={[
                        {
                            label: 'Cancel',
                            value: 'cancel',
                            variant: 'secondary',
                        },
                        { label: 'Delete', value: 'delete', variant: 'danger' },
                    ]}
                    onAction={(value) => {
                        setChosen(value);
                        setOpen(false);
                    }}
                    onClose={() => setOpen(false)}
                    open={open}
                    title="Delete workspace?"
                >
                    <p
                        style={{
                            margin: 0,
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Actions given as data rather than JSX, so `onAction`
                        receives the chosen value.
                    </p>
                </Modal>
            </>
        );
    },
};
