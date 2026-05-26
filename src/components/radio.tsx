import type { ComponentPropsWithRef, ReactNode } from 'react';
import './styled/radio.styled.css';

export type RadioProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
    label?: ReactNode;
};

export function Radio({ label, className, ref, ...rest }: RadioProps) {
    const tokens: string[] = ['radio'];
    if (className) tokens.push(className);

    return (
        <label className={tokens.join(' ')}>
            <input ref={ref} type="radio" className="radio__input" {...rest} />
            <span className="radio__box" aria-hidden="true" />
            {label && <span className="radio__label">{label}</span>}
        </label>
    );
}
