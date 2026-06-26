import DomainSidebar from "./_components/DomainSidebar";

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="domain-shell">
      <DomainSidebar />
      <main className="domain-main">{children}</main>
    </div>
  );
}
