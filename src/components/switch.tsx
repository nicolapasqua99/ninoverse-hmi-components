import type { ComponentPropsWithRef, ReactNode } from 'react';
import './styled/switch.styled.css';

export type SwitchProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
    label?: ReactNode;
};

export function Switch({ label, className, ref, ...rest }: SwitchProps) {
    const tokens: string[] = ['switch'];
    if (className) tokens.push(className);

    return (
        <label className={tokens.join(' ')}>
            <input
                ref={ref}
                type="checkbox"
                className="switch__input"
                {...rest}
            />
            <span className="switch__track" aria-hidden="true">
                <span className="switch__thumb" />
            </span>
            {label && <span className="switch__label">{label}</span>}
        </label>
    );
}
