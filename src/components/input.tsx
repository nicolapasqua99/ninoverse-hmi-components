import type { ComponentPropsWithRef, ReactNode } from 'react';
import './styled/input.styled.css';

export type InputProps = ComponentPropsWithRef<'input'> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    error?: boolean;
};

export function Input({
    leftIcon,
    rightIcon,
    error = false,
    className,
    ref,
    ...rest
}: InputProps) {
    const tokens: string[] = ['input'];
    if (error) tokens.push('input--error');
    if (className) tokens.push(className);

    return (
        <span className={tokens.join(' ')}>
            {leftIcon && <span className="input__icon">{leftIcon}</span>}
            <input ref={ref} className="input__field" {...rest} />
            {rightIcon && <span className="input__icon">{rightIcon}</span>}
        </span>
    );
}
