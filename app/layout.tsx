import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata: Metadata = {
  title: 'Next.js on Flight Control',
  description: 'Deploy your Next.js application to Flight Control',
};

// Using this package to manage cookies:
// https://github.com/moshest/next-client-cookies

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <html lang="en">
      <body>{children}</body>
      </html>
    </CookiesProvider>
  );
}
