import { useState } from 'react';
import { Badge } from './components/badge';
import { Button } from './components/button';
import { Checkbox } from './components/checkbox';
import { Chip } from './components/chip';
import { Field } from './components/field';
import { Input } from './components/input';
import { PasswordInput } from './components/passwordInput';
import { Radio } from './components/radio';
import { RadioGroup } from './components/radioGroup';
import { SearchInput } from './components/searchInput';
import { Switch } from './components/switch';
import { Textarea } from './components/textarea';

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
        </div>
    );
}
