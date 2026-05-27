import {
    type ClipboardEvent,
    type KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import './styled/otpInput.styled.css';

export type OTPInputType = 'numeric' | 'text';

export type OTPInputProps = {
    length?: number;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    type?: OTPInputType;
    mask?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    'aria-label'?: string;
};

export function OTPInput({
    length = 6,
    value,
    defaultValue,
    onChange,
    onComplete,
    type = 'numeric',
    mask = false,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    'aria-label': ariaLabel = 'One-time code',
}: OTPInputProps) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string>(defaultValue ?? '');
    const current = (isControlled ? value : internal).slice(0, length);

    const refs = useRef<Array<HTMLInputElement | null>>([]);
    const cells: string[] = Array.from({ length }, (_, i) => current[i] ?? '');

    const isValidChar = (ch: string): boolean => {
        if (type === 'numeric') return /^[0-9]$/.test(ch);
        return ch.length === 1 && ch !== ' ';
    };

    const setValue = (next: string) => {
        const clipped = next.slice(0, length);
        if (!isControlled) setInternal(clipped);
        onChange?.(clipped);
        if (clipped.length === length && !clipped.includes('')) {
            onComplete?.(clipped);
        }
    };

    const focusCell = (idx: number) => {
        const el = refs.current[idx];
        if (el) {
            el.focus();
            el.select();
        }
    };

    const onCellChange = (idx: number, raw: string) => {
        if (raw === '') {
            const next = cells.slice();
            next[idx] = '';
            setValue(next.join(''));
            return;
        }
        const ch = raw.slice(-1);
        if (!isValidChar(ch)) return;
        const next = cells.slice();
        next[idx] = ch;
        setValue(next.join(''));
        if (idx < length - 1) focusCell(idx + 1);
    };

    const onCellKey = (idx: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace') {
            if (cells[idx]) return; // handled by onChange when input clears
            if (idx > 0) {
                event.preventDefault();
                const next = cells.slice();
                next[idx - 1] = '';
                setValue(next.join(''));
                focusCell(idx - 1);
            }
        } else if (event.key === 'ArrowLeft' && idx > 0) {
            event.preventDefault();
            focusCell(idx - 1);
        } else if (event.key === 'ArrowRight' && idx < length - 1) {
            event.preventDefault();
            focusCell(idx + 1);
        } else if (event.key === 'Home') {
            event.preventDefault();
            focusCell(0);
        } else if (event.key === 'End') {
            event.preventDefault();
            focusCell(length - 1);
        }
    };

    const onPaste = (idx: number, event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text');
        const filtered = Array.from(text).filter(isValidChar).join('');
        if (!filtered) return;
        const next = cells.slice();
        let pos = idx;
        for (const ch of filtered) {
            if (pos >= length) break;
            next[pos] = ch;
            pos++;
        }
        setValue(next.join(''));
        focusCell(Math.min(pos, length - 1));
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: focus on mount only
    useEffect(() => {
        if (autoFocus) focusCell(0);
    }, []);

    const tokens: string[] = ['otp-input'];
    if (disabled) tokens.push('otp-input--disabled');

    return (
        <fieldset className={tokens.join(' ')} aria-label={ariaLabel}>
            {cells.map((cell, i) => (
                <input
                    // biome-ignore lint/suspicious/noArrayIndexKey: cells are positionally identified
                    key={i}
                    ref={(el) => {
                        refs.current[i] = el;
                    }}
                    type={mask ? 'password' : 'text'}
                    inputMode={type === 'numeric' ? 'numeric' : 'text'}
                    autoComplete={i === 0 ? 'one-time-code' : 'off'}
                    maxLength={1}
                    className="otp-input__cell"
                    aria-label={`Digit ${i + 1} of ${length}`}
                    value={cell}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={(event) => onCellChange(i, event.target.value)}
                    onKeyDown={(event) => onCellKey(i, event)}
                    onPaste={(event) => onPaste(i, event)}
                    onFocus={(event) => event.target.select()}
                />
            ))}
        </fieldset>
    );
}
