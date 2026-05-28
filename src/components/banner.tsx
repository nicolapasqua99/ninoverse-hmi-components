import type { HTMLAttributes, ReactNode } from 'react';
import './styled/banner.styled.css';

export type BannerVariant = 'info' | 'success' | 'warning' | 'danger';

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
    variant?: BannerVariant;
    title?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
};

const InfoIcon = () => (
    <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>Info</title>
        <circle cx="10" cy="10" r="8" />
        <path d="M10 9v5M10 6.5v.01" />
    </svg>
);

const SuccessIcon = () => (
    <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>Success</title>
        <circle cx="10" cy="10" r="8" />
        <path d="M6.5 10l2.5 2.5 4.5-5" />
    </svg>
);

const WarningIcon = () => (
    <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>Warning</title>
        <path d="M10 2.5L18 16.5H2L10 2.5z" />
        <path d="M10 8v4M10 14.5v.01" />
    </svg>
);

const DangerIcon = () => (
    <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden="true"
    >
        <title>Error</title>
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4M10 13.5v.01" />
    </svg>
);

const VARIANT_ICONS = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    danger: DangerIcon,
} as const;

export function Banner({
    variant = 'info',
    title,
    icon,
    action,
    onDismiss,
    dismissLabel = 'Dismiss',
    className,
    children,
    ...rest
}: BannerProps) {
    const tokens: string[] = ['banner', `banner--${variant}`];
    if (className) tokens.push(className);
    const VariantIcon = VARIANT_ICONS[variant];
    const role =
        variant === 'danger' || variant === 'warning' ? 'alert' : 'status';

    return (
        <div className={tokens.join(' ')} role={role} {...rest}>
            <span className="banner__icon" aria-hidden="true">
                {icon ?? <VariantIcon />}
            </span>
            <div className="banner__content">
                {title && <p className="banner__title">{title}</p>}
                {children && <p className="banner__body">{children}</p>}
            </div>
            {action && <span className="banner__action">{action}</span>}
            {onDismiss && (
                <button
                    type="button"
                    className="banner__dismiss"
                    aria-label={dismissLabel}
                    onClick={onDismiss}
                >
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <title>Dismiss</title>
                        <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                </button>
            )}
        </div>
    );
}
