'use client';

import { useState } from 'react';
import { runHandshakeAction } from '../_actions';

interface PingResult {
  success: boolean;
  status?: number;
  data?: { status: string; message: string; space: string };
  error?: string;
  latency: number;
}

export default function PingConsole({ targetUrl }: { targetUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PingResult | null>(null);

  async function handlePing() {
    setLoading(true);
    setResult(null);
    try {
      setResult(await runHandshakeAction());
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : String(err),
        latency: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-chrome">
        <div className="terminal-dots">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
        </div>
        <span className="terminal-label">{targetUrl}/api/ping</span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handlePing}
          disabled={loading}
          style={{ fontSize: 12 }}
        >
          {loading ? <span className="spin">⟳</span> : null}
          {loading ? 'Pinging…' : 'Run ping'}
        </button>
      </div>

      <div className="terminal-body">
        <div>
          <span className="t-prompt">❯ </span>
          <span className="t-cmd">velari</span>
          <span className="t-muted"> ping --host </span>
          <span className="t-str">{targetUrl}</span>
        </div>

        {!loading && !result && (
          <div className="t-muted" style={{ marginTop: 6 }}>
            — ready. Click "Run ping" to test the connection.
          </div>
        )}

        {loading && (
          <div className="t-info" style={{ marginTop: 6 }}>
            connecting… validating space credentials…
          </div>
        )}

        {result && (
          <div className="fade-up" style={{ marginTop: 8 }}>
            {result.success ? (
              <>
                <div>
                  <span className="t-ok">✓ </span>
                  <span className="t-muted">HTTP </span>
                  <span className="t-ok">{result.status}</span>
                  <span className="t-muted"> · </span>
                  <span
                    style={{
                      color: result.latency < 100 ? 'var(--t-ok)' : 'inherit',
                    }}
                    className={
                      result.latency < 100
                        ? 't-ok'
                        : result.latency < 300
                          ? 't-muted'
                          : 't-err'
                    }
                  >
                    {result.latency}ms
                  </span>
                </div>
                {result.data && (
                  <pre style={{ marginTop: 10, fontSize: 12, lineHeight: 2 }}>
                    <span className="t-muted">{'  '}</span>
                    <span className="t-key">status </span>
                    <span className="t-str">"{result.data.status}"</span>
                    {'\n'}
                    <span className="t-muted">{'  '}</span>
                    <span className="t-key">message </span>
                    <span className="t-str">"{result.data.message}"</span>
                    {'\n'}
                    <span className="t-muted">{'  '}</span>
                    <span className="t-key">space </span>
                    <span className="t-val">"{result.data.space}"</span>
                  </pre>
                )}
              </>
            ) : (
              <>
                <div>
                  <span className="t-err">✗ connection failed</span>
                </div>
                <div
                  className="t-err"
                  style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}
                >
                  {result.error}
                </div>
                <div
                  className="t-muted"
                  style={{ marginTop: 10, fontSize: 12 }}
                >
                  → pnpm --filter @hivelari/sandbox run serve
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
