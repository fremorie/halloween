import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";

type KeyCapProps = {
  children: ReactNode;
};

export function KeyCap({ children }: KeyCapProps) {
  return (
    <kbd
      className={`${dosis.className} mx-0.5 inline-block min-w-7 border-2 border-b-4 border-neutral-900 bg-button px-1.5 text-center text-sm leading-snug font-bold`}
    >
      {children}
    </kbd>
  );
}
