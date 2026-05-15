import { useState, useEffect } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ModeSelector from './components/ModeSelector';
import OutputPanel from './components/OutputPanel';
import ComparePanel from './components/ComparePanel';
import HistoryPanel from './components/HistoryPanel';
import { supabase } from './lib/supabase';

function App() {
  const [mode, setMode] = useState('ELI5');

  // outputMode tracks which mode generated the *current* output.
  // This prevents the badge from changing if the user switches modes
  // after already receiving a result.
  const [outputMode, setOutputMode] = useState('ELI5');

  const [darkMode, setDarkMode] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [compareResults, setCompareResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Sync dark mode class on the root element for CSS variable switching
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    loadHistory();
  }, []);

  // ── Data ────────────────────────────────────────────────────────────────

  const loadHistory = async () => {
    const { data, error } = await supabase
      .from('explanations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Failed to load history:', error.message);
      return;
    }

    setHistory(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('explanations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Failed to delete entry:', error.message);
      return;
    }

    loadHistory();
  };

  // ── API calls ────────────────────────────────────────────────────────────

  const handleSubmit = async (question) => {
    if (!question.trim()) return;

    setLoading(true);
    setExplanation('');
    setCompareResults(null);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, mode }),
      });

      const data = await res.json();

      if (data.explanation) {
        setExplanation(data.explanation);
        setOutputMode(mode);

        const { error } = await supabase
          .from('explanations')
          .insert([{ user_input: question, mode, explanation: data.explanation }]);

        if (error) console.error('Failed to save explanation:', error.message);

        loadHistory();
      } else {
        setExplanation('Error: ' + (data.error || 'No response received.'));
      }
    } catch (err) {
      setExplanation('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async (question) => {
    if (!question.trim()) return;

    setLoading(true);
    setExplanation('');
    setCompareResults({});

    const modes = ['ELI5', 'Beginner', 'Technical', 'Analogy'];

    try {
      const settled = await Promise.allSettled(
        modes.map(async (m) => {
          const res = await fetch('/api/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, mode: m }),
          });
          const data = await res.json();
          return { mode: m, explanation: data.explanation || data.error || 'No response.' };
        })
      );

      const results = {};
      settled.forEach((result, i) => {
        results[modes[i]] = result.status === 'fulfilled'
          ? result.value.explanation
          : 'Error: ' + result.reason?.message;
      });

      setCompareResults(results);
    } catch (err) {
      const errorResults = Object.fromEntries(
        modes.map((m) => [m, 'Error: ' + err.message])
      );
      setCompareResults(errorResults);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <style>{`
        .d3-headline {
          font-family: var(--font-display);
          font-size: clamp(36px, 8vw, 64px);
          letter-spacing: 1px;
          line-height: 0.95;
          color: var(--ink);
        }
        .d3-masthead {
          border-bottom: 3px solid var(--ink);
          padding: 24px 0 20px;
          margin-bottom: 0;
        }
      `}</style>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px 56px' }}>

        {/* Masthead */}
        <div className="d3-masthead">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--ink2)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Vol. I &nbsp;·&nbsp; Issue No. 001 &nbsp;·&nbsp; AI Explanation Engine
          </div>

          <div className="d3-headline">
            EXPLAIN
            <br />
            <span style={{ WebkitTextStroke: '1.5px var(--ink)', color: 'transparent' }}>
              ANYTHING
            </span>
          </div>

          <div
            style={{
              fontSize: '13px',
              color: 'var(--ink2)',
              maxWidth: '400px',
              marginTop: '10px',
              lineHeight: 1.5,
              borderLeft: '2px solid var(--ink3)',
              paddingLeft: '10px',
            }}
          >
            Paste code, errors, articles or concepts. Get a clear explanation
            in any mode — from five-year-old simple to full technical depth.
          </div>
        </div>

        {/* Main content */}
        <div style={{ paddingTop: '20px' }}>
          <ModeSelector mode={mode} setMode={setMode} />
          <InputPanel onSubmit={handleSubmit} onCompare={handleCompare} loading={loading} />

          {!compareResults && (
            <OutputPanel
              output={explanation}
              mode={outputMode}
              isLoading={loading}
              darkMode={darkMode}
            />
          )}

          {compareResults && (
            <ComparePanel results={compareResults} loading={loading} darkMode={darkMode} />
          )}

          <HistoryPanel
            history={history}
            onSelect={(text) => {
              setCompareResults(null);
              setExplanation(text);
            }}
            onDelete={handleDelete}
          />
        </div>

      </main>
    </div>
  );
}

export default App;