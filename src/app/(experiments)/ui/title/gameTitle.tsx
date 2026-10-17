"use client";

import { useRef } from "react";

import { barrio } from "@/components/ui/fonts/fonts";
import { useTitleIntro } from "@/app/(experiments)/ui/title/useTitleIntro";

export function GameTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useTitleIntro({ containerRef, titleRef });

  return (
    <div
      ref={containerRef}
      className="invisible flex h-screen flex-col items-center justify-center pb-[10vh]"
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
