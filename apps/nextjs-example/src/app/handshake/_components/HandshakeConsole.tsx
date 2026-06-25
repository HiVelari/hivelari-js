'use client';

import { useState } from 'react';
import { runHandshakeAction } from '../_actions';

interface HandshakeConsoleProps {
  targetUrl: string;
}

export default function HandshakeConsole({ targetUrl }: HandshakeConsoleProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    status?: number;
    data?: {
      status: string;
      message: string;
      space: string;
    };
    error?: string;
    latency: number;
  } | null>(null);

  const handleRunPing = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await runHandshakeAction();
      setResult(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setResult({
        success: false,
        error: errorMsg || 'An unexpected error occurred.',
        latency: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Target API Endpoint
          </span>
          <span
            style={{
              fontSize: '1.1rem',
              fontFamily: 'monospace',
              fontWeight: 500,
              color: 'white',
            }}
          >
            {targetUrl}/api/ping
          </span>
        </div>

        <button
          type="button"
          onClick={handleRunPing}
          disabled={loading}
          className="btn-primary"
          style={{
            minWidth: '160px',
            opacity: loading ? 0.7 : 1,
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          {loading ? 'Pinging...' : 'Run Handshake'}
        </button>
      </div>

      {/* Terminal Block */}
      <div
        className="glass-panel"
        style={{
          background: 'rgba(10, 9, 20, 0.9)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ef4444',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#eab308',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
              }}
            />
          </div>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'monospace',
            }}
          >
            velari-sdk-ping.sh
          </span>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: '24px',
            fontFamily: "var(--font-geist-mono), 'JetBrains Mono', monospace",
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#d1d5db',
            minHeight: '260px',
          }}
        >
          <div>$ velari-sdk ping --host={targetUrl}</div>

          {loading && (
            <div
              style={{
                color: 'var(--color-primary)',
                marginTop: '12px',
                animation: 'pulse 1.5s infinite',
              }}
            >
              ⏳ Dispatching handshake ping, awaiting server response...
            </div>
          )}

          {!loading && !result && (
            <div style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
              Click "Run Handshake" above to start testing connection.
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Badges row */}
              <div
                style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
              >
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: result.success
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${result.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: result.success ? '#34d399' : '#f87171',
                  }}
                >
                  {result.success
                    ? `SUCCESS (HTTP ${result.status})`
                    : 'FAILED'}
                </span>

                <span
                  style={{
                    fontSize: '0.85rem',
                    color:
                      result.latency < 100
                        ? 'var(--color-success)'
                        : result.latency < 300
                          ? 'var(--color-warning)'
                          : 'var(--color-error)',
                    fontWeight: 500,
                  }}
                >
                  Latency: {result.latency}ms
                </span>
              </div>

              {/* JSON/Output block */}
              <pre
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '16px',
                  borderRadius: '8px',
                  overflowX: 'auto',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: '#e2e8f0',
                }}
              >
                {result.success ? (
                  JSON.stringify(result.data, null, 2)
                ) : (
                  <span style={{ color: '#f87171' }}>
                    Error: {result.error}
                  </span>
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
