import type { HTMLAttributes } from 'react';
import { Avatar, type AvatarSize } from './avatar';
import './styled/avatar.styled.css';

export type AvatarStackProps = HTMLAttributes<HTMLSpanElement> & {
    names: ReadonlyArray<string>;
    max?: number;
    size?: AvatarSize;
};

export function AvatarStack({
    names,
    max = 4,
    size = 'medium',
    className,
    ...rest
}: AvatarStackProps) {
    const tokens: string[] = ['avatar-stack'];
    if (className) tokens.push(className);

    const shown = names.slice(0, max);
    const extra = names.length - shown.length;
    const overflowCls = size !== 'medium' ? `avatar avatar--${size}` : 'avatar';

    return (
        <span className={tokens.join(' ')} {...rest}>
            {shown.map((name, index) => (
                <Avatar
                    // biome-ignore lint/suspicious/noArrayIndexKey: names may repeat; index keeps order stable
                    key={`${name}-${index}`}
                    name={name}
                    size={size}
                />
            ))}
            {extra > 0 && (
                <span
                    className={`${overflowCls} avatar--overflow`}
                    role="img"
                    aria-label={`${extra} more`}
                >
                    +{extra}
                </span>
            )}
        </span>
    );
}
