import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";
import { BACKGROUND } from "@/components/ui/colors/colors";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${dosis.className} pointer-events-auto cursor-pointer border-2 border-black bg-[${BACKGROUND}] px-8 py-3 text-lg font-bold tracking-widest text-neutral-900 uppercase outline-offset-4 transition-transform hover:-rotate-1 focus-visible:outline-2 active:rotate-0`}
    >
      {children}
    </button>
  );
}
