import { Input, type InputProps } from './input';

export type SearchInputProps = Omit<InputProps, 'leftIcon' | 'type'>;

const SearchIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
    >
        <title>Search</title>
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5L13.5 13.5" />
    </svg>
);

export function SearchInput({
    placeholder = 'Search…',
    ...rest
}: SearchInputProps) {
    return (
        <Input
            type="search"
            placeholder={placeholder}
            leftIcon={<SearchIcon />}
            {...rest}
        />
    );
}
