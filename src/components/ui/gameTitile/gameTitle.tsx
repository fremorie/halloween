"use client";

import { useRef } from "react";

import { barrio } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "@/components/ui/textBox/brushStroke";
import { useTitleIntro } from "./useTitleIntro";

type GameTitleProps = {
  onIntroComplete?: () => void;
};

export function GameTitle({ onIntroComplete }: GameTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useTitleIntro({ containerRef, titleRef, onIntroComplete });

  return (
    <div
      ref={containerRef}
      className="invisible flex flex-col items-center justify-center pb-[3vh]"
    >
      <div className="relative grid grid-cols-[max-content_1fr] items-center gap-x-2">
        <BrushStroke
          color="yellow"
          className="top-0 -left-3 h-[40px] -translate-y-1/2"
        />
        <BrushStroke
          color="purple"
          className="-right-3 bottom-0 h-[34px] translate-y-1/2"
        />
        <h1 ref={titleRef} className={`${barrio.className} contents`}>
          <span className="relative text-7xl uppercase">Costume</span>
          <span className="relative col-span-2 row-start-2 text-6xl uppercase">
            for Marcelino
          </span>
        </h1>
      </div>
    </div>
  );
}
