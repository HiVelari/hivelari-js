'use client';

import { useState } from 'react';
import { initiatePasswordRecoveryAction } from '../../_actions';
import LogPanel, { makeEntry, type LogEntry } from '../../_components/LogPanel';
import MethodsPanel from '../../_components/MethodsPanel';

const METHODS = ['client.auth.initiatePasswordRecovery()'];

export default function RecoveryConsole() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    setLog((prev) => [...prev, makeEntry(label, ok, detail)]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await initiatePasswordRecoveryAction(email);
      if (res.success) {
        setSent(true);
        addLog(
          'auth.initiatePasswordRecovery',
          true,
          `Recovery email sent to ${email}`,
        );
      } else {
        throw new Error(
          'error' in res ? res.error : 'Failed to send recovery email',
        );
      }
    } catch (err) {
      addLog(
        'auth.initiatePasswordRecovery',
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
        {sent ? (
          <div className="flex flex-col gap-4">
            <div className="flex size-11 items-center justify-center rounded-full bg-green/10 text-xl">
              ✓
            </div>
            <div>
              <p className="mb-1 text-[15px] font-semibold text-ink">
                Check your inbox
              </p>
              <p className="text-[13px] leading-[1.65] text-ink-2">
                A recovery link was sent to{' '}
                <span className="font-medium text-ink">{email}</span>. Follow
                the link to reset your password.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm self-start"
              onClick={() => {
                setSent(false);
                setEmail('');
              }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="field">
              <label htmlFor="recovery-email" className="label">
                Email address
              </label>
              <input
                id="recovery-email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={busy}
              >
                {busy ? 'Sending…' : 'Send recovery email'}
              </button>
              <div className="text-center">
                <code className="sdk-badge">
                  client.auth.initiatePasswordRecovery()
                </code>
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
