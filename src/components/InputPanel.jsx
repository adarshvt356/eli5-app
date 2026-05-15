import { useState } from 'react';

const MAX_CHARS = 5000;

function InputPanel({ onSubmit, onCompare, loading }) {
    const [question, setQuestion] = useState('');

    const charCount = question.length;
    const isEmpty = !question.trim();
    const isDisabled = loading || isEmpty;

    const handleChange = (e) => {
        setQuestion(e.target.value.slice(0, MAX_CHARS));
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <div
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink2)',
                    marginBottom: '6px',
                }}
            >
                Your input — paste code, error, article or concept
            </div>

            <div style={{ border: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
                <textarea
                    value={question}
                    onChange={handleChange}
                    placeholder="Type or paste anything here…"
                    style={{
                        width: '100%',
                        minHeight: '110px',
                        padding: '14px 16px',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--ink)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        lineHeight: 1.65,
                        resize: 'none',
                        fontStyle: question ? 'normal' : 'italic',
                    }}
                />

                {/* Footer row */}
                <div
                    style={{
                        padding: '8px 14px',
                        borderTop: '1px solid var(--rule)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            letterSpacing: '0.1em',
                            color: charCount > MAX_CHARS * 0.9 ? 'var(--stamp-r)' : 'var(--ink3)',
                        }}
                    >
                        {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
                    </span>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => onCompare(question)}
                            disabled={isDisabled}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                letterSpacing: '0.08em',
                                padding: '7px 16px',
                                background: 'none',
                                color: 'var(--ink2)',
                                border: '1px solid var(--rule)',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                opacity: isDisabled ? 0.5 : 1,
                                transition: 'border-color 0.12s, color 0.12s',
                            }}
                            onMouseEnter={(e) => {
                                if (!isDisabled) {
                                    e.currentTarget.style.borderColor = 'var(--ink)';
                                    e.currentTarget.style.color = 'var(--ink)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--rule)';
                                e.currentTarget.style.color = 'var(--ink2)';
                            }}
                        >
                            ⊞ Compare
                        </button>

                        <button
                            onClick={() => onSubmit(question)}
                            disabled={isDisabled}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '15px',
                                letterSpacing: '1.5px',
                                padding: '6px 20px',
                                background: isDisabled ? 'var(--ink3)' : 'var(--ink)',
                                color: 'var(--bg)',
                                border: 'none',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                transition: 'opacity 0.12s',
                            }}
                            onMouseEnter={(e) => {
                                if (!isDisabled) e.currentTarget.style.opacity = '0.82';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                            }}
                        >
                            {loading ? 'Working…' : 'Explain →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputPanel;