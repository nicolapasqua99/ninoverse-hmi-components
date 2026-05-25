import type { IconProps } from "./icon.model";
import "./icon.styled.css";

const SIZE_PX: Record<"sm" | "md" | "lg", number> = { sm: 12, md: 16, lg: 20 };

export function Icon({
	size = "md",
	label,
	viewBox = "0 0 16 16",
	className,
	children,
	...rest
}: IconProps) {
	const dimension = typeof size === "number" ? size : SIZE_PX[size];
	const classes = ["nv-icon", typeof size === "string" ? `nv-icon--${size}` : null, className]
		.filter(Boolean)
		.join(" ");
	const a11y = label
		? { role: "img", "aria-label": label }
		: { "aria-hidden": true, focusable: false };

	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: a11y handled via aria-label or aria-hidden depending on `label`
		<svg
			className={classes}
			width={dimension}
			height={dimension}
			viewBox={viewBox}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...a11y}
			{...rest}
		>
			{label ? <title>{label}</title> : null}
			{children}
		</svg>
	);
}
