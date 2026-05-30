import './styled/sparkline.styled.css';

export type SparklineProps = {
    data: ReadonlyArray<number>;
    width?: number;
    height?: number;
    /** Line/area colour. Defaults to the primary token. */
    color?: string;
    strokeWidth?: number;
    /** Fill the area under the line. */
    area?: boolean;
    /** Show a dot at the last data point. */
    showDot?: boolean;
    /** Override the value range; defaults to the data's own min/max. */
    min?: number;
    max?: number;
    'aria-label'?: string;
};

/** Compact, axis-less trend line for inline contexts (table cells, cards).
 *  Pure SVG path math; the larger Cartesian charts reuse the same approach. */
export function Sparkline({
    data,
    width = 120,
    height = 32,
    color = 'var(--primary)',
    strokeWidth = 2,
    area = false,
    showDot = false,
    min,
    max,
    'aria-label': ariaLabel,
}: SparklineProps) {
    if (data.length === 0) return null;

    const pad = strokeWidth + (showDot ? 2 : 0);
    const lo = min ?? Math.min(...data);
    const hi = max ?? Math.max(...data);
    const span = hi - lo || 1;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;

    const points = data.map((value, i) => {
        const x =
            data.length === 1
                ? pad + innerW / 2
                : pad + (innerW * i) / (data.length - 1);
        const y = pad + innerH - ((value - lo) / span) * innerH;
        return [x, y] as const;
    });

    const line = points
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
        .join(' ');
    const last = points[points.length - 1];
    const first = points[0];
    const areaPath =
        first && last
            ? `${line} L${last[0]},${height - pad} L${first[0]},${height - pad} Z`
            : '';

    return (
        <svg
            className="sparkline"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={ariaLabel}
            style={{ color }}
        >
            {area && first && last && (
                <path className="sparkline__area" d={areaPath} fill={color} />
            )}
            <path
                className="sparkline__line"
                d={line}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {showDot && last && (
                <circle
                    className="sparkline__dot"
                    cx={last[0]}
                    cy={last[1]}
                    r={strokeWidth + 1}
                    fill={color}
                />
            )}
        </svg>
    );
}
