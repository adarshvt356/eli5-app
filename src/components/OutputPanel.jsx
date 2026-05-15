import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './CopyButton';
import LoadingSpinner from './LoadingSpinner';

const MODE_STAMPS = {
    ELI5: { color: 'var(--stamp-r)', label: 'ELI5 · Simplified' },
    Beginner: { color: 'var(--stamp-g)', label: 'Beginner · Friendly' },
    Technical: { color: 'var(--stamp-b)', label: 'Technical · Precise' },
    Analogy: { color: 'var(--stamp-y)', label: 'Analogy · Creative' },
};

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
                fontSize: '12px',
                background: 'var(--bg2)',
                padding: '1px 5px',
                border: '1px solid var(--rule)',
            }}
            {...props}
        >
            {children}
        </code>
    );
}

function OutputPanel({ output, mode, isLoading, darkMode }) {
    const stamp = MODE_STAMPS[mode] ?? MODE_STAMPS.ELI5;

    if (!isLoading && !output) return null;

    return (
        <div
            style={{
                border: '1.5px solid var(--ink)',
                background: 'var(--paper)',
                marginBottom: '20px',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '7px 14px',
                    background: 'var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--bg)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                    }}
                >
                    Output · {mode} Mode
                </span>
                {output && !isLoading && <CopyButton text={output} />}
            </div>

            {/* Body */}
            <div style={{ padding: '16px 18px' }}>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="d3-prose">
                            <ReactMarkdown
                                components={{
                                    code: (props) => <CodeBlock darkMode={darkMode} {...props} />,
                                }}
                            >
                                {output}
                            </ReactMarkdown>
                        </div>

                        {/* Mode stamp */}
                        <div style={{ marginTop: '14px' }}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    border: `2px solid ${stamp.color}`,
                                    color: stamp.color,
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '9px',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    padding: '2px 8px',
                                    transform: 'rotate(-1.5deg)',
                                    transformOrigin: 'left center',
                                }}
                            >
                                ✓ {stamp.label}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default OutputPanel;