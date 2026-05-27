import { useState } from 'react';
import { Accordion } from './components/accordion';
import { Alert } from './components/alert';
import { Avatar } from './components/avatar';
import { AvatarStack } from './components/avatarStack';
import { Badge } from './components/badge';
import { Breadcrumbs } from './components/breadcrumbs';
import { Button } from './components/button';
import { Card } from './components/card';
import { Checkbox } from './components/checkbox';
import { Chip } from './components/chip';
import { Combobox, type ComboboxOption } from './components/combobox';
import { DatePicker, type DateRange } from './components/datePicker';
import { Divider } from './components/divider';
import { EmptyState } from './components/emptyState';
import { Field } from './components/field';
import { FileUpload } from './components/fileUpload';
import { Input } from './components/input';
import { Kbd } from './components/kbd';
import { List, type ListItem } from './components/list';
import { Menu, MenuItem, MenuLabel, MenuSeparator } from './components/menu';
import { Modal } from './components/modal';
import { Navbar } from './components/navbar';
import { NumberInput } from './components/numberInput';
import { Pagination } from './components/pagination';
import { PasswordInput } from './components/passwordInput';
import { Popover } from './components/popover';
import { Progress } from './components/progress';
import { Radio } from './components/radio';
import { RadioGroup } from './components/radioGroup';
import { Rating } from './components/rating';
import { SearchInput } from './components/searchInput';
import { Select } from './components/select';
import { Sidebar } from './components/sidebar';
import { Skeleton } from './components/skeleton';
import { Slider } from './components/slider';
import { Spinner } from './components/spinner';
import { Switch } from './components/switch';
import { Table } from './components/table';
import { Tabs } from './components/tabs';
import { Textarea } from './components/textarea';
import { ToastHost, toast } from './components/toast';
import { Tooltip } from './components/tooltip';

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

export default function App() {
    const [plan, setPlan] = useState<'free' | 'pro' | 'team'>('pro');
    const [filters, setFilters] = useState<Set<string>>(
        () => new Set(['react', 'typescript']),
    );
    const [tags, setTags] = useState<string[]>([
        'design',
        'tokens',
        'a11y',
        'docs',
    ]);
    const toggleFilter = (key: string) =>
        setFilters((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    const [popoverStartOpen, setPopoverStartOpen] = useState(false);
    const [popoverEndOpen, setPopoverEndOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [lastMenuAction, setLastMenuAction] = useState<string>('none');
    const [framework, setFramework] = useState<
        'react' | 'vue' | 'svelte' | 'solid'
    >('react');
    const [modalMedium, setModalMedium] = useState(false);
    const [modalLarge, setModalLarge] = useState(false);
    const [pillTab, setPillTab] = useState<'inbox' | 'sent' | 'archive'>(
        'inbox',
    );
    const [crumbsCurrent, setCrumbsCurrent] = useState<string>('Components');
    const [navTab, setNavTab] = useState<
        'overview' | 'reports' | 'people' | 'settings'
    >('reports');
    const [sideNav, setSideNav] = useState<
        'inbox' | 'starred' | 'sent' | 'team' | 'settings' | 'logout'
    >('inbox');
    const [pageShort, setPageShort] = useState(3);
    const [pageLong, setPageLong] = useState(8);
    const [reorderable, setReorderable] = useState<ListItem[]>([
        {
            id: 'ada',
            avatar: 'Ada Lovelace',
            title: 'Ada Lovelace',
            subtitle: 'Computing pioneer',
        },
        {
            id: 'alan',
            avatar: 'Alan Turing',
            title: 'Alan Turing',
            subtitle: 'Theoretical foundation',
        },
        {
            id: 'grace',
            avatar: 'Grace Hopper',
            title: 'Grace Hopper',
            subtitle: 'Compiler genealogy',
        },
        {
            id: 'linus',
            avatar: 'Linus Torvalds',
            title: 'Linus Torvalds',
            subtitle: 'Kernel maintainer',
        },
    ]);
    const [underlineTab, setUnderlineTab] = useState<
        'overview' | 'usage' | 'billing'
    >('overview');
    const [volume, setVolume] = useState(64);
    const [contrast, setContrast] = useState(50);
    const [quantity, setQuantity] = useState<number | null>(1);
    const [age, setAge] = useState<number | null>(28);
    const [city, setCity] = useState<string | null>('paris');
    const [pickedDate, setPickedDate] = useState<Date | null>(
        new Date(2026, 4, 15),
    );
    const [pickedRange, setPickedRange] = useState<DateRange | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [productRating, setProductRating] = useState(3);
    const [halfRating, setHalfRating] = useState(2.5);
    const cityOptions: ComboboxOption[] = [
        { value: 'amsterdam', label: 'Amsterdam', description: 'Netherlands' },
        { value: 'berlin', label: 'Berlin', description: 'Germany' },
        { value: 'lisbon', label: 'Lisbon', description: 'Portugal' },
        { value: 'london', label: 'London', description: 'United Kingdom' },
        { value: 'madrid', label: 'Madrid', description: 'Spain' },
        { value: 'milan', label: 'Milan', description: 'Italy' },
        { value: 'paris', label: 'Paris', description: 'France' },
        { value: 'rome', label: 'Rome', description: 'Italy' },
        { value: 'vienna', label: 'Vienna', description: 'Austria' },
        { value: 'warsaw', label: 'Warsaw', description: 'Poland' },
    ];
    return (
        <div
            style={{
                padding: '5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4rem',
                maxWidth: '120rem',
            }}
        >
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Variants</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="soft">Soft</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Delete</Button>
                    <Button variant="link">Read the docs</Button>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Sizes</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Button size="small">Small</Button>
                    <Button size="medium">Medium</Button>
                    <Button size="large">Large</Button>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>States</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Button disabled>Disabled</Button>
                    <Button variant="secondary" disabled>
                        Disabled
                    </Button>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Text inputs</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 40rem))',
                        gap: '3rem',
                    }}
                >
                    <Field label="Full name" hint="As it appears on documents">
                        <Input placeholder="Alex Morgan" />
                    </Field>
                    <Field label="Email" error="Hmm, that doesn't look right.">
                        <Input
                            type="email"
                            placeholder="you@studio.co"
                            defaultValue="not-an-email"
                            error
                        />
                    </Field>
                    <Field label="Search">
                        <Input
                            placeholder="Search…"
                            leftIcon={<SearchIcon />}
                        />
                    </Field>
                    <Field label="Disabled">
                        <Input
                            placeholder="Read-only"
                            defaultValue="Already filled"
                            disabled
                        />
                    </Field>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Textarea</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 40rem))',
                        gap: '3rem',
                    }}
                >
                    <Field label="About you" hint="A short bio, 240 chars max">
                        <Textarea placeholder="Tell us a bit about yourself…" />
                    </Field>
                    <Field label="Feedback" error="Please describe the issue.">
                        <Textarea error defaultValue="" />
                    </Field>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Radio</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 40rem))',
                        gap: '3rem',
                    }}
                >
                    <Field
                        label="Single radios (shared name)"
                        hint="Native browser handles mutual exclusion."
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.25rem',
                            }}
                        >
                            <Radio
                                name="size"
                                value="sm"
                                label="Small"
                                defaultChecked
                            />
                            <Radio name="size" value="md" label="Medium" />
                            <Radio name="size" value="lg" label="Large" />
                            <Radio
                                name="size"
                                value="xl"
                                label="Extra large (disabled)"
                                disabled
                            />
                        </div>
                    </Field>
                    <Field
                        label="Controlled RadioGroup"
                        hint={`Selected: ${plan}`}
                    >
                        <RadioGroup
                            name="plan"
                            value={plan}
                            onChange={setPlan}
                            options={[
                                { value: 'free', label: 'Free' },
                                { value: 'pro', label: 'Pro' },
                                {
                                    value: 'team',
                                    label: 'Team (disabled)',
                                    disabled: true,
                                },
                            ]}
                        />
                    </Field>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Checkbox</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Checkbox label="Accept terms" defaultChecked />
                    <Checkbox label="Subscribe to updates" />
                    <Checkbox label="Disabled" disabled />
                    <Checkbox
                        label="Disabled checked"
                        disabled
                        defaultChecked
                    />
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Switch</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Switch label="Notifications" defaultChecked />
                    <Switch label="Email digest" />
                    <Switch label="Beta features (disabled)" disabled />
                    <Switch
                        label="Auto-save (disabled, on)"
                        disabled
                        defaultChecked
                    />
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>
                    Password & Search
                </h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 40rem))',
                        gap: '3rem',
                    }}
                >
                    <Field label="Password" hint="Click the eye to reveal.">
                        <PasswordInput
                            placeholder="••••••••"
                            defaultValue="super-secret"
                        />
                    </Field>
                    <Field label="Search">
                        <SearchInput />
                    </Field>
                    <Field
                        label="Password (error)"
                        error="Must include a number."
                    >
                        <PasswordInput defaultValue="letters-only" error />
                    </Field>
                    <Field label="Search (custom placeholder)">
                        <SearchInput placeholder="Find a component…" />
                    </Field>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Badge</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Badge dot>Live</Badge>
                    <Badge variant="primary" dot>
                        New
                    </Badge>
                    <Badge variant="success" dot>
                        Online
                    </Badge>
                    <Badge variant="warning" dot>
                        Pending
                    </Badge>
                    <Badge variant="danger" dot>
                        Offline
                    </Badge>
                    <Badge variant="info" dot>
                        Beta
                    </Badge>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Chip</h2>
                <Field
                    label="Filters (toggle to select)"
                    hint={`Active: ${[...filters].join(', ') || 'none'}`}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                        }}
                    >
                        {['react', 'typescript', 'vite', 'biome', 'figma'].map(
                            (key) => (
                                <Chip
                                    key={key}
                                    selected={filters.has(key)}
                                    onSelect={() => toggleFilter(key)}
                                >
                                    {key}
                                </Chip>
                            ),
                        )}
                    </div>
                </Field>
                <Field
                    label="Removable tags"
                    hint={`Tags: ${tags.join(', ') || 'none'}`}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                        }}
                    >
                        {tags.map((tag) => (
                            <Chip
                                key={tag}
                                onClose={() =>
                                    setTags((prev) =>
                                        prev.filter((t) => t !== tag),
                                    )
                                }
                            >
                                {tag}
                            </Chip>
                        ))}
                    </div>
                </Field>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Spinner</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        alignItems: 'center',
                    }}
                >
                    <Spinner size="small" />
                    <Spinner />
                    <Spinner size="large" />
                    <Button leftIcon={<Spinner size="small" />} disabled>
                        Loading
                    </Button>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Progress</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 60rem)',
                        gap: '3rem',
                    }}
                >
                    <Field label="Determinate (0%)">
                        <Progress value={0} />
                    </Field>
                    <Field label="Determinate (35%)">
                        <Progress value={35} />
                    </Field>
                    <Field label="Determinate (80%)">
                        <Progress value={80} />
                    </Field>
                    <Field label="Determinate (100%)">
                        <Progress value={100} />
                    </Field>
                    <Field label="Indeterminate">
                        <Progress indeterminate label="Syncing" />
                    </Field>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Alert</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 80rem)',
                        gap: '2rem',
                    }}
                >
                    <Alert variant="info" title="Heads up">
                        A new theme is available. Reload to pick it up.
                    </Alert>
                    <Alert variant="success" title="Saved">
                        Your changes have been written to the cloud.
                    </Alert>
                    <Alert
                        variant="warning"
                        title="Low storage"
                        action={
                            <Button size="small" variant="soft">
                                Manage
                            </Button>
                        }
                    >
                        You have 1.2 GB free on this device.
                    </Alert>
                    <Alert
                        variant="danger"
                        title="Sync failed"
                        action={
                            <Button size="small" variant="danger">
                                Retry
                            </Button>
                        }
                    >
                        Could not reach the server. Will retry in 30 seconds.
                    </Alert>
                    <Alert variant="info">
                        Body-only alert with no title — works too.
                    </Alert>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Card</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 45rem))',
                        gap: '2.5rem',
                    }}
                >
                    <Card>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '2.25rem',
                                fontWeight: 700,
                            }}
                        >
                            Default
                        </h3>
                        <p
                            style={{
                                margin: '0.75rem 0 0',
                                fontSize: '1.75rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Elevated warm surface with the asymmetric leaf
                            corner shape.
                        </p>
                    </Card>
                    <Card variant="flat">
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '2.25rem',
                                fontWeight: 700,
                            }}
                        >
                            Flat
                        </h3>
                        <p
                            style={{
                                margin: '0.75rem 0 0',
                                fontSize: '1.75rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Same shape, no shadow — for cards inside a scrolling
                            list or grid.
                        </p>
                    </Card>
                    <Card variant="ink">
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '2.25rem',
                                fontWeight: 700,
                            }}
                        >
                            Ink
                        </h3>
                        <p
                            style={{
                                margin: '0.75rem 0 0',
                                fontSize: '1.75rem',
                            }}
                        >
                            High-contrast dark surface for callouts and hero
                            sections.
                        </p>
                    </Card>
                    <Card variant="accent">
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '2.25rem',
                                fontWeight: 700,
                            }}
                        >
                            Accent
                        </h3>
                        <p
                            style={{
                                margin: '0.75rem 0 0',
                                fontSize: '1.75rem',
                            }}
                        >
                            Primary tonal fill — pairs with the Badge / Chip
                            primary variants.
                        </p>
                    </Card>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Avatar</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                    }}
                >
                    <Avatar name="Ada Lovelace" size="small" />
                    <Avatar name="Alan Turing" />
                    <Avatar name="Grace Hopper" size="large" />
                    <Avatar name="Linus Torvalds" size="xlarge" />
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                    }}
                >
                    <Avatar name="Ada Lovelace" status="online" />
                    <Avatar name="Alan Turing" status="away" />
                    <Avatar name="Grace Hopper" status="offline" />
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        alignItems: 'center',
                    }}
                >
                    <AvatarStack
                        names={[
                            'Ada Lovelace',
                            'Alan Turing',
                            'Grace Hopper',
                            'Linus Torvalds',
                        ]}
                    />
                    <AvatarStack
                        names={[
                            'Ada Lovelace',
                            'Alan Turing',
                            'Grace Hopper',
                            'Linus Torvalds',
                            'Margaret Hamilton',
                            'Donald Knuth',
                            'Edsger Dijkstra',
                        ]}
                        max={4}
                    />
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Tooltip</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        padding: '6rem 3rem',
                        justifyContent: 'center',
                    }}
                >
                    <Tooltip label="On top" side="top">
                        <Button variant="secondary">Top</Button>
                    </Tooltip>
                    <Tooltip label="Below" side="bottom">
                        <Button variant="secondary">Bottom</Button>
                    </Tooltip>
                    <Tooltip label="To the left" side="left">
                        <Button variant="secondary">Left</Button>
                    </Tooltip>
                    <Tooltip label="To the right" side="right">
                        <Button variant="secondary">Right</Button>
                    </Tooltip>
                    <Tooltip label="Snappy (0ms delay)" delay={0}>
                        <Button>Instant</Button>
                    </Tooltip>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Popover</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '2rem 0 12rem',
                    }}
                >
                    <Popover
                        open={popoverStartOpen}
                        onOpenChange={setPopoverStartOpen}
                        trigger={
                            <Button variant="secondary">Open (start)</Button>
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                fontSize: '1.75rem',
                            }}
                        >
                            <strong>Start aligned</strong>
                            <span
                                style={{ color: 'var(--on-surface-variant)' }}
                            >
                                Anchored to the trigger's left edge. Click
                                outside or press Escape to dismiss.
                            </span>
                        </div>
                    </Popover>
                    <Popover
                        open={popoverEndOpen}
                        onOpenChange={setPopoverEndOpen}
                        align="end"
                        width={320}
                        trigger={
                            <Button variant="secondary">Open (end)</Button>
                        }
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                fontSize: '1.75rem',
                            }}
                        >
                            <strong>End aligned</strong>
                            <span
                                style={{ color: 'var(--on-surface-variant)' }}
                            >
                                Anchored to the trigger's right edge, with a
                                fixed width.
                            </span>
                        </div>
                    </Popover>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Menu</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        alignItems: 'center',
                        padding: '2rem 0 24rem',
                    }}
                >
                    <Popover
                        open={menuOpen}
                        onOpenChange={setMenuOpen}
                        width={260}
                        trigger={<Button variant="secondary">Actions ▾</Button>}
                    >
                        <Menu>
                            <MenuLabel>Workspace</MenuLabel>
                            <MenuItem
                                onClick={() => {
                                    setLastMenuAction('new-file');
                                    setMenuOpen(false);
                                }}
                                shortcut="⌘N"
                            >
                                New file
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setLastMenuAction('open');
                                    setMenuOpen(false);
                                }}
                                shortcut="⌘O"
                            >
                                Open…
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setLastMenuAction('save');
                                    setMenuOpen(false);
                                }}
                                shortcut="⌘S"
                            >
                                Save
                            </MenuItem>
                            <MenuSeparator />
                            <MenuLabel>Danger zone</MenuLabel>
                            <MenuItem
                                danger
                                onClick={() => {
                                    setLastMenuAction('delete');
                                    setMenuOpen(false);
                                }}
                                shortcut="⌫"
                            >
                                Delete file
                            </MenuItem>
                        </Menu>
                    </Popover>
                    <span
                        style={{
                            fontSize: '1.75rem',
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Last action: <strong>{lastMenuAction}</strong>
                    </span>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Select</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 40rem))',
                        gap: '3rem',
                        paddingBottom: '24rem',
                    }}
                >
                    <Field label="Framework" hint={`Picked: ${framework}`}>
                        <Select
                            value={framework}
                            onChange={setFramework}
                            options={[
                                { value: 'react', label: 'React' },
                                { value: 'vue', label: 'Vue' },
                                { value: 'svelte', label: 'Svelte' },
                                { value: 'solid', label: 'Solid' },
                            ]}
                        />
                    </Field>
                    <Field label="Uncontrolled (with placeholder)">
                        <Select
                            placeholder="Pick a region…"
                            options={[
                                { value: 'eu-west', label: 'EU West' },
                                { value: 'us-east', label: 'US East' },
                                { value: 'ap-south', label: 'AP South' },
                            ]}
                        />
                    </Field>
                    <Field label="Disabled">
                        <Select
                            disabled
                            defaultValue="locked"
                            options={[{ value: 'locked', label: 'Locked' }]}
                        />
                    </Field>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Modal</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Button onClick={() => setModalMedium(true)}>
                        Open medium modal
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setModalLarge(true)}
                    >
                        Open large modal
                    </Button>
                </div>
                <Modal
                    open={modalMedium}
                    onClose={() => setModalMedium(false)}
                    title="Confirm publish"
                    description="This will make the post visible to anyone with the link."
                    actions={
                        <>
                            <Button
                                variant="ghost"
                                onClick={() => setModalMedium(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => setModalMedium(false)}
                            >
                                Publish
                            </Button>
                        </>
                    }
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: '1.75rem',
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        You can change visibility back to private at any time
                        from the post's settings menu.
                    </p>
                </Modal>
                <Modal
                    open={modalLarge}
                    onClose={() => setModalLarge(false)}
                    size="large"
                    title="Workspace settings"
                    description="Long-form content lives comfortably in the large variant."
                    actions={
                        <Button
                            variant="primary"
                            onClick={() => setModalLarge(false)}
                        >
                            Done
                        </Button>
                    }
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            fontSize: '1.75rem',
                        }}
                    >
                        <Field label="Display name">
                            <Input defaultValue="Ninoverse" />
                        </Field>
                        <Field label="Notes">
                            <Textarea defaultValue="Anything you'd like to remember about this workspace." />
                        </Field>
                    </div>
                </Modal>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Toast</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                    }}
                >
                    <Avatar name="Ada Lovelace" status="online" />
                    <Avatar name="Alan Turing" status="away" />
                    <Avatar name="Grace Hopper" status="offline" />
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        alignItems: 'center',
                    }}
                >
                    <AvatarStack
                        names={[
                            'Ada Lovelace',
                            'Alan Turing',
                            'Grace Hopper',
                            'Linus Torvalds',
                        ]}
                    />
                    <AvatarStack
                        names={[
                            'Ada Lovelace',
                            'Alan Turing',
                            'Grace Hopper',
                            'Linus Torvalds',
                            'Margaret Hamilton',
                            'Donald Knuth',
                            'Edsger Dijkstra',
                        ]}
                        max={4}
                    />
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Toast</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant="soft"
                        onClick={() =>
                            toast.info(
                                'New version available',
                                'Reload to pick up the latest build.',
                            )
                        }
                    >
                        Info
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() =>
                            toast.success(
                                'Saved',
                                'Changes synced to the cloud.',
                            )
                        }
                    >
                        Success
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            toast.warning(
                                'Low storage',
                                '1.2 GB free on this device.',
                            )
                        }
                    >
                        Warning
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() =>
                            toast.danger(
                                'Upload failed',
                                'Could not reach the server.',
                            )
                        }
                    >
                        Danger
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            toast.info(
                                'Sticky toast',
                                'Stays until dismissed.',
                                {
                                    duration: 0,
                                },
                            )
                        }
                    >
                        Sticky
                    </Button>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Tabs</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3rem',
                    }}
                >
                    <div>
                        <Tabs
                            value={pillTab}
                            onChange={setPillTab}
                            options={[
                                {
                                    value: 'inbox',
                                    label: 'Inbox',
                                    count: 12,
                                },
                                { value: 'sent', label: 'Sent' },
                                {
                                    value: 'archive',
                                    label: 'Archive',
                                    count: 3,
                                },
                            ]}
                        />
                        <p
                            style={{
                                margin: '1rem 0 0',
                                fontSize: '1.625rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Active: <strong>{pillTab}</strong>
                        </p>
                    </div>
                    <div>
                        <Tabs
                            variant="underline"
                            value={underlineTab}
                            onChange={setUnderlineTab}
                            options={[
                                { value: 'overview', label: 'Overview' },
                                {
                                    value: 'usage',
                                    label: 'Usage',
                                    count: 24,
                                },
                                { value: 'billing', label: 'Billing' },
                            ]}
                        />
                        <p
                            style={{
                                margin: '1rem 0 0',
                                fontSize: '1.625rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Active: <strong>{underlineTab}</strong>
                        </p>
                    </div>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Accordion</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 50rem))',
                        gap: '4rem',
                    }}
                >
                    <div>
                        <p
                            style={{
                                margin: '0 0 1rem',
                                fontSize: '1.625rem',
                                fontWeight: 700,
                            }}
                        >
                            Single (default)
                        </p>
                        <Accordion
                            defaultOpen={[0]}
                            items={[
                                {
                                    title: 'How do I install the library?',
                                    body: 'Run pnpm add @ninoverse/hmi-components, then import the components and the stylesheet.',
                                },
                                {
                                    title: 'What about the theme?',
                                    body: 'Drop the default.css file into your public dir and link it in your HTML. All components read its tokens at runtime.',
                                },
                                {
                                    title: 'Can I disable a section?',
                                    body: 'Yes — pass disabled: true on the AccordionItem.',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                margin: '0 0 1rem',
                                fontSize: '1.625rem',
                                fontWeight: 700,
                            }}
                        >
                            Multiple
                        </p>
                        <Accordion
                            multiple
                            defaultOpen={[0, 1]}
                            items={[
                                {
                                    title: 'Keyboard shortcuts',
                                    body: 'Tab moves between triggers; Enter or Space toggles a section.',
                                },
                                {
                                    title: 'Animation',
                                    body: 'Panels use the grid-template-rows 0fr → 1fr trick so content height isn’t measured.',
                                },
                                {
                                    title: 'Reduced motion',
                                    body: 'Honors prefers-reduced-motion by zeroing the transition duration.',
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Breadcrumbs</h2>
                <Breadcrumbs
                    items={[
                        {
                            label: 'Home',
                            onClick: () => setCrumbsCurrent('Home'),
                        },
                        {
                            label: 'Library',
                            onClick: () => setCrumbsCurrent('Library'),
                        },
                        {
                            label: 'Components',
                            onClick: () => setCrumbsCurrent('Components'),
                        },
                        { label: crumbsCurrent },
                    ]}
                />
                <Breadcrumbs
                    separator="›"
                    items={[
                        { label: 'Docs', href: '#' },
                        { label: 'Guides', href: '#' },
                        { label: 'Getting started' },
                    ]}
                />
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Pagination</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                    }}
                >
                    <div>
                        <p
                            style={{
                                margin: '0 0 1rem',
                                fontSize: '1.625rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Short (5 pages, all shown):
                        </p>
                        <Pagination
                            page={pageShort}
                            total={5}
                            onChange={setPageShort}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                margin: '0 0 1rem',
                                fontSize: '1.625rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Long (20 pages, windowed). Current:{' '}
                            <strong>{pageLong}</strong>
                        </p>
                        <Pagination
                            page={pageLong}
                            total={20}
                            onChange={setPageLong}
                        />
                    </div>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>List</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 50rem))',
                        gap: '3rem',
                    }}
                >
                    <div>
                        <p
                            style={{
                                margin: '0 0 1rem',
                                fontSize: '1.625rem',
                                fontWeight: 700,
                            }}
                        >
                            Simple list
                        </p>
                        <List
                            items={[
                                {
                                    id: 1,
                                    title: 'Inbox',
                                    subtitle: '12 unread messages',
                                    right: <Badge dot>Live</Badge>,
                                },
                                {
                                    id: 2,
                                    title: 'Drafts',
                                    subtitle: '3 unsent',
                                },
                                {
                                    id: 3,
                                    title: 'Archive',
                                    subtitle: 'Older than 30 days',
                                    right: <Badge>312</Badge>,
                                },
                            ]}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                margin: '0 0 1rem',
                                fontSize: '1.625rem',
                                fontWeight: 700,
                            }}
                        >
                            Draggable (drag handle visible)
                        </p>
                        <List
                            draggable
                            items={reorderable}
                            onReorder={setReorderable}
                        />
                    </div>
                </div>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Table</h2>
                <Table
                    columns={[
                        { key: 'name', label: 'Name' },
                        {
                            key: 'role',
                            label: 'Role',
                        },
                        {
                            key: 'commits',
                            label: 'Commits',
                            style: { textAlign: 'right' },
                        },
                        {
                            key: 'status',
                            label: 'Status',
                            sortable: false,
                            render: (row) => (
                                <Badge
                                    variant={
                                        row.status === 'active'
                                            ? 'success'
                                            : row.status === 'pending'
                                              ? 'warning'
                                              : 'default'
                                    }
                                    dot
                                >
                                    {String(row.status)}
                                </Badge>
                            ),
                        },
                    ]}
                    rows={[
                        {
                            id: 'ada',
                            name: 'Ada Lovelace',
                            role: 'Analyst',
                            commits: 142,
                            status: 'active',
                        },
                        {
                            id: 'alan',
                            name: 'Alan Turing',
                            role: 'Theoretician',
                            commits: 87,
                            status: 'pending',
                        },
                        {
                            id: 'grace',
                            name: 'Grace Hopper',
                            role: 'Compiler engineer',
                            commits: 254,
                            status: 'active',
                        },
                        {
                            id: 'linus',
                            name: 'Linus Torvalds',
                            role: 'Maintainer',
                            commits: 1024,
                            status: 'archived',
                        },
                    ]}
                    getRowKey={(row) => String(row.id)}
                />
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Navbar</h2>
                <Navbar
                    brand="Ninoverse"
                    current={navTab}
                    onNav={setNavTab}
                    links={[
                        { value: 'overview', label: 'Overview' },
                        { value: 'reports', label: 'Reports' },
                        { value: 'people', label: 'People' },
                        { value: 'settings', label: 'Settings' },
                    ]}
                    right={
                        <>
                            <Button size="small" variant="ghost">
                                Sign in
                            </Button>
                            <Button size="small" variant="primary">
                                Get started
                            </Button>
                        </>
                    }
                />
                <p
                    style={{
                        margin: 0,
                        fontSize: '1.625rem',
                        color: 'var(--on-surface-variant)',
                    }}
                >
                    Active: <strong>{navTab}</strong>
                </p>
            </section>

            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Sidebar</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        alignItems: 'flex-start',
                    }}
                >
                    <Sidebar
                        current={sideNav}
                        onNav={setSideNav}
                        groups={[
                            {
                                label: 'Mail',
                                items: [
                                    {
                                        value: 'inbox',
                                        label: 'Inbox',
                                        icon: (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <title>Inbox</title>
                                                <path d="M2 9l1.5-5.5A1 1 0 014.5 3h7a1 1 0 011 .5L14 9v3.5a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V9z" />
                                                <path d="M2 9h3l1 2h4l1-2h3" />
                                            </svg>
                                        ),
                                        badge: 12,
                                        badgeVariant: 'primary',
                                    },
                                    {
                                        value: 'starred',
                                        label: 'Starred',
                                        icon: (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <title>Starred</title>
                                                <path d="M8 2l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.8 4.2 13.8l.7-4.3-3.1-3 4.3-.6L8 2z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: 'sent',
                                        label: 'Sent',
                                        icon: (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <title>Sent</title>
                                                <path d="M14 2L7 9M14 2L9.5 14 7 9 2 6.5 14 2z" />
                                            </svg>
                                        ),
                                    },
                                ],
                            },
                            {
                                label: 'Workspace',
                                items: [
                                    {
                                        value: 'team',
                                        label: 'Team',
                                        icon: (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <title>Team</title>
                                                <circle
                                                    cx="8"
                                                    cy="5.5"
                                                    r="2.5"
                                                />
                                                <path d="M3 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
                                            </svg>
                                        ),
                                        badge: 'New',
                                        badgeVariant: 'success',
                                    },
                                    {
                                        value: 'settings',
                                        label: 'Settings',
                                        icon: (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <title>Settings</title>
                                                <circle cx="8" cy="8" r="2" />
                                                <path d="M13 8c0-.4 0-.7-.1-1l1.2-.9-1-1.7L11.7 5c-.5-.5-1.1-.8-1.7-1l-.2-1.5h-2L7.6 4c-.6.2-1.2.5-1.7 1l-1.4-.6-1 1.7 1.2.9c0 .3-.1.6-.1 1s0 .7.1 1l-1.2.9 1 1.7L5.9 11c.5.5 1.1.8 1.7 1l.2 1.5h2l.2-1.5c.6-.2 1.2-.5 1.7-1l1.4.6 1-1.7-1.2-.9c.1-.3.1-.6.1-1z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        value: 'logout',
                                        label: 'Log out',
                                        icon: (
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                aria-hidden="true"
                                            >
                                                <title>Log out</title>
                                                <path d="M9 3.5H4a1 1 0 00-1 1v7a1 1 0 001 1h5" />
                                                <path d="M11 5l3 3-3 3M14 8H7" />
                                            </svg>
                                        ),
                                    },
                                ],
                            },
                        ]}
                    />
                    <p
                        style={{
                            margin: 0,
                            fontSize: '1.625rem',
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Active: <strong>{sideNav}</strong>
                    </p>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Skeleton</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '3rem',
                        alignItems: 'flex-start',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: '1.625rem',
                                color: 'var(--on-surface-variant)',
                            }}
                        >
                            Text lines
                        </p>
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="60%" />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                        }}
                    >
                        <Skeleton variant="circle" width="6rem" height="6rem" />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                flex: 1,
                            }}
                        >
                            <Skeleton variant="text" width="50%" />
                            <Skeleton variant="rect" height="1.5rem" />
                            <Skeleton
                                variant="rect"
                                height="1.5rem"
                                width="80%"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Divider</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                    }}
                >
                    <Divider />
                    <Divider>OR</Divider>
                    <Divider align="start">Recent</Divider>
                    <Divider align="end">2 of 4</Divider>
                    <div
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center',
                            height: '4rem',
                        }}
                    >
                        <span style={{ fontSize: '1.625rem' }}>Left</span>
                        <Divider orientation="vertical" />
                        <span style={{ fontSize: '1.625rem' }}>Middle</span>
                        <Divider orientation="vertical" />
                        <span style={{ fontSize: '1.625rem' }}>Right</span>
                    </div>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Kbd</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '1.625rem',
                        }}
                    >
                        <span>Open command palette:</span>
                        <Kbd>Ctrl</Kbd>
                        <span>+</span>
                        <Kbd>K</Kbd>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '1.625rem',
                        }}
                    >
                        <span>Save:</span>
                        <Kbd size="small">⌘</Kbd>
                        <span>+</span>
                        <Kbd size="small">S</Kbd>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.625rem',
                        }}
                    >
                        <span>Navigate:</span>
                        <Kbd>↑</Kbd>
                        <Kbd>↓</Kbd>
                        <Kbd>←</Kbd>
                        <Kbd>→</Kbd>
                    </div>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Empty state</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '3rem',
                    }}
                >
                    <EmptyState
                        icon={
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <title>Empty inbox</title>
                                <path d="M3 13l3-7h12l3 7v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                                <path d="M3 13h5l1 2h6l1-2h5" />
                            </svg>
                        }
                        title="Inbox zero"
                        description="No new messages. When something arrives, it will show up here automatically."
                    />
                    <EmptyState
                        icon={
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <title>No results</title>
                                <circle cx="11" cy="11" r="6" />
                                <path d="M16 16l4.5 4.5" />
                            </svg>
                        }
                        title="No matches"
                        description={
                            <>
                                We couldn&apos;t find anything matching that
                                search. Try a different keyword or clear all
                                filters.
                            </>
                        }
                        action={
                            <>
                                <Button variant="secondary">
                                    Clear filters
                                </Button>
                                <Button>New search</Button>
                            </>
                        }
                    />
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Slider</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        maxWidth: '60rem',
                    }}
                >
                    <Field label="Volume">
                        <Slider
                            value={volume}
                            onChange={setVolume}
                            showValue
                            aria-label="Volume"
                            formatValue={(v) => `${v}%`}
                        />
                    </Field>
                    <Field label="Contrast">
                        <Slider
                            value={contrast}
                            onChange={setContrast}
                            min={0}
                            max={100}
                            step={5}
                            aria-label="Contrast"
                        />
                    </Field>
                    <Field label="Disabled">
                        <Slider
                            defaultValue={30}
                            disabled
                            showValue
                            aria-label="Disabled slider"
                        />
                    </Field>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Number input</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                        gap: '2rem',
                        maxWidth: '90rem',
                    }}
                >
                    <Field label="Quantity">
                        <NumberInput
                            value={quantity}
                            onChange={setQuantity}
                            min={1}
                            max={99}
                            aria-label="Quantity"
                        />
                    </Field>
                    <Field label="Age">
                        <NumberInput
                            value={age}
                            onChange={setAge}
                            min={0}
                            max={120}
                            step={1}
                            aria-label="Age"
                        />
                    </Field>
                    <Field label="Disabled">
                        <NumberInput
                            defaultValue={5}
                            disabled
                            aria-label="Disabled number"
                        />
                    </Field>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Combobox</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                    }}
                >
                    <Field label="City">
                        <div style={{ width: '36rem' }}>
                            <Combobox
                                value={city}
                                onChange={setCity}
                                options={cityOptions}
                                placeholder="Search cities…"
                                aria-label="City"
                            />
                        </div>
                    </Field>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '1.625rem',
                            color: 'var(--on-surface-variant)',
                        }}
                    >
                        Selected: <strong>{city ?? 'none'}</strong>
                    </p>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Date picker</h2>
                <div
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <Field label="Single date">
                        <div style={{ width: '32rem' }}>
                            <DatePicker
                                value={pickedDate}
                                onChange={setPickedDate}
                                aria-label="Pick a date"
                            />
                        </div>
                    </Field>
                    <Field label="Date range">
                        <div style={{ width: '40rem' }}>
                            <DatePicker
                                mode="range"
                                value={pickedRange}
                                onChange={setPickedRange}
                                placeholder="Pick a range"
                                aria-label="Pick a date range"
                            />
                        </div>
                    </Field>
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>File upload</h2>
                <div style={{ maxWidth: '60rem' }}>
                    <FileUpload
                        value={uploadedFiles}
                        onChange={setUploadedFiles}
                        multiple
                        hint="PNG, JPG, or PDF up to 10 MB each"
                        aria-label="Project attachments"
                    />
                </div>
            </section>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <h2 style={{ margin: 0, fontSize: '3rem' }}>Rating</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                    }}
                >
                    <Field label="Integer (default)">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                            }}
                        >
                            <Rating
                                value={productRating}
                                onChange={setProductRating}
                                aria-label="Product rating"
                            />
                            <span
                                style={{
                                    fontSize: '1.625rem',
                                    color: 'var(--on-surface-variant)',
                                }}
                            >
                                {productRating} / 5
                            </span>
                        </div>
                    </Field>
                    <Field label="Half-star steps">
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                            }}
                        >
                            <Rating
                                value={halfRating}
                                onChange={setHalfRating}
                                allowHalf
                                size="large"
                                aria-label="Half-star rating"
                            />
                            <span
                                style={{
                                    fontSize: '1.625rem',
                                    color: 'var(--on-surface-variant)',
                                }}
                            >
                                {halfRating} / 5
                            </span>
                        </div>
                    </Field>
                    <Field label="Read-only">
                        <Rating
                            value={4.5}
                            allowHalf
                            readOnly
                            size="small"
                            aria-label="Read-only rating"
                        />
                    </Field>
                </div>
            </section>
            <ToastHost />
        </div>
    );
}
