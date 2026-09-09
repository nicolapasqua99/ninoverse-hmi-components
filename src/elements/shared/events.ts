/** Name of every event the elements dispatch (`hmi-change`, `hmi-close`, …). */
export type HmiEventName = `hmi-${string}`;

export interface EmitOptions {
    /** Let listeners `preventDefault()` the action (close, dismiss, cancel). */
    cancelable?: boolean;
}

/**
 * Dispatch a library event from `host`: a `CustomEvent` that bubbles, crosses
 * shadow boundaries (`composed`) and carries an object `detail`.
 *
 * @returns `false` when a listener called `preventDefault()` on a cancelable
 * event, `true` otherwise — the element must honour `false`.
 */
export function emit<T extends object>(
    host: EventTarget,
    type: HmiEventName,
    detail: T,
    options: EmitOptions = {},
): boolean {
    return host.dispatchEvent(
        new CustomEvent<T>(type, {
            detail,
            bubbles: true,
            composed: true,
            cancelable: options.cancelable ?? false,
        }),
    );
}
