import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './styled/visuallyHidden.styled.css';

export type VisuallyHiddenProps = HTMLAttributes<HTMLElement> & {
    as?: ElementType;
    children?: ReactNode;
};

export function VisuallyHidden({
    as: Component = 'span',
    className,
    children,
    ...rest
}: VisuallyHiddenProps) {
    const tokens: string[] = ['visually-hidden'];
    if (className) tokens.push(className);

    return (
        <Component className={tokens.join(' ')} {...rest}>
            {children}
        </Component>
    );
}
