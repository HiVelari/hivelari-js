import DomainSidebar from "./_components/DomainSidebar";

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100dvh] overflow-hidden max-[768px]:flex-col">
      <DomainSidebar />
      <main className="h-[100dvh] min-w-0 flex-1 overflow-y-auto max-[768px]:h-[calc(100dvh-56px)]">
        {children}
      </main>
    </div>
  );
}
