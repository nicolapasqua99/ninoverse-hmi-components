import { afterEach, describe, expect, it, vi } from 'vitest';
import { emit } from './events.js';

afterEach(() => {
    document.body.replaceChildren();
});

describe('emit', () => {
    it('dispatches a bubbling, composed CustomEvent with an object detail', () => {
        const host = document.createElement('div');
        const root = host.attachShadow({ mode: 'open' });
        const inner = document.createElement('span');
        root.append(inner);
        document.body.append(host);

        const spy = vi.fn();
        document.addEventListener('hmi-change', spy, { once: true });

        const result = emit(inner, 'hmi-change', { value: 'x' });

        expect(result).toBe(true);
        expect(spy).toHaveBeenCalledOnce();
        const event = spy.mock.calls[0]?.[0] as CustomEvent<{ value: string }>;
        expect(event.detail).toEqual({ value: 'x' });
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
        expect(event.cancelable).toBe(false);
    });

    it('returns false when a cancelable event is prevented', () => {
        const host = document.createElement('div');
        document.body.append(host);
        document.addEventListener(
            'hmi-close',
            (event) => event.preventDefault(),
            { once: true },
        );

        expect(emit(host, 'hmi-close', {}, { cancelable: true })).toBe(false);
    });
});
