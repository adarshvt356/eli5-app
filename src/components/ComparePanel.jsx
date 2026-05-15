import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';
import LoadingSpinner from './LoadingSpinner';

const MODES = [
    { key: 'ELI5', label: 'ELI5' },
    { key: 'Beginner', label: 'Beginner' },
    { key: 'Technical', label: 'Technical' },
    { key: 'Analogy', label: 'Analogy' },
];

function CodeBlock({ darkMode, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    if (match) {
        return (
            <SyntaxHighlighter
                style={darkMode ? oneDark : oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        );
    }
    return (
        <code
            style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                background: 'var(--bg2)',
                padding: '1px 4px',
                border: '1px solid var(--rule)',
            }}
            {...props}
        >
            {children}
        </code>
    );
}

function ComparePanel({ results, loading, darkMode }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <style>{`
        .d3-compare-grid {
          display: grid;
          grid-template-columns: 1fr;
          border: 1.5px solid var(--ink);
        }
        .d3-cc {
          border-right: none;
          border-bottom: 1px solid var(--ink);
          min-width: 0;
        }
        .d3-cc:last-child { border-bottom: none; }

        @media (min-width: 480px) {
          .d3-compare-grid         { grid-template-columns: repeat(2, 1fr); }
          .d3-cc                   { border-right: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
          .d3-cc:nth-child(2n)     { border-right: none; }
          .d3-cc:nth-child(3),
          .d3-cc:nth-child(4)      { border-bottom: none; }
        }

        @media (min-width: 900px) {
          .d3-compare-grid         { grid-template-columns: repeat(4, 1fr); }
          .d3-cc                   { border-right: 1px solid var(--ink) !important; border-bottom: none !important; }
          .d3-cc:last-child        { border-right: none !important; }
        }
      `}</style>

            {/* Section header */}
            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(16px, 3vw, 22px)',
                    letterSpacing: '1px',
                    color: 'var(--ink)',
                    borderBottom: '2px solid var(--ink)',
                    paddingBottom: '4px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '4px',
                }}
            >
                All Modes Compared
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--ink3)',
                        letterSpacing: '0.1em',
                        fontWeight: 400,
                    }}
                >
                    Same input · 4 perspectives
                </span>
            </div>

            <div className="d3-compare-grid">
                {MODES.map((m) => (
                    <div key={m.key} className="d3-cc">
                        {/* Column header */}
                        <div
                            style={{
                                padding: '8px 12px',
                                borderBottom: '1px solid var(--ink)',
                                background: 'var(--ink)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '14px',
                                    letterSpacing: '0.5px',
                                    color: 'var(--bg)',
                                }}
                            >
                                {m.label}
                            </span>
                            {results?.[m.key] && !loading && (
                                <CopyButton text={results[m.key]} small />
                            )}
                        </div>

                        {/* Column body */}
                        <div
                            style={{
                                padding: '12px',
                                background: 'var(--paper)',
                                minHeight: '120px',
                            }}
                        >
                            {loading ? (
                                <LoadingSpinner />
                            ) : results?.[m.key] ? (
                                <div className="d3-prose" style={{ fontSize: '12px' }}>
                                    <ReactMarkdown
                                        components={{
                                            code: (props) => <CodeBlock darkMode={darkMode} {...props} />,
                                        }}
                                    >
                                        {results[m.key]}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <span
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '10px',
                                        color: 'var(--ink3)',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    No result yet.
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ComparePanel;