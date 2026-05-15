import { Sun, Moon } from 'lucide-react';

function Header({ darkMode, setDarkMode }) {
    return (
        <header
            style={{
                background: 'var(--ink)',
                borderBottom: '1px solid var(--rule)',
                padding: '14px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '26px',
                        letterSpacing: '2px',
                        color: 'var(--bg)',
                        lineHeight: 1,
                    }}
                >
                    ELI5
                </span>
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--ink3)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                    }}
                >
                    AI · Explainer
                </span>
            </div>

            {/* Dark mode toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    background: 'var(--bg)',
                    border: '1px solid var(--bg)',
                    padding: '10px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.25)',
                    transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translate(-1px, -1px)';
                    e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.25)';
                }}
            >
                {darkMode ? <Sun size={12} /> : <Moon size={12} />}
                {darkMode ? 'Light' : 'Dark'}
            </button>
        </header>
    );
}

export default Header;