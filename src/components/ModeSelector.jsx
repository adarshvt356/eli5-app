const MODES = [
    { key: 'ELI5', num: '01', label: 'ELI5', desc: 'Age 5 level' },
    { key: 'Beginner', num: '02', label: 'Beginner', desc: 'New learner' },
    { key: 'Technical', num: '03', label: 'Technical', desc: 'Full depth' },
    { key: 'Analogy', num: '04', label: 'Analogy', desc: 'Real-world' },
];

function ModeSelector({ mode, setMode }) {
    return (
        <div style={{ marginBottom: '18px' }}>
            <style>{`
        .d3-mode-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1.5px solid var(--ink);
        }
        @media (min-width: 540px) {
          .d3-mode-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .d3-mode-btn {
          padding: 12px 12px 12px 14px;
          border-right: 1px solid var(--ink);
          border-bottom: 1px solid var(--ink);
          border-top: none;
          border-left: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.12s;
          min-width: 0;
        }
        .d3-mode-btn:nth-child(2),
        .d3-mode-btn:nth-child(4) { border-right: none; }
        .d3-mode-btn:nth-child(3),
        .d3-mode-btn:nth-child(4) { border-bottom: none; }
        @media (min-width: 540px) {
          .d3-mode-btn:nth-child(2)  { border-right: 1px solid var(--ink); }
          .d3-mode-btn:nth-child(1),
          .d3-mode-btn:nth-child(2),
          .d3-mode-btn:nth-child(3)  { border-bottom: none; }
          .d3-mode-btn:nth-child(4)  { border-right: none; border-bottom: none; }
        }
        .d3-mode-btn:not(.active):hover { background: var(--bg2) !important; }
      `}</style>

            <div
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--ink3)',
                    borderBottom: '1px solid var(--rule)',
                    paddingBottom: '6px',
                    marginBottom: '10px',
                }}
            >
                Select mode
            </div>

            <div className="d3-mode-grid">
                {MODES.map((m) => {
                    const isActive = mode === m.key;
                    return (
                        <button
                            key={m.key}
                            onClick={() => setMode(m.key)}
                            className={`d3-mode-btn${isActive ? ' active' : ''}`}
                            style={{ background: isActive ? 'var(--ink)' : 'var(--paper)' }}
                        >
                            <div
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '9px',
                                    color: isActive ? 'rgba(245,242,235,0.35)' : 'var(--ink3)',
                                    letterSpacing: '0.1em',
                                    marginBottom: '6px',
                                }}
                            >
                                {m.num}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '20px',
                                    letterSpacing: '0.5px',
                                    color: isActive ? 'var(--bg)' : 'var(--ink)',
                                    lineHeight: 1.1,
                                    marginBottom: '4px',
                                }}
                            >
                                {m.label}
                            </div>
                            <div
                                style={{
                                    fontSize: '11px',
                                    color: isActive ? 'rgba(245,242,235,0.5)' : 'var(--ink2)',
                                }}
                            >
                                {m.desc}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ModeSelector;