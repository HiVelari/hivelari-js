"use client";

import { useState } from "react";
import { runHandshakeAction } from "../_actions";

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
      const data = await runHandshakeAction();

      setResult(data);
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
    <div className="terminal" style={{ marginTop: 28 }}>
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
        </div>
        <span className="terminal-title">{targetUrl}/api/ping</span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handlePing}
          disabled={loading}
        >
          {loading ? <span className="spin">⟳</span> : null}
          {loading ? "Pinging…" : "Run Ping"}
        </button>
      </div>

      <div className="terminal-body">
        <div>
          <span className="t-prompt">$ </span>
          <span className="t-cmd">velari ping </span>
          <span className="t-muted">--host={targetUrl}</span>
        </div>

        {!loading && !result && (
          <div className="t-muted" style={{ marginTop: 8 }}>
            Waiting — click "Run Ping" to test the handshake.
          </div>
        )}

        {loading && (
          <div className="t-info" style={{ marginTop: 8 }}>
            Sending request… validating space credentials…
          </div>
        )}

        {result && (
          <div className="fade-in" style={{ marginTop: 12 }}>
            {result.success ? (
              <>
                <div className="t-ok">✓ Connection established</div>
                <div style={{ marginTop: 4 }}>
                  <span className="t-muted">HTTP </span>
                  <span className="t-ok">{result.status}</span>
                  <span className="t-muted"> · latency </span>
                  <span
                    className={
                      result.latency < 100
                        ? "t-ok"
                        : result.latency < 300
                          ? ""
                          : "t-err"
                    }
                    style={
                      result.latency >= 100 && result.latency < 300
                        ? { color: "var(--yellow)" }
                        : undefined
                    }
                  >
                    {result.latency}ms
                  </span>
                </div>
                {result.data && (
                  <pre style={{ marginTop: 12, fontSize: 12, lineHeight: 1.7 }}>
                    <span className="t-key"> status </span>
                    <span className="t-str">"{result.data.status}"</span>
                    {"\n"}
                    <span className="t-key"> message </span>
                    <span className="t-str">"{result.data.message}"</span>
                    {"\n"}
                    <span className="t-key"> space </span>
                    <span className="t-str">"{result.data.space}"</span>
                  </pre>
                )}
              </>
            ) : (
              <>
                <div className="t-err">✗ Connection failed</div>
                <div className="t-err" style={{ marginTop: 4, fontSize: 12 }}>
                  {result.error}
                </div>
                <div
                  className="t-muted"
                  style={{ marginTop: 10, fontSize: 12 }}
                >
                  Start the sandbox: pnpm --filter @hivelari/sandbox run serve
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
