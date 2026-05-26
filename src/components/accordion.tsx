import { type HTMLAttributes, type ReactNode, useId, useState } from 'react';
import './styled/accordion.styled.css';

export type AccordionItem = {
    title: ReactNode;
    body: ReactNode;
    disabled?: boolean;
};

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
    items: ReadonlyArray<AccordionItem>;
    multiple?: boolean;
    defaultOpen?: ReadonlyArray<number>;
};

const ChevronIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>Expand</title>
        <path d="M4 6l4 4 4-4" />
    </svg>
);

export function Accordion({
    items,
    multiple = false,
    defaultOpen,
    className,
    ...rest
}: AccordionProps) {
    const idRoot = useId();
    const [open, setOpen] = useState<ReadonlySet<number>>(
        () => new Set(defaultOpen ?? []),
    );

    const toggle = (index: number) => {
        setOpen((prev) => {
            const next = new Set(multiple ? prev : []);
            if (prev.has(index)) {
                next.delete(index);
            } else {
                if (!multiple) next.clear();
                next.add(index);
            }
            return next;
        });
    };

    const tokens: string[] = ['acc'];
    if (className) tokens.push(className);

    return (
        <div className={tokens.join(' ')} {...rest}>
            {items.map((item, i) => {
                const isOpen = open.has(i);
                const headerId = `${idRoot}-h-${i}`;
                const panelId = `${idRoot}-p-${i}`;
                return (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: items array is the stable identity at this layer
                        key={i}
                        className="acc__item"
                    >
                        <button
                            type="button"
                            id={headerId}
                            className="acc__trigger"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            disabled={item.disabled}
                            onClick={() => toggle(i)}
                        >
                            <span className="acc__title">{item.title}</span>
                            <span className="acc__chev">
                                <ChevronIcon />
                            </span>
                        </button>
                        <section
                            id={panelId}
                            aria-labelledby={headerId}
                            className="acc__panel"
                            data-open={isOpen}
                        >
                            <div className="acc__panel-inner">
                                <div className="acc__panel-body">
                                    {item.body}
                                </div>
                            </div>
                        </section>
                    </div>
                );
            })}
        </div>
    );
}
