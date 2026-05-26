import type { ComponentPropsWithRef, ReactNode } from 'react';
import './styled/button.styled.css';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'soft'
    | 'danger'
    | 'link';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = ComponentPropsWithRef<'button'> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    asIcon?: boolean;
};

export function Button({
    variant = 'primary',
    size = 'medium',
    leftIcon,
    rightIcon,
    asIcon = false,
    className,
    children,
    type = 'button',
    ...rest
}: ButtonProps) {
    const tokens: string[] = ['button', `button--${variant}`];
    if (size !== 'medium') tokens.push(`button--${size}`);
    if (asIcon) tokens.push('button--icon');
    if (className) tokens.push(className);

    return (
        <button type={type} className={tokens.join(' ')} {...rest}>
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    );
}
