import type { HTMLAttributes, ReactNode } from 'react';
import './styled/stat.styled.css';

export type StatTrend = 'up' | 'down' | 'neutral';
export type StatSize = 'medium' | 'large';

export type StatProps = HTMLAttributes<HTMLDivElement> & {
    label: ReactNode;
    value: ReactNode;
    delta?: ReactNode;
    trend?: StatTrend;
    description?: ReactNode;
    icon?: ReactNode;
    chart?: ReactNode;
    size?: StatSize;
};

const TrendIcon = ({ trend }: { trend: StatTrend }) => {
    if (trend === 'neutral') {
        return (
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
            >
                <title>Neutral</title>
                <path d="M3 8h10" />
            </svg>
        );
    }
    if (trend === 'up') {
        return (
            <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <title>Up</title>
                <path d="M3 10l5-5 5 5" />
            </svg>
        );
    }
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <title>Down</title>
            <path d="M3 6l5 5 5-5" />
        </svg>
    );
};

export function Stat({
    label,
    value,
    delta,
    trend,
    description,
    icon,
    chart,
    size = 'medium',
    className,
    ...rest
}: StatProps) {
    const tokens: string[] = ['stat', `stat--${size}`];
    if (className) tokens.push(className);

    return (
        <div className={tokens.join(' ')} {...rest}>
            <div className="stat__header">
                {icon && (
                    <span className="stat__icon" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span className="stat__label">{label}</span>
            </div>
            <div className="stat__value-row">
                <span className="stat__value">{value}</span>
                {delta !== undefined && (
                    <span
                        className="stat__delta"
                        data-trend={trend ?? 'neutral'}
                    >
                        <span className="stat__delta-icon" aria-hidden="true">
                            <TrendIcon trend={trend ?? 'neutral'} />
                        </span>
                        <span className="stat__delta-value">{delta}</span>
                    </span>
                )}
            </div>
            {description && <p className="stat__description">{description}</p>}
            {chart && <div className="stat__chart">{chart}</div>}
        </div>
    );
}
