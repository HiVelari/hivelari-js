import ServerIcon from '@/app/_icons/server.svg';
import CodeIcon from '@/app/_icons/code.svg';
import LockIcon from '@/app/_icons/lock.svg';
import CartIcon from '@/app/_icons/cart.svg';
import FileIcon from '@/app/_icons/file.svg';
import ShieldIcon from '@/app/_icons/shield.svg';

const FEATURES = [
  {
    id: 'server-only',
    icon: <ServerIcon width={20} height={20} />,
    title: 'Server-only by design',
    description:
      'The SDK uses the `server-only` package to prevent secret keys from leaking into the browser bundle.',
  },
  {
    id: 'typed',
    icon: <CodeIcon width={20} height={20} />,
    title: 'End-to-end typed',
    description:
      'Request parameters, response payloads, and error shapes are all fully typed with TypeScript generics.',
  },
  {
    id: 'auth',
    icon: <LockIcon width={20} height={20} />,
    title: 'Auth service',
    description:
      'Login, register, OAuth, profile management, email verification — everything in `client.auth.*`.',
  },
  {
    id: 'commerce',
    icon: <CartIcon width={20} height={20} />,
    title: 'Commerce service',
    description:
      'Physical and digital product listings, purchasing, and file management via `client.commerce.*`.',
  },
  {
    id: 'apirouter',
    icon: <FileIcon width={20} height={20} />,
    title: 'App Router native',
    description:
      'Server Actions, RSCs, and Route Handlers are first-class citizens. No adaptation layer needed.',
  },
  {
    id: 'zod',
    icon: <ShieldIcon width={20} height={20} />,
    title: 'Validated at runtime',
    description:
      'Environment variables and API responses are validated with Zod at startup and on every call.',
  },
];

export default function FeatureCards() {
  return (
    <div className="feature-grid">
      {FEATURES.map((feat) => (
        <div key={feat.id} className="card card-lift">
          <div className="feature-card-inner">
            <div className="feature-icon">{feat.icon}</div>
            <div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc" style={{ marginTop: 6 }}>
                {feat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
