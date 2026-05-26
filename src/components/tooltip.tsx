import {
    Children,
    cloneElement,
    type FocusEvent,
    isValidElement,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
    type Ref,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import './styled/tooltip.styled.css';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

type TriggerProps = {
    ref?: Ref<HTMLElement> | undefined;
    onMouseEnter?: ((event: MouseEvent<HTMLElement>) => void) | undefined;
    onMouseLeave?: ((event: MouseEvent<HTMLElement>) => void) | undefined;
    onFocus?: ((event: FocusEvent<HTMLElement>) => void) | undefined;
    onBlur?: ((event: FocusEvent<HTMLElement>) => void) | undefined;
    'aria-describedby'?: string | undefined;
};

export type TooltipProps = {
    label: ReactNode;
    side?: TooltipSide;
    delay?: number;
    children: ReactElement<TriggerProps>;
};

type Position = { x: number; y: number; transform: string };

export function Tooltip({
    label,
    side = 'top',
    delay = 200,
    children,
}: TooltipProps) {
    const id = useId();
    const triggerRef = useRef<HTMLElement | null>(null);
    const timer = useRef<number | null>(null);
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState<Position>({ x: 0, y: 0, transform: '' });

    const place = useCallback(() => {
        const el = triggerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const gap = 8;
        const sx = window.scrollX;
        const sy = window.scrollY;
        const cx = r.left + r.width / 2 + sx;
        const cy = r.top + r.height / 2 + sy;
        if (side === 'top') {
            setPos({
                x: cx,
                y: r.top - gap + sy,
                transform: 'translate(-50%, -100%)',
            });
        } else if (side === 'bottom') {
            setPos({
                x: cx,
                y: r.bottom + gap + sy,
                transform: 'translate(-50%, 0)',
            });
        } else if (side === 'left') {
            setPos({
                x: r.left - gap + sx,
                y: cy,
                transform: 'translate(-100%, -50%)',
            });
        } else {
            setPos({
                x: r.right + gap + sx,
                y: cy,
                transform: 'translate(0, -50%)',
            });
        }
    }, [side]);

    useEffect(() => {
        return () => {
            if (timer.current !== null) window.clearTimeout(timer.current);
        };
    }, []);

    const open = useCallback(() => {
        if (timer.current !== null) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            place();
            setShow(true);
        }, delay);
    }, [delay, place]);

    const close = useCallback(() => {
        if (timer.current !== null) window.clearTimeout(timer.current);
        setShow(false);
    }, []);

    const only = Children.only(children);
    if (!isValidElement(only)) return null;

    const original = only.props;

    const trigger = cloneElement<TriggerProps>(only, {
        ref: triggerRef,
        onMouseEnter: (event: MouseEvent<HTMLElement>) => {
            original.onMouseEnter?.(event);
            open();
        },
        onMouseLeave: (event: MouseEvent<HTMLElement>) => {
            original.onMouseLeave?.(event);
            close();
        },
        onFocus: (event: FocusEvent<HTMLElement>) => {
            original.onFocus?.(event);
            open();
        },
        onBlur: (event: FocusEvent<HTMLElement>) => {
            original.onBlur?.(event);
            close();
        },
        'aria-describedby': show ? id : original['aria-describedby'],
    });

    return (
        <>
            {trigger}
            {show &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        className="tooltip-anchor"
                        style={{
                            left: pos.x,
                            top: pos.y,
                            transform: pos.transform,
                        }}
                    >
                        <div
                            id={id}
                            role="tooltip"
                            className="tooltip"
                            data-side={side}
                        >
                            {label}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
}
