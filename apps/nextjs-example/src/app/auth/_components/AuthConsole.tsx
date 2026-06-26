'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { useState } from 'react';
import GuestPanel from './GuestPanel';
import ProfilePanel from './ProfilePanel';

interface LogEntry { ts: string; label: string; ok: boolean; detail: string; }

function ts() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const SDK_METHODS = [
  'client.auth.login()',
  'client.auth.register()',
  'client.auth.updateProfile()',
  'client.auth.initiateEmailVerification()',
  'client.auth.initiatePasswordRecovery()',
  'client.auth.socialRedirectUrl()',
  'client.auth.logout()',
];

export default function AuthConsole({ initialUser }: { initialUser?: AuthUserPayload }) {
  const [user, setUser] = useState<AuthUserPayload | undefined>(initialUser);
  const [log, setLog]   = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    setLog(prev => [...prev, { ts: ts(), label, ok, detail }]);
  }

  return (
    <div className="auth-grid">
      {/* Main panel */}
      <div>
        {user ? (
          <ProfilePanel user={user} onUpdate={setUser} onLog={addLog} />
        ) : (
          <GuestPanel onLogin={setUser} onLog={addLog} />
        )}
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Action log */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--line)',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>Action Log</span>
            {log.length > 0 && (
              <span className="pill pill-neutral" style={{ marginLeft: 'auto' }}>{log.length}</span>
            )}
          </div>
          <div className="terminal-body console-log" style={{ minHeight: 100 }}>
            {log.length === 0 ? (
              <span className="t-muted">No actions yet.</span>
            ) : (
              [...log].reverse().map((e, i) => (
                <div key={i} className="console-row">
                  <span className="console-ts">{e.ts} </span>
                  <span className={e.ok ? 'c-ok' : 'c-err'}>
                    {e.ok ? '✓' : '✗'} {e.label}
                  </span>
                  <br />
                  <span className="c-detail">{e.detail}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SDK reference */}
        <div className="card card-p2">
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            SDK Methods
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SDK_METHODS.map(m => (
              <code
                key={m}
                style={{
                  display: 'block',
                  fontSize: 11,
                  padding: '4px 8px',
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-sm)',
                  color: 'var(--ink-2)',
                }}
              >
                {m}
              </code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
