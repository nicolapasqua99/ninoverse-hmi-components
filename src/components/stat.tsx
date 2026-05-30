import type { HTMLAttributes, ReactNode } from 'react';
import './styled/stat.styled.css';

export type StatTrend = 'up' | 'down' | 'neutral';

export type StatProps = HTMLAttributes<HTMLDivElement> & {
    label: ReactNode;
    value: ReactNode;
    icon?: ReactNode;
    trend?: StatTrend;
    delta?: ReactNode;
    helpText?: ReactNode;
};

const TrendIcon = ({ trend }: { trend: StatTrend }) => {
    const path =
        trend === 'up'
            ? 'M3 11l5-5 5 5'
            : trend === 'down'
              ? 'M3 5l5 5 5-5'
              : 'M3 8h10';
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
            <title>{trend}</title>
            <path d={path} />
        </svg>
    );
};

export function Stat({
    label,
    value,
    icon,
    trend,
    delta,
    helpText,
    className,
    ...rest
}: StatProps) {
    const tokens: string[] = ['stat'];
    if (className) tokens.push(className);

    return (
        <div className={tokens.join(' ')} {...rest}>
            <div className="stat__header">
                <span className="stat__label">{label}</span>
                {icon && <span className="stat__icon">{icon}</span>}
            </div>
            <div className="stat__value">{value}</div>
            {(delta != null || helpText != null) && (
                <div className="stat__footer">
                    {delta != null && trend && (
                        <span className="stat__delta" data-trend={trend}>
                            <TrendIcon trend={trend} />
                            {delta}
                        </span>
                    )}
                    {helpText != null && (
                        <span className="stat__help">{helpText}</span>
                    )}
                </div>
            )}
        </div>
    );
}
