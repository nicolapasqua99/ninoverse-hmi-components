// @vitest-environment node
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html, isServer, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { expect, it } from 'vitest';
import { baseStyles } from './base.styles.js';

/* Smoke test for the SSR project: a form-associated element shaped like the
   R7 template (attachInternals() in a field initializer) must render to
   declarative shadow DOM under the @lit-labs/ssr DOM shim. */
@customElement('hmi-ssr-smoke')
class HmiSsrSmoke extends LitElement {
    static formAssociated = true;
    static override styles = [baseStyles];

    readonly #internals = this.attachInternals();

    @property({ reflect: true }) accessor variant = 'primary';

    get form(): HTMLFormElement | null {
        return this.#internals.form;
    }

    override render() {
        return html`<div part="base"><slot></slot></div>`;
    }
}

it('imports without touching the DOM', () => {
    expect(isServer).toBe(true);
    expect(customElements.get('hmi-ssr-smoke')).toBe(HmiSsrSmoke);
});

it('renders declarative shadow DOM on the server', async () => {
    const out = await collectResult(
        render(html`<hmi-ssr-smoke variant="secondary">Hi</hmi-ssr-smoke>`),
    );
    expect(out).toContain('<template shadowroot');
    expect(out).toContain('part="base"');
    expect(out).toContain('variant="secondary"');
    expect(out).toContain('Hi');
});
