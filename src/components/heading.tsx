import type { HTMLAttributes, ReactNode } from 'react';
import './styled/heading.styled.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type HeadingTone = 'default' | 'muted' | 'primary' | 'inherit';

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
    level?: HeadingLevel;
    size?: HeadingSize;
    tone?: HeadingTone;
    truncate?: boolean;
    children?: ReactNode;
};

const SIZE_FOR_LEVEL: Record<HeadingLevel, HeadingSize> = {
    1: 'xlarge',
    2: 'large',
    3: 'medium',
    4: 'small',
    5: 'small',
    6: 'xsmall',
};

export function Heading({
    level = 2,
    size,
    tone = 'default',
    truncate = false,
    className,
    children,
    ...rest
}: HeadingProps) {
    const Component = `h${level}` as const;
    const resolvedSize = size ?? SIZE_FOR_LEVEL[level];

    const tokens: string[] = ['heading', `heading--size-${resolvedSize}`];
    if (tone !== 'default') tokens.push(`heading--tone-${tone}`);
    if (truncate) tokens.push('heading--truncate');
    if (className) tokens.push(className);

    return (
        <Component className={tokens.join(' ')} {...rest}>
            {children}
        </Component>
    );
}
