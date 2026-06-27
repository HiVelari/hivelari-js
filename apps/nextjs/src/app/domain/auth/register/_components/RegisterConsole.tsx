'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { useState } from 'react';
import { registerAction } from '../../_actions';
import LogPanel, { makeEntry, type LogEntry } from '../../_components/LogPanel';
import MethodsPanel from '../../_components/MethodsPanel';

const METHODS = ['client.auth.register()'];

export default function RegisterConsole({
  initialUser,
}: {
  initialUser?: AuthUserPayload;
}) {
  const [user, setUser] = useState(initialUser);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    setLog((prev) => [...prev, makeEntry(label, ok, detail)]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await registerAction({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      if (res.success && 'user' in res && res.user) {
        setUser(res.user);
        addLog('auth.register', true, `Registered as ${res.user.email}`);
      } else {
        throw new Error('error' in res ? res.error : 'Registration failed');
      }
    } catch (err) {
      addLog(
        'auth.register',
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
              <span className="pill pill-green ml-auto">Registered</span>
            </div>
            <p className="text-[13px] text-ink-2">
              Account created successfully. Visit the{' '}
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
            <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
              <div className="field">
                <label htmlFor="reg-first" className="label">
                  First name
                </label>
                <input
                  id="reg-first"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="field">
                <label htmlFor="reg-last" className="label">
                  Last name
                </label>
                <input
                  id="reg-last"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="reg-email" className="label">
                Email
              </label>
              <input
                id="reg-email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="reg-password" className="label">
                Password
              </label>
              <input
                id="reg-password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="field">
              <label htmlFor="reg-confirm" className="label">
                Confirm password
              </label>
              <input
                id="reg-confirm"
                className="input"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={busy}
              >
                {busy ? 'Creating account…' : 'Create account'}
              </button>
              <div className="text-center">
                <code className="sdk-badge">client.auth.register()</code>
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
