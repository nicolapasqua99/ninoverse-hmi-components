import { afterEach, describe, expect, it } from 'vitest';
import { activeElementDeep, supportsPopover } from './dom.js';

afterEach(() => {
    document.body.replaceChildren();
});

describe('activeElementDeep', () => {
    it('follows focus into a shadow root', () => {
        const host = document.createElement('div');
        const root = host.attachShadow({ mode: 'open' });
        const button = document.createElement('button');
        root.append(button);
        document.body.append(host);

        button.focus();

        expect(document.activeElement).toBe(host);
        expect(activeElementDeep(document)).toBe(button);
    });
});

describe('supportsPopover', () => {
    it('is true in Chromium', () => {
        expect(supportsPopover()).toBe(true);
    });
});
