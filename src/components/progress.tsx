import type { HTMLAttributes } from 'react';
import './styled/progress.styled.css';

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
    value?: number;
    indeterminate?: boolean;
    label?: string;
};

export function Progress({
    value = 0,
    indeterminate = false,
    label,
    className,
    style,
    ...rest
}: ProgressProps) {
    const clamped = Math.max(0, Math.min(100, value));
    const tokens: string[] = ['progress'];
    if (indeterminate) tokens.push('progress--indeterminate');
    if (className) tokens.push(className);

    return (
        <div
            className={tokens.join(' ')}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={indeterminate ? undefined : clamped}
            aria-label={label}
            style={style}
            {...rest}
        >
            <div
                className="progress__bar"
                style={indeterminate ? undefined : { width: `${clamped}%` }}
            />
        </div>
    );
}
