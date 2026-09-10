import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../shared/base.styles.js';
import { renderLiquidFilter } from '../shared/panel.js';
import { styles } from './card.styles.js';

export type CardVariant = 'default' | 'flat' | 'ink' | 'accent';

/**
 * Elevated surface container for grouping related content.
 *
 * The three slots flow in normal block order inside the card's padding; an
 * unused `header` or `footer` takes up no space and carries no rule or spacing
 * of its own.
 *
 * @tag hmi-card
 * @slot - Card body.
 * @slot header - Content pinned above the body.
 * @slot footer - Content pinned below the body.
 * @csspart base - The card surface.
 * @csspart panel - The card surface, under its panel-group name.
 * @csspart header - The header slot.
 * @csspart footer - The footer slot.
 *
 * @example
 * <hmi-card variant="accent">…</hmi-card>
 * @example
 * <hmi-card active>…</hmi-card>
 */
@customElement('hmi-card')
export class HmiCard extends LitElement {
    static override styles = [baseStyles, styles];

    /** Surface treatment of the card. @default 'default' */
    @property({ reflect: true }) accessor variant: CardVariant = 'default';

    /** Lifts the card off the page to mark it active/selected. @default false */
    @property({ type: Boolean, reflect: true }) accessor active = false;

    override render() {
        return html`
            <div part="base panel" class="panel">
                ${renderLiquidFilter()}
                <slot name="header" part="header"></slot>
                <slot></slot>
                <slot name="footer" part="footer"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hmi-card': HmiCard;
    }
}
