'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AuthUserPayload } from '@hivelari/sdk';
import LogPanel, { makeEntry, type LogEntry } from '../../_components/LogPanel';
import MethodsPanel from '../../_components/MethodsPanel';
import {
  updateProfileAction,
  initiateEmailVerificationAction,
  initiatePasswordRecoveryAction,
  logoutAction,
} from '../../_actions';

const METHODS = [
  'client.auth.updateProfile()',
  'client.auth.initiateEmailVerification()',
  'client.auth.initiatePasswordRecovery()',
  'client.auth.logout()',
];

export default function ProfileConsole({
  initialUser,
}: {
  initialUser?: AuthUserPayload;
}) {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(initialUser?.first_name ?? '');
  const [lastName, setLastName] = useState(initialUser?.last_name ?? '');
  const [username, setUsername] = useState(initialUser?.username ?? '');
  const [phone, setPhone] = useState(initialUser?.phone ?? '');
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    setLog((prev) => [...prev, makeEntry(label, ok, detail)]);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await updateProfileAction({ first_name: firstName, last_name: lastName, username, phone });
      if (res.success && 'user' in res && res.user) {
        setUser(res.user);
        addLog('auth.updateProfile', true, `Updated → ${firstName} ${lastName}`);
        setEditing(false);
      } else {
        throw new Error('error' in res ? res.error : 'Update failed');
      }
    } catch (err) {
      addLog('auth.updateProfile', false, err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyEmail() {
    try {
      await initiateEmailVerificationAction();
      addLog('auth.initiateEmailVerification', true, 'Verification email sent');
    } catch (err) {
      addLog('auth.initiateEmailVerification', false, err instanceof Error ? err.message : String(err));
    }
  }

  async function handlePasswordReset() {
    if (!user) return;
    try {
      await initiatePasswordRecoveryAction(user.email);
      addLog('auth.initiatePasswordRecovery', true, `Recovery email sent to ${user.email}`);
    } catch (err) {
      addLog('auth.initiatePasswordRecovery', false, err instanceof Error ? err.message : String(err));
    }
  }

  if (!user) {
    return (
      <div className="auth-grid">
        <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-line bg-surface p-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full border border-line-accent bg-accent-dim text-accent-light text-xl font-bold">
            ?
          </div>
          <div>
            <p className="mb-1.5 text-[15px] font-semibold text-ink">Not signed in</p>
            <p className="text-[13px] text-ink-2">
              Sign in to view and manage your profile.
            </p>
          </div>
          <Link href="/domain/auth/login" className="btn btn-primary btn-sm">
            Go to Login
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <LogPanel logs={log} />
          <MethodsPanel methods={METHODS} />
        </div>
      </div>
    );
  }

  const displayName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.email;
  const initials = (user.first_name?.[0] ?? user.email[0]).toUpperCase();

  return (
    <div className="auth-grid">
      <div className="flex flex-col gap-7 rounded-md border border-line bg-surface p-8">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-dim text-[16px] font-bold text-accent-light">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-ink">
              {displayName}
            </p>
            <p className="truncate text-[13px] text-ink-2">{user.email}</p>
          </div>
          <span className="pill pill-green shrink-0">Active</span>
        </div>

        <hr className="border-line" />

        {/* Profile fields */}
        {editing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
              <div className="field">
                <label className="label">First name</label>
                <input
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Last name</label>
                <input
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <input
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="label">Phone</label>
              <input
                className="input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                {busy ? 'Saving…' : 'Save changes'}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <code className="sdk-badge ml-auto">client.auth.updateProfile()</code>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {[
                { k: 'Username', v: user.username },
                { k: 'Phone', v: user.phone },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center justify-between text-[13px]">
                  <span className="text-ink-3">{k}</span>
                  <span className="text-ink">{v ?? '—'}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm self-start"
              onClick={() => setEditing(true)}
            >
              Edit profile
            </button>
          </>
        )}

        <hr className="border-line" />

        {/* Account actions */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
            Account
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-outline btn-sm flex-1"
                onClick={handleVerifyEmail}
              >
                Verify email
              </button>
              <code className="sdk-badge text-[10px]">auth.initiateEmailVerification()</code>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-outline btn-sm flex-1"
                onClick={handlePasswordReset}
              >
                Reset password
              </button>
              <code className="sdk-badge text-[10px]">auth.initiatePasswordRecovery()</code>
            </div>
            <div className="flex items-center gap-2">
              <form action={logoutAction} className="flex-1">
                <button type="submit" className="btn btn-danger btn-sm btn-full">
                  Sign out
                </button>
              </form>
              <code className="sdk-badge text-[10px]">auth.logout()</code>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <LogPanel logs={log} />
        <MethodsPanel methods={METHODS} />
      </div>
    </div>
  );
}
