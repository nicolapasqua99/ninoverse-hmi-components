import type { ComponentPropsWithRef, ReactNode } from 'react';
import './styled/button.styled.css';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'soft'
    | 'danger'
    | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = ComponentPropsWithRef<'button'> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconRight?: ReactNode;
    asIcon?: boolean;
};

export function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    asIcon = false,
    className,
    children,
    type = 'button',
    ...rest
}: ButtonProps) {
    const tokens: string[] = ['btn', `btn--${variant}`];
    if (size !== 'md') tokens.push(`btn--${size}`);
    if (asIcon) tokens.push('btn--icon');
    if (className) tokens.push(className);

    return (
        <button type={type} className={tokens.join(' ')} {...rest}>
            {icon}
            {children}
            {iconRight}
        </button>
    );
}
