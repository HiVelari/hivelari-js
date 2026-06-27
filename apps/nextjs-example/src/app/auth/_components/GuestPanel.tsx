'use client';

import type { AuthUserPayload } from '@hivelari/sdk';
import { DevBadge } from '@/providers/AppProviders';
import { useState } from 'react';
import GoogleIcon from '@/app/_icons/google.svg';
import GitHubIcon from '@/app/_icons/github.svg';
import {
  loginAction,
  registerAction,
  socialRedirectUrlAction,
} from '../_actions';

interface GuestPanelProps {
  onLogin: (user: AuthUserPayload) => void;
  onLog: (label: string, ok: boolean, detail: string) => void;
}

export default function GuestPanel({ onLogin, onLog }: GuestPanelProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [loginBusy, setLoginBusy] = useState(false);

  const [rFirst, setRFirst] = useState('');
  const [rLast, setRLast] = useState('');
  const [rEmail, setREmail] = useState('');
  const [rPass, setRPass] = useState('');
  const [rPassC, setRPassC] = useState('');
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
      onLog(
        'auth.login',
        false,
        err instanceof Error ? err.message : String(err),
      );
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
      onLog(
        'auth.register',
        false,
        err instanceof Error ? err.message : String(err),
      );
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
      throw new Error(
        'error' in res ? res.error : 'Could not get redirect URL',
      );
    } catch (err) {
      onLog(
        'auth.socialRedirectUrl',
        false,
        err instanceof Error ? err.message : String(err),
      );
    } finally {
      setSocialBusy(null);
    }
  }

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="tabs">
        <button
          className={`tab ${tab === 'login' ? 'tab-active' : ''}`}
          onClick={() => setTab('login')}
        >
          Sign in
        </button>
        <button
          className={`tab ${tab === 'register' ? 'tab-active' : ''}`}
          onClick={() => setTab('register')}
        >
          Create account
        </button>
      </div>

      <div
        className="card-p2"
        style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
      >
        {tab === 'login' ? (
          <form
            onSubmit={handleLogin}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loginBusy}
              >
                {loginBusy ? <span className="spin">⟳</span> : null}
                {loginBusy ? 'Signing in…' : 'Sign in'}
              </button>
              <div style={{ textAlign: 'center' }}>
                <DevBadge method="client.auth.login()" />
              </div>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleRegister}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}
            >
              <div className="field">
                <label className="label">First name</label>
                <input
                  className="input"
                  value={rFirst}
                  onChange={(e) => setRFirst(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Last name</label>
                <input
                  className="input"
                  value={rLast}
                  onChange={(e) => setRLast(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={rEmail}
                onChange={(e) => setREmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={rPass}
                onChange={(e) => setRPass(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="label">Confirm password</label>
              <input
                className="input"
                type="password"
                value={rPassC}
                onChange={(e) => setRPassC(e.target.value)}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={regBusy}
              >
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
            {socialBusy === 'google' ? (
              <span className="spin" style={{ fontSize: 12 }}>
                ⟳
              </span>
            ) : (
              <GoogleIcon width={16} height={16} />
            )}
            Continue with Google
          </button>
          <button
            type="button"
            className="social-btn"
            onClick={() => handleSocial('github')}
            disabled={!!socialBusy}
          >
            {socialBusy === 'github' ? (
              <span className="spin" style={{ fontSize: 12 }}>
                ⟳
              </span>
            ) : (
              <GitHubIcon width={16} height={16} />
            )}
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
