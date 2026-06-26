export default function CtaBanner() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner" data-reveal>
          <h2 className="cta-title">
            Start building today.
          </h2>
          <p className="cta-sub">
            Drop in the SDK, point it at your HiVelari space, and ship
            your first authenticated page in under an hour.
          </p>
          <div className="cta-actions">
            <a href="/domain/auth" className="btn btn-primary btn-lg">
              Try authentication
            </a>
            <a href="/domain/commerce" className="btn btn-ghost btn-lg">
              Browse products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
