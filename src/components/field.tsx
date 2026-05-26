import type { HTMLAttributes, ReactNode } from 'react';
import './styled/field.styled.css';

export type FieldProps = HTMLAttributes<HTMLDivElement> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
};

export function Field({
    label,
    hint,
    error,
    className,
    children,
    ...rest
}: FieldProps) {
    const tokens: string[] = ['field'];
    if (className) tokens.push(className);
    const message = error ?? hint;

    return (
        <div className={tokens.join(' ')} {...rest}>
            {label && <span className="field__label">{label}</span>}
            {children}
            {message && (
                <span
                    className={
                        error ? 'field__hint field__hint--error' : 'field__hint'
                    }
                >
                    {message}
                </span>
            )}
        </div>
    );
}
