import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './styled/box.styled.css';

export type BoxBackground =
    | 'none'
    | 'surface'
    | 'surface-variant'
    | 'surface-container'
    | 'surface-container-low'
    | 'surface-container-high';
export type BoxPadding = 'none' | 'small' | 'medium' | 'large';
export type BoxRadius = 'none' | 'small' | 'medium' | 'large' | 'full' | 'leaf';

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
    as?: ElementType;
    background?: BoxBackground;
    padding?: BoxPadding;
    radius?: BoxRadius;
    bordered?: boolean;
    children?: ReactNode;
};

export function Box({
    as: Component = 'div',
    background = 'none',
    padding = 'none',
    radius = 'none',
    bordered = false,
    className,
    children,
    ...rest
}: BoxProps) {
    const tokens: string[] = ['box'];
    if (background !== 'none') tokens.push(`box--bg-${background}`);
    if (padding !== 'none') tokens.push(`box--pad-${padding}`);
    if (radius !== 'none') tokens.push(`box--radius-${radius}`);
    if (bordered) tokens.push('box--bordered');
    if (className) tokens.push(className);

    return (
        <Component className={tokens.join(' ')} {...rest}>
            {children}
        </Component>
    );
}
