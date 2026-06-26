'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { useState } from 'react';
import {
  initiateEmailVerificationAction,
  initiatePasswordRecoveryAction,
  loginAction,
  logoutAction,
  registerAction,
  socialRedirectUrlAction,
  updateProfileAction,
} from '../_actions';

/* ── Types ─────────────────────────────────────────────────── */

interface LogEntry {
  ts: string;
  label: string;
  ok: boolean;
  detail: string;
}

interface AuthConsoleProps {
  initialUser?: AuthUserPayload;
}

/* ── Helpers ────────────────────────────────────────────────── */

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function SocialButton({
  provider,
  label,
  onRedirect,
}: {
  provider: string;
  label: string;
  onRedirect: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await socialRedirectUrlAction(provider);
      if (res.success && 'redirectUrl' in res && res.redirectUrl) onRedirect(res.redirectUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className="btn btn-secondary btn-full" onClick={handleClick} disabled={loading}>
      {loading ? <span className="spin">⟳</span> : null}
      Continue with {label}
    </button>
  );
}

/* ── Authenticated view ─────────────────────────────────────── */

function ProfilePanel({
  user,
  onUpdate,
  onLog,
}: {
  user: AuthUserPayload;
  onUpdate: (u: AuthUserPayload) => void;
  onLog: (e: LogEntry) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name ?? '');
  const [lastName, setLastName]   = useState(user.last_name ?? '');
  const [username, setUsername]   = useState(user.username ?? '');
  const [phone, setPhone]         = useState(user.phone ?? '');
  const [busy, setBusy]           = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await updateProfileAction({ first_name: firstName, last_name: lastName, username, phone });
      if (res.success && 'user' in res && res.user) onUpdate(res.user);
      onLog({ ts: now(), label: 'updateProfile', ok: true, detail: `Profile updated → ${firstName}` });
      setEditing(false);
    } catch (err) {
      onLog({ ts: now(), label: 'updateProfile', ok: false, detail: err instanceof Error ? err.message : String(err) });
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyEmail() {
    try {
      await initiateEmailVerificationAction();
      onLog({ ts: now(), label: 'initiateEmailVerification', ok: true, detail: 'Verification email sent' });
    } catch (err) {
      onLog({ ts: now(), label: 'initiateEmailVerification', ok: false, detail: err instanceof Error ? err.message : String(err) });
    }
  }

  async function handlePasswordReset() {
    try {
      await initiatePasswordRecoveryAction(user.email);
      onLog({ ts: now(), label: 'initiatePasswordRecovery', ok: true, detail: `Recovery sent to ${user.email}` });
    } catch (err) {
      onLog({ ts: now(), label: 'initiatePasswordRecovery', ok: false, detail: err instanceof Error ? err.message : String(err) });
    }
  }

  return (
    <div className="card card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(79,142,247,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            color: 'var(--accent)',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {(user.first_name?.[0] ?? user.email[0]).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.email}
          </div>
          <div className="text-secondary" style={{ fontSize: 13 }}>{user.email}</div>
        </div>
        <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Signed in</span>
      </div>

      <hr className="divider" />

      {/* Profile form */}
      {editing ? (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="grid-2" style={{ gap: 12 }}>
            <div className="field">
              <label className="field-label">First name</label>
              <input className="field-input" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="field">
              <label className="field-label">Last name</label>
              <input className="field-input" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="field-label">Username</label>
            <input className="field-input" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="field">
            <label className="field-label">Phone</label>
            <input className="field-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <div className="kv-table">
            {[
              { key: 'Username', val: user.username ?? '—' },
              { key: 'Phone', val: user.phone ?? '—' },
            ].map(row => (
              <div className="kv-row" key={row.key}>
                <span className="kv-key">{row.key}</span>
                <span className="kv-val">{row.val}</span>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: 14 }} onClick={() => setEditing(true)}>
            Edit profile
          </button>
        </div>
      )}

      <hr className="divider" />

      {/* Quick actions */}
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Quick Actions
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleVerifyEmail}>
            Verify email
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handlePasswordReset}>
            Reset password
          </button>
          <form action={logoutAction} style={{ display: 'contents' }}>
            <button type="submit" className="btn btn-danger btn-sm">Sign out</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── Guest view ─────────────────────────────────────────────── */

function GuestPanel({ onLogin, onLog }: { onLogin: (u: AuthUserPayload) => void; onLog: (e: LogEntry) => void }) {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login form
  const [email, setEmail]       = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [loginBusy, setLoginBusy] = useState(false);

  // Register form
  const [rFirst, setRFirst]     = useState('');
  const [rLast, setRLast]       = useState('');
  const [rEmail, setREMail]     = useState('');
  const [rPass, setRPass]       = useState('');
  const [rPassC, setRPassC]     = useState('');
  const [regBusy, setRegBusy]   = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginBusy(true);
    try {
      const res = await loginAction({ email, password });
      if (res.success && 'user' in res && res.user) {
        onLogin(res.user);
        onLog({ ts: now(), label: 'login', ok: true, detail: `Signed in as ${res.user.email}` });
        return;
      }
      throw new Error('error' in res ? res.error : 'Authentication failed');
    } catch (err) {
      onLog({ ts: now(), label: 'login', ok: false, detail: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegBusy(true);
    try {
      const res = await registerAction({
        first_name: rFirst,
        last_name: rLast,
        email: rEmail,
        password: rPass,
        password_confirmation: rPassC,
      });
      if (res.success && 'user' in res && res.user) {
        onLogin(res.user);
        onLog({ ts: now(), label: 'register', ok: true, detail: `Registered as ${res.user.email}` });
        return;
      }
      throw new Error('error' in res ? res.error : 'Registration failed');
    } catch (err) {
      onLog({ ts: now(), label: 'register', ok: false, detail: err instanceof Error ? err.message : String(err) });
    } finally {
      setRegBusy(false);
    }
  }

  function handleRedirect(url: string) {
    window.location.href = url;
  }

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="tabs">
        <button className={`tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign in</button>
        <button className={`tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</button>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {tab === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field">
              <label className="field-label">Email</label>
              <input className="field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">Password</label>
              <input className="field-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loginBusy}>
              {loginBusy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="field">
                <label className="field-label">First name</label>
                <input className="field-input" value={rFirst} onChange={e => setRFirst(e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Last name</label>
                <input className="field-input" value={rLast} onChange={e => setRLast(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="field-label">Email</label>
              <input className="field-input" type="email" value={rEmail} onChange={e => setREMail(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">Password</label>
              <input className="field-input" type="password" value={rPass} onChange={e => setRPass(e.target.value)} required />
            </div>
            <div className="field">
              <label className="field-label">Confirm password</label>
              <input className="field-input" type="password" value={rPassC} onChange={e => setRPassC(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={regBusy}>
              {regBusy ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <hr className="divider" style={{ flex: 1 }} />
          <span className="text-dim" style={{ fontSize: 12, flexShrink: 0 }}>or</span>
          <hr className="divider" style={{ flex: 1 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SocialButton provider="google" label="Google" onRedirect={handleRedirect} />
          <SocialButton provider="github" label="GitHub" onRedirect={handleRedirect} />
        </div>
      </div>
    </div>
  );
}

/* ── Console log panel ──────────────────────────────────────── */

function ConsolePanel({ entries }: { entries: LogEntry[] }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--bg-subtle)',
      }}>
        <span className="dot dot-blue" />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Action Log</span>
        <span className="badge badge-neutral" style={{ marginLeft: 'auto' }}>{entries.length}</span>
      </div>
      <div className="terminal-body console-log" style={{ minHeight: 120 }}>
        {entries.length === 0 ? (
          <span className="t-muted">No actions yet — try signing in or running a quick action.</span>
        ) : (
          [...entries].reverse().map((e, i) => (
            <div key={i} className="console-entry">
              <span className="console-ts">{e.ts}</span>
              <span className={e.ok ? 'console-ok' : 'console-err'}>
                {e.ok ? '✓' : '✗'} {e.label}
              </span>
              <span className="t-muted" style={{ marginLeft: 8, fontSize: 11 }}>{e.detail}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ── Root component ─────────────────────────────────────────── */

export default function AuthConsole({ initialUser }: AuthConsoleProps) {
  const [user, setUser] = useState<AuthUserPayload | undefined>(initialUser);
  const [log, setLog]   = useState<LogEntry[]>([]);

  function addLog(entry: LogEntry) {
    setLog(prev => [...prev, entry]);
  }

  return (
    <div className="auth-layout">
      {/* Main panel */}
      <div className="auth-panel">
        {user ? (
          <ProfilePanel
            user={user}
            onUpdate={setUser}
            onLog={addLog}
          />
        ) : (
          <GuestPanel
            onLogin={setUser}
            onLog={addLog}
          />
        )}
      </div>

      {/* Sidebar: log + SDK info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ConsolePanel entries={log} />

        <div className="card card-body">
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            SDK Methods
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'client.auth.login()',
              'client.auth.register()',
              'client.auth.updateProfile()',
              'client.auth.initiateEmailVerification()',
              'client.auth.initiatePasswordRecovery()',
              'client.auth.socialRedirectUrl()',
              'client.auth.logout()',
            ].map(m => (
              <code
                key={m}
                style={{
                  display: 'block',
                  fontSize: 12,
                  padding: '4px 8px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)',
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
