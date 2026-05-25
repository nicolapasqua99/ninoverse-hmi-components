import type { ElementType } from "react";
import type { TypographyProps, TypographyVariant } from "./typography.model";
import "./typography.styled.css";

const DEFAULT_TAG: Record<TypographyVariant, ElementType> = {
	displayLarge: "h1",
	displayMedium: "h1",
	displaySmall: "h2",
	headlineLarge: "h2",
	headlineMedium: "h3",
	headlineSmall: "h4",
	titleLarge: "h5",
	titleMedium: "h6",
	titleSmall: "h6",
	bodyLarge: "p",
	bodyMedium: "p",
	bodySmall: "p",
	labelLarge: "span",
	labelMedium: "span",
	labelSmall: "span",
};

const VARIANT_CLASS: Record<TypographyVariant, string> = {
	displayLarge: "nv-type--display-large",
	displayMedium: "nv-type--display-medium",
	displaySmall: "nv-type--display-small",
	headlineLarge: "nv-type--headline-large",
	headlineMedium: "nv-type--headline-medium",
	headlineSmall: "nv-type--headline-small",
	titleLarge: "nv-type--title-large",
	titleMedium: "nv-type--title-medium",
	titleSmall: "nv-type--title-small",
	bodyLarge: "nv-type--body-large",
	bodyMedium: "nv-type--body-medium",
	bodySmall: "nv-type--body-small",
	labelLarge: "nv-type--label-large",
	labelMedium: "nv-type--label-medium",
	labelSmall: "nv-type--label-small",
};

export function Typography({
	variant = "bodyMedium",
	color,
	as,
	className,
	style,
	children,
	...rest
}: TypographyProps) {
	const Tag = as ?? DEFAULT_TAG[variant];
	const classes = ["nv-type", VARIANT_CLASS[variant], className].filter(Boolean).join(" ");
	const mergedStyle = color ? { color: `var(--${color})`, ...style } : style;

	return (
		<Tag className={classes} style={mergedStyle} {...rest}>
			{children}
		</Tag>
	);
}
