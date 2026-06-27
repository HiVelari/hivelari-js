import type { Metadata } from "next";
import "./globals.css";
import ScrollReveal from "./_components/ScrollReveal";

export const metadata: Metadata = {
  title: "HiVelari SDK — The developer SDK for HiVelari",
  description:
    "Authentication, commerce, and payments — all server-side, fully typed. Build on HiVelari faster.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="app-aurora" aria-hidden="true">
          <span className="aurora-blob aurora-blob--1" />
          <span className="aurora-blob aurora-blob--2" />
          <span className="aurora-blob aurora-blob--3" />
        </div>
        <div className="app-noise" aria-hidden="true" />
        <div className="flex min-h-[100dvh] flex-col">{children}</div>
        <ScrollReveal />
      </body>
    </html>
  );
}
