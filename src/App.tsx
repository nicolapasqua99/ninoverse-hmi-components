import { Button } from './components/button';
import { Field } from './components/field';
import { Input } from './components/input';
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
        </div>
    );
}
