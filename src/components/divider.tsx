import type { HTMLAttributes, ReactNode } from 'react';
import './styled/divider.styled.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerAlign = 'start' | 'center' | 'end';

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
    orientation?: DividerOrientation;
    align?: DividerAlign;
    children?: ReactNode;
};

export function Divider({
    orientation = 'horizontal',
    align = 'center',
    children,
    className,
    ...rest
}: DividerProps) {
    const labeled = children !== undefined && orientation === 'horizontal';
    const tokens: string[] = ['divider', `divider--${orientation}`];
    if (labeled) tokens.push('divider--labeled', `divider--align-${align}`);
    if (className) tokens.push(className);

    if (labeled) {
        return (
            <div className={tokens.join(' ')} {...rest}>
                <span aria-hidden="true" className="divider__line" />
                <span className="divider__label">{children}</span>
                <span aria-hidden="true" className="divider__line" />
            </div>
        );
    }

    return (
        <hr
            aria-orientation={orientation}
            className={tokens.join(' ')}
            {...(rest as HTMLAttributes<HTMLHRElement>)}
        />
    );
}
