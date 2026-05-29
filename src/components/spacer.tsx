import type { HTMLAttributes } from 'react';
import './styled/spacer.styled.css';

export type SpacerSize = 'small' | 'medium' | 'large';
export type SpacerAxis = 'vertical' | 'horizontal';

export type SpacerProps = HTMLAttributes<HTMLSpanElement> & {
    size?: SpacerSize;
    axis?: SpacerAxis;
    grow?: boolean;
};

export function Spacer({
    size = 'medium',
    axis = 'vertical',
    grow = false,
    className,
    ...rest
}: SpacerProps) {
    const tokens: string[] = ['spacer'];
    if (grow) tokens.push('spacer--grow');
    else tokens.push(`spacer--${axis === 'vertical' ? 'v' : 'h'}-${size}`);
    if (className) tokens.push(className);

    return <span aria-hidden="true" className={tokens.join(' ')} {...rest} />;
}
