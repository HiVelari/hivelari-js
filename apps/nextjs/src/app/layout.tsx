import type { Metadata } from "next";
import "./globals.css";

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
        <div className="site">{children}</div>
      </body>
    </html>
  );
}
