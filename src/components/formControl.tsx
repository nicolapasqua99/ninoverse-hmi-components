import type { HTMLAttributes, ReactNode } from 'react';
import './styled/formControl.styled.css';

export type FormControlProps = HTMLAttributes<HTMLDivElement> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
};

export function FormControl({
    label,
    hint,
    error,
    className,
    children,
    ...rest
}: FormControlProps) {
    const tokens: string[] = ['form-control'];
    if (className) tokens.push(className);
    const message = error ?? hint;

    return (
        <div className={tokens.join(' ')} {...rest}>
            {label && <span className="form-control__label">{label}</span>}
            {children}
            {message && (
                <span
                    className={
                        error
                            ? 'form-control__hint form-control__hint--error'
                            : 'form-control__hint'
                    }
                >
                    {message}
                </span>
            )}
        </div>
    );
}
