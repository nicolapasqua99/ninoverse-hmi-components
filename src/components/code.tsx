import type { HTMLAttributes, ReactNode } from 'react';
import './styled/code.styled.css';

export type CodeProps = HTMLAttributes<HTMLElement> & {
    block?: boolean;
    children?: ReactNode;
};

export function Code({
    block = false,
    className,
    children,
    ...rest
}: CodeProps) {
    const tokens: string[] = ['code'];
    if (block) tokens.push('code--block');
    if (className) tokens.push(className);

    if (block) {
        return (
            <pre className={tokens.join(' ')} {...rest}>
                <code className="code__content">{children}</code>
            </pre>
        );
    }

    return (
        <code className={tokens.join(' ')} {...rest}>
            {children}
        </code>
    );
}
