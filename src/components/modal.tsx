import {
    type HTMLAttributes,
    type ReactNode,
    useEffect,
    useId,
    useRef,
} from 'react';
import { createPortal } from 'react-dom';
import './styled/modal.styled.css';

export type ModalSize = 'medium' | 'large';

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    description?: ReactNode;
    size?: ModalSize;
    actions?: ReactNode;
};

export function Modal({
    open,
    onClose,
    title,
    description,
    size = 'medium',
    actions,
    className,
    children,
    ...rest
}: ModalProps) {
    const titleId = useId();
    const descId = useId();
    const scrimRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;
        previouslyFocused.current =
            (document.activeElement as HTMLElement | null) ?? null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        modalRef.current?.focus();

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        const onScrimDown = (event: globalThis.MouseEvent) => {
            if (event.target === scrimRef.current) onClose();
        };
        document.addEventListener('keydown', onKey);
        const scrim = scrimRef.current;
        scrim?.addEventListener('mousedown', onScrimDown);
        return () => {
            document.removeEventListener('keydown', onKey);
            scrim?.removeEventListener('mousedown', onScrimDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused.current?.focus?.();
        };
    }, [open, onClose]);

    if (!open || typeof document === 'undefined') return null;

    const tokens: string[] = ['modal'];
    if (size !== 'medium') tokens.push(`modal--${size}`);
    if (className) tokens.push(className);

    return createPortal(
        <div ref={scrimRef} className="modal-scrim">
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                {...(title ? { 'aria-labelledby': titleId } : {})}
                {...(description ? { 'aria-describedby': descId } : {})}
                tabIndex={-1}
                className={tokens.join(' ')}
                {...rest}
            >
                {title && (
                    <h2 id={titleId} className="modal__title">
                        {title}
                    </h2>
                )}
                {description && (
                    <p id={descId} className="modal__description">
                        {description}
                    </p>
                )}
                {children}
                {actions && <div className="modal__actions">{actions}</div>}
            </div>
        </div>,
        document.body,
    );
}
