export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 800,
                color: '#fff',
              }}
            >
              H
            </div>
            HiVelari SDK
          </div>

          <span className="footer-copy">
            &copy; {new Date().getFullYear()} HiVelari. Built with Next.js.
          </span>

          <div className="footer-links">
            <a href="https://github.com/hivelari" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#how-it-works">Docs</a>
            <a href="#services">SDK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
