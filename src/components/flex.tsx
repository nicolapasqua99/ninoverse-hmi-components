import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './styled/flex.styled.css';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify =
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly';
export type FlexGap = 'none' | 'small' | 'medium' | 'large';

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
    as?: ElementType;
    direction?: FlexDirection;
    align?: FlexAlign;
    justify?: FlexJustify;
    gap?: FlexGap;
    wrap?: boolean;
    inline?: boolean;
    children?: ReactNode;
};

export function Flex({
    as: Component = 'div',
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    gap = 'none',
    wrap = false,
    inline = false,
    className,
    children,
    ...rest
}: FlexProps) {
    const tokens: string[] = ['flex'];
    if (inline) tokens.push('flex--inline');
    if (direction !== 'row') tokens.push(`flex--${direction}`);
    if (align !== 'stretch') tokens.push(`flex--align-${align}`);
    if (justify !== 'start') tokens.push(`flex--justify-${justify}`);
    if (gap !== 'none') tokens.push(`flex--gap-${gap}`);
    if (wrap) tokens.push('flex--wrap');
    if (className) tokens.push(className);

    return (
        <Component className={tokens.join(' ')} {...rest}>
            {children}
        </Component>
    );
}
