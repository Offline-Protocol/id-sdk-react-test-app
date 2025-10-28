"use client";

import "./globals.css";
import { OfflineAppProvider } from "@offline-protocol/id-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <OfflineAppProvider
          projectId={process.env.NEXT_PUBLIC_PROJECT_ID as string}
        >
          {children}
        </OfflineAppProvider>
      </body>
    </html>
  );
}
