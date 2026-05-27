import {
    Children,
    type CSSProperties,
    cloneElement,
    isValidElement,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
    type Ref,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import './styled/popover.styled.css';

export type PopoverAlign = 'start' | 'end';

type TriggerProps = {
    ref?: Ref<HTMLElement> | undefined;
    onClick?: ((event: MouseEvent<HTMLElement>) => void) | undefined;
    'aria-expanded'?: boolean | undefined;
    'aria-haspopup'?: boolean | undefined;
};

export type PopoverProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: ReactElement<TriggerProps>;
    children: ReactNode;
    align?: PopoverAlign;
    width?: number | string;
};

type AnchorPosition = {
    left: number;
    right: number;
    top: number;
    width: number;
};

export function Popover({
    open,
    onOpenChange,
    trigger,
    children,
    align = 'start',
    width,
}: PopoverProps) {
    const anchorRef = useRef<HTMLElement | null>(null);
    const popRef = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState<AnchorPosition>({
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    });

    useLayoutEffect(() => {
        if (!open) return;
        const update = () => {
            const a = anchorRef.current;
            if (!a) return;
            const r = a.getBoundingClientRect();
            setPos({
                left: r.left + window.scrollX,
                right:
                    document.documentElement.scrollWidth -
                    (r.right + window.scrollX),
                top: r.bottom + 6 + window.scrollY,
                width: r.width,
            });
        };
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onDown = (event: globalThis.MouseEvent) => {
            const target = event.target as Node | null;
            if (target && anchorRef.current?.contains(target)) return;
            if (target && popRef.current?.contains(target)) return;
            onOpenChange(false);
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onOpenChange(false);
        };
        // Defer registering the mousedown listener so the click that
        // opened the popover doesn't immediately close it.
        const handle = window.setTimeout(() => {
            document.addEventListener('mousedown', onDown);
        }, 0);
        document.addEventListener('keydown', onKey);
        return () => {
            window.clearTimeout(handle);
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, onOpenChange]);

    const only = Children.only(trigger);
    if (!isValidElement(only)) return null;

    const original = only.props;
    const triggerEl = cloneElement<TriggerProps>(only, {
        ref: anchorRef,
        onClick: (event: MouseEvent<HTMLElement>) => {
            original.onClick?.(event);
            onOpenChange(!open);
        },
        'aria-expanded': open,
        'aria-haspopup': true,
    });

    const style: CSSProperties = {
        top: pos.top,
        minWidth: width ?? pos.width,
        ...(align === 'end' ? { right: pos.right } : { left: pos.left }),
    };

    return (
        <>
            {triggerEl}
            {open &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        ref={popRef}
                        className="popover"
                        data-align={align}
                        style={style}
                    >
                        {children}
                    </div>,
                    document.body,
                )}
        </>
    );
}
