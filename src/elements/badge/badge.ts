import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../shared/base.styles.js';
import { styles } from './badge.styles.js';

export type BadgeVariant =
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

/**
 * Compact status label, optionally with a leading status dot.
 *
 * @tag hmi-badge
 * @slot - Badge label content.
 * @csspart base - The pill.
 * @csspart dot - The leading status dot (present only when `dot` is set).
 */
@customElement('hmi-badge')
export class HmiBadge extends LitElement {
    static override styles = [baseStyles, styles];

    /** Color/tone of the badge. @default 'default' */
    @property({ reflect: true }) accessor variant: BadgeVariant = 'default';

    /** Show a small leading status dot. @default false */
    @property({ type: Boolean, reflect: true }) accessor dot = false;

    override render() {
        return html`
            <span part="base" class="base">
                ${
                    this.dot
                        ? html`<span part="dot" class="dot" aria-hidden="true"></span>`
                        : nothing
                }
                <slot></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hmi-badge': HmiBadge;
    }
}
