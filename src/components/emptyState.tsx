import type { HTMLAttributes, ReactNode } from 'react';
import './styled/emptyState.styled.css';

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
    icon?: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
};

export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
    ...rest
}: EmptyStateProps) {
    const tokens: string[] = ['empty-state'];
    if (className) tokens.push(className);
    return (
        <div className={tokens.join(' ')} {...rest}>
            {icon && (
                <div className="empty-state__icon" aria-hidden="true">
                    {icon}
                </div>
            )}
            <h3 className="empty-state__title">{title}</h3>
            {description && (
                <p className="empty-state__description">{description}</p>
            )}
            {action && <div className="empty-state__action">{action}</div>}
        </div>
    );
}
