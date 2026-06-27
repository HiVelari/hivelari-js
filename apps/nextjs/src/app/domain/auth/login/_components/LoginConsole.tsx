'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { useState } from 'react';
import { loginAction } from '../../_actions';
import LogPanel, { makeEntry, type LogEntry } from '../../_components/LogPanel';
import MethodsPanel from '../../_components/MethodsPanel';

const METHODS = ['client.auth.login()'];

export default function LoginConsole({
  initialUser,
}: {
  initialUser?: AuthUserPayload;
}) {
  const [user, setUser] = useState(initialUser);
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    setLog((prev) => [...prev, makeEntry(label, ok, detail)]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await loginAction({ email, password });
      if (res.success && 'user' in res && res.user) {
        setUser(res.user);
        addLog('auth.login', true, `Signed in as ${res.user.email}`);
      } else {
        throw new Error('error' in res ? res.error : 'Authentication failed');
      }
    } catch (err) {
      addLog(
        'auth.login',
        false,
        err instanceof Error ? err.message : String(err),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-grid">
      <div className="rounded-md border border-line bg-surface p-8">
        {user ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-accent-dim text-[15px] font-bold text-accent-light">
                {(user.first_name?.[0] ?? user.email[0]).toUpperCase()}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-ink">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.email}
                </p>
                <p className="text-[12px] text-ink-2">{user.email}</p>
              </div>
              <span className="pill pill-green ml-auto">Signed in</span>
            </div>
            <p className="text-[13px] text-ink-2">
              You are signed in. Visit the{' '}
              <a
                href="/domain/auth/profile"
                className="text-accent-light underline underline-offset-[3px]"
              >
                Profile page
              </a>{' '}
              to manage your account.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="field">
              <label htmlFor="login-email" className="label">
                Email
              </label>
              <input
                id="login-email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="login-password" className="label">
                Password
              </label>
              <input
                id="login-password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={busy}
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
              <div className="text-center">
                <code className="sdk-badge">client.auth.login()</code>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <LogPanel logs={log} />
        <MethodsPanel methods={METHODS} />
      </div>
    </div>
  );
}
