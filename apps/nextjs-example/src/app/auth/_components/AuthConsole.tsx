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

interface AuthConsoleProps {
  initialUser?: AuthUserPayload;
}

export default function AuthConsole({ initialUser }: AuthConsoleProps) {
  const [user, setUser] = useState<AuthUserPayload | undefined>(initialUser);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  // Profile update state
  const [upFirstName, setUpFirstName] = useState(user?.first_name || '');
  const [upLastName, setUpLastName] = useState(user?.last_name || '');
  const [upUsername, setUpUsername] = useState(user?.username || '');
  const [upPhone, setUpPhone] = useState(user?.phone || '');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [consoleLog, setConsoleLog] = useState<string>(
    '// Velari SDK auth console ready.\n// Trigger actions to inspect outputs.',
  );

  const logConsole = (title: string, data: unknown) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLog(
      (prev) =>
        `// [${timestamp}] ${title}\n${JSON.stringify(data, null, 2)}\n\n${prev}`,
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await loginAction({ email, password });
      if (res.success && res.user) {
        setUser(res.user);
        setUpFirstName(res.user.first_name || '');
        setUpLastName(res.user.last_name || '');
        setUpUsername(res.user.username || '');
        setUpPhone(res.user.phone || '');
        setSuccessMsg('Logged in successfully!');
        logConsole('velari.auth.login(SUCCESS)', res);
        window.location.reload();
      } else {
        setErrorMsg(res.error || 'Login failed.');
        logConsole('velari.auth.login(ERROR)', res);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An error occurred during login.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await registerAction({
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        email,
        password,
        password_confirmation: passwordConf,
      });
      if (res.success && res.user) {
        setUser(res.user);
        setUpFirstName(res.user.first_name || '');
        setUpLastName(res.user.last_name || '');
        setUpUsername(res.user.username || '');
        setUpPhone(res.user.phone || '');
        setSuccessMsg('Registered successfully!');
        logConsole('velari.auth.register(SUCCESS)', res);
        window.location.reload();
      } else {
        setErrorMsg(res.error || 'Registration failed.');
        logConsole('velari.auth.register(ERROR)', res);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'An error occurred during registration.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await updateProfileAction({
        first_name: upFirstName || null,
        last_name: upLastName || null,
        username: upUsername || null,
        phone: upPhone || null,
      });
      if (res.success && res.user) {
        setUser(res.user);
        setSuccessMsg('Profile updated successfully!');
        logConsole('velari.auth.updateProfile(SUCCESS)', res);
      } else {
        setErrorMsg(res.error || 'Failed to update profile.');
        logConsole('velari.auth.updateProfile(ERROR)', res);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'An error occurred during profile update.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await initiateEmailVerificationAction();
      if (res.success) {
        setSuccessMsg('Verification email initiated successfully!');
        logConsole('velari.auth.initiateEmailVerification(SUCCESS)', res);
      } else {
        setErrorMsg('Failed to initiate email verification.');
        logConsole('velari.auth.initiateEmailVerification(ERROR)', res);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'An error occurred during email verification.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async () => {
    if (!user?.email && !email) {
      setErrorMsg('Please specify an email address first.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const targetEmail = user?.email || email;
      const res = await initiatePasswordRecoveryAction(targetEmail);
      if (res.success) {
        setSuccessMsg(`Password reset link sent to ${targetEmail}!`);
        logConsole('velari.auth.initiatePasswordRecovery(SUCCESS)', res);
      } else {
        setErrorMsg('Failed to initiate password recovery.');
        logConsole('velari.auth.initiatePasswordRecovery(ERROR)', res);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'An error occurred during password recovery reset.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await socialRedirectUrlAction(provider);
      if (res.success && res.redirectUrl) {
        setSuccessMsg(
          `OAuth URL retrieved for ${provider}! See console output.`,
        );
        logConsole(`velari.auth.socialRedirectUrl(${provider})`, res);
      } else {
        setErrorMsg(`Failed to fetch social Auth URL for ${provider}.`);
        logConsole(`velari.auth.socialRedirectUrl(${provider}) ERROR`, res);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'An error occurred fetching social Auth redirect URL.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const autofillCredentials = () => {
    setEmail('dev@hivelari.com');
    setPassword('secret123');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '24px',
        alignItems: 'start',
        flexWrap: 'wrap',
      }}
    >
      {/* Interactive Flow Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Status Alerts */}
        {errorMsg && (
          <div
            className="glass-panel"
            style={{
              padding: '12px 18px',
              borderLeft: '4px solid var(--color-error)',
              color: '#fecaca',
              fontSize: '0.9rem',
              background: 'rgba(239, 68, 68, 0.08)',
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div
            className="glass-panel"
            style={{
              padding: '12px 18px',
              borderLeft: '4px solid var(--color-success)',
              color: '#d1fae5',
              fontSize: '0.9rem',
              background: 'rgba(16, 185, 129, 0.08)',
            }}
          >
            ✓ {successMsg}
          </div>
        )}

        {user ? (
          /* AUTHENTICATED STATE */
          <div
            className="glass-panel"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  Profile Account Info
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Manage properties or initiate verification flows.
                </p>
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="glass-panel"
                  style={{
                    padding: '8px 16px',
                    color: 'var(--color-error)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    background: 'rgba(239,68,68,0.05)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Log Out
                </button>
              </form>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
              }}
            >
              {/* Profile Details */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  background: 'rgba(0,0,0,0.15)',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                    }}
                  >
                    ACCOUNT ID
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'white',
                      fontFamily: 'monospace',
                    }}
                  >
                    {user.id}
                  </span>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                    }}
                  >
                    EMAIL
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'white' }}>
                    {user.email}
                  </span>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                    }}
                  >
                    NAME
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'white' }}>
                    {user.first_name || '—'} {user.last_name || ''}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                    }}
                  >
                    PHONE
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'white' }}>
                    {user.phone || '—'}
                  </span>
                </div>
              </div>

              {/* Update Form */}
              <form
                onSubmit={handleUpdateProfile}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      flex: 1,
                    }}
                  >
                    <label
                      htmlFor="up_first_name"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      First Name
                    </label>
                    <input
                      id="up_first_name"
                      type="text"
                      className="input-field"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      value={upFirstName}
                      onChange={(e) => setUpFirstName(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      flex: 1,
                    }}
                  >
                    <label
                      htmlFor="up_last_name"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      id="up_last_name"
                      type="text"
                      className="input-field"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      value={upLastName}
                      onChange={(e) => setUpLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <label
                    htmlFor="up_username"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  >
                    Username
                  </label>
                  <input
                    id="up_username"
                    type="text"
                    className="input-field"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    value={upUsername}
                    onChange={(e) => setUpUsername(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <label
                    htmlFor="up_phone"
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                  >
                    Phone Number
                  </label>
                  <input
                    id="up_phone"
                    type="text"
                    className="input-field"
                    style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                    value={upPhone}
                    onChange={(e) => setUpPhone(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    padding: '10px',
                    fontSize: '0.85rem',
                    marginTop: '4px',
                  }}
                >
                  {loading ? 'Saving...' : 'Update Account'}
                </button>
              </form>
            </div>

            {/* Quick Actions Console */}
            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '20px',
              }}
            >
              <h4
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '12px',
                }}
              >
                Security & Verification Workflows
              </h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleEmailVerification}
                  disabled={loading}
                  className="glass-panel"
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.85rem',
                    color: 'white',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                  }}
                >
                  Verify Email Address
                </button>
                <button
                  type="button"
                  onClick={handlePasswordRecovery}
                  disabled={loading}
                  className="glass-panel"
                  style={{
                    padding: '10px 16px',
                    fontSize: '0.85rem',
                    color: 'white',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                  }}
                >
                  Initiate Password Reset
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* GUEST STATE - LOGIN / REGISTER */
          <div className="glass-panel" style={{ padding: '28px' }}>
            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '16px',
                marginBottom: '24px',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                style={{
                  background:
                    activeTab === 'login'
                      ? 'var(--color-primary)'
                      : 'transparent',
                  color: activeTab === 'login' ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                style={{
                  background:
                    activeTab === 'register'
                      ? 'var(--color-primary)'
                      : 'transparent',
                  color:
                    activeTab === 'register' ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Register
              </button>
            </div>

            {activeTab === 'login' ? (
              /* LOGIN FORM */
              <form
                onSubmit={handleLogin}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <label
                    htmlFor="login_email"
                    style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                  >
                    Email Address
                  </label>
                  <input
                    id="login_email"
                    type="email"
                    placeholder="you@example.com"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <label
                      htmlFor="login_password"
                      style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handlePasswordRecovery}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    id="login_password"
                    type="password"
                    placeholder="••••••••"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ flex: 1, padding: '12px' }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                  <button
                    type="button"
                    onClick={autofillCredentials}
                    className="glass-panel"
                    style={{
                      padding: '12px',
                      fontSize: '0.85rem',
                      color: 'white',
                      background: 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      borderRadius: '12px',
                    }}
                  >
                    Autofill Dev
                  </button>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form
                onSubmit={handleRegister}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      flex: 1,
                    }}
                  >
                    <label
                      htmlFor="reg_first_name"
                      style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                    >
                      First Name
                    </label>
                    <input
                      id="reg_first_name"
                      type="text"
                      placeholder="John"
                      className="input-field"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      flex: 1,
                    }}
                  >
                    <label
                      htmlFor="reg_last_name"
                      style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                    >
                      Last Name
                    </label>
                    <input
                      id="reg_last_name"
                      type="text"
                      placeholder="Doe"
                      className="input-field"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <label
                    htmlFor="reg_email"
                    style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                  >
                    Email Address
                  </label>
                  <input
                    id="reg_email"
                    type="email"
                    placeholder="john@example.com"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <label
                    htmlFor="reg_password"
                    style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                  >
                    Password
                  </label>
                  <input
                    id="reg_password"
                    type="password"
                    placeholder="Min 6 characters"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <label
                    htmlFor="reg_password_conf"
                    style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                  >
                    Confirm Password
                  </label>
                  <input
                    id="reg_password_conf"
                    type="password"
                    placeholder="Re-type password"
                    className="input-field"
                    value={passwordConf}
                    onChange={(e) => setPasswordConf(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: '12px', marginTop: '8px' }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Social OAuth Integration */}
            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                marginTop: '24px',
                paddingTop: '20px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                OR INTEGRATE VIA SOCIAL OAUTH
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  className="glass-panel"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialAuth('github')}
                  className="glass-panel"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Developer Log Console */}
      <div
        className="glass-panel"
        style={{
          background: 'rgba(10, 9, 20, 0.95)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '480px',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '10px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'monospace',
            }}
          >
            velari_sdk_terminal.log
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            SDK ACTIVE
          </span>
        </div>

        <pre
          style={{
            padding: '16px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: '#cbd5e1',
            overflowY: 'auto',
            flex: 1,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {consoleLog}
        </pre>
      </div>
    </div>
  );
}
