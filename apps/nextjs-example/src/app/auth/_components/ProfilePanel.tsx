'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { DevBadge } from '@/providers/AppProviders';
import { useState } from 'react';
import { initiateEmailVerificationAction, initiatePasswordRecoveryAction, logoutAction, updateProfileAction } from '../_actions';

interface ProfilePanelProps {
  user: AuthUserPayload;
  onUpdate: (user: AuthUserPayload) => void;
  onLog: (label: string, ok: boolean, detail: string) => void;
}

export default function ProfilePanel({ user, onUpdate, onLog }: ProfilePanelProps) {
  const [editing, setEditing]     = useState(false);
  const [firstName, setFirstName] = useState(user.first_name ?? '');
  const [lastName, setLastName]   = useState(user.last_name ?? '');
  const [username, setUsername]   = useState(user.username ?? '');
  const [phone, setPhone]         = useState(user.phone ?? '');
  const [busy, setBusy]           = useState(false);

  const displayName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.email;

  const initials = (user.first_name?.[0] ?? user.email[0]).toUpperCase();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await updateProfileAction({ first_name: firstName, last_name: lastName, username, phone });
      if (res.success && 'user' in res && res.user) {
        onUpdate(res.user);
        onLog('auth.updateProfile', true, `Updated → ${firstName} ${lastName}`);
        setEditing(false);
      } else {
        throw new Error('error' in res ? res.error : 'Update failed');
      }
    } catch (err) {
      onLog('auth.updateProfile', false, err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyEmail() {
    try {
      await initiateEmailVerificationAction();
      onLog('auth.initiateEmailVerification', true, 'Verification email sent');
    } catch (err) {
      onLog('auth.initiateEmailVerification', false, err instanceof Error ? err.message : String(err));
    }
  }

  async function handlePasswordReset() {
    try {
      await initiatePasswordRecoveryAction(user.email);
      onLog('auth.initiatePasswordRecovery', true, `Recovery email sent to ${user.email}`);
    } catch (err) {
      onLog('auth.initiatePasswordRecovery', false, err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div className="card card-p" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="avatar">{initials}</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }}>{displayName}</div>
          <div className="ink-2" style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
        </div>
        <span className="pill pill-ok">Active</span>
      </div>

      <hr className="divider" />

      {/* Profile */}
      {editing ? (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="field">
              <label className="label">First name</label>
              <input className="input" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="field">
              <label className="label">Last name</label>
              <input className="input" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Username</label>
            <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="field">
            <label className="label">Phone</label>
            <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
            <DevBadge method="client.auth.updateProfile()" />
          </div>
        </form>
      ) : (
        <>
          <div className="kv-table">
            <div className="kv-row">
              <span className="kv-key">Username</span>
              <span className="kv-val">{user.username ?? '—'}</span>
            </div>
            <div className="kv-row">
              <span className="kv-key">Phone</span>
              <span className="kv-val">{user.phone ?? '—'}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ alignSelf: 'flex-start' }}
            onClick={() => setEditing(true)}
          >
            Edit profile
          </button>
        </>
      )}

      <hr className="divider" />

      {/* Quick actions */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Account
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button type="button" className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={handleVerifyEmail}>
              Verify email
            </button>
            <DevBadge method="client.auth.initiateEmailVerification()" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button type="button" className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={handlePasswordReset}>
              Reset password
            </button>
            <DevBadge method="client.auth.initiatePasswordRecovery()" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <form action={logoutAction} style={{ flex: 1 }}>
              <button type="submit" className="btn btn-danger btn-sm btn-full">Sign out</button>
            </form>
            <DevBadge method="client.auth.logout()" />
          </div>
        </div>
      </div>
    </div>
  );
}
