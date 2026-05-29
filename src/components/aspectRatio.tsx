import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './styled/aspectRatio.styled.css';

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
    ratio?: number | string;
    children?: ReactNode;
};

export function AspectRatio({
    ratio = 1,
    className,
    style,
    children,
    ...rest
}: AspectRatioProps) {
    const tokens: string[] = ['aspect-ratio'];
    if (className) tokens.push(className);

    const mergedStyle: CSSProperties = { aspectRatio: ratio, ...style };

    return (
        <div className={tokens.join(' ')} style={mergedStyle} {...rest}>
            {children}
        </div>
    );
}
