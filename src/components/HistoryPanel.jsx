const MODE_COLORS = {
    ELI5: 'var(--stamp-r)',
    Beginner: 'var(--stamp-g)',
    Technical: 'var(--stamp-b)',
    Analogy: 'var(--stamp-y)',
};

function formatRelativeTime(dateStr) {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60_000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

function HistoryPanel({ history, onSelect, onDelete }) {
    if (!history || history.length === 0) return null;

    return (
        <div style={{ marginTop: '8px' }}>
            {/* Section header */}
            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    letterSpacing: '1px',
                    color: 'var(--ink)',
                    borderBottom: '2px solid var(--ink)',
                    paddingBottom: '4px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                }}
            >
                Session Log
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--ink3)',
                        letterSpacing: '0.1em',
                        fontWeight: 400,
                    }}
                >
                    Last {history.length} entries
                </span>
            </div>

            {/* History list */}
            <div style={{ border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
                {history.map((item, i) => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '11px 14px',
                            borderBottom: i < history.length - 1 ? '1px solid var(--rule)' : 'none',
                            transition: 'background 0.1s',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                        {/* Row index */}
                        <span
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '9px',
                                color: 'var(--ink3)',
                                width: '18px',
                                flexShrink: 0,
                                paddingTop: '2px',
                            }}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Mode colour bar */}
                        <div
                            style={{
                                width: '2px',
                                height: '30px',
                                flexShrink: 0,
                                background: MODE_COLORS[item.mode] ?? 'var(--ink3)',
                                opacity: 0.6,
                                borderRadius: '1px',
                            }}
                        />

                        {/* Question + metadata — clicking restores the explanation */}
                        <div style={{ flex: 1, minWidth: 0 }} onClick={() => onSelect(item.explanation)}>
                            <div
                                style={{
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: 'var(--ink)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.user_input}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '9px',
                                    color: 'var(--ink3)',
                                    letterSpacing: '0.06em',
                                    marginTop: '2px',
                                }}
                            >
                                {item.mode}
                                {item.created_at && ` · ${formatRelativeTime(item.created_at)}`}
                            </div>
                        </div>

                        {/* Delete button */}
                        <button
                            onClick={() => onDelete(item.id)}
                            aria-label="Delete entry"
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--ink3)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '4px 6px',
                                flexShrink: 0,
                                fontFamily: 'var(--font-mono)',
                                transition: 'color 0.12s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--stamp-r)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink3)'; }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HistoryPanel;