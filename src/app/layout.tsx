import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halloween",
  description: "Work in progress",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="relative h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
