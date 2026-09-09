import { createComponent } from '@lit/react';
import * as React from 'react';
import { HmiBadge } from './badge.js';

export type { BadgeVariant } from './badge.js';

/**
 * React wrapper for `<hmi-badge>`.
 *
 * @example
 * <Badge variant="success" dot>Online</Badge>
 */
export const Badge = createComponent({
    tagName: 'hmi-badge',
    elementClass: HmiBadge,
    react: React,
    displayName: 'Badge',
});
