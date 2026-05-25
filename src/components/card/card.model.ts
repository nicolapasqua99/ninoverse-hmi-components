import type { HTMLAttributes } from "react";

export type CardVariant = "elevated" | "flat" | "ink" | "accent";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	variant?: CardVariant;
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
