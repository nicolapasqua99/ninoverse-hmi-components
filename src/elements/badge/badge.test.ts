import { html, render } from 'lit';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import './badge.js';
import type { HmiBadge } from './badge.js';
import { Badge } from './badge.react.js';

async function fixture(template: ReturnType<typeof html>): Promise<HmiBadge> {
    const host = document.createElement('div');
    document.body.append(host);
    render(template, host);
    const el = host.firstElementChild as HmiBadge;
    await el.updateComplete;
    return el;
}

afterEach(() => {
    document.body.replaceChildren();
});

describe('hmi-badge', () => {
    it('registers', () => {
        expect(customElements.get('hmi-badge')).toBeDefined();
    });

    it('renders', async () => {
        const el = await fixture(html`<hmi-badge>Hi</hmi-badge>`);
        expect(el.shadowRoot?.querySelector('[part="base"]')).not.toBeNull();
    });

    it('reflects variant', async () => {
        const el = await fixture(
            html`<hmi-badge variant="success"></hmi-badge>`,
        );
        expect(el.variant).toBe('success');
        el.variant = 'danger';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('danger');
    });

    it('boolean attribute presence', async () => {
        const el = await fixture(html`<hmi-badge dot></hmi-badge>`);
        expect(el.dot).toBe(true);
        el.removeAttribute('dot');
        await el.updateComplete;
        expect(el.dot).toBe(false);
    });

    it('projects the default slot', async () => {
        const el = await fixture(html`<hmi-badge><b>Live</b></hmi-badge>`);
        const slot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot');
        expect(slot?.assignedElements()).toHaveLength(1);
    });

    it('renders the dot only when set', async () => {
        const el = await fixture(html`<hmi-badge>Hi</hmi-badge>`);
        expect(el.shadowRoot?.querySelector('[part="dot"]')).toBeNull();
        el.dot = true;
        await el.updateComplete;
        expect(el.shadowRoot?.querySelector('[part="dot"]')).not.toBeNull();
    });

    it('exposes roles', async () => {
        const el = await fixture(html`<hmi-badge dot>Hi</hmi-badge>`);
        const dot = el.shadowRoot?.querySelector('[part="dot"]');
        expect(dot?.getAttribute('aria-hidden')).toBe('true');
        expect(
            el.shadowRoot?.querySelector('[part="base"]')?.getAttribute('role'),
        ).toBeNull();
    });

    it('mounts through the React wrapper', async () => {
        const mount = document.createElement('div');
        document.body.append(mount);
        await act(async () => {
            createRoot(mount).render(
                createElement(Badge, { variant: 'primary', dot: true }, 'New'),
            );
        });
        const el = mount.querySelector('hmi-badge') as HmiBadge;
        await el.updateComplete;
        expect(el.variant).toBe('primary');
        expect(el.dot).toBe(true);
        expect(el.textContent).toBe('New');
        expect(el.shadowRoot?.querySelector('[part="dot"]')).not.toBeNull();
    });
});
