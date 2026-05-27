import {
    type DragEvent,
    type HTMLAttributes,
    type ReactNode,
    useState,
} from 'react';
import { Avatar } from './avatar';
import './styled/list.styled.css';

export type ListItem = {
    id: string | number;
    title?: ReactNode;
    subtitle?: ReactNode;
    avatar?: string;
    right?: ReactNode;
};

export type ListProps = HTMLAttributes<HTMLDivElement> & {
    items: ReadonlyArray<ListItem>;
    draggable?: boolean;
    onReorder?: (items: ListItem[]) => void;
    renderItem?: (item: ListItem, index: number) => ReactNode;
};

const DragIcon = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <title>Drag to reorder</title>
        <circle cx="6" cy="4" r="1.2" />
        <circle cx="10" cy="4" r="1.2" />
        <circle cx="6" cy="8" r="1.2" />
        <circle cx="10" cy="8" r="1.2" />
        <circle cx="6" cy="12" r="1.2" />
        <circle cx="10" cy="12" r="1.2" />
    </svg>
);

export function List({
    items,
    draggable = false,
    onReorder,
    renderItem,
    className,
    ...rest
}: ListProps) {
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const [overIdx, setOverIdx] = useState<number | null>(null);

    const tokens: string[] = ['list'];
    if (className) tokens.push(className);

    const handleDragStart =
        (i: number) => (event: DragEvent<HTMLDivElement>) => {
            setDragIdx(i);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', String(i));
        };
    const handleDragOver =
        (i: number) => (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setOverIdx(i);
        };
    const handleDrop = (i: number) => (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const from = dragIdx;
        setDragIdx(null);
        setOverIdx(null);
        if (from == null || from === i) return;
        const next = [...items];
        const [moved] = next.splice(from, 1);
        if (!moved) return;
        next.splice(i, 0, moved);
        onReorder?.(next);
    };
    const handleDragEnd = () => {
        setDragIdx(null);
        setOverIdx(null);
    };

    return (
        <div className={tokens.join(' ')} {...rest}>
            {items.map((item, i) => {
                const isDragging = dragIdx === i;
                const isDragOver = overIdx === i && dragIdx !== i;
                return (
                    // biome-ignore lint/a11y/noStaticElementInteractions: HTML5 drag-and-drop has no native ARIA role; reorder UX is the design's intent.
                    <div
                        key={item.id}
                        className="list__item"
                        draggable={draggable}
                        data-dragging={isDragging}
                        data-drag-over={isDragOver}
                        onDragStart={draggable ? handleDragStart(i) : undefined}
                        onDragOver={draggable ? handleDragOver(i) : undefined}
                        onDrop={draggable ? handleDrop(i) : undefined}
                        onDragEnd={draggable ? handleDragEnd : undefined}
                    >
                        {draggable && (
                            <span className="list__drag" aria-hidden="true">
                                <DragIcon />
                            </span>
                        )}
                        {renderItem ? (
                            renderItem(item, i)
                        ) : (
                            <>
                                {item.avatar && (
                                    <Avatar name={item.avatar} size="medium" />
                                )}
                                <div className="list__main">
                                    {item.title && (
                                        <p className="list__title">
                                            {item.title}
                                        </p>
                                    )}
                                    {item.subtitle && (
                                        <p className="list__subtitle">
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                                {item.right && (
                                    <div className="list__right">
                                        {item.right}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
