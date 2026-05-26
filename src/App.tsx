import { Button } from './components/button';

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
        </div>
    );
}
