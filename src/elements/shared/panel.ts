import { html } from 'lit';

/**
 * The `#liquid-glass` refraction filter, rendered inside the calling element's
 * own shadow root.
 *
 * The liquid material sets `--panel-filter: url('#liquid-glass') …`, and the
 * `url()` in a `backdrop-filter` resolves against the tree its styled node
 * lives in — so the document-level copies in `index.html` and
 * `.storybook/preview-body.html` never reach a panel inside a shadow root.
 * Every panel-like element (R4) renders this once; ids are scoped per root, so
 * repeating it across elements and instances cannot collide.
 *
 * The filter markup is the same one those two documents carry for the legacy
 * React tree.
 */
export function renderLiquidFilter() {
    return html`
        <svg width="0" height="0" aria-hidden="true" style="position: absolute">
            <filter
                id="liquid-glass"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.01 0.012"
                    numOctaves="2"
                    seed="11"
                    result="noise"
                />
                <feGaussianBlur in="noise" stdDeviation="2" result="noiseBlur" />
                <feDisplacementMap
                    in="SourceGraphic"
                    in2="noiseBlur"
                    scale="55"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="disp"
                />
                <feGaussianBlur in="disp" stdDeviation="3" />
            </filter>
        </svg>
    `;
}
