import { useState } from 'react';
import { Alert } from './components/alert';
import { Badge } from './components/badge';
import { Button } from './components/button';
import { Card } from './components/card';
import { Checkbox } from './components/checkbox';
import { Chip } from './components/chip';
import { Field } from './components/field';
import { Input } from './components/input';
import { Menu, MenuItem, MenuLabel, MenuSeparator } from './components/menu';
import { PasswordInput } from './components/passwordInput';
import { Popover } from './components/popover';
import { Progress } from './components/progress';
import { Radio } from './components/radio';
import { RadioGroup } from './components/radioGroup';
import { SearchInput } from './components/searchInput';
import { Select } from './components/select';
import { Spinner } from './components/spinner';
import { Switch } from './components/switch';
import { Textarea } from './components/textarea';
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
        </div>
    );
}
