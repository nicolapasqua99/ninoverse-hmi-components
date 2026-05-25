import type { ReactNode, SVGAttributes } from "react";

export type IconSize = "sm" | "md" | "lg" | number;

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "children"> {
	size?: IconSize;
	label?: string;
	children: ReactNode;
}
