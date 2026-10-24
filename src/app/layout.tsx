import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Costume for Marcelino",
  description:
    "Marcelino The Cat needs a Halloween costume. Help him make one by solving a series of puzzles.",
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
