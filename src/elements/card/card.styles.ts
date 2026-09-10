import { css } from 'lit';

/* Card — elevated surface with asymmetric leaf corners. The default variant
   carries elevation-1 to lift it off the page. Four variants: default (warm
   surface), flat (no shadow), ink (inverse-dark surface for high-contrast
   callouts), accent (primary tonal fill).

   Ported from src/components/styled/card.styled.css, with the surface, the
   border and the two tonal fills re-based onto the --panel-* tokens so the
   glass and liquid materials reach the card (R4). Under the solid material
   those tokens resolve to exactly the values the React card used. */
export const styles = css`
    :host {
        display: block;
    }

    .panel {
        background: var(--panel-bg);
        color: var(--on-background);
        border: calc(var(--_base) * 0.125) solid var(--panel-border);
        border-radius: var(--corner-tl) var(--corner-tr) var(--corner-br)
            var(--corner-bl);
        padding: var(--space-10);
        box-shadow: var(--elevation-1);
        -webkit-backdrop-filter: var(--panel-filter);
        backdrop-filter: var(--panel-filter);
    }

    :host([variant='flat']) .panel {
        box-shadow: var(--elevation-0);
    }

    :host([variant='ink']) .panel {
        background: var(--panel-ink-bg);
        color: var(--inverse-on-surface);
        border-color: transparent;
    }

    :host([variant='accent']) .panel {
        background: var(--panel-accent-bg);
        color: var(--on-primary-container);
        border-color: color-mix(
            in oklab,
            var(--primary) 18%,
            var(--panel-border)
        );
    }

    /* Active / selected — lifts the card off the page. Token-driven, so it is a
       normal raised shadow in most structures and the flat accent offset under
       Field Journal. Placed last so an active+flat card still lifts. */
    :host([active]) .panel {
        box-shadow: var(--elevation-3);
    }
`;
