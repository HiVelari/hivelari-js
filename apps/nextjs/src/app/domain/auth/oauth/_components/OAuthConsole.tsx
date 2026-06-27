'use client';

import ExternalLinkIcon from '@/app/_icons/external-link.svg';
import GitHubIcon from '@/app/_icons/github.svg';
import GoogleIcon from '@/app/_icons/google.svg';
import { useState } from 'react';
import { socialRedirectUrlAction } from '../../_actions';
import LogPanel, { makeEntry, type LogEntry } from '../../_components/LogPanel';
import MethodsPanel from '../../_components/MethodsPanel';

const METHODS = [
  'client.auth.socialRedirectUrl()',
  'client.auth.authenticateUsingCode()',
];

const PROVIDERS = [
  { id: 'google', label: 'Continue with Google', Icon: GoogleIcon },
  { id: 'github', label: 'Continue with GitHub', Icon: GitHubIcon },
];

interface RedirectState {
  provider: string;
  url: string;
}

export default function OAuthConsole() {
  const [busy, setBusy] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<RedirectState | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);

  function addLog(label: string, ok: boolean, detail: string) {
    setLog((prev) => [...prev, makeEntry(label, ok, detail)]);
  }

  async function handleFetchUrl(provider: string) {
    setBusy(provider);
    setRedirect(null);
    try {
      const res = await socialRedirectUrlAction(provider);
      if (res.success && 'redirectUrl' in res && res.redirectUrl) {
        setRedirect({ provider, url: res.redirectUrl });
        addLog(
          'auth.socialRedirectUrl',
          true,
          `Got redirect URL for ${provider}`,
        );
      } else {
        throw new Error(
          'error' in res ? res.error : 'Could not get redirect URL',
        );
      }
    } catch (err) {
      addLog(
        'auth.socialRedirectUrl',
        false,
        err instanceof Error ? err.message : String(err),
      );
    } finally {
      setBusy(null);
    }
  }

  function handleRedirectNow() {
    if (redirect) {
      addLog('redirect', true, `Navigating to ${redirect.provider}…`);
      window.open(
        redirect.url,
        'popup',
        'width=600,height=700,left=100,top=100,resizable=yes,scrollbars=yes',
      );
    }
  }

  return (
    <div className="auth-grid">
      <div className="flex flex-col gap-6 rounded-md border border-line bg-surface p-8">
        {/* Provider buttons */}
        <div className="flex flex-col gap-3">
          {PROVIDERS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className="social-btn"
              onClick={() => handleFetchUrl(id)}
              disabled={!!busy}
            >
              {busy === id ? (
                <span className="size-4 animate-spin rounded-full border-2 border-line border-t-accent" />
              ) : (
                <Icon width={16} height={16} />
              )}
              {label}
            </button>
          ))}
          <div className="pt-1 text-center">
            <code className="sdk-badge">client.auth.socialRedirectUrl()</code>
          </div>
        </div>

        {/* URL preview */}
        {redirect && (
          <div className="flex flex-col gap-3 rounded-sm border border-line-accent bg-accent-dim px-5 py-4">
            <div>
              <p className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.07em] text-accent-light">
                Generated URL — {redirect.provider}
              </p>
              <p className="break-all font-mono text-[11.5px] leading-[1.7] text-ink-2">
                {redirect.url}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn btn-primary btn-sm flex items-center gap-1.5"
                onClick={handleRedirectNow}
              >
                <ExternalLinkIcon width={13} height={13} />
                Redirect now
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setRedirect(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="rounded-sm border border-line bg-bg px-5 py-4">
          <p className="mb-2 text-[12px] font-semibold text-ink-2">
            How it works
          </p>
          <ol className="list-decimal flex flex-col gap-2 pl-4 text-[12.5px] leading-[1.65] text-ink-2">
            <li>
              Call{' '}
              <code className="inline-code text-[11px]">
                socialRedirectUrl(provider, callbackUrl)
              </code>{' '}
              to get the provider's OAuth URL.
            </li>
            <li>Inspect the URL above, then redirect the user to it.</li>
            <li>
              On return, the{' '}
              <code className="inline-code text-[11px]">?code</code> param is
              exchanged via{' '}
              <code className="inline-code text-[11px]">
                authenticateUsingCode(code)
              </code>
              .
            </li>
          </ol>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <LogPanel logs={log} />
        <MethodsPanel methods={METHODS} />
      </div>
    </div>
  );
}
