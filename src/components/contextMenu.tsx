import {
    Children,
    cloneElement,
    isValidElement,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import './styled/contextMenu.styled.css';

type TriggerProps = {
    onContextMenu?: ((event: MouseEvent<HTMLElement>) => void) | undefined;
};

export type ContextMenuProps = {
    children: ReactElement<TriggerProps>;
    menu: ReactNode;
};

type Coords = { x: number; y: number };

export function ContextMenu({ children, menu }: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 });

    // Clamp the menu inside the viewport once it has measurable size, so a
    // right-click near an edge never opens a menu that overflows off-screen.
    useLayoutEffect(() => {
        if (!open) return;
        const el = menuRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const margin = 8;
        const maxX = window.innerWidth - r.width - margin;
        const maxY = window.innerHeight - r.height - margin;
        const x = Math.max(margin, Math.min(coords.x, maxX));
        const y = Math.max(margin, Math.min(coords.y, maxY));
        if (x !== coords.x || y !== coords.y) setCoords({ x, y });
    }, [open, coords]);

    useEffect(() => {
        if (!open) return;
        const onDown = (event: globalThis.MouseEvent) => {
            const target = event.target as Node | null;
            if (target && menuRef.current?.contains(target)) return;
            setOpen(false);
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        const onScroll = () => setOpen(false);
        // Activating an item (a <button>) runs its handler — which bubbles
        // first — then dismisses; clicking padding or a label keeps it open.
        const onClick = (event: globalThis.MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target || !menuRef.current?.contains(target)) return;
            if (target.closest('button')) setOpen(false);
        };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('click', onClick);
        document.addEventListener('keydown', onKey);
        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', onScroll);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('click', onClick);
            document.removeEventListener('keydown', onKey);
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onScroll);
        };
    }, [open]);

    const only = Children.only(children);
    if (!isValidElement(only)) return null;

    const original = only.props;
    const triggerEl = cloneElement<TriggerProps>(only, {
        onContextMenu: (event: MouseEvent<HTMLElement>) => {
            original.onContextMenu?.(event);
            event.preventDefault();
            setCoords({ x: event.clientX, y: event.clientY });
            setOpen(true);
        },
    });

    return (
        <>
            {triggerEl}
            {open &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="context-menu"
                        style={{ left: coords.x, top: coords.y }}
                    >
                        {menu}
                    </div>,
                    document.body,
                )}
        </>
    );
}
