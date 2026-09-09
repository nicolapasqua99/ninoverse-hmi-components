/**
 * The focused element, following `shadowRoot.activeElement` through every
 * open shadow root. `document.activeElement` alone stops at the outermost host.
 */
export function activeElementDeep(
    root: Document | ShadowRoot = document,
): Element | null {
    let active = root.activeElement;
    while (active?.shadowRoot?.activeElement) {
        active = active.shadowRoot.activeElement;
    }
    return active;
}

/** Whether the Popover API (`popover` attribute, `showPopover()`) is available. */
export function supportsPopover(): boolean {
    return (
        typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype
    );
}
