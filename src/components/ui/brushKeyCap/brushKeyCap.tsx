import type { ReactNode } from "react";

import { dosis } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "@/components/ui/textBox/brushStroke";

type BrushKeyCapProps = {
  children: ReactNode;
  className?: string;
};

export function BrushKeyCap({
  children,
  className = "h-8 px-3.5 text-lg",
}: BrushKeyCapProps) {
  return (
    <kbd
      className={`${dosis.className} relative inline-flex items-center justify-center border-2 border-black bg-background font-bold text-white ${className}`}
    >
      <BrushStroke
        color="purple"
        className="top-1/2 left-1/2 size-[calc(100%_-_0.25rem)]! -translate-1/2"
      />
      <span className="relative">{children}</span>
    </kbd>
  );
}
