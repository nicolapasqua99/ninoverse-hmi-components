import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import './styled/text.styled.css';

export type TextSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextTone = 'default' | 'muted' | 'primary' | 'error' | 'inherit';
export type TextAlign = 'start' | 'center' | 'end';

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
    as?: ElementType;
    size?: TextSize;
    weight?: TextWeight;
    tone?: TextTone;
    align?: TextAlign;
    truncate?: boolean;
    children?: ReactNode;
};

export function Text({
    as: Component = 'p',
    size = 'medium',
    weight = 'regular',
    tone = 'default',
    align,
    truncate = false,
    className,
    children,
    ...rest
}: TextProps) {
    const tokens: string[] = ['text'];
    if (size !== 'medium') tokens.push(`text--size-${size}`);
    if (weight !== 'regular') tokens.push(`text--weight-${weight}`);
    if (tone !== 'default') tokens.push(`text--tone-${tone}`);
    if (align) tokens.push(`text--align-${align}`);
    if (truncate) tokens.push('text--truncate');
    if (className) tokens.push(className);

    return (
        <Component className={tokens.join(' ')} {...rest}>
            {children}
        </Component>
    );
}
