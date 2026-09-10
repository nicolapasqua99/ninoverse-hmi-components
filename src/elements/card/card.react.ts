import { createComponent } from '@lit/react';
import * as React from 'react';
import { HmiCard } from './card.js';

export type { CardVariant } from './card.js';

/**
 * React wrapper for `<hmi-card>`.
 *
 * @example
 * <Card variant="accent">…</Card>
 */
export const Card = createComponent({
    tagName: 'hmi-card',
    elementClass: HmiCard,
    react: React,
    displayName: 'Card',
});
