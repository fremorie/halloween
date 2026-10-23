"use client";

import { useRef } from "react";

import { barrio } from "@/components/ui/fonts/fonts";
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
      <div className="grid grid-cols-[max-content_1fr] items-center gap-x-2">
        <h1 ref={titleRef} className={`${barrio.className} contents`}>
          <span className="text-7xl uppercase">Costume</span>
          <span className="col-span-2 row-start-2 text-6xl uppercase">
            for Marcelino
          </span>
        </h1>
      </div>
    </div>
  );
}
