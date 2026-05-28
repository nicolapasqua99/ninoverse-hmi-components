import { type ReactNode, useEffect } from 'react';
import { Button } from './button';
import { Modal } from './modal';

export type ConfirmDialogVariant = 'default' | 'danger';

export type ConfirmDialogProps = {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title: ReactNode;
    description?: ReactNode;
    confirmLabel?: ReactNode;
    cancelLabel?: ReactNode;
    variant?: ConfirmDialogVariant;
    loading?: boolean;
    confirmDisabled?: boolean;
};

export function ConfirmDialog({
    open,
    onCancel,
    onConfirm,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    loading = false,
    confirmDisabled = false,
}: ConfirmDialogProps) {
    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.metaKey &&
                !event.ctrlKey &&
                !event.altKey
            ) {
                const target = event.target as HTMLElement | null;
                const tag = target?.tagName;
                // Skip Enter when focus is in a multiline input
                if (tag === 'TEXTAREA') return;
                event.preventDefault();
                if (!loading && !confirmDisabled) onConfirm();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
        };
    }, [open, loading, confirmDisabled, onConfirm]);

    if (!open) return null;

    return (
        <Modal
            open={open}
            onClose={onCancel}
            title={title}
            description={description}
            actions={
                <>
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={variant === 'danger' ? 'danger' : 'primary'}
                        onClick={onConfirm}
                        disabled={loading || confirmDisabled}
                    >
                        {confirmLabel}
                    </Button>
                </>
            }
        />
    );
}
