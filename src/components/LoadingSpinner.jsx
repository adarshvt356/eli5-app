function LoadingSpinner() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px 0' }}>
            <style>{`
        @keyframes d3spin { to { transform: rotate(360deg); } }
      `}</style>
            <div
                style={{
                    width: '16px',
                    height: '16px',
                    border: '1.5px solid var(--ink3)',
                    borderTopColor: 'var(--ink)',
                    borderRadius: '50%',
                    animation: 'd3spin 0.7s linear infinite',
                }}
            />
            <span
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--ink3)',
                }}
            >
                Generating…
            </span>
        </div>
    );
}

export default LoadingSpinner;