import { useState } from 'react';
import { Popover } from './popover';
import './styled/colorPicker.styled.css';

export type ColorPickerProps = {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    swatches?: string[];
    disabled?: boolean;
    showInput?: boolean;
    'aria-label'?: string;
};

const DEFAULT_SWATCHES = [
    '#e87a5d',
    '#d49a3f',
    '#5c9a6a',
    '#6b86b3',
    '#c0524c',
    '#7a6f64',
    '#2b2520',
    '#ffffff',
];

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function ColorPicker({
    value,
    defaultValue = '#e87a5d',
    onChange,
    swatches = DEFAULT_SWATCHES,
    disabled = false,
    showInput = true,
    'aria-label': ariaLabel = 'Choose color',
}: ColorPickerProps) {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string>(defaultValue);
    const [open, setOpen] = useState(false);
    const current = isControlled ? value : internal;
    const [draft, setDraft] = useState<string>(current);

    const commit = (next: string) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const onHexChange = (raw: string) => {
        setDraft(raw);
        if (HEX_PATTERN.test(raw)) commit(raw);
    };

    return (
        <Popover
            onOpenChange={(next) => {
                setOpen(next);
                if (next) setDraft(current);
            }}
            open={open}
            trigger={
                <button
                    aria-label={ariaLabel}
                    className="color-picker__trigger"
                    disabled={disabled}
                    type="button"
                >
                    <span
                        className="color-picker__preview"
                        style={{ background: current }}
                    />
                    <span className="color-picker__trigger-value">
                        {current}
                    </span>
                </button>
            }
        >
            <div className="color-picker__panel">
                <div className="color-picker__swatches">
                    {swatches.map((swatch) => {
                        const selected =
                            swatch.toLowerCase() === current.toLowerCase();
                        const tokens = ['color-picker__swatch'];
                        if (selected)
                            tokens.push('color-picker__swatch--selected');
                        return (
                            <button
                                aria-label={swatch}
                                aria-pressed={selected}
                                className={tokens.join(' ')}
                                key={swatch}
                                onClick={() => {
                                    commit(swatch);
                                    setDraft(swatch);
                                }}
                                style={{ background: swatch }}
                                type="button"
                            />
                        );
                    })}
                </div>
                {showInput && (
                    <div className="color-picker__inputs">
                        <input
                            aria-label="Hex color value"
                            className="color-picker__hex"
                            onChange={(event) =>
                                onHexChange(event.target.value)
                            }
                            spellCheck={false}
                            value={draft}
                        />
                        <input
                            aria-label="Color sample"
                            className="color-picker__native"
                            onChange={(event) => {
                                commit(event.target.value);
                                setDraft(event.target.value);
                            }}
                            type="color"
                            value={
                                HEX_PATTERN.test(current) ? current : '#000000'
                            }
                        />
                    </div>
                )}
            </div>
        </Popover>
    );
}
