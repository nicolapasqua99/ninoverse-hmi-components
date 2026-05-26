import type { ComponentPropsWithRef } from 'react';
import './styled/textarea.styled.css';

export type TextareaProps = ComponentPropsWithRef<'textarea'> & {
    error?: boolean;
};

export function Textarea({
    error = false,
    className,
    ref,
    ...rest
}: TextareaProps) {
    const tokens: string[] = ['textarea'];
    if (error) tokens.push('textarea--error');
    if (className) tokens.push(className);

    return <textarea ref={ref} className={tokens.join(' ')} {...rest} />;
}
