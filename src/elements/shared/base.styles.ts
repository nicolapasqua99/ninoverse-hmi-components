import { css } from 'lit';

/* Shared by every element as `static override styles = [baseStyles, styles]`.
   Provides the sizing base (`--_base`, derived from the host-chain token
   `--hmi-base`), the box-sizing reset and the focus ring that the light-DOM
   `globals.css` gives the React tree — none of which cross a shadow boundary. */
export const baseStyles = css`
    :host {
        --_base: var(--hmi-base, 8px);
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :host([hidden]) {
        display: none !important;
    }

    :focus {
        outline: none;
    }

    :focus-visible {
        outline: calc(var(--_base) * 0.25) solid var(--ring);
        outline-offset: calc(var(--_base) * 0.25);
        border-radius: var(--corner-extra-small);
    }
`;
