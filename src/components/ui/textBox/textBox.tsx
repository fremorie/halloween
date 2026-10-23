import type { ReactNode } from "react";

import { alef } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "./brushStroke";

type TextBoxProps = {
  children: ReactNode;
};

export function TextBox({ children }: TextBoxProps) {
  return (
    <div className="relative bg-white">
      <div className="pointer-events-none absolute inset-0 border-2 border-black" />
      <BrushStroke
        color="yellow"
        displayedHeightInPixels={27}
        className="top-0 -left-1.5 -translate-y-1/2"
      />
      <BrushStroke
        color="purple"
        displayedHeightInPixels={23}
        className="-right-1.5 bottom-0 translate-y-1/2"
      />
      <div
        className={`${alef.className} relative px-10 py-8 text-xl leading-relaxed text-neutral-900`}
      >
        {children}
      </div>
    </div>
  );
}
