import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "@/components/ui/textBox/brushStroke";

type BrushKeyCapProps = {
  children: ReactNode;
  className?: string;
};

export function BrushKeyCap({
  children,
  className = "h-8 px-2.5 text-lg",
}: BrushKeyCapProps) {
  return (
    <kbd
      className={`${dosis.className} relative inline-flex items-center justify-center border-2 border-black bg-background font-bold text-white ${className}`}
    >
      <BrushStroke
        color="purple"
        className="top-1/2 left-1/2 h-3/4 -translate-1/2"
      />
      <span className="relative">{children}</span>
    </kbd>
  );
}
