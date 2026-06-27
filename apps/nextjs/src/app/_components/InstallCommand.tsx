'use client';

import { useState } from 'react';
import CopyIcon from '@/app/_icons/copy.svg';
import CheckIcon from '@/app/_icons/check.svg';

const COMMAND = 'pnpm add @hivelari/sdk';

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
      onClick={copy}
      aria-label={copied ? 'Copied install command' : 'Copy install command'}
      className="group inline-flex items-center gap-[11px] rounded-sm border border-line-2 bg-white/[0.022] py-[11px] pr-[13px] pl-4 font-mono text-[13.5px] text-ink backdrop-blur-sm transition-[border-color,background,transform] duration-200 hover:border-line-accent hover:bg-accent/5 active:scale-[0.99] max-[520px]:w-full max-[520px]:text-[12.5px] max-[380px]:py-2.5 max-[380px]:pr-2.5 max-[380px]:pl-[13px] max-[380px]:text-[11.5px]"
    >
      <span className="font-semibold text-accent-light">$</span>
      <span className="text-ink-2">
        <span className="text-accent-light">pnpm</span> add @hivelari/sdk
      </span>
      <span
        className={`ml-1 inline-flex size-[26px] items-center justify-center rounded-md transition-colors duration-150 ${
          copied
            ? 'bg-green-dim text-green'
            : 'bg-white/[0.04] text-ink-3 group-hover:text-ink-2'
        }`}
      >
        {copied ? (
          <CheckIcon width={15} height={15} />
        ) : (
          <CopyIcon width={15} height={15} />
        )}
      </span>
    </button>
  );
}
