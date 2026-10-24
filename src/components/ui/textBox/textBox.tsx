import type { ReactNode } from "react";

import { alef } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "./brushStroke";

type TextBoxProps = {
  children: ReactNode;
};

export function TextBox({ children }: TextBoxProps) {
  return (
    <div className="relative border-2 border-black bg-background">
      <BrushStroke
        color="yellow"
        className="top-0 -left-1.5 h-[27px] -translate-y-1/2"
      />
      <BrushStroke
        color="purple"
        className="-right-1.5 bottom-0 h-[23px] translate-y-1/2"
      />
      <div
        className={`${alef.className} relative px-6 py-6 text-xl leading-relaxed text-neutral-900`}
      >
        {children}
      </div>
    </div>
  );
}
