"use client";

import { useState } from "react";

const COMMAND = "pnpm add @hivelari/sdk";

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      className="install-cmd"
      onClick={copy}
      aria-label={copied ? "Copied install command" : "Copy install command"}
    >
      <span className="install-cmd-prompt">$</span>
      <span className="install-cmd-text">
        <span className="install-cmd-kw">pnpm</span> add @hivelari/sdk
      </span>
      <span className={`install-cmd-copy ${copied ? "install-cmd-copy--done" : ""}`}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </button>
  );
}
