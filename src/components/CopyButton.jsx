import { useState } from 'react';

const RESET_DELAY_MS = 2000;

function CopyButton({ text, small = false }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), RESET_DELAY_MS);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                fontFamily: 'var(--font-mono)',
                fontSize: small ? '9px' : '10px',
                letterSpacing: '0.08em',
                padding: small ? '3px 8px' : '5px 12px',
                background: copied ? 'var(--stamp-g)' : 'none',
                color: copied ? 'var(--bg)' : 'var(--ink3)',
                border: `1px solid ${copied ? 'var(--stamp-g)' : 'var(--rule)'}`,
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
                if (!copied) {
                    e.currentTarget.style.borderColor = 'var(--ink)';
                    e.currentTarget.style.color = 'var(--ink)';
                }
            }}
            onMouseLeave={(e) => {
                if (!copied) {
                    e.currentTarget.style.borderColor = 'var(--rule)';
                    e.currentTarget.style.color = 'var(--ink3)';
                }
            }}
        >
            {copied ? '✓ Copied' : 'Copy ↗'}
        </button>
    );
}

export default CopyButton;