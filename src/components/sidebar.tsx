import type { HTMLAttributes, ReactNode } from 'react';
import { Badge, type BadgeVariant } from './badge';
import './styled/sidebar.styled.css';

export type SidebarItem<T extends string = string> = {
    value: T;
    label: ReactNode;
    icon?: ReactNode;
    href?: string;
    badge?: ReactNode;
    badgeVariant?: BadgeVariant;
};

export type SidebarGroup<T extends string = string> = {
    label?: ReactNode;
    items: ReadonlyArray<SidebarItem<T>>;
};

export type SidebarProps<T extends string = string> =
    HTMLAttributes<HTMLElement> & {
        groups: ReadonlyArray<SidebarGroup<T>>;
        current?: T;
        onNav?: (value: T) => void;
    };

export function Sidebar<T extends string = string>({
    groups,
    current,
    onNav,
    className,
    'aria-label': ariaLabel = 'Sidebar',
    ...rest
}: SidebarProps<T>) {
    const tokens: string[] = ['sidebar'];
    if (className) tokens.push(className);

    return (
        <aside className={tokens.join(' ')} aria-label={ariaLabel} {...rest}>
            {groups.map((group, groupIndex) => (
                <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: groups are a stable, ordered configuration prop
                    key={groupIndex}
                    className="sidebar__group"
                >
                    {group.label && (
                        <div className="sidebar__label">{group.label}</div>
                    )}
                    {group.items.map((item) => {
                        const isActive = current === item.value;
                        return (
                            <a
                                key={item.value}
                                href={item.href ?? '#'}
                                className="sidebar__link"
                                data-active={isActive}
                                {...(isActive
                                    ? { 'aria-current': 'page' }
                                    : {})}
                                onClick={(event) => {
                                    if (!item.href) {
                                        event.preventDefault();
                                    }
                                    onNav?.(item.value);
                                }}
                            >
                                {item.icon && (
                                    <span className="sidebar__icon">
                                        {item.icon}
                                    </span>
                                )}
                                <span className="sidebar__label-text">
                                    {item.label}
                                </span>
                                {item.badge != null && (
                                    <Badge
                                        variant={item.badgeVariant ?? 'default'}
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </a>
                        );
                    })}
                </div>
            ))}
        </aside>
    );
}
