"use client";

import Image from "next/image";
import type { Ref } from "react";

import { dosis } from "@/components/ui/fonts/fonts";

const catImage = {
  source: `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/cat.webp`,
  width: 155,
  height: 160,
};

type StartButtonProps = {
  onClick: () => void;
  ref?: Ref<HTMLButtonElement>;
};

export function StartButton({ onClick, ref }: StartButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`${dosis.className} group invisible relative h-full w-full cursor-pointer font-bold text-white opacity-0`}
    >
      <span className="pointer-events-none absolute inset-[calc(0.25rem+2px)] overflow-hidden">
        <Image
          src={catImage.source}
          width={catImage.width}
          height={catImage.height}
          alt=""
          className="absolute bottom-0 left-3 h-14 w-auto translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-4 group-focus-visible:translate-y-4 motion-reduce:transition-none"
        />
      </span>
      START
    </button>
  );
}
