'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { DevBadge } from '@/providers/AppProviders';
import { useState } from 'react';
import { loginAction, registerAction, socialRedirectUrlAction } from '../_actions';

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface GuestPanelProps {
  onLogin: (user: AuthUserPayload) => void;
  onLog: (label: string, ok: boolean, detail: string) => void;
}

export default function GuestPanel({ onLogin, onLog }: GuestPanelProps) {
  const [tab, setTab]           = useState<'login' | 'register'>('login');
  const [email, setEmail]       = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [loginBusy, setLoginBusy] = useState(false);

  const [rFirst, setRFirst]   = useState('');
  const [rLast, setRLast]     = useState('');
  const [rEmail, setREmail]   = useState('');
  const [rPass, setRPass]     = useState('');
  const [rPassC, setRPassC]   = useState('');
  const [regBusy, setRegBusy] = useState(false);

  const [socialBusy, setSocialBusy] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginBusy(true);
    try {
      const res = await loginAction({ email, password });
      if (res.success && 'user' in res && res.user) {
        onLogin(res.user);
        onLog('auth.login', true, `Signed in as ${res.user.email}`);
        return;
      }
      throw new Error('error' in res ? res.error : 'Authentication failed');
    } catch (err) {
      onLog('auth.login', false, err instanceof Error ? err.message : String(err));
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
        onLog('auth.register', true, `Registered as ${res.user.email}`);
        return;
      }
      throw new Error('error' in res ? res.error : 'Registration failed');
    } catch (err) {
      onLog('auth.register', false, err instanceof Error ? err.message : String(err));
    } finally {
      setRegBusy(false);
    }
  }

  async function handleSocial(provider: string) {
    setSocialBusy(provider);
    try {
      const res = await socialRedirectUrlAction(provider);
      if (res.success && 'redirectUrl' in res && res.redirectUrl) {
        onLog('auth.socialRedirectUrl', true, `Redirecting to ${provider}`);
        window.location.href = res.redirectUrl;
        return;
      }
      throw new Error('error' in res ? res.error : 'Could not get redirect URL');
    } catch (err) {
      onLog('auth.socialRedirectUrl', false, err instanceof Error ? err.message : String(err));
    } finally {
      setSocialBusy(null);
    }
  }

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="tabs">
        <button className={`tab ${tab === 'login' ? 'tab-active' : ''}`} onClick={() => setTab('login')}>Sign in</button>
        <button className={`tab ${tab === 'register' ? 'tab-active' : ''}`} onClick={() => setTab('register')}>Create account</button>
      </div>

      <div className="card-p2" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {tab === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button type="submit" className="btn btn-primary btn-full" disabled={loginBusy}>
                {loginBusy ? <span className="spin">⟳</span> : null}
                {loginBusy ? 'Signing in…' : 'Sign in'}
              </button>
              <div style={{ textAlign: 'center' }}>
                <DevBadge method="client.auth.login()" />
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="field">
                <label className="label">First name</label>
                <input className="input" value={rFirst} onChange={e => setRFirst(e.target.value)} required />
              </div>
              <div className="field">
                <label className="label">Last name</label>
                <input className="input" value={rLast} onChange={e => setRLast(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" type="email" value={rEmail} onChange={e => setREmail(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input className="input" type="password" value={rPass} onChange={e => setRPass(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Confirm password</label>
              <input className="input" type="password" value={rPassC} onChange={e => setRPassC(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button type="submit" className="btn btn-primary btn-full" disabled={regBusy}>
                {regBusy ? <span className="spin">⟳</span> : null}
                {regBusy ? 'Creating account…' : 'Create account'}
              </button>
              <div style={{ textAlign: 'center' }}>
                <DevBadge method="client.auth.register()" />
              </div>
            </div>
          </form>
        )}

        <div className="or-divider">or continue with</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            type="button"
            className="social-btn"
            onClick={() => handleSocial('google')}
            disabled={!!socialBusy}
          >
            {socialBusy === 'google' ? <span className="spin" style={{ fontSize: 12 }}>⟳</span> : <GoogleIcon />}
            Continue with Google
          </button>
          <button
            type="button"
            className="social-btn"
            onClick={() => handleSocial('github')}
            disabled={!!socialBusy}
          >
            {socialBusy === 'github' ? <span className="spin" style={{ fontSize: 12 }}>⟳</span> : <GitHubIcon />}
            Continue with GitHub
          </button>
          <div style={{ textAlign: 'center', marginTop: 2 }}>
            <DevBadge method="client.auth.socialRedirectUrl()" />
          </div>
        </div>
      </div>
    </div>
  );
}
