import type { HTMLAttributes, ReactNode } from 'react';
import './styled/timeline.styled.css';

export type TimelineColor =
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error';

export type TimelineItem = {
    title: ReactNode;
    description?: ReactNode;
    time?: ReactNode;
    icon?: ReactNode;
    color?: TimelineColor;
};

export type TimelineProps = HTMLAttributes<HTMLOListElement> & {
    items: ReadonlyArray<TimelineItem>;
};

export function Timeline({ items, className, ...rest }: TimelineProps) {
    const tokens: string[] = ['timeline'];
    if (className) tokens.push(className);

    return (
        <ol className={tokens.join(' ')} {...rest}>
            {items.map((item, index) => {
                const itemKey =
                    typeof item.title === 'string'
                        ? item.title
                        : `item-${index}`;
                return (
                    <li
                        key={itemKey}
                        className="timeline__item"
                        data-color={item.color ?? 'default'}
                    >
                        <div className="timeline__marker">
                            {item.icon && (
                                <span className="timeline__icon">
                                    {item.icon}
                                </span>
                            )}
                        </div>
                        <div className="timeline__body">
                            <div className="timeline__head">
                                <span className="timeline__title">
                                    {item.title}
                                </span>
                                {item.time != null && (
                                    <span className="timeline__time">
                                        {item.time}
                                    </span>
                                )}
                            </div>
                            {item.description != null && (
                                <div className="timeline__desc">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
