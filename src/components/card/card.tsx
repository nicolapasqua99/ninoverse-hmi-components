import { forwardRef } from "react";
import type {
	CardDescriptionProps,
	CardFooterProps,
	CardProps,
	CardTitleProps,
} from "./card.model";
import "./card.styled.css";

const Root = forwardRef<HTMLDivElement, CardProps>(function Card(
	{ variant = "elevated", className, children, ...rest },
	ref,
) {
	const classes = ["nv-card", variant !== "elevated" ? `nv-card--${variant}` : null, className]
		.filter(Boolean)
		.join(" ");

	return (
		<div ref={ref} className={classes} {...rest}>
			{children}
		</div>
	);
});

function CardTitle({ className, children, ...rest }: CardTitleProps) {
	return (
		<h3 className={["nv-card__title", className].filter(Boolean).join(" ")} {...rest}>
			{children}
		</h3>
	);
}

function CardDescription({ className, children, ...rest }: CardDescriptionProps) {
	return (
		<p className={["nv-card__description", className].filter(Boolean).join(" ")} {...rest}>
			{children}
		</p>
	);
}

function CardFooter({ className, children, ...rest }: CardFooterProps) {
	return (
		<div className={["nv-card__footer", className].filter(Boolean).join(" ")} {...rest}>
			{children}
		</div>
	);
}

export const Card = Object.assign(Root, {
	Title: CardTitle,
	Description: CardDescription,
	Footer: CardFooter,
});
