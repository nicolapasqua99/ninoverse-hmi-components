import type { HTMLAttributes, ReactNode } from 'react';
import './styled/badge.styled.css';

export type BadgeVariant =
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
    dot?: boolean;
    children?: ReactNode;
};

export function Badge({
    variant = 'default',
    dot = false,
    className,
    children,
    ...rest
}: BadgeProps) {
    const tokens: string[] = ['badge'];
    if (variant !== 'default') tokens.push(`badge--${variant}`);
    if (className) tokens.push(className);

    return (
        <span className={tokens.join(' ')} {...rest}>
            {dot && <span className="badge__dot" aria-hidden="true" />}
            {children}
        </span>
    );
}
