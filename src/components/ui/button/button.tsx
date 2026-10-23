import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";

export function Button({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className={`${dosis.className} cursor-pointer border-2 border-black bg-white px-8 py-3 text-lg font-bold tracking-widest text-neutral-900 uppercase outline-offset-4 transition-transform hover:-rotate-1 focus-visible:outline-2 active:rotate-0`}
    >
      {children}
    </button>
  );
}
