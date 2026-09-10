import { html, render } from 'lit';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import './card.js';
import type { HmiCard } from './card.js';
import { Card } from './card.react.js';

async function fixture(template: ReturnType<typeof html>): Promise<HmiCard> {
    const host = document.createElement('div');
    document.body.append(host);
    render(template, host);
    const el = host.firstElementChild as HmiCard;
    await el.updateComplete;
    return el;
}

afterEach(() => {
    document.body.replaceChildren();
});

describe('hmi-card', () => {
    it('registers', () => {
        expect(customElements.get('hmi-card')).toBeDefined();
    });

    it('renders', async () => {
        const el = await fixture(html`<hmi-card>Hi</hmi-card>`);
        expect(el.shadowRoot?.querySelector('[part~="base"]')).not.toBeNull();
    });

    it('exposes base and panel on one node', async () => {
        const el = await fixture(html`<hmi-card>Hi</hmi-card>`);
        const base = el.shadowRoot?.querySelector('[part~="base"]');
        expect(base?.getAttribute('part')).toBe('base panel');
    });

    it('reflects variant', async () => {
        const el = await fixture(html`<hmi-card variant="ink"></hmi-card>`);
        expect(el.variant).toBe('ink');
        el.variant = 'accent';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('accent');
    });

    it('boolean attribute presence', async () => {
        const el = await fixture(html`<hmi-card active></hmi-card>`);
        expect(el.active).toBe(true);
        el.removeAttribute('active');
        await el.updateComplete;
        expect(el.active).toBe(false);
    });

    it('projects the default slot', async () => {
        const el = await fixture(html`<hmi-card><p>Body</p></hmi-card>`);
        const slot =
            el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
        expect(slot?.assignedElements()).toHaveLength(1);
    });

    it('projects the header and footer slots', async () => {
        const el = await fixture(html`
            <hmi-card>
                <span slot="footer">Foot</span>
                <p>Body</p>
                <h4 slot="header">Head</h4>
            </hmi-card>
        `);
        const named = (name: string) =>
            el.shadowRoot
                ?.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)
                ?.assignedElements();
        expect(named('header')?.[0]?.textContent).toBe('Head');
        expect(named('footer')?.[0]?.textContent).toBe('Foot');
        expect(
            el.shadowRoot
                ?.querySelector<HTMLSlotElement>('slot:not([name])')
                ?.assignedElements(),
        ).toHaveLength(1);
    });

    it('renders the header slot before the body and the footer after', async () => {
        const el = await fixture(html`
            <hmi-card>
                <span slot="footer">Foot</span>
                <h4 slot="header">Head</h4>
            </hmi-card>
        `);
        const slots = [...(el.shadowRoot?.querySelectorAll('slot') ?? [])].map(
            (slot) => slot.getAttribute('name'),
        );
        expect(slots).toEqual(['header', null, 'footer']);
    });

    it('embeds the liquid filter in its own root', async () => {
        const el = await fixture(html`<hmi-card>Hi</hmi-card>`);
        const filter = el.shadowRoot?.querySelector('filter');
        expect(filter?.id).toBe('liquid-glass');
        expect(
            el.shadowRoot?.querySelector('svg')?.getAttribute('aria-hidden'),
        ).toBe('true');
        expect(document.querySelector('filter#liquid-glass')).toBeNull();
    });

    it('exposes roles', async () => {
        const el = await fixture(html`<hmi-card>Hi</hmi-card>`);
        expect(
            el.shadowRoot
                ?.querySelector('[part~="base"]')
                ?.getAttribute('role'),
        ).toBeNull();
        expect(el.getAttribute('role')).toBeNull();
    });

    it('mounts through the React wrapper', async () => {
        const mount = document.createElement('div');
        document.body.append(mount);
        await act(async () => {
            createRoot(mount).render(
                createElement(
                    Card,
                    { variant: 'accent', active: true },
                    'Body',
                ),
            );
        });
        const el = mount.querySelector('hmi-card') as HmiCard;
        await el.updateComplete;
        expect(el.variant).toBe('accent');
        expect(el.active).toBe(true);
        expect(el.textContent).toBe('Body');
    });
});
