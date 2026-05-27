import type { HTMLAttributes, ReactNode } from 'react';
import './styled/navbar.styled.css';

export type NavbarLink<T extends string = string> = {
    value: T;
    label: ReactNode;
    href?: string;
};

export type NavbarProps<T extends string = string> =
    HTMLAttributes<HTMLElement> & {
        brand?: ReactNode;
        links?: ReadonlyArray<NavbarLink<T>>;
        current?: T;
        onNav?: (value: T) => void;
        right?: ReactNode;
    };

export function Navbar<T extends string = string>({
    brand,
    links,
    current,
    onNav,
    right,
    className,
    'aria-label': ariaLabel = 'Main',
    ...rest
}: NavbarProps<T>) {
    const tokens: string[] = ['navbar'];
    if (className) tokens.push(className);

    return (
        <nav className={tokens.join(' ')} aria-label={ariaLabel} {...rest}>
            {brand !== undefined && (
                <span className="navbar__brand">
                    {typeof brand === 'string' ? (
                        <>
                            <span
                                className="navbar__brand-mark"
                                aria-hidden="true"
                            >
                                {brand.charAt(0).toLowerCase() || 'n'}
                            </span>
                            <span>{brand}</span>
                        </>
                    ) : (
                        brand
                    )}
                </span>
            )}
            {links && links.length > 0 && (
                <div className="navbar__links">
                    {links.map((link) => (
                        <a
                            key={link.value}
                            href={link.href ?? '#'}
                            className="navbar__link"
                            data-active={current === link.value}
                            {...(current === link.value
                                ? { 'aria-current': 'page' }
                                : {})}
                            onClick={(event) => {
                                if (!link.href) {
                                    event.preventDefault();
                                }
                                onNav?.(link.value);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
            {right && <div className="navbar__cta">{right}</div>}
        </nav>
    );
}
