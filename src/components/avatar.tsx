import type { HTMLAttributes } from 'react';
import './styled/avatar.styled.css';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export type AvatarStatus = 'online' | 'away' | 'offline';

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
    name: string;
    src?: string;
    size?: AvatarSize;
    status?: AvatarStatus;
};

/** Six warm/cool background+text pairs picked to harmonize with the
 *  theme. Each name hashes deterministically to one pair so the same
 *  person always gets the same colour across reloads. */
const PALETTE: ReadonlyArray<readonly [string, string]> = [
    ['#FCD9C8', '#8C3A20'],
    ['#E0EAD8', '#3F5A2E'],
    ['#D8E0F0', '#2E446B'],
    ['#F2DCE9', '#7A2F58'],
    ['#F5E6B8', '#6F4E13'],
    ['#DEEFEC', '#1F5B58'],
];

function colorFor(name: string): readonly [string, string] {
    let h = 0;
    for (let i = 0; i < name.length; i++) {
        h = (h * 31 + name.charCodeAt(i)) >>> 0;
    }
    return PALETTE[h % PALETTE.length] ?? (['#FCD9C8', '#8C3A20'] as const);
}

function initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}

export function Avatar({
    name,
    src,
    size = 'medium',
    status,
    className,
    style,
    ...rest
}: AvatarProps) {
    const tokens: string[] = ['avatar'];
    if (size !== 'medium') tokens.push(`avatar--${size}`);
    if (className) tokens.push(className);

    const [bg, fg] = colorFor(name);
    const tintedStyle = src ? style : { ...style, background: bg, color: fg };

    return (
        <span
            className={tokens.join(' ')}
            style={tintedStyle}
            {...(src ? {} : { role: 'img', 'aria-label': name })}
            {...rest}
        >
            {src ? <img src={src} alt={name} /> : initials(name)}
            {status && (
                <span
                    className={`avatar__status avatar__status--${status}`}
                    aria-hidden="true"
                />
            )}
        </span>
    );
}
