// @vitest-environment node
import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.js';
import { html } from 'lit';
import { expect, it } from 'vitest';
import './card.js';

it('renders declarative shadow DOM on the server', async () => {
    const out = await collectResult(
        render(html`
            <hmi-card variant="accent" active>
                <h4 slot="header">Telemetry</h4>
                <p>Body</p>
                <span slot="footer">Updated</span>
            </hmi-card>
        `),
    );
    expect(out).toContain('<template shadowroot');
    expect(out).toContain('part="base panel"');
    expect(out).toContain('name="header"');
    expect(out).toContain('name="footer"');
    expect(out).toContain('Body');
});

it('embeds the liquid filter without touching the document', async () => {
    const out = await collectResult(render(html`<hmi-card>Body</hmi-card>`));
    expect(out).toContain('id="liquid-glass"');
    expect(out).toContain('feDisplacementMap');
});
