import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SRMG Media Solutions - AdTech Platform",
  description: "Self-serve advertising platform for publishers and advertisers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
