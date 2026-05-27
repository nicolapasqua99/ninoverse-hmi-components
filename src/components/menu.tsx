import type { ComponentPropsWithRef, HTMLAttributes, ReactNode } from 'react';
import './styled/menu.styled.css';

export type MenuProps = HTMLAttributes<HTMLDivElement>;

export function Menu({ className, children, ...rest }: MenuProps) {
    const tokens: string[] = ['menu'];
    if (className) tokens.push(className);
    return (
        <div className={tokens.join(' ')} {...rest}>
            {children}
        </div>
    );
}

export type MenuItemProps = ComponentPropsWithRef<'button'> & {
    icon?: ReactNode;
    shortcut?: ReactNode;
    danger?: boolean;
};

export function MenuItem({
    icon,
    shortcut,
    danger = false,
    className,
    children,
    type = 'button',
    ref,
    ...rest
}: MenuItemProps) {
    const tokens: string[] = ['menu__item'];
    if (danger) tokens.push('menu__item--danger');
    if (className) tokens.push(className);
    return (
        <button ref={ref} type={type} className={tokens.join(' ')} {...rest}>
            {icon && <span className="menu__item-icon">{icon}</span>}
            <span className="menu__item-label">{children}</span>
            {shortcut && (
                <span className="menu__item-shortcut">{shortcut}</span>
            )}
        </button>
    );
}

export type MenuSeparatorProps = HTMLAttributes<HTMLHRElement>;

export function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
    const tokens: string[] = ['menu__sep'];
    if (className) tokens.push(className);
    return <hr className={tokens.join(' ')} {...rest} />;
}

export type MenuLabelProps = HTMLAttributes<HTMLDivElement>;

export function MenuLabel({ className, children, ...rest }: MenuLabelProps) {
    const tokens: string[] = ['menu__label'];
    if (className) tokens.push(className);
    return (
        <div className={tokens.join(' ')} {...rest}>
            {children}
        </div>
    );
}
