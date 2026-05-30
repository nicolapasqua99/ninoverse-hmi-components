import {
    type CSSProperties,
    type ImgHTMLAttributes,
    type ReactNode,
    useState,
} from 'react';
import './styled/image.styled.css';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ImageRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

type ImageOwnProps = {
    src: string;
    alt: string;
    ratio?: number;
    fit?: ImageFit;
    radius?: ImageRadius;
    width?: number | string;
    height?: number | string;
    fallback?: ReactNode;
};

export type ImageProps = ImageOwnProps &
    Omit<ImgHTMLAttributes<HTMLImageElement>, keyof ImageOwnProps>;

export function Image({
    src,
    alt,
    ratio,
    fit = 'cover',
    radius = 'medium',
    width,
    height,
    fallback,
    className,
    loading = 'lazy',
    ...rest
}: ImageProps) {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
        'loading',
    );

    const tokens: string[] = ['image', `image--radius-${radius}`];
    if (className) tokens.push(className);

    const style: CSSProperties = {
        width,
        height,
        ...(ratio ? { aspectRatio: ratio } : {}),
    };

    return (
        <div className={tokens.join(' ')} style={style} data-status={status}>
            {status !== 'error' && (
                <img
                    className="image__img"
                    src={src}
                    alt={alt}
                    loading={loading}
                    style={{ objectFit: fit }}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                    {...rest}
                />
            )}
            {status === 'loading' && (
                <span className="image__loader" aria-hidden="true" />
            )}
            {status === 'error' && (
                <span className="image__fallback">
                    {fallback ?? <BrokenIcon />}
                </span>
            )}
        </div>
    );
}

const BrokenIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <title>Image unavailable</title>
        <path d="M3 5h18v14H3z" />
        <path d="M3 15l5-5 4 4 3-3 6 6" />
        <circle cx="8.5" cy="9" r="1.5" />
    </svg>
);
