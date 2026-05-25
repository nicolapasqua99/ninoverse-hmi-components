import { forwardRef } from "react";
import type { ButtonProps } from "./button.model";
import "./button.styled.css";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{
		variant = "primary",
		size = "md",
		icon,
		iconRight,
		iconOnly,
		children,
		className,
		type = "button",
		...rest
	},
	ref,
) {
	const classes = [
		"nv-btn",
		`nv-btn--${variant}`,
		size !== "md" ? `nv-btn--${size}` : null,
		iconOnly ? "nv-btn--icon-only" : null,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<button ref={ref} type={type} className={classes} {...rest}>
			{icon}
			{!iconOnly && children}
			{iconRight}
		</button>
	);
});
