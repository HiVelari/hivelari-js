export interface LogEntry {
  id: string;
  ts: string;
  label: string;
  ok: boolean;
  detail: string;
}

let _seq = 0;

export function makeEntry(
  label: string,
  ok: boolean,
  detail: string,
): LogEntry {
  return {
    id: `log-${++_seq}`,
    ts: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    label,
    ok,
    detail,
  };
}

export default function LogPanel({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-line">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="text-[12px] font-semibold text-ink-2">Action Log</span>
        {logs.length > 0 && (
          <span className="pill pill-neutral ml-auto">{logs.length}</span>
        )}
      </div>
      <div className="thin-scroll max-h-[200px] overflow-y-auto bg-bg p-3.5 font-mono text-[12px]">
        {logs.length === 0 ? (
          <span className="text-ink-3">No actions yet.</span>
        ) : (
          <div className="flex flex-col gap-2.5">
            {[...logs].reverse().map((e) => (
              <div key={e.id}>
                <span className="text-ink-3">{e.ts} </span>
                <span className={e.ok ? 'text-green' : 'text-red'}>
                  {e.ok ? '✓' : '✗'} {e.label}
                </span>
                <br />
                <span className="text-ink-2">{e.detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
