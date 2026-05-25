import { Icon } from "./icon";
import type { IconSize } from "./icon.model";

export interface NamedIconProps {
	size?: IconSize;
	label?: string;
	className?: string;
}

const make =
	(viewBox: string, paths: React.ReactNode, defaults: { strokeWidth?: number } = {}) =>
	(props: NamedIconProps) => (
		<Icon viewBox={viewBox} strokeWidth={defaults.strokeWidth ?? 1.7} {...props}>
			{paths}
		</Icon>
	);

export const CheckIcon = make("0 0 16 16", <path d="M3 8.5l3 3 7-7" />, { strokeWidth: 2.5 });

export const ChevronDownIcon = make("0 0 16 16", <path d="M4 6l4 4 4-4" />, { strokeWidth: 2 });

export const ChevronRightIcon = make("0 0 16 16", <path d="M6 4l4 4-4 4" />, { strokeWidth: 2 });

export const ChevronLeftIcon = make("0 0 16 16", <path d="M10 4l-4 4 4 4" />, { strokeWidth: 2 });

export const CloseIcon = make("0 0 16 16", <path d="M4 4l8 8M12 4l-8 8" />, { strokeWidth: 2 });

export const SearchIcon = make(
	"0 0 16 16",
	<>
		<circle cx="7" cy="7" r="4.5" />
		<path d="M10.5 10.5L13.5 13.5" />
	</>,
	{ strokeWidth: 1.8 },
);

export const EyeIcon = make(
	"0 0 16 16",
	<>
		<path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
		<circle cx="8" cy="8" r="2" />
	</>,
	{ strokeWidth: 1.6 },
);

export const EyeOffIcon = make(
	"0 0 16 16",
	<>
		<path d="M1.5 8s2.5-4.5 6.5-4.5c1.4 0 2.6.5 3.6 1.1M14.5 8s-2.5 4.5-6.5 4.5c-1.4 0-2.6-.5-3.6-1.1" />
		<path d="M2 2l12 12" />
	</>,
	{ strokeWidth: 1.6 },
);

export const InfoIcon = make(
	"0 0 20 20",
	<>
		<circle cx="10" cy="10" r="8" />
		<path d="M10 9v5M10 6.5v.01" />
	</>,
);

export const CheckCircleIcon = make(
	"0 0 20 20",
	<>
		<circle cx="10" cy="10" r="8" />
		<path d="M6.5 10l2.5 2.5 4.5-5" />
	</>,
);

export const WarningIcon = make(
	"0 0 20 20",
	<>
		<path d="M10 2.5L18 16.5H2L10 2.5z" />
		<path d="M10 8v4M10 14.5v.01" />
	</>,
);

export const DangerIcon = make(
	"0 0 20 20",
	<>
		<circle cx="10" cy="10" r="8" />
		<path d="M10 6v4M10 13.5v.01" />
	</>,
);

export const PlusIcon = make("0 0 16 16", <path d="M8 3v10M3 8h10" />, { strokeWidth: 2 });

export const SendIcon = make("0 0 16 16", <path d="M14 2L7 9M14 2L9.5 14 7 9 2 6.5 14 2z" />, {
	strokeWidth: 1.6,
});

export const HeartIcon = make(
	"0 0 16 16",
	<path d="M8 13.5s-5-3.2-5-7a3 3 0 015-2.2A3 3 0 0113 6.5c0 3.8-5 7-5 7z" />,
	{ strokeWidth: 1.6 },
);

export const StarIcon = make(
	"0 0 16 16",
	<path d="M8 2l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.8 4.2 13.8l.7-4.3-3.1-3 4.3-.6L8 2z" />,
	{ strokeWidth: 1.6 },
);

export const TrashIcon = make(
	"0 0 16 16",
	<path d="M3 4.5h10M6 4.5V3a1 1 0 011-1h2a1 1 0 011 1v1.5M4.5 4.5L5 13a1 1 0 001 1h4a1 1 0 001-1l.5-8.5" />,
	{ strokeWidth: 1.6 },
);

export const EditIcon = make("0 0 16 16", <path d="M11.5 2.5l2 2L6 12l-3 1 1-3 7.5-7.5z" />, {
	strokeWidth: 1.6,
});

export const CopyIcon = make(
	"0 0 16 16",
	<>
		<rect x="5" y="5" width="9" height="9" rx="1.5" />
		<path d="M3 11V3.5A1.5 1.5 0 014.5 2H11" />
	</>,
	{ strokeWidth: 1.6 },
);

export const SettingsIcon = make(
	"0 0 16 16",
	<>
		<circle cx="8" cy="8" r="2" />
		<path d="M13 8c0-.4 0-.7-.1-1l1.2-.9-1-1.7L11.7 5c-.5-.5-1.1-.8-1.7-1l-.2-1.5h-2L7.6 4c-.6.2-1.2.5-1.7 1l-1.4-.6-1 1.7 1.2.9c0 .3-.1.6-.1 1s0 .7.1 1l-1.2.9 1 1.7L5.9 11c.5.5 1.1.8 1.7 1l.2 1.5h2l.2-1.5c.6-.2 1.2-.5 1.7-1l1.4.6 1-1.7-1.2-.9c.1-.3.1-.6.1-1z" />
	</>,
	{ strokeWidth: 1.5 },
);

export const UserIcon = make(
	"0 0 16 16",
	<>
		<circle cx="8" cy="5.5" r="2.5" />
		<path d="M3 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
	</>,
	{ strokeWidth: 1.6 },
);

export const HomeIcon = make(
	"0 0 16 16",
	<path d="M2.5 7L8 2.5 13.5 7v6a.5.5 0 01-.5.5h-3v-4h-4v4h-3a.5.5 0 01-.5-.5V7z" />,
	{ strokeWidth: 1.6 },
);

export const BellIcon = make(
	"0 0 16 16",
	<path d="M4 7a4 4 0 018 0v3l1.5 2h-11L4 10V7zM6.5 13.5a1.5 1.5 0 003 0" />,
	{ strokeWidth: 1.6 },
);
