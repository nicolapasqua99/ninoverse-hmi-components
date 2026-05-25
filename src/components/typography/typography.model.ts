import type { ElementType, HTMLAttributes } from "react";

export type TypographyVariant =
	| "displayLarge"
	| "displayMedium"
	| "displaySmall"
	| "headlineLarge"
	| "headlineMedium"
	| "headlineSmall"
	| "titleLarge"
	| "titleMedium"
	| "titleSmall"
	| "bodyLarge"
	| "bodyMedium"
	| "bodySmall"
	| "labelLarge"
	| "labelMedium"
	| "labelSmall";

export type TypographyColor =
	| "on-surface"
	| "on-surface-variant"
	| "outline"
	| "primary"
	| "on-primary"
	| "on-primary-container"
	| "error"
	| "inverse-on-surface";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
	variant?: TypographyVariant;
	color?: TypographyColor;
	as?: ElementType;
}
