import type { ReactNode } from "react";

import { alef } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "@/components/ui/textBox/brushStroke";
import { NameBrushStroke } from "./nameBrushStroke";

type Props = {
  children: ReactNode;
};

export function SpeechTextBox({ children }: Props) {
  return (
    <div className="relative border-2 border-black bg-background">
      <BrushStroke
        color="purple"
        className="-right-1.5 bottom-0 h-5.75 translate-y-1/2"
      />
      <div
        className={`${alef.className} relative px-6 pt-6 pb-6 text-xl leading-relaxed text-neutral-900`}
      >
        {children}
      </div>
      <NameBrushStroke name="Marcelino" />
    </div>
  );
}
