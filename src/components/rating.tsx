import { type CSSProperties, type KeyboardEvent, useState } from 'react';
import './styled/rating.styled.css';

export type RatingSize = 'small' | 'medium' | 'large';

export type RatingProps = {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    max?: number;
    allowHalf?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    size?: RatingSize;
    'aria-label'?: string;
};

const StarSvg = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <title>Star</title>
        <path d="M12 2.5l2.94 6.5 7.06.6-5.34 4.76 1.63 6.94L12 17.6 5.71 21.3 7.34 14.36 2 9.6l7.06-.6L12 2.5z" />
    </svg>
);

export function Rating({
    value,
    defaultValue,
    onChange,
    max = 5,
    allowHalf = false,
    readOnly = false,
    disabled = false,
    size = 'medium',
    'aria-label': ariaLabel = 'Rating',
}: RatingProps) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<number>(defaultValue ?? 0);
    const [hover, setHover] = useState<number | null>(null);

    const current = isControlled ? value : internal;
    const display = hover ?? current;
    const fillPct = Math.max(0, Math.min(1, display / max)) * 100;

    const tokens: string[] = ['rating', `rating--${size}`];
    if (disabled) tokens.push('rating--disabled');
    if (readOnly) tokens.push('rating--readonly');

    const commit = (next: number) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const interactive = !readOnly && !disabled;
    const stepValue = allowHalf ? 0.5 : 1;

    const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!interactive) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            commit(Math.min(max, current + stepValue));
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            commit(Math.max(0, current - stepValue));
        } else if (event.key === 'Home') {
            event.preventDefault();
            commit(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            commit(max);
        }
    };

    const stars = Array.from({ length: max }, (_, i) => i + 1);

    const fillStyle: CSSProperties = {
        width: `${fillPct}%`,
    };

    return (
        <div
            role="slider"
            aria-label={ariaLabel}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={current}
            aria-valuetext={`${current} out of ${max} stars`}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            tabIndex={interactive ? 0 : -1}
            className={tokens.join(' ')}
            onKeyDown={onKey}
            onMouseLeave={() => setHover(null)}
        >
            <div className="rating__row rating__row--bg" aria-hidden="true">
                {stars.map((s) => (
                    <span key={s} className="rating__star">
                        <StarSvg />
                    </span>
                ))}
            </div>
            <div
                className="rating__row rating__row--fg"
                aria-hidden="true"
                style={fillStyle}
            >
                {stars.map((s) => (
                    <span key={s} className="rating__star">
                        <StarSvg />
                    </span>
                ))}
            </div>
            {interactive && (
                <div className="rating__overlay">
                    {stars.map((s) => {
                        if (allowHalf) {
                            return (
                                <span key={s} className="rating__cell">
                                    <button
                                        type="button"
                                        className="rating__half rating__half--left"
                                        aria-label={`${s - 0.5} stars`}
                                        tabIndex={-1}
                                        onClick={() => commit(s - 0.5)}
                                        onMouseEnter={() => setHover(s - 0.5)}
                                    />
                                    <button
                                        type="button"
                                        className="rating__half rating__half--right"
                                        aria-label={`${s} stars`}
                                        tabIndex={-1}
                                        onClick={() => commit(s)}
                                        onMouseEnter={() => setHover(s)}
                                    />
                                </span>
                            );
                        }
                        return (
                            <span key={s} className="rating__cell">
                                <button
                                    type="button"
                                    className="rating__full"
                                    aria-label={`${s} stars`}
                                    tabIndex={-1}
                                    onClick={() => commit(s)}
                                    onMouseEnter={() => setHover(s)}
                                />
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
