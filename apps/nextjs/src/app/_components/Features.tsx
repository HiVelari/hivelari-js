import ServerIcon from '@/app/_icons/server.svg';
import CodeIcon from '@/app/_icons/code.svg';
import ShieldIcon from '@/app/_icons/shield.svg';
import FileIcon from '@/app/_icons/file.svg';
import ClockIcon from '@/app/_icons/clock.svg';
import CubeIcon from '@/app/_icons/cube.svg';

const FEATURES = [
  {
    icon: <ServerIcon width={19} height={19} />,
    title: 'Server-only',
    desc: (
      <>
        Imports <code>server-only</code> to ensure your credentials never reach
        the client bundle. Violations fail at build time.
      </>
    ),
  },
  {
    icon: <CodeIcon width={19} height={19} />,
    title: 'Fully typed',
    desc: 'Every request parameter, response shape, and error variant is typed with TypeScript generics. No casting.',
  },
  {
    icon: <ShieldIcon width={19} height={19} />,
    title: 'Zod validated',
    desc: 'Environment variables are validated with Zod on startup. You get a clear error if config is missing, not a cryptic runtime failure.',
  },
  {
    icon: <FileIcon width={19} height={19} />,
    title: 'App Router native',
    desc: 'Designed for Server Actions, RSCs, and Route Handlers. No client-side adapters or context providers needed.',
  },
  {
    icon: <ClockIcon width={19} height={19} />,
    title: 'Fast by default',
    desc: 'Lightweight with no unnecessary dependencies. Requests go straight to the HiVelari API with no client-side round trips.',
  },
  {
    icon: <CubeIcon width={19} height={19} />,
    title: 'Modular domains',
    desc: (
      <>
        Each service is a separate domain (<code>auth</code>,{' '}
        <code>commerce</code>). More domains ship as the API grows — one client,
        always.
      </>
    ),
  },
];

export default function Features() {
  return (
    <div className="border-y border-line bg-surface" id="features">
      <div className="mx-auto max-w-[1160px]">
        <div
          className="px-12 pt-18 pb-12 max-[768px]:px-6 max-[520px]:px-5"
          data-reveal
        >
          <span className="eyebrow mb-3">Capabilities</span>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-extrabold tracking-[-0.05em] text-ink">
            Built the right way.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-px bg-line max-[768px]:grid-cols-2 max-[520px]:grid-cols-1">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              data-reveal-delay={(i % 3) + 1}
              className="group bg-surface px-9 py-10 transition-colors hover:bg-white/[0.02]"
            >
              <div className="mb-5 flex size-10 shrink-0 items-center justify-center rounded-sm border border-line-accent bg-accent-dim text-accent-light transition-[transform,background] duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-accent/[0.16]">
                {f.icon}
              </div>
              <h3 className="mb-2 text-[15px] font-semibold tracking-[-0.03em]">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-ink-2 [&_code]:rounded-xs [&_code]:bg-accent-dim [&_code]:px-[5px] [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:text-accent-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
