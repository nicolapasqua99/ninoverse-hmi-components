import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './styled/scrollArea.styled.css';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
    orientation?: ScrollAreaOrientation;
    maxHeight?: number | string;
    children?: ReactNode;
};

export function ScrollArea({
    orientation = 'vertical',
    maxHeight,
    className,
    style,
    children,
    ...rest
}: ScrollAreaProps) {
    const tokens: string[] = ['scroll-area', `scroll-area--${orientation}`];
    if (className) tokens.push(className);

    const mergedStyle: CSSProperties = {
        ...(maxHeight !== undefined ? { maxHeight } : null),
        ...style,
    };

    return (
        <div className={tokens.join(' ')} style={mergedStyle} {...rest}>
            {children}
        </div>
    );
}
